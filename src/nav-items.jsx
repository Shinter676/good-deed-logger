import { HomeIcon, LogInIcon, UserIcon, ShieldIcon } from "lucide-react";
import Index from "./pages/Index.jsx";
import Login from "./pages/Login.jsx";
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
    title: "เข้าสู่ระบบ",
    to: "/login",
    icon: <LogInIcon className="h-4 w-4" />,
    page: <Login />,
  },
  {
    title: "นักเรียน",
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