import { Router } from "express";
import { Exercices } from "../../entities/Exercices";
import { Category } from "../../entities/Category";
import { validate } from "class-validator";

const exercicesRouter = Router();

exercicesRouter.get("/", async (req, res) => {
   try {
    const exercices = await Exercices.find({
      relations: {
        category: true,
      },
    });
    res.status(200).send(exercices)
   } catch (error) {
    return res.status(500).send(error);
   }
});

exercicesRouter.get("/:id", async (req, res) => {
   try {
    const id = parseInt(req.params.id)
    const exercices = await Exercices.findOne({
      relations: {
        category: true,
      },
      where: {id},
    });
    res.status(200).send(exercices)
   } catch (error) {
    return res.status(500).send(error);
   }
});

exercicesRouter.post("/", async (req, res) => {
  const {
    name, description, difficulty, time, equipement, repetitions, createdAt, categoryId
  } = req.body;
  try {
    const exercice = new Exercices();
    const category = await Category.find({ where: { id: categoryId }});
    if(category) exercice.category = category;

    exercice.name = name;
    exercice.description = description;
    exercice.difficulty = difficulty;
    exercice.time = time;
    exercice.equipement = equipement;
    exercice.repetitions = repetitions;
    exercice.createdAt = createdAt;

    const errors = await validate(exercice);
    if(errors.length > 0) {
      res.json(errors[0].constraints);
    } else {
      await exercice.save();
      return res.status(201).send(exercice)
    }
    } catch (error) {
    return res.status(500).send(error);
  }
});

export default exercicesRouter;