<template>

<!-- 弹出商品详情，以及sku -->
 <product-sku-dialog-copy
 v-if="chosenProduct"
 :key="chosenProduct.id"
 :product="chosenProduct"
  v-model:visible="dialogVisible"
   @addSku="handleAddSku"
 >
 </product-sku-dialog-copy>


<!-- 商品列表渲染 -->
  <div class="product-list">
    <div v-for="(item, index) in pageData.content" :key="index" class="item-wrapper">
      <ProductCover :product="item"
        @click="handleChoose(item.id)"
      />
    </div>
  </div>
  <cart-list @submit="handleSubmit"></cart-list>

</template>

<script setup lang="ts">
import productSkuDialogCopy from "@/components/product/product-sku-dialog-copy.vue";
import { ProductDto } from "@/apis/__generated/model/dto";
import ProductCover from "@/components/product/product-cover.vue"
import { api } from "@/utils/api-instance";
import { usePageHelper } from "@/utils/page";
import { ref } from "vue";
import cartList from "@/components/cart/cart-list.vue";

import { CartItem, useCartStore } from "@/components/cart/cart-store";
import Taro from "@tarojs/taro";
import { body } from "@nutui/nutui-taro/dist/types/utils";
import { useHomeStore } from "@/stores/home-store";
import { hostname } from "os";

const homeStore = useHomeStore();
//获取商品列表的分页数据
const { pageData } = usePageHelper(
  api.productController.query,
  api.productSkuController,
  {},
);

Taro.useLoad(() => {
  Taro.login({
    success: function (loginRes) {
      // 调用微信登录接口
      api.authController
        .authByWecChat({
          body: {
            loginCode: loginRes.code,
          },
        })
        .then((res) => {
          // 判断接口是否成功返回有效 token
          if (res && res.tokenValue) {
            Taro.setStorageSync("token", res.tokenValue);
            homeStore.getUserInfo();
          } else {
            // 返回无效 token 的处理逻辑
            Taro.showToast({
              title: "登录失败，请稍后重试",
              icon: "none",
            });
          }
        })
        .catch((err) => {
          // 捕获接口调用异常
          console.error("调用微信登录接口异常：", err);
          Taro.showToast({
            title: "网络异常，请检查网络设置",
            icon: "none",
          });
        });
    },
    fail: function (err) {
      // Taro.login 失败的处理
      console.error("微信登录失败：", err);
      Taro.showToast({
        title: "获取登录凭证失败，请重试",
        icon: "none",
      });
    },
  });
});


// 默认不弹出 商品详情框
const dialogVisible = ref(false);

type ProductSkuFetcherDto = ProductDto["ProductRepository/PRODUCT_SKU_FETCHER"]

const chosenProduct = ref<ProductSkuFetcherDto>();

// 根据商品id获取商品详情
const handleChoose = (id:string) =>{
  api.productController.findById({ id }).then((res)=>{
    dialogVisible.value =true;
    console.log("是否开启对话框",dialogVisible.value)
    // 把数据 给product,在弹出框渲染
    chosenProduct.value = res;
    console.log("拿到的是什么数据",chosenProduct.value)
  })
}

const cartStore = useCartStore();

const handleAddSku = (
  sku: ProductSkuFetcherDto["skuList"][0],
  product: ProductSkuFetcherDto,
) => {
  cartStore.pushItem({ checked: true, count: 1, sku: sku, product });
  console.log("添加到购物车的数据：", {
  skuId: sku.id,
  productId: product.id,
  price: sku.price,
  selectedAttributes: sku.values,
});
};

const handleSubmit = (cartItems: CartItem[]) =>{
  if(cartItems.length<1){
    Taro.showModal({
      title:"穷逼,去买点东西吧",
      showCancel:false,
    })
  }else{
  Taro.navigateTo({
    url:"/pages/order/order-create",
    success:()=>{
      Taro.eventCenter.trigger("submitCart",cartItems)
      console.log("接收到从购物车提交的数据",cartItems)
    }
  })
 }
}

</script>
<style lang="scss">

page {
  background-color: #f5f5f5;
}
.product-list {
  display: flex;
  flex-wrap: wrap;
  gap: 7px;

  .item-wrapper {
    flex: 0 0 calc(50% - 10px);
    box-sizing: border-box;
    margin-top: 15px;
  }
}


</style>
