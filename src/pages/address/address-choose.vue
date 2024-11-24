<template>
  <div class="address-choose">
    <nut-popup
    :visible="visible2"
    @update:visible="(value)=>emit('update:visible2',value)"
    position="bottom"
    closeable
    round1
    >
    <div class="address-wrapper"
    :key="address.id"
    v-for="address in addressList"
    @click="handleChoose(address)"
    >
      <check color="red" v-if="address.id == chooseAddress.id"></check>
      <Location2 color="red" v-else></Location2>
      <address-row class="address" :address="address"></address-row>
    </div>
    </nut-popup>
  </div>
</template>

<script setup lang="ts">
import { Check,Location2 } from "@nutui/icons-vue-taro"


import addressRow from "@/components/address/address-row.vue";
import { AddressDto } from "@/apis/__generated/model/dto";
import { ref } from 'vue';
import { api } from "@/utils/api-instance";
import Taro from "@tarojs/taro";
type SimpleAddressDto = AddressDto["AddressRepository/SIMPLE_FETCHER"];
// 父组件控制显示
defineProps<{
  visible2:boolean
}>();
// 只能在vue3.4+ 中使用
// const emit = defineModel<{ visible: boolean ,address:SimpleAddressDto}>();
// let visible = emit.value?.visible;
// let addressModel = emit.value?.address;

// 定义父组件需要监听的事件
const emit = defineEmits<{
  "update:visible2":[value:boolean];
  choose: [address:SimpleAddressDto]
}>();

const addressList = ref<SimpleAddressDto[]>([]);
const chooseAddress = ref({} as SimpleAddressDto);

// 获取addressList
Taro.useLoad(()=>{
  api.addressController.getUserAddress().then((res)=>{
    addressList.value = res;
    if(res.length>0){
      // 默认选中第一个地址
      chooseAddress.value = res[0];
      emit( "choose",res[0]);
    }
  })
})

const handleChoose = (address:SimpleAddressDto)=>{
  chooseAddress.value = address
  emit("update:visible2",false);
  emit("choose",address);
}
</script>

<style>

</style>
