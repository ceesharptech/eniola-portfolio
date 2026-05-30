import { HugeiconsIcon } from "@hugeicons/react";
import {
  Home01Icon,
  Mail01Icon,
  File02Icon,
  Book02Icon,
} from "@hugeicons/core-free-icons";

export const navItems = [
  {
    id: "home",
    label: "Home",
    icon: <HugeiconsIcon icon={Home01Icon} className="w-5 h-5" />,
    scrollId: "home",
    route: "/",
  },
  {
    id: "guestbook",
    label: "Guestbook",
    icon: <HugeiconsIcon icon={Book02Icon} className="w-5 h-5" />,
    scrollId: null,
    route: "/guestbook",
  },
  {
    id: "projects",
    label: "Projects",
    icon: <HugeiconsIcon icon={File02Icon} className="w-5 h-5" />,
    scrollId: "projects",
  },
  {
    id: "mail",
    label: "Mail Me",
    icon: <HugeiconsIcon icon={Mail01Icon} className="w-5 h-5" />,
    scrollId: "mail",
  },
];
