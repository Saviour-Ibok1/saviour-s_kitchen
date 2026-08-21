import { Outlet } from "react-router-dom";

import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import MobileBottomNav from "../components/layout/MobileBottomNav";

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="pb-20 lg:pb-0">
        <Outlet />
      </main>

      <Footer />

      <MobileBottomNav />
    </div>
  );
}