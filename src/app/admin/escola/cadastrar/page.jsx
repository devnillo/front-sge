'use client'
import HeaderComponent from "@/app/{components}/HeaderComponent";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from "zod";
import axios from "axios";
import { useEffect, useState } from "react";
import Role from "@/app/role";


export default function CadastrarEscolaPage() {
    const [error, setError] = useState([])    

    const schema = z.object({
        email: z.string().email('Email inválido'),
        name: z.string().min(3,  '3 caracteres no mínimo'),
        password: z.string().min(6, '6 caracteres no mínimo'),
        date: z.string().min(1, 'Data inválida')
    });
    const { register, handleSubmit, formState: { errors } } = useForm({
        mode: 'all',
        resolver: zodResolver(schema),
    });
    async function handleSub(data) {
        const user = JSON.parse(localStorage.getItem('user'));
        const URL = 'http://127.0.0.1:8000/api'
        const req = await axios.post(`${URL}/escolas/register`,
            {
                name: data.name,
                email: data.email,
                password: data.password,
                admin_id: user.id
            }
        ).then(res => 
            window.location.href = '/admin'
        ).catch(err => setError(err.response.data))
    }
    useEffect(() => {
        const role = new Role()
        role.check('admin')
        // console.log(user);
        
    }, [])
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
                                <a className="" href="">Cadastrar</a>
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
            <main className="px-2 py-15">
                <h1>Cadastrar Escola</h1>
                <div className="content">
                    <Card>
                        <CardContent>
                            <form className="grid grid-cols-12 gap-2" onSubmit={handleSubmit(handleSub)} method="post">
                                <div className="col-span-12">
                                    <div className="flex flex-col gap-2">
                                        <Label htmlFor="name">Nome:</Label>
                                        <Input id="name" {...register('name')}/>
                                    </div>
                                    {errors.name && <p className="error">{errors.name.message}</p>}
                                </div>
                                <div className="col-span-12">
                                    <div className="flex flex-col gap-2">
                                        <Label htmlFor="email">Email:</Label>
                                        <Input id="email" {...register('email')}/>
                                    </div>
                                    {errors.email && <p className="text-red-500 italic">{errors.email.message}</p>}
                                </div>
                                <div className="col-span-12">
                                    <div className="flex flex-col gap-2">
                                        <Label htmlFor="password">Senha:</Label>
                                        <Input id="password" {...register('password')}/>
                                    </div>
                                    {errors.password && <p className="text-red-500 italic">{errors.password.message}</p>}
                                </div>
                                <div className="col-span-12">
                                    <div className="flex flex-col gap-2">
                                        <Label htmlFor="date">Data:</Label>
                                        <Input type='date' id="date" {...register('date')}/>
                                    </div>
                                    {errors.password && <p className="text-red-500 italic">{errors.password.message}</p>}
                                </div>
                                {/* <input type="hidden" name="admin_id" value={JSON.parse(localStorage.getItem('user')).id}/> */}
                                <Button className='col-span-full' type="submit">Cadastrar</Button>
                            </form>
                        </CardContent>
                    </Card>

                </div>
            </main>
        </> 
    )

}