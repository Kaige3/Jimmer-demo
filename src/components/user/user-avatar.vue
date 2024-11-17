<template>
  <div>
    <image
      v-if="src"
      :style="{width,height,borderRadius:radius}"
      v-bind="{...$attrs,src,mode}"
      />
      <image
      v-else
      :style="{width,height,borderRadius:radius}"
      v-bind="{...$attrs,mode}"
      src="../../assets/icons/person.png"
      />
  </div>
</template>

<script setup lang="ts">
import { ImageProps } from '@tarojs/components';
withDefaults(
  defineProps<{
    src?:string;
    radius?:string;
    width?:string;
    height?:string;
    mode?:ImageProps["mode"];
  }>(),{
    width:"60rpx",
    height:"60rpx",
    radius:"50rpx",
    mode:"widthFix",
  }
)

defineOptions({
  inheritAttrs:false,
})

</script>

<style scoped>

</style>
