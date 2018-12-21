<template>
  <Modal v-model="showModal" :title="modalTitle" width="750" @on-ok="onOk" @on-visible-change="visibleChange">
    <Form ref="phoneMapModal_form" :label-width="150" :model="formValue" :rules="ruleValidate">
      <FormItem label="使用人员" prop="employeeId">
        <Select
          filterable
          remote
          label-in-value
          v-model="formValue.employeeId"
          :remote-method="remoteMethod"
          :loading="loading"
          @on-change="onSelectChange">
          <Option v-for="item in employees" :value="item.value" :key="item.value">{{item.label}}</Option>
        </Select>
      </FormItem>


      <FormItem label="钢联管理员ID" prop="glAdminId">
        <i-Input class="search-input" placeholder="请输入钢联管理员ID" v-model.trim.number="formValue.glAdminId"></i-Input>
      </FormItem>
      <FormItem label="电话号码" prop="telephoneNumber">
        <i-Input class="search-input" placeholder="请输入电话" v-model.trim="formValue.telephoneNumber"></i-Input>
      </FormItem>
      <FormItem label="座机短号" prop="telephoneShortNumber">
        <i-Input class="search-input" placeholder="请输入座机短号" v-model.trim="formValue.telephoneShortNumber"></i-Input>
      </FormItem>
    </Form>
    <div slot="footer">
      <Button @click="onCancel">取消</Button>
      <Button type="primary" @click="onOk">确定</Button>
    </div>
  </Modal>
</template>

<script>
    import PhoneMapServe from 'services/phone/phoneMap.service';
  export default {
    name: "phoneMapModal",
    props: {
      showPhoneMapModal: {
        type: Boolean,
        default: false
      },
      modalType: {
        type: String,
        detault: 'save'
      },
      phoneInfo: Object
    },
    data() {
      return {
        showModal: false,

        // 远程搜索
        loading: false,
        employees: [],
//        employeeName: '',

        formValue: {
          id: '',
          employeeId: '',
          glAdminId: '',
          employeeName: '',
          telephoneNumber: '',
          telephoneShortNumber: ''
        },
        ruleValidate: {
        /*  employeeId: [
            { required: true, message: '请选择员工', trigger: 'change' }
          ],*/
          glAdminId: [
            { required: true, type: 'number', message: '此项必填', trigger: 'blur' }
          ],
          telephoneNumber: [
            { required: true, message: '此项必填', trigger: 'blur' }
          ],
          telephoneShortNumber: [
            { required: true, message: '此项必填', trigger: 'blur' }
          ]
        }
      }
    },
    computed: {
      modalTitle() {
        return this.modalType === 'save' ? '新增话机' : '修改话机';
      }
    },
    watch: {
      showPhoneMapModal(newVal) {
        if (this.modalType === 'save') {
          this.$refs['phoneMapModal_form'].resetFields();
          this.formValue.id = '';
        }
        this.showModal = newVal;
      },
      phoneInfo(newVal){
        if(newVal){
          for(const attr in this.formValue){
            let item = newVal[attr];
            if (item) {
              this.formValue[attr] = item;
            }
          }
        }
      },

      'formValue': {
        handler(newVal) {
          if (this.modalType === 'save') return;
          if (!newVal.employeeId) {
            this.formValue.employeeId = this.phoneInfo['employeeId'];
          }
        },
        deep: true
      }
    },
    methods: {
      onOk(){
        this.$refs['phoneMapModal_form'].validate(valid => {
          if (!this.formValue['employeeId']) {
            this.$Modal.warning({
              title: '请选择一位员工'
            });
            return;
          }
          if (valid) {
            this.$emit(this.modalType, this.formValue);
          }
        });
      },
      onCancel(){
        this.visibleChange(false);
      },
      visibleChange(status){
        /* if (!status) {
           this.$refs['phoneMapModal_form'].resetFields();
           this.formValue.id = '';
         }*/
//        this.showModal = false;
        if (!status) {
          this.$emit('visible-change', status);
        }
      },


      remoteMethod(keyword) {
        let searchWord = null;
        if (Number(keyword) === this.formValue.employeeId) {
          searchWord = this.formValue.employeeName;
        }else {
          searchWord = keyword;
        }
        const index = searchWord.indexOf('(');
        if (index !== -1) {
          searchWord = searchWord.slice(0, index);
        }

        if (searchWord) {
          this.loading = true;
          this.getEmployees(searchWord);
        } else {
          this.employeeNameList = [];
        }
      },

      onSelectChange(employee){
        if (employee) {
          this.formValue.employeeName = employee.label;
        }
      },

      // 获取员工集合
      getEmployees(name = ''){
          PhoneMapServe.searchEmployees(name).then(res => {
              this.employees = res;
              this.loading = false;
          });
      }
    }
  };
</script>
