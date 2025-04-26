import axios from "axios";

export default class Escolas {
    async get(id) {
        const id_escola = id
        try{

            const URL = 'http://127.0.0.1:8000/api/escolas/'
            const token = localStorage.getItem('token');

            let { data } = await axios.get(URL+id_escola, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            })
            return data.escola;
            
            
            
        }catch(err){
            return [];
        }
            
    }
}