<template>
  <div class="address-save">
    <map
      id="map"
      class="map"
      :latitude="address.latitude - 0.004"
      :longitude="address.longitude"
      :markers="[marker]"
    >
    </map>
    <div class="address-section">
      <div class="btn" @click="chooseAddress">
        去选收获地址 <rect-right color="#999"></rect-right>
      </div>
      <div class="form">
        <!-- 门牌号 -->
        <div class="form-item">
          <div class="label">门牌号</div>
          <div class="input" >
            <input placeholder="请输入详细地址" v-model="address.details" />
          </div>
        </div>
          <!-- 联系人 -->
        <div class="form-item">
          <div class="label" >联系人</div>
          <div class="input"  placeholder="请输入联系人">
            <input placeholder="请输入联系人" v-model="address.realName" />
          </div>
        </div>
        <!-- 手机号 -->
        <div class="form-item">
          <div class="label">手机号</div>
          <div class="input" >
            <input placeholder="请输入手机号" v-model="address.phoneNumber" />
          </div>
        </div>
      </div>
      <div class="submit" @click="submit">保存地址</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {computed,ref} from "vue"
import Taro , {requirePlugin }from "@tarojs/taro"
import { AddressInput } from "@/apis/__generated/model/static";
import { RectRight } from "@nutui/icons-vue-taro";
import { api } from "@/utils/api-instance";
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

// 提交表单
const submit = ()=>{
  api.addressController.save({body:address.value}).then((res)=>{
    Taro.showToast({title:"提交成功",icon:"success"});
    Taro.navigateBack();
  })
}

//加载插件
const chooseLocation = requirePlugin("chooseLocation")
// 调用 腾讯地图api获取详细地址

const chooseAddress=()=>{
  const key = 'GEDBZ-6S2WV-7NBPB-5ESY3-LEF2O-BEBP2'; //使用在腾讯位置服务申请的key
const referer = '微信小程序作业'; //调用插件的app的名称
// const location = JSON.stringify({
//   latitude: 39.89631551,
//   longitude: 116.323459711
// });
const category = '地址';

Taro.navigateTo({
  url: 'plugin://chooseLocation/index?key='
   + key
   +'&referer='
   + referer
   + '&location='
   + location
   + '&category='
   + category
});
}
//返回到小程序的时候 获取选择的位置
Taro.useDidShow(()=>{
  const chooseAddress = chooseLocation.getLocation();
  address.value = {...address.value,...chooseAddress}
})

Taro.useLoad((ops:any)=>{
  if(ops.id){
    api.addressController.findById({id:ops.id}).then((res)=>{
      address.value = res;
    })
  }
})


</script>

<style lang="scss">
.map{
  top: 0;
  width: 100%;
  z-index: -1;
  height: 100vh;
  position: absolute;
}
.address-section{
  background-color: white;
  // margin: 300rpx 20rpx 0 20rpx;
  // height: 900rpx;
  // height: 100vh;
  position: fixed;
  bottom: 0;
  left: 40rpx;
  right: 40rpx;
  top: 300rpx;
  padding: 40rpx 20rpx;
  border-radius: 20rpx;
  .btn{
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 15rpx 50rpx;
    margin: auto;
    width: 400rpx;
    font-weight: bold;
    font-size: 38px;
    color: orange;
    border: 1.5px solid orange;
    border-radius: 15rpx;
  }
  .form{
    margin-top: 40rpx;
    .form-item{
      align-items: center;
      display: flex;
      padding: 20rpx 0;
      .label{
        padding-right: 10rpx;
        width: 120rpx;
        font-weight: bold;
      }
      .input{
        border-bottom: 1px solid rgba($color: #000000, $alpha: 0.1)
      }
    }
  }
  .submit{
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    margin-top: 30rpx;
    padding: 20rpx 0;
    border-radius: 15rpx;
    background-color: rgba(248, 212, 64);
  }
}

</style>
