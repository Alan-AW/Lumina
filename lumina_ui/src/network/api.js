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

export const updateUserInfo = data => axios.post('/auth/update', data)

// 下拉框数据获取
export const choicesZones = () => axios.get('/manager/zone/choices')
export const choicesRooms = () => axios.get('/manager/room/choices')

// 区域管理页面
export const getZone = params => axios.get('/manager/zone/', { params })
export const postZone = data => axios.post('/manager/zone/', data)
export const patchZone = (id, data) => axios.patch(`/manager/zone/${id}`, data)
export const deleteZone = id => axios.delete(`/manager/zone/${id}`)
// 房间管理页面
export const getRooms = params => axios.get('/manager/room/', { params })
export const postRooms = data => axios.post('/manager/room/', data)
export const patchRooms = (id, data) => axios.patch(`/manager/room/${id}`, data)
export const deleteRooms = id => axios.delete(`/manager/room/${id}`)
// 机器管理
export const getUnit = params => axios.get('/manager/unit/', { params })
export const postUnit = data => axios.post('/manager/unit/', data)
export const patchUnit = (id, data) => axios.patch(`/manager/unit/${id}`, data)
export const deleteUnit = id => axios.delete(`/manager/unit/${id}`)