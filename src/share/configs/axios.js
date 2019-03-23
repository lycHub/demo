import axios from 'axios';
const baseUrl = 'https://mgt.oilchem.net';

// create an axios instance
const service = axios.create({
    // 各种公共配置
    timeout: 5000,
    withCredentials: true
    /*headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }*/
});


// response interceptor
service.interceptors.response.use(function (response) {
    // 请求成功，http状态码200
    changePage(response.data.status);
    return response;
}, function (error) {
    // 请求失败，500，404，502...
    console.error(error);
    changePage(error.response.status);
    return Promise.reject(error);
});


function changePage(status) {
    switch (status) {
        case 0:
            window.location.href = baseUrl + '/login/login.htm';
            break;
    }
}
export default service;