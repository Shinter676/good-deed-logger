import { HomeIcon, UserIcon, ShieldIcon } from "lucide-react";
import Index from "./pages/Index.jsx";
import Student from "./pages/Student.jsx";
import Admin from "./pages/Admin.jsx";

export const navItems = [
  {
    title: "หน้าหลัก",
    to: "/",
    icon: <HomeIcon className="h-4 w-4" />,
    page: <Index />,
  },
  {
    title: "กิจกรรมทำความดี",
    to: "/student",
    icon: <UserIcon className="h-4 w-4" />,
    page: <Student />,
  },
  {
    title: "แอดมิน",
    to: "/admin",
    icon: <ShieldIcon className="h-4 w-4" />,
    page: <Admin />,
  },
];