// 统一代理baseUrl配置

const BaseUrl = {
  // development: 'http://localhost:8000',
  development: 'http://47.110.240.100:8001',
  production: 'http://47.110.240.100:8001'
  // production: 'http://lumina.toriches.cn'
}

export default function getBaseUrl() {
  return BaseUrl[process.env.NODE_ENV] || BaseUrl.development;
}
