<template>

  <div class = "product-cover">
    <image
      :src="product.cover"
      class="cover"
      mode="widthFix"
      :style="{width}"
    />
    <div class="title">
        {{ product.name  }}
    </div>

    <div class="tags">
      <nut-tag
      v-for="tag in product.tags"
      :key="tag"
      class="tag"
      color="#E9E9E9"
      text-color="#999999"
      >
      {{ tag }}
      </nut-tag>
    </div>

    <div class="price-brand">
      <div class="price">￥{{ product.price }}</div>
      <div class="brand">
        <nut-tag type="primary">{{ product.brand }}</nut-tag>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ProductDto } from '@/apis/__generated/model/dto';

withDefaults(defineProps<{
  product: ProductDto["ProductRepository/COMPLEX_FETCHER"]
  width?: string;
}>(),
  {width:"100%"},
);

</script>

<style lang="scss">
@import "../../app.scss";

.product-cover {
  border-radius: 15px;
  background-color: #ffffff;
  padding: 14px;
  position: relative;

  .cover {
    border-radius: 10px;
  }

  .title {
    font-size: 28rpx;
    margin-top: 5px;
    color: rgba(0, 0, 0, 0.9);
    @include text-max-line(1);
  }
  .tags{
    margin-top: 7px;
    display: flex;
    color: rgba(black, 0.9);
    .tag{
      margin-right: 5px;
      --nut-tag-font-size:20px;
    }
  }
  .price-brand {
    margin-top: 8px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .price {
      color: rgba(red, 0.9);
    }
    .brand {
      --nut-tag-font-size: 18px;
      display: flex;
      align-items: center;
    }
  }
}




</style>
