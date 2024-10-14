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
    name, description, difficulty, time, repetitions, createdAt, categoryId
  } = req.body;
  try {
    const exercice = new Exercices();
    const [category] = await Category.find({ where: { id: categoryId }});
    if(category) exercice.category = category;

    exercice.name = name;
    exercice.description = description;
    exercice.difficulty = difficulty;
    exercice.time = time;
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

exercicesRouter.put("/:id", async (req, res) => {
  const {
    name, description, difficulty, time, repetitions, createdAt, categoryId
  } = req.body;
  try {
    const id = parseInt(req.params.id);
    const exercice = await Exercices.findOne({
      relations: {
        category: true,
      },
      where: {id},
    });
    if (exercice !== null) {
      exercice.name = name;
      exercice.description = description;
      exercice.difficulty = difficulty;
      exercice.time = time;
      exercice.repetitions = repetitions;
      exercice.createdAt= createdAt;
  
      if (categoryId) {
        const [category] = await Category.find({ where: {id: categoryId}});
        if (category) exercice.category = category;
      }
  
      await exercice.save();
    }
    res.status(200).send(exercice);
  } catch (error) {
    return res.status(500).send(error);
  };
});

exercicesRouter.delete("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const exercice = await Exercices.findOne({where : {id}});
    if(exercice !== null) {
      exercice.remove();
    }
    res.status(200).send("OK");
  } catch (error) {
    res.status(500).send(error);
  };
});

export default exercicesRouter;