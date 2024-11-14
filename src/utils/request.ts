// 引入相关类型和模块
import type { Method, Result } from "@/typings";  // 引入自定义类型 `Method` 和 `Result`
import Taro from "@tarojs/taro";  // 引入 Taro JS 框架
import { useHomeStore } from "@/stores/home-store";  // 引入 home-store，用于状态管理

// 基础 URL 来自环境变量
const baseUrl = process.env.TARO_APP_API;  // 获取 API 的基础地址

// 定义一个异步函数，用于发送带 token 的 HTTP 请求
const requestWithToken = async <T>(
  url: string,           // 请求的 URL 地址
  method: Method,        // HTTP 方法（GET, POST, PUT, DELETE等）
  data: unknown,         // 请求的 payload 数据
  headers?: Record<string, unknown>,  // 可选的额外请求头
): Promise<T> => {
  return await new Promise((resolve, reject) => {
    // 从本地存储中获取 token
    const token = Taro.getStorageSync("token");  // 获取存储在本地的 token，通常用于认证

    // 调用 Taro 的 request 方法发起请求
    Taro.request({
      url: (baseUrl ?? "") + url,  // 拼接基础 URL 和请求的 URL
      method,                     // HTTP 方法
      data,                       // 请求的数据
      header: {
        token,                    // 添加 token 到请求头部
        ...headers,               // 合并其他自定义 headers
      },
      dataType: "json",           // 期望服务器返回 JSON 格式的数据

      // 请求成功的回调函数
      success: (response) => {
        const result = response.data as Result<T>;  // 强制转换返回的响应数据为 `Result<T>` 类型
        // 根据返回的 code 字段判断请求是否成功
        if (result.code !== 1) {  // 假设 `code === 1` 表示成功
          // 如果请求失败，弹出提示并拒绝 Promise
          Taro.showToast({
            title: result.msg,    // 显示失败信息
            icon: "none",         // 不显示图标
          });
          reject(result);         // 请求失败时调用 reject
        }
        if (result.code === 1001007 || result.code === 1001008) {  // 特定的错误 code，可能是需要重新登录或授权
          // 如果返回的 code 是这两种，说明需要用户重新注册或处理某些业务逻辑
          useHomeStore().registerShow = true;  // 更新状态管理，可能用于显示注册/授权界面
        } else {
          resolve(result.result);  // 请求成功，解析并返回数据
        }
      },

      // 请求失败的回调函数
      fail: (res: unknown) => {
        reject(res);  // 请求失败时直接拒绝 Promise，并返回失败信息
      },
    });
  });
};

// 导出请求函数，供外部使用
export default requestWithToken;
