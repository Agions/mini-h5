import Taro, { getStorageSync, navigateTo, removeStorageSync, setStorageSync } from '@tarojs/taro'
import { create, PreQuest } from '@prequest/miniprogram'
import errorRetryMiddleware from '@prequest/error-retry'
import timeout from '@prequest/timeout'
import InterceptorMiddleware from '@prequest/interceptor'
import { createUpload } from '@prequest/miniprogram-addon'
import Lock from '@prequest/lock'

declare module '@prequest/types' {
  interface PQRequest {
    skipTokenCheck?: boolean
    name?: string
    filePath?: any
    formData?: Common
    timeout?: number

  }
}
PreQuest.defaults.baseURL = 'https://jsonplaceholder.typicode.com'
// 全局配置

// 全局中间件
PreQuest.use(async (ctx, next) => {
  await next()
  console.log(ctx.response.data)
})

export const prequest = create(Taro.request)


export const upload = createUpload(Taro.uploadFile)
// 中间件
// 错误重试中间件
const errorRetry = errorRetryMiddleware({
  retryCount: 3,
  retryControl: (opt, e) => {
    // 这个错误是下面 parse 中间件抛出的
    if (e.message === '401') {
      // 如果是 401 请求未认证报错，则清除 token, 这样会重新请求 token 接口，拿到最新的 token 值
      lock.clear()
    }

    // 只有 GET 请求才走错误重试
    return opt.method === 'GET'
  }
})

// 无痕刷新 token 中间件
export const lock = new Lock({
  getValue() {
    return getStorageSync('token')
  },
  setValue(token) {
    setStorageSync('token', token)
  },
  clearValue() {
    removeStorageSync('token')
  }
})
const wrapper = Lock.createLockWrapper(lock)

const refreshToken = async (ctx, next) => {
  if (ctx.request.skipTokenCheck) return next()
  // const token = await wrapper(() => prequest('/token', { skipTokenCheck: true }).then(res => res.data))
  // ctx.request.header['Authorization'] = token
  await next()
}

// 解析响应
const parse = async (ctx, next) => {
  await next()
  // 用户服务器返回 401, 微信不会抛出异常、需要用户自己处理
  // 这里抛出异常，会被错误重试中间件捕获
  const { statusCode } = ctx.response
  console.log(statusCode, 'statusCode')
  switch (statusCode) {
    case '401':
    // 根据errorCode，对业务做异常处理(和后端约定)
    case '500':
    // 根据errorCode，对业务做异常处理(和后端约定)
    case '404':
      // 根据errorCode，对业务做异常处理(和后端约定)
      break;
  }
}

// 实例中间件
prequest
  .use(errorRetry)
  .use(refreshToken)
  .use(timeout)
  .use(parse)

// 如果你习惯 axios 拦截器
const interceptor = new InterceptorMiddleware()
// 请求拦截器
interceptor.request.use(
  (request) => {
    // if (req.path === '/api') {
    //   req.path = req.path + '?v=1'
    // }
    console.log(request, 'request')
    return request
  }
)

// 响应拦截器
interceptor.response.use(
  (res) => {
    if (res.statusCode !== 200) throw new Error('' + res.statusCode)
    return res
  },
  (err) => {
    // 错误处理
    switch (err.message) {
      case '401':
        return navigateTo({ url: '/login/index' })
      // 注意将 err 抛出
      default:
        throw err
    }
  }
)