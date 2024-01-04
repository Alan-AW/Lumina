// 统一代理baseUrl配置

const BaseUrl = {
  development: 'http://localhost:8000',
  // development: 'http://lumina.toriches.cn',
  production: 'http://lumina.toriches.cn'
}

export default function getBaseUrl() {
  return BaseUrl[process.env.NODE_ENV] || BaseUrl.development;
}
