import {all, check, exclamation, star, xmark} from "@/app/utils/icons";

const menu = [
  {
    id: 0,
    title: "All Anime",
    icon: all,
    link: "/",
  },
  {
    id: 1,
    title: "Bad",
    icon: xmark,
    link: "/bad",
  },
  {
    id: 2,
    title: "Passable",
    icon: check,
    link: "/passable",
  },
  {
    id: 3,
    title: "Surprise",
    icon: exclamation,
    link: "/surprise",
  },
  {
    id: 4,
    title: "Masterpiece",
    icon: star,
    link: "/masterpiece",
  },
];

export default menu;