<template>
  <div class="product">
    <!-- 靠左边的图片 -->
     <image
     class="cover"
      :src="product.cover"
      mode="aspectFill"
     />
    <!-- 右边的详情 -->
     <div class="info">
      <!-- 第一行名字 -->
       <div class="name">{{ product.name }}</div>
       <!-- 描述 -->
        <div class="description">{{product.description}}</div>
       <!-- 标签 -->
        <div class="bran">
          <nut-tag type="success">{{ product.brand }}</nut-tag>
        </div>
        <!-- 价格 -->
         <div class="price-row">
          <div class="price">
            <span class="prefix">￥</span>
            <!-- 计算价格 -->
            <span>{{ product.price }}</span>
            <!-- 一个插槽，用来控制商品的增减 -->
          </div>
          <slot :product="product" name="operation"></slot>
         </div>
     </div>
  </div>

</template>

<script setup lang="ts">
import { ProductDto } from "@/apis/__generated/model/dto";
type Product = Pick<
  ProductDto["ProductRepository/COMPLEX_FETCHER"],
  "id" | "name" | "description" | "price" | "cover" | "brand"
>;

defineProps<{ product:Product}>();

</script>

<style lang="scss">
@import "../../app.scss";
.product{
  padding: 15rpx 0;
  display: flex;
  align-items: flex-start;
  width: 100%;
  .cover{
    width: 140px;
    height: 140px;
    border-radius: 10px;
  }
  .info{
    flex: 1;
    margin-left: 20px;
    padding-right: 10px;
    .name{
      font-size: 28px;
      @include text-max-line(1);
    }
    .description{
      font-size: 24px;
      margin-top: 10px;
      color:rgba(black,0.7);
    }
    .brand{
      padding: 0;
      --nut--tag--font--size:20px;
    }
    .price-row{
      display: flex;
      justify-content: space-between;
      align-items: center;
      .price{
        display: flex;
        align-items: flex-end;
        .prefix{
          font-size: 28px;
          color: red;
        }
        color: red;
        font-weight: bold;
        font-size: 28px;
      }
    }

  }
}

</style>
