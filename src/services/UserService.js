import axios from "axios";

const url = "http://localhost:5000/"
export default class UserService {

    static login(body){
        return axios.post(url + "auth/login", body)
    }

    static registration(body){
        return axios.post(url + "auth/registration", body)
    }

    static auth(){
        return axios.get(url + 'auth', {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}})
    }

    static getCurrentUser(id){
        return axios.get(url + `users/currentUser/${id}`)
    }

}