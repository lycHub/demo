import {startOfMonth, endOfMonth, getTime} from 'date-fns';

const state = {
    caches: {
        refund: {
            payType: '',                    // 支付方式
            timeStatus: 0,                  // 时间类型
            transferStartTime: getTime(startOfMonth(Date.now())),         // 到账开始时间
            transferEndTime: getTime(endOfMonth(Date.now())),           // 到账结束时间
            accountNo: '',                 // 账号
            totalAmoutMin: '',             // 到账金额最小值
            totalAmoutMax: '',             // 到账金额最大值
            transferNo: '',             // 交易流水号
            transferFrom: '',             // 来源
            auditStatus: 0,             // 状态
            pageNum: 1,
            pageSize: 10,
            sign: ''
        }
    }
}

export default state