import { FaShopify, FaApple } from "react-icons/fa";
import { FaMeta } from "react-icons/fa6";
import { SiMiro } from "react-icons/si";

export const experienceItems = [
  {
    id: "item-1",
    icon: FaMeta,
    year: "2022-2023",
    title: "Lead Developer",
    companyName: "Meta",
    buttonStyle:
      "bg-blue-300/20 dark:bg-transparent dark:text-blue-500 dark:border-none border-blue-400/40 text-blue-600",
    iconClass: "text-blue-600 dark:text-blue-500",
  },
  {
    id: "item-2",
    icon: FaApple,
    year: "2022-2023",
    title: "Graphic Designer",
    companyName: "Apple",
    buttonStyle:
      "bg-gray-400/20 dark:bg-transparent dark:border-none dark:text-gray-200 border-gray-400/40 text-gray-700",
    iconClass: "text-gray-700 dark:text-gray-200",
  },
  {
    id: "item-3",
    icon: FaShopify,
    year: "2022-2023",
    title: "Digital Marketer",
    companyName: "Shopify",
    buttonStyle:
      "bg-green-200/20 dark:bg-transparent dark:border-none dark:text-green-500 border-green-300/40 text-green-800",
    iconClass: "text-green-700 dark:text-green-500",
  },
  {
    id: "item-4",
    icon: SiMiro,
    year: "2022-2023",
    title: "Frontend Developer",
    companyName: "Miro",
    buttonStyle:
      "bg-yellow-400/20 dark:bg-transparent dark:border-none dark:text-yellow-500 border-yellow-400/40 text-yellow-800",
    iconClass: "text-yellow-700 dark:text-yellow-500",
  },
];
