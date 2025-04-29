'use client';
import axios from "axios";
import HeaderComponent from "../{components}/HeaderComponent";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { Smile } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Role from "../role";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import Request from "@/app/requests";
import {useEffect, useState} from "react";

export default function AdminHomePage() {
    const [aluno, setAluno] = useState();
    const [escolas, setEscolas] = useState([])
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
    const options = [

        admin => {
            name: 'Alunos'
            href: '/admin/alunos'
        }
    ]
        // title: 'Administração',
    
    return (
        <div>
            <HeaderComponent links='oiii'/>
                
            <main className="px-2 py-15">
                <div className="flex justify-between items-center mb-4 max-sm:flex-col max-sm:items-start max-sm:gap-2">
                    <h1>Administração</h1>
                    <Button variant={'blue'} asChild>
                        <Link href='/admin/relatorios'>Relatórios</Link>
                    </Button>
                </div>
                <div className="cards grid grid-cols-12 gap-2">
                    <Card className="col-span-6 md:col-span-3 py-10">
                        <CardContent className={'flex flex-col justify-items-center items-center '}>
                            {/* <Smile size={50}/> */}
                            <span className="text-3xl font-semibold text-blue-500">1000</span>
                            <h3 className="text-xl font-medium">Alunos</h3>
                        </CardContent>
                    </Card>
                    <Card className="col-span-6 md:col-span-3 py-10">
                        <CardContent className={'flex flex-col justify-items-center items-center'}>
                        {/* <RiSchoolLine size={50} /> */}
                            <span className="text-3xl font-semibold text-blue-500">{data? data.length : 0}</span>
                            <h3 className="text-xl font-medium">Escolas</h3>
                        </CardContent>
                    </Card>
                    <Card className="col-span-6 md:col-span-3 py-10">
                        <CardContent className={'flex flex-col justify-items-center items-center'}>
                        {/* <FaPeopleGroup size={50}/> */}
                            <span className="text-3xl font-semibold text-blue-500">1000</span>
                            <h3 className="text-xl font-medium">Professores</h3>
                        </CardContent>
                    </Card>
                    <Card className="col-span-6 md:col-span-3 py-10">
                        <CardContent className={'flex flex-col justify-items-center items-center'}>
                            {/* <GrRestroomMen size={50}/> */}
                            <span className="text-3xl font-semibold text-blue-500">1000</span>
                            <h3 className="text-xl font-medium">Diretores</h3>
                        </CardContent>
                    </Card>
                </div>
                <div className="flex justify-between items-center my-8">
                    <h2 className="">Escolas</h2>
                    <div className="btn-area">
                        <Button variant={'gray'} className='mr-2 max-sm:px-2' asChild>
                            <Link href={'/admin/escola/gerenciar'}>
                                Gerenciar
                            </Link>
                        </Button>
                        <Button variant={'green'} className='max-sm:px-2' asChild>
                            <Link href={'/admin/escola/cadastrar'}>
                                Cadastrar
                            </Link>
                        </Button>
                    </div>
                </div>
                {!isLoading? <div className="escolas flex flex-col gap-2">
                    {data.length? data.map((escola) => 
                        <div className={`border-b-2 border-blue-500 escola p-2 rounded-t-md bg-white  flex justify-between items-center ${isRefetching? 'animate-pulse' : ''}`} key={escola.id}>
                            <p className="font-medium">{escola.name}</p>
                            <div className="btn-area">
                                <Button variant={'blue'} asChild>
                                    <Link className="" href={`admin/escola/${escola.id}`}>Mais opções</Link>
                                </Button>
                            </div>
                        </div>
                    
                        )
                        :
                         <div className="w-full bg-slate-100 py-10 text-center">
                            <span className="text-2xl">Sem Escolas!</span>
                         </div>
                    }
                </div>:
                <div className="escolas flex flex-col gap-2">
                    <div className="w-full bg-slate-100 py-10 text-center">
                        <span className="text-2xl">Carregando...</span>
                    </div>
                </div>
                }
                
            </main>
        </div>
    );
}