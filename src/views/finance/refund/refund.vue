<style lang="less" scoped>
  .refund{
    .f_card{
      margin: 20px 0;
    }

    .form_wrap {
      .text-right{
        text-align: right;
      }
    }

    .page {
      margin: 10px 0;
      text-align: right;
      padding-right: 18px;
    }
  }
</style>

<template>
  <div class="refund">
    <Card dis-hover class="f_card">
      <span slot="title">退款搜索</span>
      <div class="form_wrap">
        <Form ref="refund_form" :model="formValue" :label-width="100">
          <Row type="flex" justify="space-between">
            <i-Col span="7">
              <FormItem label="支付方式："  prop="payType">
                <Select v-model="formValue.payType">
                  <Option v-for="item in payTypes" :key="item.value" :value="item.value">{{item.desc}}</Option>
                </Select>
              </FormItem>
            </i-Col>
            <i-Col span="7">
              <Row>
                <i-Col span="5">
                  <Select  v-model="formValue.timeStatus">
                    <Option v-for="item in timeTypes" :value="item.value" :key="item.value">{{item.label}}</Option>
                  </Select>
                </i-Col>
                <i-Col span="19">
                  <DatePicker type="daterange"  placeholder="请选择" v-model="dateArr" style="width: 100%;"></DatePicker>
                </i-Col>
              </Row>
            </i-Col>
            <i-Col span="7">
              <FormItem label="账号："  prop="accountNo">
                <i-Input class='item_control' v-model="formValue.accountNo"></i-Input>
              </FormItem>
            </i-Col>
            <i-Col span="7">
              <FormItem label="到账金额：" >
                <i-Col span="11">
                  <i-Input  placeholder="最小金额" v-model="formValue.totalAmoutMin"></i-Input>
                </i-Col>
                <i-Col span="2" class="text-center">--</i-Col>
                <i-Col span="11">
                  <i-Input  placeholder="最大金额" v-model="formValue.totalAmoutMax"></i-Input>
                </i-Col>
              </FormItem>
            </i-Col>
            <i-Col span="7">
              <FormItem label="交易流水号："  prop="transferNo">
                <i-Input class='item_control' v-model="formValue.transferNo"></i-Input>
              </FormItem>
            </i-Col>
            <i-Col span="7">
              <FormItem label="来源(户名)："  prop="transferFrom">
                <i-Input class='item_control' v-model="formValue.transferFrom"></i-Input>
              </FormItem>
            </i-Col>
            <i-Col span="7">
              <FormItem label="状态："  prop="auditStatus">
                <Select v-model="formValue.auditStatus">
                  <Option v-for="item in status" :value="item.value" :key="item.value">{{item.label}}</Option>
                </Select>
              </FormItem>
            </i-Col>
            <i-Col span="24" class="text-right">
              <ButtonGroup>
                <Button type="primary" @click="onSearch">查询</Button>
                <Button @click="onReset">重置</Button>
              </ButtonGroup>
            </i-Col>
          </Row>
        </Form>
      </div>
    </Card>


    <Card :bordered="false" dis-hover>
      <span slot="title">退款审核列表</span>
      <div class="table">
        <Table stripe :columns="columns" :data="refundList" :loading="loading">
          <div class="page" slot="footer">
            <Page :page-size="formValue.pageSize" :current="formValue.pageNum" :total="total" show-elevator show-total show-sizer @on-change="onPageChange" @on-page-size-change="onPageSizeChange" />
          </div>
        </Table>
      </div>
    </Card>
  </div>
</template>

