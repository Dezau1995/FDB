import { Router } from "express";
import { Users } from "../../entities/Users";

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
  const { firstname, lastname, email, password, picture} = req.body;
 try {
  const user = new Users();

 } catch (error) {
  
 }
})

export default usersRouter;