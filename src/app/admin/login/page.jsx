
'use client'
import HeaderComponent from "@/app/{components}/HeaderComponent";
import { InputComponent } from "@/app/{components}/InputComponent";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import axios from "axios";
import { use } from "react";

export default function LoginPage() {
    const URL = 'http://127.0.0.1:8000/api'
    const handleSubmit = async (event) => {
        event.preventDefault();
        try{

            const req = await axios.post(`${URL}/login`, {
                email: event.target.email.value,
                password: event.target.password.value,
            })
            .then((response) => {
                const token = response?.data.access_token
                const user = response?.data.user
                localStorage.setItem('token', token)
                localStorage.setItem('user', JSON.stringify(user))      
                if(user.role === 'administrator'){
                    window.location.href = '/admin'
                }
                          
            })
            
        }
        catch(error){
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
                    <CardTitle className={'text-2xl'}>Login Admin</CardTitle>
                    <CardDescription>Cadastrar Administrador no SEGEM</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className={'flex flex-col gap-2'} method="POST" >
                        <InputComponent name={'email'} type={'text'} title={'Email do Administrador'} placeholder={'Ex: email@gmail.com'}/>
                        <InputComponent name={'password'} type={'password'} title={'Senha do Administrador'} />
                        <Button type="submit" autoFocus>Entrar</Button>
                    </form>
                </CardContent>
            </Card>
            
        </main>
    </div>
  );
}