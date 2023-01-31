import axios from 'axios';
import GLOBAL_CONFIG from '../Config';

const link = GLOBAL_CONFIG.internalAPISource;

export const getPaginatedCities = (page, size, search, callback) =>{
    axios.post(link+'api/cities/', {
        page: page,
        size: size,
        search: search
    },{withCredentials: "true"}).then((response) => {
            if (typeof callback == typeof (() => {})) callback(response.data);
        })
        .catch(() => {
           alert("Could not load any data");
        });;
}

export const updateCity = (id, name, photo, callback) =>{
    axios.put(link+'api/cities/edit', {
        id: id,
        name: name,
        photo: photo
    },{withCredentials: "true"}).then(() => {
            if (typeof callback == typeof (() => {})) callback();
        })
        .catch(() => {
           alert("Could not update city");
        });;
}