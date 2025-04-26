'use client'
import Image from "next/image";
import HeaderComponent from "./{components}/HeaderComponent";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/admin/login";
    }
  })
  return (
    <>
      <HeaderComponent />
    </>
  );
}
