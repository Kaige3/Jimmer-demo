<template>
  <div class="order-submit">
    <div class="address" v-if="address">
      <nut-cell is-link center @click="addressChooseVisible = true">
        <!-- 左侧图标 -->
        <template #icon>
          <Location2
          color="red"
          size="20"
          style="margin-right:10px"
          >
          </Location2>
        </template>
        <!-- 中间地址 -->
        <template #title>
          <address-row :address="address"
          ></address-row>
        </template>
        <!-- 尾部图标 -->
        <template #link>
          <rect-right></rect-right>
        </template>
      </nut-cell>
    </div>
    <!-- 选择地址 -->
     <!-- <address-row
     v-model:visible="visible"
     v-model:address="address!"
     >
     </address-row> -->
     <address-choose
     v-model:visible2="addressChooseVisible"
     @choose="handleAddressChose"
     >

     </address-choose>
    <!-- 渲染商品列表 -->
    <div class="product-list">
      <product-row
      v-for="item in cartItems"
      :key="item.sku.values.join(',')",
      :product="{
        ...item.sku,
        description:item.sku.values.join(','),
        brand:item.product.brand
      }"
      >
      <template #operation>
        <div class="sku-count">x{{ item.count }}</div>
      </template>
      </product-row>
    </div>
    <!-- 价格和优惠信息单元格 -->
     <nut-cell-group class="summary">
       <nut-cell title="商品价格">
        <!-- 以下均为右侧desc插槽 -->
        <template #desc>
          <div class="value">￥{{productPrice}}</div>
        </template>
       </nut-cell>
       <nut-cell title="配送费">
        <template #desc>
          <div class="value">￥{{ 0 }}</div>
        </template>
       </nut-cell>
       <nut-cell title="优惠卷">
        <template #desc>
          <div class="value">-￥{{ 0 }}</div>
        </template>
       </nut-cell>
       <nut-cell title="vip优惠">
        <template #desc>
          <div class="value">-￥{{ 0 }}</div>
        </template>
       </nut-cell>
      </nut-cell-group>
      <div class="submit-bar-wrapper">
        <div class="submit-bar">
          <div class="price">￥{{ productPrice }}</div>
          <nut-button type="danger" @click="saveOrder">提交订单</nut-button>
        </div>
      </div>
      <address-choose
      v-model:visible2="addressChooseVisible"
      @choose="handleAddressChose"
      >

      </address-choose>
    </div>
</template>

<script setup lang="ts">
import Taro from '@tarojs/taro';
import { computed, ref } from 'vue'
import { Location2 } from '@nutui/icons-vue-taro';
import addressRow from '@/components/address/address-row.vue';
import { AddressDto } from "@/apis/__generated/model/dto";
import { RectRight } from '@nutui/icons-vue-taro';
import productRow from '@/components/product/product-row.vue';
import { CartItem } from '@/components/cart/cart-store';
import { api } from '@/utils/api-instance';
import addressChoose from '../address/address-choose.vue';
// type addressM =AddressDto["AddressRepository/SIMPLE_FETCHER"];

const address = ref<AddressDto["AddressRepository/SIMPLE_FETCHER"]>();
const addressChooseVisible = ref(false);

const handleAddressChose= (value: AddressDto["AddressRepository/SIMPLE_FETCHER"])=>{
  address.value = value;
};
// const address = ref<addressM>({
//   id:"1",
//   address:"河南",
//   details:"新校区",
//   realName:"kaige",
//   top:false,
//   phoneNumber:"123123123123"
// });

const cartItems = ref<CartItem[]>([]);

Taro.eventCenter.on("submitCart",(item:CartItem[])=>{
  cartItems.value = item;
})

const productPrice = computed(()=>{
  return cartItems.value.reduce(
    (pre,nex) =>pre + nex.sku.price * nex.count,0
  )
})

const saveOrder = ()=>{
  if(!address.value){
    Taro.showToast({
      title:"请选择一个地址",
      icon:"none",
      duration:1000,
    });
    return
  }
  api.productOrderController
  .create({
    body:{
      remark:"",
      items:cartItems.value.map((itme)=>({
        productSkuId:itme.sku.id,
        skuCount:itme.count,
      })),
      addressId: address.value.id,
      payment:{
        payType:"WE_CHAT_PAY"
      }
    },
  })
  .then((res)=>{
    console.log(res);
    Taro.showToast({
      title:"订单创建成功",
      icon:"success",
      duration:1000,
    })
  });
}

</script>

<style lang="scss">
.submit-bar-wrapper{
  position: fixed;
  display: flex;
  justify-content: center;
  bottom: 0;
  width: 100%;
  background-color: white;

  .submit-bar{
  display: flex;
  align-items: center;
  width: 700rpx;
  padding: 20rpx;
  justify-content: space-between;
  }
}

</style>
