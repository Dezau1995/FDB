import  { Router } from "express";
import { Category } from "../../entities/Category";
import { validate } from "class-validator";
import { Exercices } from "../../entities/Exercices";

const categoryRouter = Router();

categoryRouter.get("/", async (req, res) => {
  try {
    const category = await Category.find();
    res.status(200).send(category)
  } catch (error) {
    res.status(500).send(error)
  }
});

categoryRouter.get("/:categoryId/exercices", async (req, res) => {
  try {
    const categoryId = parseInt(req.params.categoryId);
    const exercices = await Exercices.find({
      relations: {
        category: true,
      },
      where: { category: { id: categoryId} },
    });
    res.status(200).send(exercices);
  } catch (error) {
    return res.status(500).send(error);
  }
})

categoryRouter.post("/", async (req, res) => {
  const { name } = req.body;
  try {
    const category = await new Category();
    category.name = name;

    const errors = await validate(category);
    if(errors.length > 0) {
      res.json(errors[0].constraints);
    } else {
      await category.save();
      return res.status(200).send(category);
    }
  } catch (error) {
    return res.status(500).send(error);
  }
});

export default categoryRouter;