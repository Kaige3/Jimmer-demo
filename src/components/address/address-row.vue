<template>
  <div class="address-row">
    <div class="address-info">
      <!-- 详细地址，门牌号 -->
      <div class="details">{{ address.address +" " + address.details}}</div>
      <div class="connector">
        <!-- 左边的姓名 -->
        <div class="real-name">{{address.realName}}</div>
        <!-- 右边的电话 -->
         <div class="phone-number"> {{ address.phoneNumber }}</div>
         <!-- 是否勾选默认 -->
          <div class="is-default" v-if="address.top">
            <nut-tag type="primary" plain> 默认</nut-tag>
          </div>
      </div>
    </div>
    <slot name="operation"></slot>
  </div>
</template>

<script setup lang="ts">
import { AddressDto } from '@/apis/__generated/model/dto';
// 接收父组件传递的信息
// defineProps<{
//   address:AddressDto["AddressRepository/SIMPLE_FETCHER"]
// }>();
defineProps<{ address: AddressDto["AddressRepository/SIMPLE_FETCHER"] }>();

</script>

<style lang="scss">
.address-row{
  background-color: white;
  padding: 30rpx;
  display: flex;
  align-items: center;
  .address-info{
    width: 600rpx;
    .details{
      font-size: 34px;
      font-weight: bold;
    }
    .connector{
    padding-top: 10px;
    display: flex;
    align-items: center;
    .real-name{
      font-size: 30px;
      margin-right: 20px;
    }
    .phone-number{
      font-size: 30px;
    }
    .is-default{
      margin-bottom: 10rpx;
      margin-left: 20px;
    }
  }
  }

}


</style>
