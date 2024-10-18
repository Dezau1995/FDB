import jwt, { JwtPayload }  from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['authorization'];
  if (!token) return res.sendStatus(403); // Forbidden

  const appSecret = process.env.APP_SECRET;
  if (!appSecret) {
      return res.status(500).send("APP_SECRET not defined");
  }

  jwt.verify(token.split(' ')[1], appSecret, (err, user) => {
      if (err) return res.sendStatus(401); // Unauthorized
      (req as any).user = user as JwtPayload; // Ajoute l'utilisateur à la requête
      next();
  });
};

export default authenticateJWT;