import axios from 'axios';
import CommonService from '../common.service';
class PhoneMapServe extends CommonService {
    // 单例
    static singleInstance(){
        if (!PhoneMapServe.instance) {
            PhoneMapServe.instance = new PhoneMapServe();
        }
        return PhoneMapServe.instance;
    }

    constructor() {
        super();
        this.uri = '/callcenter/callemployeemapping/';
    }

    // 获取列表数据
    getListPage(params) {
        return new Promise((resolve, reject) => {
            axios.post(this.uri + 'list_page', params).then(res => {
                if (res.data.response) {
                    resolve({
                        total: res.data.response.total,
                        list: res.data.response.list
                    });
                }else {
                    reject('无列表数据');
                }
            });
        });
    }

    // 新增修改删除话机映射
    operatePhoneMap(type, params) {
        return new Promise(resolve => {
            axios.post(this.uri + type, params).then(res => {
                resolve(res.data);
            })
        });
    }
}

export default PhoneMapServe.singleInstance();