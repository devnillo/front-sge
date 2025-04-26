'use client';
import Escolas from "@/app/reqs/escola";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation"

export default function Escola() {
    const escolas = new Escolas()
    const { id } = useParams();
    const { data, isLoading, isRefetching, isSuccess } = useQuery({
        queryKey: ['escola'],
        queryFn: () => escolas.get(id),
        placeholderData: keepPreviousData,
        refetchOnWindowFocus: true,
        refetchInterval: 1000 * 60,
        refetchIntervalInBackground: false,
    })
    // console.log(data);
    if(isLoading) {
        return <h1>Carregando...</h1>
    }
    if(isSuccess) {
        // console.log(data);
        
    }
    
    return(
        <>
            <h1 className={`${isRefetching? 'animate-pulse' : ''}`}>{data?.name}</h1>
            <h1>{data?.email}</h1>
            
        </>
    )
}