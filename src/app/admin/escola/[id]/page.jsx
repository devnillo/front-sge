'use client';
import Escolas from "@/app/reqs/escola";
import HeaderComponent from "@/app/{components}/HeaderComponent";
import {keepPreviousData, useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import { useParams } from "next/navigation"
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";
import Link from "next/link";
import {Input} from "@/components/ui/input";
import {useEffect, useRef, useState} from "react";
import {Controller, useForm} from "react-hook-form";
import z from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {Button} from "@/components/ui/button";
import axios from "axios";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { escolaSchema } from "@/app/escolaSchema";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FormField } from "@/app/{components}/FormFieldComponent";
import {LoadingComponent} from "@/app/{components}/LoadingComponent";


export default function Escola() {
    const [user, setUser] = useState([])
    const queryClient = useQueryClient();
    const schema = z.object(escolaSchema)
    const escolas = new Escolas()
    const { id } = useParams();
    if (typeof window !== 'undefined' && !user.length) {
        const user_data = localStorage.getItem('user')
        setUser(user_data)
    }

    const { data, isLoading, refetch, isRefetching  } = useQuery({
        queryKey: ['escola'],
        queryFn: () => escolas.get(id),
        placeholderData: keepPreviousData,
        refetchOnWindowFocus: true,
        refetchInterval: 1000 * 60,
        refetchIntervalInBackground: false,
    })
    const {watch, control, handleSubmit, reset, register, setError,formState: { errors } } = useForm({
        resolver: zodResolver(schema),
        shouldFocusError: true
    })
    const nome = watch('nome')
    const email = watch('email')
    const endereco = watch('endereco')
    const inep = watch('inep')
    const municipio = watch('municipio')
    const distrito = watch('distrito')
    const cep = watch('cep')
    const numero = watch('numero')
    const complemento = watch('complemento')
    const bairro = watch('bairro')
    const dependencia = watch('dependencia')

    useEffect(() => {
        if(data){   
            reset({
                nome: data.nome,
                email: data.email,
                inep: data.inep,
                municipio: data.municipio,
                distrito: data.distrito,
                cep: data.cep,
                endereco: data.endereco,
                numero: data.numero,
                complemento: data.complemento,
                bairro: data.bairro,
                dependencia: data.dependencia
            });
        }
    }, [data]);
    const mutation = useMutation({
        mutationFn: async () => {
            const URL = 'http://127.0.0.1:8000/api'
            
            const req = await axios.post(`${URL}/escolas/editar/${id}`, {
                nome,
                email,
                inep,
                municipio,
                distrito,
                cep,
                endereco,
                numero,
                complemento,
                bairro,
                dependencia
            }).then(res => true
            ).catch(err => console.log(err))
        },
        onSuccess: () => {
            queryClient.invalidateQueries('escola')
        },
    })
    async function handleSubmitForm(data)
    {
        mutation.mutate(data)
    }
    if(isLoading) {
        return <LoadingComponent />
    }
    return(
        <div className="flex flex-row">
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
                        <AccordionTrigger className={'text-xl '}>Relátorios</AccordionTrigger>
                        <AccordionContent>
                            <li>
                                <Link className="" href={`/relatorios/escola/${data.id}/`}>Escolas</Link>
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
            <main className={`mx-2 w-full ${mutation.isPending? 'animate-pulse' : ''}`} >
                <div className={'content'}>               
                    <div className="main bg-white py-10 px-4 mt-2 border-2 rounded-sm">
                        <h2>Editar dados da escola: {data.nome.toUpperCase()}</h2>
                        <p className={'text-gray-600'}>Atenção: Alterar esses dados afetará o cadastro da escola no sistema.</p>
                        <Tabs defaultValue="basico" className="w-full mt-2">
                            <TabsList className={'grid grid-cols-12 gap-2 justify-center items-center w-full h-14'}>
                                <TabsTrigger className={'col-span-6 min-w-52'} value="basico">Dados Básicos</TabsTrigger>
                                <TabsTrigger className={'col-span-6 min-w-52'} value="diretor">Diretor</TabsTrigger>
                                {/*<TabsTrigger className={'col-span-4 min-w-52'} value="password">Infraestrutura</TabsTrigger>*/}
                            </TabsList>
                            <TabsContent  value="basico" className={'col-span-12'}>
                                <form onSubmit={handleSubmit(handleSubmitForm)} className={' grid grid-cols-12 gap-x-2 gap-y-4 mt-4'} >
                                    <FormField id={'nome'} register={register} label={'Nome da Escola'} placeholder={'Nome oficial da escola'} error={errors.nome?.message} required={true} cols={6}/>
                                    <FormField id={'email'} register={register} label={'Email da Escola'} placeholder={'Email da escola'} error={errors.email?.message} required={true} cols={6}/>
                                    <FormField id={'inep'} register={register} label={'Código INEP'} placeholder={'Código iNEP da escola'} error={errors.inep?.message} required={true} cols={4}/>
                                    <div className="col-span-8">
                                        <label htmlFor="dependencia">Dependência Administrativa:</label>
                                            <Controller name="dependencia" control={control} render={({ field }) => (
                                                <Select id="dependencia" className="h-14" onValueChange={field.onChange} value={field.value} defaultValue={data.dependencia}>
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
                                    <FormField id={'endereco'} register={register} label={'Endereço da Escola'} placeholder={'sadasd'} error={errors.endereco?.message} required={true} cols={8}/>
                            
                                    <FormField id={'municipio'} register={register} label={'Municipio'} placeholder={'sadasd'} error={errors.municipio?.message} required={true} cols={4}/>
                                    
                                    <div className={'col-span-12 md:col-span-4'}>
                                        <label  htmlFor={'distrito'}>
                                            Distrito<span className="required">*</span>:
                                        </label>
                                        <Input className={`${errors?.distrito ? 'focus-visible:border-red-500 border-2 border-red-500':'' }`} id={'distrito'} placeholder={'Endereço da Escola'} {...register("distrito")}/>
                                        {errors?.distrito && <span className={'error col-span-12'}>{errors.distrito.message}</span>}
                                    </div>
                                    <FormField id={'cep'} register={register} label={'CEP'} placeholder={'CEP da Escola'} error={errors.cep?.message} required={true} cols={4}/>
                                
                                    <FormField id={'numero'} register={register} label={'Número'} placeholder={'Número endereço da Escola'} error={errors.numero?.message} cols={4}/>
                                    
                                    <FormField id={'complemento'} register={register} label={'Complemento'} placeholder={'Complemento'} error={errors.complemento?.message} cols={6}/>
                                    
                                    <FormField id={'bairro'} register={register} label={'Bairro'} placeholder={'Bairro da Escola'} error={errors.bairro?.message} cols={6}/>

                                    <Button className={'col-span-12'} variant={'blue'} value={'Editar'} type={'submit'}>
                                        Editar
                                    </Button>
                                </form>
                            </TabsContent>
                            <TabsContent value="diretor">

                            </TabsContent>
                        </Tabs>
                    </div>
                </div>


            </main>
            
        </div>
    )
}