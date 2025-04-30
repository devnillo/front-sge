import { z } from "zod"

export const escolaSchema = {
    email: z.string().email('Informe um e-mail válido!'),
    nome: z.string().min(3, 'Informe o nome da Escola!'),
    endereco: z.string().min(3, 'Informe o endereço da Escola!'),
    codigo: z.string().min(7, 'Informe um Código INEP Válido'),
    municipio: z.string().min(3, 'Informe o município da Escola!'),
    distrito: z.string().min(2, 'Informe o distrito da Escola!'),
    cep: z.string().min(8, 'Informe o CEP da Escola!'),
    numero: z.string().optional().nullable(),
    complemento: z.string().optional().nullable(),
    bairro: z.string().optional().nullable(),
    dependencia: z.string().min(1, 'Selecione uma Dependência Administrativa')
}
// export const schema = z.object({
//         email: z.string().email('Informe um e-mail válido!'),
//         nome: z.string().min(3, 'Informe o nome da Escola!'),
//         endereco: z.string().min(3, 'Informe o endereço da Escola!'),
//         codigo: z.string().min(7, 'Informe um Código INEP Válido'),
//         municipio: z.string().min(3, 'Informe o município da Escola!'),
//         distrito: z.string().min(3, 'Informe o distrito da Escola!'),
//         cep: z.string().min(8, 'Informe o CEP da Escola!'),
//         numero: z.string().optional(),
//         complemento: z.string().optional(),
//         bairro: z.string().optional(),
//     })