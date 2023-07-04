import axios from './request'

// 上传API请求头配置
const uploadHeaders = { headers: { 'Content-Type': 'multipart/form-data' } }

/* 公共API */
// 登陆
export const login = data => axios.post('/auth/login', data)

// 全局上传接口
export const uploadFile = data => axios.post('/upload/img', data, uploadHeaders)

// 上传头像图片接口
export const uploadImg = data => axios.post('/auth/update', data, uploadHeaders)

// 用户管理页面
export const getUsers = params => axios.get('/auth/user', { params })
export const postUsers = data => axios.post('/auth/user', data)
export const patchUsers = data => axios.patch('/auth/user', data)
export const deleteUsers = data => axios.delete('/auth/user', { data })
