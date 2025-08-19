import { SubjectData } from "../types";

export const questionsData: SubjectData = {
  math: {
    week1: [
      {
        question: "¿Cuál es el resultado de 5 + 7?",
        options: ["10", "11", "12", "13"],
        answer: 2,
        explanation: "5 + 7 = 12, porque sumamos ambos números.",
        topic: "Suma",
      },
      {
        question: "¿Cuál es el resultado de 15 - 8?",
        options: ["6", "7", "8", "9"],
        answer: 1,
        explanation: "15 - 8 = 7, restamos 8 de 15.",
        topic: "Resta",
      },
      {
        question: "¿Cuántas decenas hay en el número 34?",
        options: ["3", "4", "7", "34"],
        answer: 0,
        explanation: "En 34 hay 3 decenas (30) y 4 unidades.",
        topic: "Números",
      },
      {
        question: "¿Cuál es el doble de 6?",
        options: ["10", "11", "12", "13"],
        answer: 2,
        explanation: "El doble de 6 es 6 × 2 = 12.",
        topic: "Multiplicación",
      },
      {
        question: "¿Cuál de estos números es par?",
        options: ["7", "9", "14", "15"],
        answer: 2,
        explanation: "14 es par porque se puede dividir por 2 sin residuo.",
        topic: "Números pares e impares",
      },
    ],
    week2: [
      {
        question: "¿Cuál es el área de un cuadrado de lado 4?",
        options: ["8", "12", "16", "20"],
        answer: 2,
        explanation:
          "El área del cuadrado se calcula como lado × lado = 4 × 4 = 16.",
        topic: "Geometría",
      },
      {
        question: "¿Cuántos lados tiene un triángulo?",
        options: ["2", "3", "4", "5"],
        answer: 1,
        explanation: "Un triángulo siempre tiene 3 lados.",
        topic: "Geometría",
      },
      {
        question: "¿Cuál es el resultado de 3 × 4?",
        options: ["7", "10", "12", "14"],
        answer: 2,
        explanation: "3 × 4 = 12, multiplicamos 3 por 4.",
        topic: "Multiplicación",
      },
      {
        question: "¿Qué fracción representa la mitad?",
        options: ["1/3", "1/2", "2/3", "3/4"],
        answer: 1,
        explanation:
          "1/2 representa la mitad, una parte de dos partes iguales.",
        topic: "Fracciones",
      },
    ],
  },
  language: {
    week1: [
      {
        question:
          "¿Cuál es el sustantivo en la oración: 'El perro corre rápido'?",
        options: ["corre", "rápido", "El", "perro"],
        answer: 3,
        explanation: "'Perro' es un sustantivo porque nombra a un ser vivo.",
        topic: "Sustantivos",
      },
      {
        question: "¿Cuál palabra está bien escrita?",
        options: ["aser", "hacer", "aver", "aber"],
        answer: 1,
        explanation: "'Hacer' es la forma correcta de escribir este verbo.",
        topic: "Ortografía",
      },
      {
        question: "¿Cuál es el verbo en: 'María come una manzana'?",
        options: ["María", "come", "una", "manzana"],
        answer: 1,
        explanation:
          "'Come' es el verbo porque indica la acción que realiza María.",
        topic: "Verbos",
      },
      {
        question: "¿Cuántas sílabas tiene la palabra 'mariposa'?",
        options: ["3", "4", "5", "6"],
        answer: 1,
        explanation: "Ma-ri-po-sa tiene 4 sílabas.",
        topic: "Sílabas",
      },
      {
        question: "¿Cuál es el plural de 'niño'?",
        options: ["niños", "niñas", "niño", "niñes"],
        answer: 0,
        explanation: "El plural de 'niño' es 'niños', agregamos -s.",
        topic: "Plurales",
      },
    ],
    week2: [
      {
        question: "¿Cuál es el antónimo de 'grande'?",
        options: ["enorme", "pequeño", "gigante", "alto"],
        answer: 1,
        explanation: "'Pequeño' es lo contrario de 'grande'.",
        topic: "Antónimos",
      },
      {
        question: "¿Qué tipo de texto es un cuento?",
        options: ["instructivo", "informativo", "narrativo", "descriptivo"],
        answer: 2,
        explanation:
          "Un cuento es un texto narrativo porque cuenta una historia.",
        topic: "Tipos de texto",
      },
      {
        question: "¿Cuál palabra lleva tilde?",
        options: ["casa", "mesa", "árbol", "perro"],
        answer: 2,
        explanation:
          "'Árbol' lleva tilde porque es una palabra grave terminada en consonante (l).",
        topic: "Acentuación",
      },
      {
        question: "¿Cuál es el sinónimo de 'feliz'?",
        options: ["triste", "contento", "enojado", "cansado"],
        answer: 1,
        explanation: "'Contento' significa lo mismo que 'feliz'.",
        topic: "Sinónimos",
      },
    ],
  },
};
