import axios from 'axios';
import CommonService from '../common.service';
import {isEmptyObj} from "../../share/utils/tools";

class RefundServe extends CommonService {
    // 单例
    static singleInstance(){
        if (!RefundServe.instance) {
            RefundServe.instance = new RefundServe();
        }
        return RefundServe.instance;
    }

    constructor() {
        super();
        this.uri = '/finance/account_transfer/';
    }

    // 获取列表数据
    getRefundList(params) {
        return new Promise((resolve, reject) => {
            axios.get(this.uri + 'list_refund_page', {
                params: {
                    ...params,
                    v: Math.random() * 1000
                }
            }).then(res => {
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


    // 到账退款详情
    getRefundDetail(applyId) {
        return new Promise(resolve => {
            axios.get(this.uri + 'transfer_refund_audit_info', {
                params: {
                    applyId,
                    v: Math.random() * 1000
                }
            }).then(res => {
                resolve(res.data.response);
            });
        });
    }

    // 到账退款流程
    getRefundProcess(id) {
        return new Promise((resolve, reject) => {
            axios.get(this.uri + 'audit_flow', {
                params: {
                    id,
                    v: Math.random() * 1000
                }
            }).then(res => {
                if (!res.data.response || isEmptyObj(res.data.response.taskMap)) {
                    reject('无流程数据');
                }else {
                    resolve(this._editProcess(res.data.response.taskMap));
                }
            });
        });
    }


    // 到账退款记录
    getRefundRecords(id) {
        return new Promise(resolve => {
            axios.get(this.uri + 'audit_log', {
                params: {
                    id,
                    v: Math.random() * 1000
                }
            }).then(res => {
                resolve(res.data.response);
            });
        });
    }

    // 到账退款审核或驳回
    refundOperate(params) {
        return new Promise(resolve => {
            axios.get(this.uri + 'transfer_refund_audit', {
                params: {
                    ...params,
                    v: Math.random() * 1000
                }
            }).then(res => {
                resolve(res.data);
            });
        });
    }

    _editProcess(process) {
        let len = 0;
        for (const attr in process) {
            if (process.hasOwnProperty(attr)) len++;
        }

        const steps = [process.start];
        for(let a = 0; a < len; a++) {
            if(steps[a] && steps[a].hasOwnProperty('nexts')){
                if (steps[a].nexts) {
                    const attr = steps[a].nexts[0].id;
                    if (process[attr]) {
                        steps.push(process[attr]);
                    }
                }
            }
        }

        return steps.concat({
            role: '退款成功',
            admin: '系统自动'
        });
    }
}

export default RefundServe.singleInstance();