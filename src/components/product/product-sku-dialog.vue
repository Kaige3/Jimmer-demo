<template>
  <div class="product-dialog">
    <nut-popup :visible="visible"
    round
    pop-class="product-popup"
    >
      <scroll-view :scroll-y="true" class="product-section" v-if="activeSku">
        <!-- 图片 -->
        <div>
          <image class="product-cover"
          :src="product.cover"
          :mode="'aspectFill'"
           @update:visible="(value) => emit('update:visible', value)"
          >
          </image>
        </div>

      </scroll-view>
    </nut-popup>
  </div>
</template>

<script setup lang="ts">
import {computed } from 'vue'
import { ProductDto } from '@/apis/__generated/model/dto';
import { ProductSkuController } from '@/apis/__generated/services';
type ProductSkuFetcherDto = ProductDto["ProductRepository/PRODUCT_SKU_FETCHER"]
type Sku = ProductSkuFetcherDto["skuList"][0];
// 拿到attribute的类型，并新曾一个activeValue类型
type Attribute = ProductSkuFetcherDto["attributes"][0] &{
  activeValue : string;
}
// 接收父组件传递的数据
const props = defineProps<{
  product: ProductSkuFetcherDto;
  visible: boolean;
}>();

// 向父组件传递的数据，
const emit = defineEmits<{
  "update:visible":[visible:boolean];
  // addSku:[sku:Sku,product:ProductSkuFetcherDto]
}>();

// 获取当前选中商品的所用信息
// const activeSku = computed(()=>{
//   return props.product
// })
const activeSku = props.product.skuList[0];

</script>

<style lang="scss">
.product-dialog {
  .product-section {
    background-color: white;
    border-radius: 15px;
    overflow: hidden;
    width: 680px;
    height: 1000px;

    .product-cover {
      // 封面和对话框一样宽，不留缝隙。这样看起来会比较好看。
      width: 100%;
      height: 750px;
    }
    .product-name {
      font-size: 34px;
      margin: 30px;
      word-break: keep-all;
    }

    .product-description {
      margin: 20px 30px;
      // 描述的颜色要淡一些，透明度设置0.7和标题体现出差异。
      color: rgba(black, 0.7);
      // 字体也是一样设置小一些
      font-size: 28px;
    }

    .attributes {
      margin: 30px;
      // 每个属性占一行
      .attribute-row {
        margin-top: 50px;

        .attribute-name {
          color: rgba($color: #000000, $alpha: 0.8);
        }
        // 属性值水平排列
        .values {
          display: flex;

          .value {
            margin-top: 20px;
            padding: 20px;
            border-radius: 10px;
            margin-right: 30px;
            border: 1px solid rgba(black, 0.1);
            // 选中的属性值
            &.active {
              background-color: rgba(255, 209, 97, 0.7);
              border: 2px solid rgb(234, 186, 69);
            }
          }
        }
      }
    }

    .choose {
      margin-top: 40px;
      padding: 20px 30px;
      background-color: rgba(black, 0.05);
      border: 1px solid rgba(black, 0.1);

      .prefix {
        color: rgba(black, 0.7);
      }
    }

    .result {
      padding: 30px;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .total-price {
        display: flex;
        align-items: flex-end;

        .price {
          color: red;
          font-size: 45px;
          line-height: 40px;
        }

        .price-prefix {
          color: red;
        }
      }

      .add-cert {
        background-color: rgba(255, 208, 95);
        border-radius: 10px;
        padding: 15px 30px;
        display: flex;

        .prefix {
          font-weight: bold;
          margin-right: 15px;
        }
      }
    }
  }
}
</style>



