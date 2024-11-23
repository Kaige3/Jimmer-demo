<template>
    <map
      id="map"
      class="map"
      :latitude="address.latitude - 0.004"
      :longitude="address.longitude"
      :markers="[marker]"
    >
    </map>
</template>

<script setup lang="ts">
import {computed,ref} from "vue"
import Taro , {requirePlugin }from "@tarojs/taro"
import { AddressInput } from "@/apis/__generated/model/static";
const marker = computed(() => {
  return {
    id: 1,
    iconPath: "/assets/icons/address.png",
    latitude: address.value.latitude,
    longitude: address.value.longitude,
    width: 40,
    height: 40,
  };
});
// 获取到经纬度
Taro.authorize({
  scope: "scope.userLocation",
  success() {
    Taro.getLocation({
      success: (res) => {
        // 编辑时不需要获取当前地址
        if (!address.value.id) {
          address.value.latitude = res.latitude;
          address.value.longitude = res.longitude;
        }
      },
    });
  },
});

const address = ref<AddressInput>({
  address: "",
  city: "",
  details: "",
  district: "",
  latitude: 23.099994,
  longitude: 113.32452,
  phoneNumber: "",
  province: "",
  realName: "",
  top: false,
});


</script>

<style lang="scss">
.map{
  width: 100%;
  height: 300px;
}

</style>
