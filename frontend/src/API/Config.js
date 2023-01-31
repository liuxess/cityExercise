import axios from 'axios';

const GLOBAL_CONFIG = {
    internalAPISource: 'http://localhost:8080/'
};

axios.defaults.headers.common["Accept"] = 'application/json';

export default GLOBAL_CONFIG;