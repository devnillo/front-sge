'use client';
import Escolas from "@/app/reqs/escola";
import HeaderComponent from "@/app/{components}/HeaderComponent";
import {keepPreviousData, useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import { useParams } from "next/navigation"
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";
import Link from "next/link";
import {Input} from "@/components/ui/input";
import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import z from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {Button} from "@/components/ui/button";
import axios from "axios";


export default function Escola() {
    const queryClient = useQueryClient();
    const schema = z.object({
        email: z.string().email('Informe um e-mail válido!'),
        name: z.string().min(3, 'Informe o nome da Escola!'),
    })
    const {watch, handleSubmit, reset, register, setError,formState: { errors } } = useForm({
        resolver: zodResolver(schema),
        shouldFocusError: true
    })
    const name = watch('name')
    const email = watch('email')
    function updateUser(e) {

    }


        const { data, isLoading, refetch, isRefetching  } = useQuery({
        queryKey: ['escola'],
        queryFn: () => escolas.get(id),
        placeholderData: keepPreviousData,
        refetchOnWindowFocus: true,
        refetchInterval: 1000 * 60,
        refetchIntervalInBackground: false,
    })
    // const [email, setEmail] = useState(data?.email || "");
    // const [name, setName] = useState(data?.name || "");
    const [code, setCode] = useState(data?.code || "");
    const escolas = new Escolas()
    const { id } = useParams();



    useEffect(() => {
        if(data){
            // setName(data.name);
            // setEmail(data.email)
            setCode(data.code)
            reset({
                name: data.name,
                email: data.email,
            });
        }
    }, [data]);
    const mutation = useMutation({
        mutationFn: async () => {
            const URL = 'http://127.0.0.1:8000/api'
            const req = await axios.post(`${URL}/escolas/editar/${id}`, {
                name,
                email
            }).then(res => true).catch(err => console.log(err))
        },
        onSuccess: () => {
            queryClient.invalidateQueries('escola')
        }
    })
    async function handleSubmitForm(data)
    {
        mutation.mutate(data)
        // console.log(data)
    }

    if(isLoading) {
        return <h1>Carregando...</h1>
    }
    if(mutation.isPending){

        return <h1>Carregando...</h1>

    }
    return(
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
            <main className='mt-15 mx-2'>
                <div className={'content'}>
                    <h1 className={`${isRefetching? 'animate-pulse' : ''}`}>Escola: <span className='text-primary-blue'>{data?.name.toUpperCase()}</span></h1>
                    <h1 className={`${isRefetching? 'animate-pulse' : ''}`}>INEP: <span className='text-primary-blue'>{code}</span></h1>
                    <hr />
                    <div className="main bg-white py-10 px-4 mt-2 border-2 rounded-sm">
                        <h2>Editar dados da escola</h2>
                        <p className={'text-gray-600'}>Atenção: Alterar esses dados afetará o cadastro da escola no sistema.</p>
                        <form onSubmit={handleSubmit(handleSubmitForm)} className={' grid grid-cols-12 gap-x-2 gap-y-4 mt-4'} >
                            <div className={'col-span-12 md:col-span-6'}>
                                <label htmlFor={'name'}>
                                    Nome da Escola:
                                </label>
                                <Input className={`${errors?.name ? 'focus-visible:border-red-500 border-2 border-red-500':'' }`} id='name' {...register("name")}/>
                                {errors?.name && <span className={'error col-span-12'}>{errors.name.message}</span>}
                            </div>
                            <div className={'col-span-12 md:col-span-6'}>
                                <label  htmlFor={'email'}>
                                    Email da Escola:
                                </label>
                                <Input className={`${errors?.email ? 'focus-visible:border-red-500 border-2 border-red-500':'' }`} id={'email'} placeholder={'Email  da Escola'} {...register("email")}/>
                                {errors?.email && <span className={'error col-span-12'}>{errors.email.message}</span>}
                            </div>
                            <Button className={'col-span-12'} variant={'blue'} value={'Editar'} type={'submit'}>
                                Editar
                            </Button>

                        </form>
                    </div>
                </div>


            </main>
            
        </>
    )
}