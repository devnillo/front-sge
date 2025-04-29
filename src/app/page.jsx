'use client'
import { useEffect } from "react";
import HeaderComponent from "@/app/{components}/HeaderComponent";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";
import Link from "next/link";

export default function Home() {
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            window.location.href = "/admin/login";
        }
    })
    return (
        <>
            <HeaderComponent>
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger className={'text-xl '}>Alunos</AccordionTrigger>
                        <AccordionContent>
                            <li>
                                <a className="" href="">Cadastrar</a>
                            </li>
                        </AccordionContent>
                        <AccordionContent>
                            <li>
                                <a href="">Mátricular</a>
                            </li>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger className={'text-xl '}>Escolas</AccordionTrigger>
                        <AccordionContent>
                            <li>
                                <Link className="" href="admin/escola/cadastrar">Cadastrar</Link>
                            </li>
                        </AccordionContent>
                        <AccordionContent>
                            <li>
                                <a href="">Gerenciar</a>
                            </li>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </HeaderComponent>
        </>
        );
        }
