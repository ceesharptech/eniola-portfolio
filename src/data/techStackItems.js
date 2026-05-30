import {
  React,
  NextJs,
  NodeJs,
  TailwindCSS,
  JavaScript,
  TypeScript,
  FramerDark,
  FramerLight,
  MongoDB,
  Git,
  Firebase,
} from "developer-icons";

export const techStackItems = [
  { id: "react", name: "React", icon: React, order: 1 },
  { id: "nextjs", name: "NextJs", icon: NextJs, order: 2 },
  { id: "nodejs", name: "NodeJs", icon: NodeJs, order: 3 },
  { id: "tailwind", name: "TailwindCSS", icon: TailwindCSS, order: 4 },
  { id: "javascript", name: "JavaScript", icon: JavaScript, order: 5 },
  { id: "typescript", name: "TypeScript", icon: TypeScript, order: 6 },
  {
    id: "framer",
    name: "Framer",
    icon: { light: FramerDark, dark: FramerLight },
    order: 7,
  },
  { id: "mongodb", name: "MongoDB", icon: MongoDB, order: 8 },
  { id: "git", name: "Git", icon: Git, order: 9 },
  { id: "firebase", name: "Firebase", icon: Firebase, order: 10 },
];
