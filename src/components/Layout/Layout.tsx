import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../hero/Navbar";
import Footer from "./Footer";
import { pageTransition } from "../../lib/animations";
import { ThemeProvider, useTheme } from "../../context/ThemeContext";

function LayoutContent() {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const { theme } = useTheme();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className={`flex-1 ${!isHome ? "pt-16 md:pt-20" : ""}`}>
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={pageTransition.initial}
            animate={pageTransition.animate}
            exit={pageTransition.exit}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}

export default function Layout() {
  return (
    <ThemeProvider>
      <LayoutContent />
    </ThemeProvider>
  );
}
