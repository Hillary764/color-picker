import { Outlet } from "react-router";
import Header from "./components/Header/Header";

export default function MainLayout() {
  return (
    <>
      <Header />
      <main className="w-screen m-0 p-0 min-h-screen top-0 relative">
        <Outlet />
      </main>
    </>
  );
}