<script>
  import axios from 'axios';
  import RefundServe from 'services/finance/refund.service';
  import { endOfDay, getTime, startOfMonth, endOfMonth } from 'date-fns';
  export default {
      name: "refund",
      data() {
          return {
              loading: false,
              refundList: [],
              total: 0,
              payTypes: [],
              dateArr: [],
              columns: [
                  {
                      key: "id",
                      title: "序号",
                      align: "center",
                      minWidth: 90
                  },
                  {
                      key: "payTypeDesc",
                      align: "center",
                      title: "支付方式",
                      minWidth: 100
                  },
                  {
                      key: "transferNo",
                      align: "center",
                      title: "交易流水号",
                      minWidth: 180
                  },
                  {
                      key: "accountTypeDesc",
                      align: "center",
                      title: "账户类型",
                      minWidth: 100
                  },
                  {
                      key: "accountNo",
                      align: "center",
                      title: "账号",
                      minWidth: 180
                  },
                  {
                      key: "transferFrom",
                      align: "center",
                      title: "来源(户名)",
                      minWidth: 180
                  },
                  {
                      key: "note",
                      align: "center",
                      title: "备注",
                      minWidth: 200,
                      ellipsis: true,
                      render: (h, params) => {
                          return h('Tooltip', {
                              props: { placement: 'top' }
                          }, [
                              params.row.note.length > 12 ? params.row.note.slice(0, 12) + "..." : params.row.note,
                              h('span', { slot: 'content', style: { whiteSpace: 'normal', wordBreak: 'break-all' } }, params.row.note)
                          ]);
                      }
                  },
                  {
                      key: "totalAmout",
                      align: "center",
                      title: "到账金额",
                      minWidth: 100,
                      render: (h, data) => {
                          return h('div', [
                              h('span', {}, data.row.totalAmout)
                          ])
                      }
                  },
                  {
                      key: "refundAmount",
                      align: "center",
                      title: "退款金额",
                      minWidth: 100,
                      render: (h, data) => {
                          return h('div', [
                              h('span', {}, data.row.refundAmount)
                          ])
                      }
                  },
                  {
                      key: "recognableAmount",
                      align: "center",
                      title: "可认账金额",
                      minWidth: 100,
                      render: (h, data) => {
                          return h('div', [
                              h('span', {}, data.row.recognableAmount)
                          ])
                      }
                  },
                  {
                      key: "currentRefundAmount",
                      align: "center",
                      title: "本次退款金额",
                      minWidth: 120,
                      render: (h, data) => {
                          return h('div', [
                              h('span', {}, data.row.currentRefundAmount)
                          ])
                      }
                  },
                  {
                      key: "transferTime",
                      align: "center",
                      title: "到账时间",
                      minWidth: 150
                  },
                  {
                      key: "createTime",
                      align: "center",
                      title: "导入时间",
                      minWidth: 150
                  },
                  {
                      key: "creatorName",
                      align: "center",
                      title: "导入人",
                      minWidth: 80
                  },
                  {
                      key: "auditor",
                      align: "center",
                      title: "审核人",
                      minWidth: 80
                  },
                  {
                      key: "auditStatusDesc",
                      align: "center",
                      title: "状态",
                      minWidth: 80
                  },
                  {
                      title: "操作",
                      align: "center",
                      minWidth: 150,
                      fixed: 'right',
                      render: (h, data) => {
                          return h("div", [
                              h(
                                  "span",
                                  {
                                      style: {
                                          display: data.row.auditStatus === 0 ? 'inline-block' : 'none',
                                          marginRight: "8px",
                                          color: "blue",
                                          textDecoration: "underline",
                                          cursor: "pointer"
                                      },
                                      on: {
                                          click: () => {
                                              this.$router.push({ name: 'refundDetail', params: { applyId: data.row.refundApplyId }, query: { type: 'check' } });
                                          }
                                      }
                                  },
                                  "审核"
                              ),
                              h(
                                  "span",
                                  {
                                      style: {
                                          marginRight: "8px",
                                          color: "blue",
                                          textDecoration: "underline",
                                          cursor: "pointer"
                                      },
                                      on: {
                                          click: () => {
                                              this.$router.push({ name: 'refundDetail', params: { applyId: data.row.refundApplyId } });
                                          }
                                      }
                                  },
                                  "查看"
                              )
                          ]);
                      }
                  }
              ],
              formValue: {
                  payType: '',                    // 支付方式
                  timeStatus: 0,                  // 时间类型
                  transferStartTime: '',         // 到账开始时间
                  transferEndTime: '',           // 到账结束时间
                  accountNo: '',                 // 账号
                  totalAmoutMin: '',             // 到账金额最小值
                  totalAmoutMax: '',             // 到账金额最大值
                  transferNo: '',             // 交易流水号
                  transferFrom: '',             // 来源
                  auditStatus: 0,             // 状态
                  pageNum: 1,
                  pageSize: 10,
                  sign: ''
              },

              // 时间类型
              timeTypes: [
                  {
                      value: 0,
                      label: "到账时间"
                  },
                  {
                      value: 1,
                      label: "导入时间"
                  }
              ],

              // 状态
              status: [
                  {
                      value: 0,
                      label: "待审核"
                  },
                  {
                      value: 1,
                      label: "已审核"
                  },
                  {
                      value: 2,
                      label: "驳回"
                  }
              ]
          }
      },
      created() {
          this.loading = true;
          this.dateArr = [startOfMonth(Date.now()), endOfMonth(Date.now())];
          this._initDatas();
      },

      methods: {
          onSearch() {
              this.loading = true;
              this.formValue.pageNum = 1;
              this._getRefundList();
          },
          onPageSizeChange(pageSize){
              this.formValue.pageNum = 1;
              this.formValue.pageSize = pageSize;
              this.loading = true;
              this._getRefundList();
          },
          onPageChange(page){
              this.formValue.pageNum = page;
              this.loading = true;
              this._getRefundList();
          },

          onReset() {
              this.$refs['refund_form'].resetFields();
              this.formValue.totalAmoutMin = this.formValue.totalAmoutMax = '';
              this.dateArr = [];
              this.formValue.transferStartTime = this.formValue.transferEndTime = '';
          },
          _initDatas() {
              axios.all([
                  this._getPayTypes(),
                  this._getRefundList(true)
              ]).then(axios.spread((payTypes, refundList) => {
                  this.payTypes = payTypes;
                  this.total = refundList.total;
                  this.refundList = refundList.list || [];
                  this.loading = false;
              }));
          },

          _getPayTypes() {
              return RefundServe.getPayTypes();
          },
          _getRefundList(init = false) {
              if (!this.dateArr[0] || !this.dateArr[1]) {
                  this.formValue.transferStartTime = this.formValue.transferEndTime = '';
              }else {
                  this.formValue.transferStartTime = +this.dateArr[0];
//                  this.formValue.transferEndTime = +(endOfDay(this.dateArr[1]));
                  this.formValue.transferEndTime = getTime(endOfDay(this.dateArr[1]));
              }


              if (init) {
                  return RefundServe.getRefundList(this.formValue);
              }else {
                  RefundServe.getRefundList(this.formValue).then(res => {
                      this.total = res.total;
                      this.refundList = res.list || [];
                      this.loading = false;
                  });
              }
          }
      }
  };
</script>
