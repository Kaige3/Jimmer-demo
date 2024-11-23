<template>
  <div class="address-list-page">
    <!-- 引入地址选择组件 -->
    <address-row
    class="address"
    :key="address.id"
    :address="address"
    v-for="address in addressList"
    @Longpress="showActionSheet(address)"
    >
      <template #operation>
        <div class="operations">
          <Del class="delete" @click="handleDelete(address.id)"></Del>
          <edit class="edit" @click="switchPage('/pages/address/address-save?id=${address.id}')"></edit>
        </div>
      </template>
    </address-row>
     <!-- 底部添加新增收获地址 -->
    <div class="add-address" @click="switchPage('/pages/address/address-save')">
      <div class="btn">
        <plus></plus>
        添加收获地址
      </div>
    </div>
      <!-- 长按 弹出选项框 -->
       <nut-action-sheet
       :v-model:visible="show"
       :menu-items="actions"
       >
       </nut-action-sheet>
  </div>
</template>

<script setup lang="ts">
import { switchPage } from '@/utils/common';
import { Edit, Del, Plus } from "@nutui/icons-vue-taro";
import { ref } from 'vue'
import { Address } from '@nutui/nutui-taro';
import { AddressDto } from "@/apis/__generated/model/dto"
import Taro from '@tarojs/taro';
import { api } from '@/utils/api-instance';
import addressRow from '@/components/address/address-row.vue';
const show = ref(false);
const actions = [{name:"赋值地址"},{name:"设为默认"}]

const activeAddress = ref({} as AddressDto["AddressRepository/SIMPLE_FETCHER"])

// const addressList = ref<AddressDto["AddressRepository/SIMPLE_FETCHER"][]>([]);

const handleDelete=(id:string)=>{
  // const index = addressList.value.findIndex(item => item.id === value);
  // if (index !== -1) {
  //   addressList.value.splice(index, 1);
  // }
  Taro.showModal({
    title:"是否确认删除",
    showCancel:true,
    success:({confirm})=>{
      if(confirm){
        api.addressController.delete({body:[id]}).then(()=>{
          loadData();
        })
      }
    }
  })
}

//   const addressList = ref([
//   {
//     id: "1",
//     createdTime: "2024-01-01T12:00:00Z",
//     editedTime: "2024-01-01T12:00:00Z",
//     latitude: 39.9042,
//     longitude: 116.4074,
//     address: "北京市朝阳区建国门外大街1号",
//     details: "北京朝阳区某商业大厦A座",
//     province: "北京",
//     city: "北京",
//     district: "朝阳区",
//     phoneNumber: "13800138000",
//     realName: "张三",
//     top: true
//   },
//   {
//     id: "2",
//     createdTime: "2024-02-01T12:00:00Z",
//     editedTime: "2024-02-01T12:00:00Z",
//     latitude: 31.2304,
//     longitude: 121.4737,
//     address: "上海市浦东新区陆家嘴金融街101号",
//     details: "上海浦东新区某大厦",
//     province: "上海",
//     city: "上海",
//     district: "浦东新区",
//     phoneNumber: "13900139000",
//     realName: "李四",
//     top: false
//   },
//   {
//     id: "3",
//     createdTime: "2024-03-01T12:00:00Z",
//     editedTime: "2024-03-01T12:00:00Z",
//     latitude: 23.1291,
//     longitude: 113.2644,
//     address: "广州市天河区体育东路123号",
//     details: "广州市天汇大厦",
//     province: "广东",
//     city: "广州",
//     district: "天河区",
//     phoneNumber: "13700137000",
//     realName: "王五",
//     top: false
//   }
// ]);

// 打印查看结果
// console.log(addressList);

const addressList = ref<AddressDto["AddressRepository/SIMPLE_FETCHER"][]>()

const loadData = ()=>{
  api.addressController.getUserAddress().then((res)=>{
    addressList.value = res;
  })
}
Taro.useDidShow(()=>{
  loadData();
})
// 菜单操作
const actionMap = {
  ["复制地址"]:()=>{
    const address = activeAddress.value;
    const value = `收件人:${address.realName}\n手机号:${address.phoneNumber}\n详细地址:${address.address} ${address.details}`
    Taro.setClipboardData({ data:value})
  },
  ["设置为默认"]:()=>{
    api.addressController.top({id:activeAddress.value.id}).then(()=>{
      loadData();
    })
  }
}
const showActionSheet = (value:AddressDto['AddressRepository/SIMPLE_FETCHER']) =>{
  activeAddress.value= value;
  show.value = true;
}




</script>

<style lang="scss">
page {
  background-color: #f5f5f5;
}
.address-list-page{
    .operations{
      display: flex;
      justify-content: center;
    }
    .edit{
      margin-left: 20px;
    }
    .add-address{
      border-top: 1px solid rgba($color: #000000, $alpha: 0.05);
      box-shadow: 10rpx -10rpx 10rpx rgba($color: #000000, $alpha: 0.05);
      position: fixed;
      bottom: 0;
      width: 100%;
      padding: 30rpx 0 60rpx 0;
      .btn{
        margin: auto;
        justify-content: center;
        align-items: center;
        display: flex;
        background-image: linear-gradient(#fcd956, #f5d131);
        width: 600rpx;
        padding: 20rpx 0;
        border-radius: 10rpx;
      }
    }

}
</style>

