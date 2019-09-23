import axios from 'axios';

let MyHttpServer =  {};
MyHttpServer.install = Vue => {
    axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/';
    axios.interceptors.response.use(res => {
        return res.data;
    })
    Vue.prototype.$http = axios;
}

export default MyHttpServer;