import axios from 'axios';

class LoginService {
    constructor(){
        this.PORT = 8001;
        this.base_url = `http://192.168.0.12:${this.PORT}/`;
        // TODO: move to an ENV or config.json
    }

    userLogin(nickname, success,fail) {
        axios.get(`${this.base_url}login/${nickname}`,{withCredentials:true})
        .then(
            (response) => {success(response)}
            ,(error) => {fail(error)})
        .catch((error) => {fail(error)})
    } 

    userLogout(userMessage, success,fail) {
        axios.post(`${this.base_url}logout`,userMessage,{withCredentials:true})
        .then(
            (response) => {success(response)}
            ,(error) => {fail(error)})
        .catch((error) => {fail(error)})
    }
}

export default LoginService;