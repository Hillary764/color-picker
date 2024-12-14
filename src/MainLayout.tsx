import { Outlet } from "react-router";

export default function MainLayout() {
  return (
    <>
      <main className="w-screen m-0 p-0 min-h-screen">
        <Outlet />
      </main>
    </>
  );
}
