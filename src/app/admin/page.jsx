'use client';
import HeaderComponent from "../{components}/HeaderComponent";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Role from "../role";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import Request from "@/app/requests";
import {useEffect, useState} from "react";
import { AdminCard } from "../{components}/AdminCardComponent";
import ButtonLinkComponent from "../{components}/ButonLinkComponent";

export default function AdminHomePage() {
    const URL = 'http://127.0.0.1:8000/api'
    
    const request = new Request()
    const { data, isLoading, isRefetching, isSuccess } = useQuery({
        queryKey: ['escolas'],
        queryFn: () => request.escolas(),
        placeholderData: keepPreviousData,
        refetchOnWindowFocus: true,
        refetchInterval: 1000 * 60,
        refetchIntervalInBackground: false,
    })
    useEffect( () => {
        const role = new Role()
        role.check('admin')
    }, [])
    
    return (
        <div className="flex gap-2">
            <HeaderComponent>
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger className='trigger'>Alunos</AccordionTrigger>
                        <AccordionContent className={'flex flex-col'}>
                            <li className="trigger-child">
                                <Link  href={`/relatorios/escola/`}>Escolas</Link>
                            </li>
                            <li className="trigger-child">
                                <a href="">Gerenciar</a>
                            </li>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger className='trigger'>Relátorios</AccordionTrigger>
                        <AccordionContent className={'flex flex-col'}>
                            <li className="trigger-child">
                                <Link  href={`/relatorios/escola/`}>Escolas</Link>
                            </li>
                            <li className="trigger-child">
                                <a href="">Gerenciar</a>
                            </li>
                        </AccordionContent>
                        {/* </AccordionContent> */}
                    </AccordionItem>

                </Accordion>
            </HeaderComponent>
                
            <main className="px-2 py-14 w-full">
                <div className="flex justify-between items-center mb-4 max-sm:flex-col max-sm:items-start max-sm:gap-2">
                    <h1>Administração</h1>
                    <Button variant={'blue'} asChild>
                        <Link href='/admin/relatorios'>Relatórios</Link>
                    </Button>
                </div>
                <div className="cards grid grid-cols-12 gap-2">
                    <AdminCard href={'/admin/aluno/gerenciar'} title={'Escolas'}/>
                    <AdminCard href={'/admin/aluno/gerenciar'} title={'Alunos'}/>
                    <AdminCard href={'/admin/aluno/gerenciar'} title={'Alunos'}/>
                    <AdminCard href={'/admin/aluno/gerenciar'} title={'Alunos'}/>
                </div>
                <div className="flex justify-between items-center my-8">
                    <h2 className="">Ultímas Escolas Cadastradas: </h2>
                    <div className="btn-group">
                        <ButtonLinkComponent variant={'gray'} href={'/admin/escola/cadastrar'}>
                            Gerenciar
                        </ButtonLinkComponent>
                        <ButtonLinkComponent variant={'green'} href={'/admin/escola/cadastrar'}>
                            Cadastrar
                        </ButtonLinkComponent>
                    </div>
                </div>
                <div className="escolas flex flex-col gap-2">
                    {isLoading ? (
                        <div className="w-full bg-slate-100 py-10 text-center">
                            <span className="text-2xl">Carregando...</span>
                        </div>
                        ) : data.length ? (
                            data.map((escola) => (
                        <div key={escola.id} className={`border-b-2 escola p-2 rounded-t-md bg-white flex justify-between items-center ${
                            isRefetching ? "animate-pulse" : ""
                            }`}>
                            <p className="font-medium">{escola.nome}</p>
                            <Button variant="blue" asChild>
                                <Link href={`admin/escola/${escola.id}`}>Mais opções</Link>
                            </Button>
                        </div>
                        ))
                    ) : (
                        <div className="w-full bg-slate-100 py-10 text-center">
                            <span className="text-2xl">Sem Escolas!</span>
                        </div>
                    )}
                </div>
                
            </main>
        </div>
    );
}