import { HomeIcon, UserIcon, ShieldIcon, ImageIcon, StarIcon } from "lucide-react";
import Index from "./pages/Index.jsx";
import Student from "./pages/Student.jsx";
import Admin from "./pages/Admin.jsx";
import ReviewedImages from "./pages/ReviewedImages.jsx";
import TotalScore from "./pages/TotalScore.jsx";

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
  {
    title: "ภาพที่ตรวจแล้ว",
    to: "/reviewed-images",
    icon: <ImageIcon className="h-4 w-4" />,
    page: <ReviewedImages />,
  },
  {
    title: "คะแนนรวม",
    to: "/total-score",
    icon: <StarIcon className="h-4 w-4" />,
    page: <TotalScore />,
  },
];