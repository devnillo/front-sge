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
import { escolaSchema } from "@/app/escolaSchema";
import { FormField } from "@/app/{components}/FormFieldComponent";


export default function CadastrarEscolaPage() {
    // const [error, setError] = useState([])    

    const schema = z.object(escolaSchema);
    const { register, control, handleSubmit, setError, formState: { errors } } = useForm({
        mode: 'all',
        resolver: zodResolver(schema),
    });
    async function handleSub(data) {
        const user = JSON.parse(localStorage.getItem('user'));
        const token = localStorage.getItem('token');
        const URL = 'http://127.0.0.1:8000/api'
        // console.log(data);
        
        const req = await axios.post(`${URL}/escolas/register`,
            {
                // password: data.password,
                nome: data.nome,
                codigo: data.codigo,
                email: data.email,               
                municipio: data.municipio,
                distrito: data.distrito,
                cep: data.cep,
                endereco: data.endereco,
                numero: data.numero,
                complemento: data.complemento,
                bairro: data.bairro,
                dependencia: data.dependencia,
                admin_id: user.id,
            }
            
        ).then(res => 
            window.location.href = '/admin'
            // console.log(res)
            
        ).catch(err => {

            const errors = err.response.data.message
            // console.log(data);
            
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
        <div className="flex gap-2">
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
            <main className="px-2 mt-2 min-h-screen">
                <div className="flex flex-col gap-2 h-full items-center justify-center w-full">
                    <Card>
                        <CardContent>
                        <h1>Cadastrar Escola</h1>
                        <form onSubmit={handleSubmit(handleSub)} className={' grid grid-cols-12 gap-x-2 gap-y-4 mt-4'} >
                            <FormField id={'nome'} register={register} label={'Nome da Escola'} placeholder={'sadasd'} error={errors.nome?.message} required={true} cols={6}/>

                            <FormField id={'email'} register={register} label={'Email da Escola'} placeholder={'sadasd'} error={errors.email?.message} required={true} cols={6}/>
                            
                            <FormField id={'codigo'} register={register} label={'Código INEP'} placeholder={'sadasd'} error={errors.codigo?.message} required={true} cols={4}/>
                            <div className="col-span-8">
                                <label htmlFor="dependencia">Dependência Administrativa:</label>
                                    <Controller name="dependencia" control={control} render={({ field }) => (
                                        <Select id="dependencia" className="h-14" onValueChange={field.onChange} value={field.value}>
                                        <SelectTrigger className="w-full min-h-12">
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

                            <p className="separador">Endereço</p>

                            <FormField id={'endereco'} register={register} label={'Endereço da Escola'} placeholder={'sadasd'} error={errors.endereco?.message} required={true} cols={8}/>
                            
                            <FormField id={'municipio'} register={register} label={'Municipio'} placeholder={'sadasd'} error={errors.municipio?.message} required={true} cols={4}/>
                            
                            <div className={'col-span-12 md:col-span-4'}>
                                <label  htmlFor={'distrito'}>
                                    Distrito<span className="required">*</span>:
                                </label>
                                <Input className={`${errors?.distrito ? 'focus-visible:border-red-500 border-2 border-red-500':'' }`} id={'distrito'} placeholder={'Distrito da Escola'} {...register("distrito")}/>
                                {errors?.distrito && <span className={'error col-span-12'}>{errors.distrito.message}</span>}
                            </div>

                            <FormField id={'cep'} register={register} label={'CEP'} placeholder={'CEP da Escola'} error={errors.cep?.message} required={true} cols={4}/>
                            
                            <FormField id={'numero'} register={register} label={'Número'} placeholder={'Número endereço da Escola'} error={errors.numero?.message} cols={4}/>
                            
                            <FormField id={'complemento'} register={register} label={'Complemento'} placeholder={'Complemento'} error={errors.complemento?.message} cols={6}/>
                            
                            <FormField id={'bairro'} register={register} label={'Bairro'} placeholder={'Bairro da Escola'} error={errors.bairro?.message} cols={6}/>

                            <Button className={'col-span-12'} variant={'blue'} value={'Editar'} type={'submit'}>
                                Cadastrar
                            </Button>
                        </form>
                            
                    </CardContent>  
                </Card>

                </div>
            </main>
        </div> 
    )

}
                                    