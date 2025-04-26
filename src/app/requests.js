import axios from "axios";

export default class Request {
    async escolas(route) {
        const user_id = JSON.parse(localStorage.getItem('user')).id
        try{

            const URL = 'http://127.0.0.1:8000/api'
            const token = localStorage.getItem('token');

            let { data } = await axios.get(URL+'/escolas/all/'+user_id, {
                id: user_id,
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            })
            return data.escolas
            
        }catch(err){
            return [];
        }
            
    }
}