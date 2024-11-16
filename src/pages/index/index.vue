<template>
  <div class="product-list">
    <div v-for="(item, index) in pageData.content" :key="index" class="item-wrapper">
      <ProductCover :product="item" />
    </div>
  </div>
</template>

<script setup lang="ts">
import ProductCover from "@/components/product/product-cover.vue"
import { api } from "@/utils/api-instance";
import { usePageHelper } from "@/utils/page";

const { pageData } = usePageHelper(
  api.productController.query,
  api.productSkuController,
  {},
);
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
