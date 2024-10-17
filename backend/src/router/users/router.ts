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
  const { firstname, lastname, email, password, picture, exercicesId} = req.body;
 try {
  const user = new Users();

  const exercices = JSON.parse(exercicesId);
  const exercice = await Exercices.find({
    where:{
      id: In(exercices),
    },
  });
  if(exercice) user.exercice = exercice;

  user.firstname = firstname;
  user.lastname = lastname;
  user.email = email;
  user.password =  await argon2.hash(password);
  user.picture = picture;

  const appSecret = process.env.APP_SECRET;
      if (!appSecret) {
        throw new Error("APP_SECRET is not defined in the environment variables");
      }

  const errors = await validate(user);
    if (errors.length > 0) {
      res.json(errors[0].constraints);
    } else {
      await user.save();

  const accessToken = jwt.sign(
    {id: user.id, role: user.role},
    appSecret,
    {expiresIn: "1h"}
  );
    
  const refreshToken = jwt.sign(
    {id: user.id, role: user.role},
    appSecret,
    {expiresIn:"1d"}
  );
      return res.status(201)
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        sameSite: "lax",
      })
      .header("Authorization", accessToken)
      .send(user);
    };
 } catch (error) {
    return res.status(500).send(error);
  }
});

export default usersRouter;