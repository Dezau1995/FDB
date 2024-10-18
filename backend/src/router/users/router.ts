import jwt from "jsonwebtoken";
import { Router } from "express";
import { Users } from "../../entities/Users";
import { Exercices } from "../../entities/Exercices";
import { In } from "typeorm";
import { validate } from "class-validator";
import argon2 from "argon2";
import dotenv from "dotenv";

dotenv.config();

const usersRouter = Router();

usersRouter.get("/", async (req, res) => {
  try {
    const users = await Users.find();
    res.status(200).send(users)
  } catch (error) {
    return res.status(500).send(error)
  }
});

usersRouter.post("/", async (req, res) => {
  const { firstname, lastname, email, password, picture, role, exercicesId } = req.body;
  try {
    const existingUser = await Users.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "Email already in use." });
    }

    const user = new Users();
    user.firstname = firstname;
    user.lastname = lastname;
    user.email = email;
    user.password = await argon2.hash(password);
    user.picture = picture;
    user.role = role;

    const exercices = JSON.parse(exercicesId);
    const exercice = await Exercices.find({
      where: {
        id: In(exercices),
      },
    });
    if (exercice) user.exercice = exercice;

    const errors = await validate(user);
    if (errors.length > 0) {
      return res.status(400).json(errors[0].constraints);
    }
    await user.save();

    const appSecret = process.env.APP_SECRET;
if (!appSecret) {
  console.error("APP_SECRET is not defined in the environment variables");
  return res.status(500).send("Internal Server Error");
}

    const accessToken = jwt.sign(
      { id: user.id, role: user.role },
      appSecret,
      { expiresIn: "1h" }
    );
    const refreshToken = jwt.sign(
      { id: user.id, role: user.role },
      appSecret,
      { expiresIn: "1d" }
    );

    delete user.password;

    return res.status(201)
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        sameSite: "lax",
      })
      .header("Authorization", accessToken)
      .json(user);
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).send("Internal Server Error");
  }
});



usersRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await Users.findOne({ where: { email } });

    if (!user) {
      return res.status(401).send("Invalid email or password");
    }

    if (!user.password) {
      return res.status(401).send("Invalid email or password");
    }

    const isValidPassword = await argon2.verify(user.password, password);
    if (!isValidPassword) {
      return res.status(401).send("Invalid email or password");
    }

    const appSecret = process.env.APP_SECRET;
    if (!appSecret) {
      console.error("APP_SECRET is not defined in the environment variables");
      return res.status(500).send("Internal Server Error");
    }

    const accessToken = jwt.sign(
      { id: user.id, role: user.role },
      appSecret,
      { expiresIn: "1h" }
    );

    const refreshToken = jwt.sign(
      { id: user.id, role: user.role },
      appSecret,
      { expiresIn: "1d" }
    );

    return res.status(200)
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        sameSite: "lax",
      })
      .header("Authorization", `Bearer ${accessToken}`) 
      .send({ user: { id: user.id, email: user.email, role: user.role } });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).send("Internal Server Error");
  }
});

usersRouter.post("/logout", (req, res) => {
  res.clearCookie("refreshToken");
  res.status(200).send("Logged out successfully");
});

// usersRouter.post("/", async (req, res) => {
//   const { firstname, lastname, email, password, picture, role, exercicesId} = req.body;
//  try {
//   const user = new Users();

//   const exercices = JSON.parse(exercicesId);
//   const exercice = await Exercices.find({
//     where:{
//       id: In(exercices),
//     },
//   });
//   if(exercice) user.exercice = exercice;
//   user.firstname = firstname;
//   user.lastname = lastname;
//   user.email = email;
//   user.password = password;
//   user.picture = picture;
//   user.role = role;

//   const errors = await validate(user);
//     if (errors.length > 0) {
//       res.json(errors[0].constraints);
//     } else {
//       await user.save();

//       return res.status(201).send(user);
//     };
//  } catch (error) {
//     return res.status(500).send(error);
//   }
// });

export default usersRouter;