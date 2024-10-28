export type Exercice = {
  id: number;
  name: string;
  description: string;
  difficulty: string;
  time: string;
  repetitions: string;
  createdAt: string;
  category: {
    id: number;
    name: string;
  };
  user: [];
}