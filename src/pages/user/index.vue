<template>
  <!-- 背景照片 -->
  <div class="user-page">
    <image class="background"
    mode="aspectFill"
    src="../../assets/img/BJ.jpg"
    >
    </image>
    <!-- 包裹白色背景板，实现垂直居中定位 -->
    <div class="user-wrapper">
      <!-- 包裹用户信息得白色背景板，使用户信息垂直居中-->
      <div class="user-section">
          <div class="user-info">
            <user-avatar
            :src="userInfo.avatar"
            radius="50%"
            width="100rpx"
            height="100rpx"
            mode="aspectFill"
            >
            </user-avatar>
               <!-- 用户名,如果用户名为空，提示请登录 -->
            <div class="username">
              <div
                v-if="!userInfo.nickname"
                class="name not-login"
                @click.stop="homeStore.getUserInfo"
                >
                你还未登录，请点击登录
              </div>
              <!-- 登陆后，渲染用户名 -->
              <div class="name">{{ userInfo.nickname }}
              </div>
              <rect-right class="rect-right" />
            </div>
        </div>
      </div>
    </div>
    <!-- 其他信息 -->
     <div class="divider">
      <div class="front">我的</div>
      <div class="rear">MY SERVICE</div>
     </div>
      <!-- 功能 -->
     <div class="functions">
          <!-- 我的订单 -->
        <div class="function" @tap="switchPage('/pages/order/order-list')">
          <image class="icon"
          mode="'widthFill'"
          src="../../assets/icons/order.png"
          ></image>
          <div class="name">我的订单</div>
        </div>
        <!-- 我的地址 -->
        <div class="function" @tap="switchPage('/pages/address/address-list')">
          <image class="icon"
          mode="'widthFill'"
          src="../../assets/icons/address.png"
          ></image>
          <div class="name">我的地址</div>
        </div>
         <!-- 反馈建议 -->
        <div class="function" @tap="switchPage('/pages/address/address-list')">
          <image class="icon"
          mode="'widthFill'"
          src="../../assets/icons/feedback.png"
          ></image>
          <div class="name">反馈建议</div>
        </div>
         <!-- 我的推广 -->
        <div class="function" @tap="switchPage('/pages/order/order-list')">
          <image class="icon"
          mode="'widthFill'"
          src="../../assets/icons/user-invite.png"
          ></image>
          <div class="name">我的推广</div>
        </div>
          <!-- 退款记录 -->
        <div class="function" @tap="switchPage('/pages/order/order-list')">
          <image class="icon"
          mode="'widthFill'"
          src="../../assets/icons/user-invite.png"
          ></image>
          <div class="name">退款记录</div>
        </div>
     </div>
</div>
</template>

<script setup lang="ts">
import userAvatar from '@/components/user/user-avatar.vue';
import { useHomeStore } from '@/stores/home-store';
import { toRefs } from 'vue';
import { RectRight } from "@nutui/icons-vue-taro";
import { switchPage } from '@/utils/common';
const homeStore = useHomeStore();
const {userInfo} = toRefs(homeStore);
</script>

<style lang="scss">
.user-page{
  //
  .background{
    z-index: -1;
    position: absolute;
    max-width: 100%;
    max-height:500.35px;
    width:100%;
    top:0;
  }
  .user-wrapper {
    width: 100%;
    // 白色框框在整个页面水平居中
    display: flex;
    justify-content: center;
    margin-top: 350px;
    .user-section {
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
      width: 100%;
      height: 150px;
      background-color: white;
      margin: 20px 40px;
      padding: 20px;
      border-radius: 10px;
      // 用户信息在白色框框中垂直居中
      display: flex;
      align-items: center;
      .user-info {
        // 头像和（用户名+右箭头）垂直居中
        display: flex;
        align-items: center;

        .avatar {
          margin-right: 50px;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
        }

        .username {
          // 用户名和箭头垂直居中
          margin-left: 20px;
          display: flex;
          align-items: center;
          .name {
            font-size: 32px;
            margin-right: 20px;
            &.not-login {
              color: rgba(red, 0.5);
            }
          }
          .rect-right {
            color: rgb(red, 0.5);
          }
        }
      }
    }
  }
  .divider{
    width: 100%;
    // 白色框框在整个页面水平居中
    display: flex;
    margin-left: 50px;
  }
  .functions{
    // width: 100%;
    // 白色框框在整个页面水平居中
    display: flex;
    justify-content: space-between; /* 每列等距 */
    box-shadow: 0 8px 25px rgba(0,0,0,0.2);
    background-color: white;
    margin:  20px 40px;
    padding: 20px;
    border-radius: 10px;
    align-items: center;
    flex-wrap: wrap;

    .function{
    justify-content: space-around;
      display: flex;
      flex-direction: column;
      align-items: center;
      width: calc(25% - 20px);
      // margin: 10px;
      gap: 20px;
      box-sizing: border-box;
      .icon{
        width:100px;
        height:100px;
      }
      .name{
        font-size: 30px;
        color: wheat;
      }
    }
  }

}

</style>
