import { Outlet } from "react-router-dom";
import { NavBar } from "./ui/components/NavBar/NavBar";

export default function App() {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
}
