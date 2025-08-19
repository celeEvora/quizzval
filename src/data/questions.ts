import { SubjectData } from "../types";
import mathWeek0 from "./math/week0.json";
import mathWeek1 from "./math/week1.json";
import mathWeek2 from "./math/week2.json";
import mathWeek3 from "./math/week3.json";
import mathWeek4 from "./math/week4.json";
import languageWeek5 from "./language/week5.json";
import languageWeek6 from "./language/week6.json";

export const questionsData: SubjectData = {
  math: {
    week0: mathWeek0,
    week1: mathWeek1,
    week2: mathWeek2,
    week3: mathWeek3,
    week4: mathWeek4,
  },
  language: {
    week5: languageWeek5,
    week6: languageWeek6,
  },
};
