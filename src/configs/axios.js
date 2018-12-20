import axios from 'axios';
axios.defaults.withCredentials = true;

axios.interceptors.response.use(function (response) {
    changePage(response.data.status);
    return response;
}, function (error) {
    console.error(error);
    changePage(error.response.status);
    return Promise.reject(error);
});


const baseUrl = 'https://mgt.oilchem.net';
function changePage(status) {
    switch (status) {
        case 0:
            window.location.href = baseUrl + '/login/login.htm';
            break;
    }
}