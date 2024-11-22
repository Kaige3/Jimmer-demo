<template>
  <nut-popup
  ref="popup"
  v-model:visible="visible"
  background-color="#fff"
  position="bottom"
  z-index="19"
  >
  <div class="cart-content">
    <!-- 上方按钮区域 -->
    <div class="top-bar">
      <!-- 多选框区域按钮，负责多选，中间状态，反向全选展示 -->
      <div class="left">
        <nut-checkbox
        :model-value="checkedItems.length > 0"
        :indeterminate="isIndeterminate"
        @click="toggleCart"
        >
        已选：{{ checkedItems.length }}
        </nut-checkbox>
      </div>
      <div class="right" @click="clearCart">
        <Del size="20"></Del>
        <div class="tip">清空购物车</div>
      </div>
    </div>
    <!-- 下方展示商品详情，和购物车数量 -->
     <div
     v-for="(item,index) in cartStore.cartList"
     :key="item.sku.id"
     class="product-row"
     >

     <!-- 左边的勾选按钮 -->
      <nut-checkbox
      v-model="item.checked"
      :label="item.sku.id"
      >
      </nut-checkbox>
      <!-- 商品行渲染  -->
      <product-row :product="{...item.sku,description:item.sku.values.join(','),brand:item.product.brand}">
        <!-- 操作按钮 -->
         <template #operation>
          <div class="count-wrapper">
            <Minus size="32" color="black" @click="minusItem(index)"></Minus>
            <div class="count">{{ item.count }}</div>
            <Plus size="32" :color="'#f0ad4e'" @click="plusItem(index)"></Plus>
          </div>
         </template>
      </product-row>
     </div>
  </div>
  </nut-popup>
  <div class="cart-bar-wrapper">
    <div class="cart-bar" @click="visible=true">
      <div class="left">
        <div class="price">￥{{totalPrice}}</div>
      </div>
      <div class="right">
        去结算
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import { storeToRefs } from 'pinia';
import { useCartStore } from './cart-store';
import { computed } from 'vue';
import { Del, Minus, Plus } from "@nutui/icons-vue-taro";
import  ProductRow  from "../product/product-row.vue"
const cartStore = useCartStore();
// 变量值
const { visible,checkedItems,totalPrice } = storeToRefs(cartStore)
// 方法
const {minusItem,plusItem,toggleCart,clearCart} = cartStore;
// 中间地状态
const isIndeterminate =computed(()=>{
  return(
    checkedItems.value.length> 0 &&
    checkedItems.value.length <cartStore.cartList.length
  )
})
</script>

<style lang="scss">
// 多行溢出用...显示
@import "../../app.scss";
.cart-content{
  border-top-left-radius: 20rpx;
  border-top-right-radius: 20rpx;
  padding: 0 30rpx 150rpx 30rpx;
  .top-bar{
    display: flex;
    justify-content: space-between;
    padding: 30rpx 0;
    border-bottom: 1px solid rgba($color: black, $alpha: 0.1);
    .left{
      display:flex;
      align-items: center;
      color: #1485ee;
    }
    .right{
      display: flex;
      // justify-content: space-around;
      align-items: center;
      .tip{
        margin-left: 5px;
      }
    }
  }
  .product-row{
    display: flex;
    align-items: center;
    margin-top: 20rpx;
    border-bottom: 1px solid rgba($color: #000000, $alpha: 0.1);
    .nut-checkbox{
      margin-right: 0;
    }
    .count-wrapper{
      display: flex;
      align-items: center;
    .count{
      font-size: 30rpx;
    }

    }
  }
}
.cart-bar-wrapper{
  position: fixed;
  z-index: 20;
  bottom: 20rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  .cart-bar{
    width: 700rpx;
    display: flex;
    height: 100rpx;
    .left{
      background-color: black;
      width: 500rpx;
      height: 100%;
      border-bottom-left-radius: 60px;
      border-top-left-radius: 60rpx;
      display: flex;
      align-items: center;
      .price{
        color: white;
        margin-left: 40rpx;
        font-size: 40rpx;
      }
    }
    .right{
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: rgba(255, 207, 92);
      width: 200rpx;
      height: 100%;
      border-bottom-right-radius: 60rpx;
      border-top-right-radius: 60rpx;
      font-size: 35rpx;
      font-weight: bold;
    }
  }

}

</style>

