<template>
<div>
  <div class="product-dialog">
    <nut-popup
    :visible="visible"
    round
    pop-class="product-popup"
    >
      <scroll-view :scroll-y="true" class="product-section" v-if="activeSku">
        <!-- 图片 -->
        <div>
          <image class="product-cover"
          :src="product.cover"
          :mode="'aspectFill'"
          >
          </image>
          <!--名称  -->
          <div class="product-name">{{ product.name }}</div>
          <!-- 描述 -->
          <div class="product-description">
            {{ product.description }}
          </div>
          <!-- 规格 -->
          <div class="attributes">
            <div class="attribute-row"
            :key="attribute.name"
            v-for="attribute in product.attributes"
            >
              <!-- 第一列规格 -->
               <div class="attribute-name">{{ attribute.name }}</div>
               <!-- 规格对应的值 -->
                <div class="valus">
                  <div v-for="value in attribute.values" :key="value">
                    {{ value }}
                  </div>
                </div>
            </div>
          </div>
          <!-- 选中的规格 -->
          <div class="choose">
            <div class="values">
              <span class="prefix">已选的规格：</span>

            </div>
          </div>
        </div>
        <nut-button @click="closeDialog">点我关闭模态框</nut-button>
      </scroll-view>
    </nut-popup>
  </div>
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


// 设置一个flag用来向父组件传递模态框的值
const visible = defineModel({
  type:Boolean
})
// 关闭模态框的方法
const closeDialog = () => {
  visible.value = false; // 修改 visible，Vue 会自动通知父组件
};
// 接收父组件传递的数据
const props = defineProps<{
  product: ProductSkuFetcherDto;
  // visible: boolean;
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
.product-dialog{

  .product-section {
    background-color: white;
    border-radius: 15px;
    width: 600px;
    height: 1000px;
    overflow: hidden;
  }
}
</style>



