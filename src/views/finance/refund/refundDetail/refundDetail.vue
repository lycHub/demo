<style lang="less" scoped>
  .refund-detail{
    position: relative;

    .f_card{
      margin: 20px 0;

      .infoTable {
        border: 1px solid rgb(187, 187, 187);
        border-collapse: collapse;
        width: 100%;

        td {
          border: 1px solid rgb(187, 187, 187);
          text-align: center;
          padding: 15px 0;
          &.bac {
            background-color: #eee;
            width:300px;
          }
        }
      }


      span{
        font-size: 16px;
        color: #000;
      }
      .info_wrap{
        width: 1300px;
        margin: 0 auto;

        .checkInfo{
          margin: 30px 0;
        }

        .approval .detail{
          width: 100px;
          margin: 30px auto 0 auto;
        }
        .approval .btns{
          width: 320px;
          margin: 30px auto 0 auto;
        }
      }
    }
  }
</style>

<template>
  <div class="refund-detail">
    <Card dis-hover class="f_card">
      <span slot="title">到账信息</span>
      <Row>
        <i-Col span="24">
          <table class="infoTable" >
            <tr>
              <td class="bac">支付方式</td>
              <td>{{refundInfo.payTypeDesc}}</td>
              <td class="bac">账户类型</td>
              <td>{{refundInfo.accountTypeDesc}}</td>
            </tr>
            <tr>
              <td class="bac">交易流水号</td>
              <td>{{refundInfo.transferNo}}</td>
              <td class="bac">来源（支付/支付人信息）</td>
              <td>{{refundInfo.transferFrom}}</td>
            </tr>
            <tr>
              <td class="bac">开户行</td>
              <td>{{refundInfo.depositFrom}}</td>
              <td class="bac">备注</td>
              <td>{{refundInfo.note}}</td>
            </tr>
            <tr>
              <td class="bac">打款账号</td>
              <td>{{refundInfo.accountNo}}</td>
              <td class="bac">到账时间</td>
              <td>{{refundInfo.transferTime}}</td>
            </tr>
            <tr>
              <td class="bac">到账金额</td>
              <td>{{refundInfo.totalAmout}}</td>
              <td class="bac">退款总金额</td>
              <td>{{refundInfo.refundAmount}}</td>
            </tr>
          </table>
        </i-Col>
      </Row>
    </Card>

    <Card dis-hover class="f_card">
      <span slot="title">审核信息</span>
      <div class="info_wrap">
        <div class="steps">
          <Steps :current="currentStep">
            <Step v-for="(item, index) in steps" :key='index' :title="item.role" :content="item.admin" ></Step>
            <!--<Step title="退款成功" content="系统自动" ></Step>-->
          </Steps>
        </div>

        <div class="checkInfo">
          <Table :columns="columns" :data="records"></Table>
        </div>

        <div class="approval" v-if="isCheck">
          <i-Input type="textarea" :rows="4" placeholder="审批意见" v-model="checkNote" />
          <div class="btns">
            <ButtonGroup>
              <Button type="primary" size="large" @click="checkOperate('resolve')">通过</Button>
              <Button type="error" size="large" @click="checkOperate()" >驳回</Button>
              <Button size="large" @click="goBack" >返回</Button>
            </ButtonGroup>
          </div>
        </div>

        <div class="approval" v-else>
          <div class="detail">
            <Button size="large" @click="goBack">返回</Button>
          </div>
        </div>
      </div>
    </Card>
    <Spin fix v-show="showSpin"></Spin>
  </div>
</template>

<script>
  import axios from 'axios';
  import RefundServe from 'services/finance/refund.service';

  export default {
      name: "refundDetail",
      props: ['applyId'],
      data() {
          return {
              showSpin: false,
              refundInfo: {},
              records: [],
              auditProcess: {},
              currentStep: -1,
              steps: [],
              checkNote: '',
              columns: [
                  {
                      title: '审批时间',
                      key: 'auditTime',
                      width: 180
                  },
                  {
                      title: '审批人',
                      key: 'auditor',
                      width: 180
                  },
                  {
                      title: '审批意见',
                      key: 'content'
                  }
              ]
          }
      },
      created() {
          this.showSpin = true;
          this._initDatas();
      },
      computed: {
          isCheck() {
              return this.$route.query.type === 'check'
          }
      },
      methods: {
          goBack() {
              this.$router.push({ name: 'refund' });
          },

          checkOperate(operate) {
              const type = operate === 'resolve' ? '通过' : '驳回';

              this.$Modal.confirm({
                  title: '确定' + type + '?',
                  onOk: () => {
                      this.showSpin = true;
                      RefundServe.refundOperate({
                          applyId: this.applyId,
                          opinion: this.checkNote,
                          result: operate === 'resolve' ? 1 : 0
                      }).then(res => {
                          this.showSpin = false;
                          if (res.response) {
                              this.$Notice.success({
                                  title: type + '成功'
                              });
                              this.goBack();
                          }else {
                              this.$Notice.error({
                                  title: res.message
                              });
                          }
                      });
                  }
              })
          },

          _initDatas() {
              axios.all([
                  RefundServe.getRefundDetail(this.applyId),
                  RefundServe.getRefundRecords(this.applyId),
                  RefundServe.getRefundProcess(this.applyId)
              ]).then(axios.spread((detail, records, process) => {
                  if (detail) {
                      this.refundInfo = detail;
                  }
                  if (records) {
                      this.records = records;
                  }
                  if (process) {
                      this.steps = process;
                      const currentIndex = this.steps.findIndex(item => !item.audited);
                      this.currentStep = currentIndex === -1 ? this.steps.length : currentIndex;
                  }
                  this.showSpin = false;
              }))
          }
      }
  };
</script>
