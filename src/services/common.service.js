import request from 'share/configs/axios';

export default class CommonService {
    // 获取支付类型
    getPayTypes() {
        return new Promise(resolve => {
            request.get('/finance/common/select', {
                params: {
                    type: "PayTypeEnum",
                    timestamp: +new Date()
                }
            }).then(res => {
                resolve(res.data.response);
            });
        });
    }


    // 搜索员工
    searchEmployees(name) {
        return new Promise(resolve => {
            request.get('/callcenter/call-center/callblacklist/select_employee', {
                params: { name }
            }).then(res => {
                if (res.data.response) {
                    resolve(JSON.parse(res.data.response).map(item => {
                        return {
                            value: item.id,
                            label: item.text
                        };
                    }));
                }
            });
        });
    }
}