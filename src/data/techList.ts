import antdesignIcon from "../assets/antdesign.svg";
import dockerIcon from "../assets/docker.svg";
import graphqlIcon from "../assets/graphql.svg";
import materialIcon from "../assets/material.svg";
import nextjsIcon from "../assets/nextjs.svg";
import reactIcon from "../assets/react.svg";
import svelteIcon from "../assets/svelte.svg";
import typescriptIcon from "../assets/typescript.svg";

export type TechItem = {
  name: string;
  icon: string;
  link: string;
};

export const techList: TechItem[] = [
  {
    name: "React",
    icon: reactIcon,
    link: "https://react.dev/",
  },
  {
    name: "TypeScript",
    icon: typescriptIcon,
    link: "https://www.typescriptlang.org/",
  },
  {
    name: "MUI",
    icon: materialIcon,
    link: "https://mui.com/",
  },
  {
    name: "Next.js",
    icon: nextjsIcon,
    link: "https://nextjs.org/",
  },
  {
    name: "GraphQL",
    icon: graphqlIcon,
    link: "https://graphql.org/",
  },
  {
    name: "Svelte",
    icon: svelteIcon,
    link: "https://svelte.dev/",
  },
  {
    name: "Ant Design",
    icon: antdesignIcon,
    link: "https://ant.design/",
  },
  {
    name: "Docker",
    icon: dockerIcon,
    link: "https://www.docker.com/",
  },
];
