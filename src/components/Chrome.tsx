"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export function Chrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isProjects = pathname === "/projects";

  return (
    <>
      {!isProjects && <Header />}
      {children}
      {!isProjects && <Footer />}
    </>
  );
}

