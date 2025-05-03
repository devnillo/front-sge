'use client'
import { useEffect } from "react";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";
import Link from "next/link";
import HeaderComponent from "@/app/{components}/HeaderComponent";

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
