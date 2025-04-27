'use client'
import HeaderComponent from "@/app/{components}/HeaderComponent";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from "zod";
import axios from "axios";
import { useEffect, useState } from "react";
import Role from "@/app/role";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";


export default function CadastrarEscolaPage() {
    // const [error, setError] = useState([])    

    const schema = z.object({
        // email: z.string().email('Email inválido'),
        // date: z.string().min(1, 'Data inválida')
        // password: z.string().min(6, '6 caracteres no mínimo'),
        name: z.string().min(3,  '3 caracteres no mínimo'),
        email: z.string().email('Email inválido'),
        code: z.string().min(6, 'Código inválido'),
        dependencia: z.string(),
    });
    const { register, control, handleSubmit, setError, formState: { errors } } = useForm({
        mode: 'all',
        resolver: zodResolver(schema),
    });
    async function handleSub(data) {
        const user = JSON.parse(localStorage.getItem('user'));
        const token = localStorage.getItem('token');
        const URL = 'http://127.0.0.1:8000/api'
        const req = await axios.post(`${URL}/escolas/register`,
            {
                // password: data.password,
                name: data.name,
                email: data.email,
                code: data.code,
                dependencia: data.dependencia,
                admin_id: user.id,
            }
            
        ).then(res => 
            window.location.href = '/admin'
        ).catch(err => {

            const errors = err.response.data.message
            for (const key in errors) {
                // setError(key, {
                    // //   type: 'server',
                    //   message: errors[key][0], // pega a primeira mensagem
                    console.log(errors);
                // });
        }
        }
        )
        
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
            <main className="px-2 py-15 h-screen">
                <div className="flex flex-col gap-2 h-full justify-center content sm:w-2/3 sm:m-auto">
                    <h1>Cadastrar Escola</h1>
                    <Card>
                        <CardContent>
                            <form className="grid grid-cols-12 gap-2" onSubmit={handleSubmit(handleSub)} method="post">
                                <div className="col-span-12">
                                    <div className="flex flex-col gap-2">
                                        <Label htmlFor="name">Nome da Escola:</Label>
                                        <Input id="name" {...register('name')}/>
                                    </div>
                                    {errors.name && <p className="error">{errors.name.message}</p>}
                                </div>
                                <div className="col-span-12">
                                    <div className="flex flex-col gap-2">
                                        <Label htmlFor="email">Email da Escola:</Label>
                                        <Input id="email" type='email' {...register('email')}/>
                                    </div>
                                    {errors.email && <p className="text-red-500 italic">{errors.email.message}</p>}
                                </div>
                                <div className="col-span-12">
                                    <div className="flex flex-col gap-2">
                                        <Label htmlFor="code">Código INEP:</Label>
                                        <Input id="code" type='text' {...register('code')}/>
                                    </div>
                                    {errors.code && <p className="text-red-500 italic">{errors.code.message}</p>}
                                </div>
                                {/* <div className="col-span-12">
                                    <div className="flex flex-col gap-2">
                                        <Label htmlFor="password">Senha:</Label>
                                        <Input id="password" type='password' {...register('password')}/>
                                    </div>
                                    {errors.password && <p className="text-red-500 italic">{errors.password.message}</p>}
                                </div> */}
                                <div className="col-span-12">
                                    <label htmlFor="dependencia">Dependência Administrativa:</label>
                                        <Controller name="dependencia" control={control} render={({ field }) => (
                                            <Select id="dependencia" className="w-screen" onValueChange={field.onChange} value={field.value}>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Selecione!" />
                                            </SelectTrigger>
                                            <SelectContent >
                                                <SelectItem value="municipal">Municipal</SelectItem>
                                                <SelectItem value="estadual">Estadual</SelectItem>
                                                <SelectItem value="federal">Federal</SelectItem>
                                                <SelectItem value="privada">Privada</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    )} />
                                    {errors.dependencia && <p className="text-red-500 italic">{errors.dependencia.message}</p>}
                                </div>
                                {/* <div className="col-span-12">
                                    <div className="flex flex-col gap-2">
                                        <Label htmlFor="date">Data:</Label>
                                        <Input type='date' id="date" {...register('date')}/>
                                    </div>
                                    {errors.password && <p className="text-red-500 italic">{errors.password.message}</p>}
                                </div> */}
                                {/* <input type="hidden" name="admin_id" value={JSON.parse(localStorage.getItem('user')).id}/> */}
                                <Button variant={'blue'} className='col-span-full' type="submit">Cadastrar</Button>
                            </form>
                        </CardContent>
                    </Card>

                </div>
            </main>
        </> 
    )

}