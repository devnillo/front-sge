import axios from "axios";

export default class Role {
    async check(route) {
        const URL = 'http://127.0.0.1:8000/api'
        const token = localStorage.getItem('token');

        try{
            let req = await axios.get(URL+'/check', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            })
            
        }catch(e){
            try{
                // console.log('aaaa');
                
                let req = await axios.get(URL+'/refresh', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                })
                let response = await req.data;
                console.log(response.access_token);
                
                localStorage.setItem('token', response.access_token);
                // console.log(response);

                
            }catch(e){
                return window.location.href = 'admin/login';
                
            }
        }
    }
    auth() {
       const user = JSON.parse(localStorage.getItem('user'));
        if (user && user.role === 'administrator') {
            return true;
        }
        
        return window.location.href = 'admin/login'; 
    }
    guest() {
       const user = JSON.parse(localStorage.getItem('user'));
        if (!user) {
            return true;
        }
        if (user && user.role === 'department') {
            return window.location.href = 'department/'; 
        }
        if (user && user.role === 'administrator') {
            return window.location.href = 'department/'; 
        }
        if (user && user.role === 'diretor') {
            return window.location.href = 'diretor/'; 
        }
        if (user && user.role === 'professor') {
            return window.location.href = 'professor/'; 
        }
        if (user && user.role === 'aluno') {
            return window.location.href = 'aluno/boletim'; 
        }
        if (user && user.role === 'responsavel') {
            return window.location.href = 'responsavel/'; 
        }
        
    }
}