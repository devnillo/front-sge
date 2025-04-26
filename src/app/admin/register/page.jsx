
'use client'
import HeaderComponent from "@/app/{components}/HeaderComponent";
import { InputComponent } from "@/app/{components}/InputComponent";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import axios from "axios";

export default function RegisterPage() {
    const URL = 'http://127.0.0.1:8000/api'
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const data = await axios.post(`${URL}/register`, {
                name: event.target.name.value,
                email: event.target.email.value,
                password: event.target.password.value,
                role: 'admin'
            })
            .then((response) => {
                window.location.href = '/admin/login'
            })
        }
        catch (error) {
            console.log(error.response?.data)
        }
    }
  return (
    <div className={'flex w-screen'}>
        <HeaderComponent className="absolute">
        <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
                <AccordionTrigger>Alunos</AccordionTrigger>
                <AccordionContent>
                    <li>
                        <a href="">aaaaaaaaaa</a>
                    </li>
                </AccordionContent>
                <AccordionContent>
                    <li>
                        <a href="">aaaaaaaaaa</a>
                    </li>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
        </HeaderComponent>
        <main className="h-[calc(100vh-80px)] w-screen flex justify-center items-center p-2">
            <Card className={'md:w-2/4'} variant={'outline'}>
                <CardHeader>
                    <CardTitle className={'text-2xl'}>Cadastrar Admin</CardTitle>
                    <CardDescription>Cadastrar Administrador no SEGEM</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className={'flex flex-col gap-2'} method="POST" >
                        <InputComponent name={'name'} type={'text'} title={'Nome do Administrador'} placeholder={'Ex: Carlos Souza'}/>
                        <InputComponent name={'email'} type={'text'} title={'Email do Administrador'} placeholder={'Ex: email@gmail.com'}/>
                        <InputComponent name={'password'} type={'password'} title={'Senha do Administrador'} />
                        <Button type="submit">Cadastrar</Button>
                    </form>
                </CardContent>
            </Card>
            
        </main>
    </div>
  );
}