import axios from 'axios';
import GLOBAL_CONFIG from '../Config';

const link = GLOBAL_CONFIG.internalAPISource;

export const logIn = (username, password, callback) =>{
    var formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);

    axios.post(link+'login', formData, {withCredentials: "true"})
        .then((response) => {
            callback(response.data);
        })
        .catch(() => {
           alert("Could not log in");
        });;
}

export const checkIn = (callback) =>{
    axios.post(link+'api/roles', "no data", {withCredentials: "true"})
        .then((response) => {
            callback(response.data);
        })
        .catch(() => {
            callback();
        });;
}

export const logOut =(callback) =>{
    axios.post(link+"logout", "no data", {withCredentials: "true"})
    .then(callback).catch(callback);

}