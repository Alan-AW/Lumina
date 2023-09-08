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
// 修改个人信息
export const updateUserInfo = data => axios.post('/auth/update', data)

// 下拉框数据获取
export const choicesZones = () => axios.get('/manager/zone/choices')
export const choicesRooms = () => axios.get('/manager/room/choices')
export const choicesRoles = () => axios.get('/manager/role/choices')

// 用户管理页面
export const getUser = params => axios.get('/auth/user/', { params })
export const postUser = data => axios.post('/auth/user/', data)
export const patchUser = (id, data) => axios.patch(`/auth/user/${id}`, data)
export const deleteUser = id => axios.delete(`/auth/user/${id}`)
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
// 树结构
export const exportThreeData = () => axios.get('/manager/export/three')
export const getSpecies = params => axios.get('/manager/species/', { params })
export const postSpecies = data => axios.post('/manager/species/', data)
export const patchSpecies = (id, data) => axios.patch(`/manager/species/${id}`, data)
export const deleteSpecies = id => axios.delete(`/manager/species/${id}`)

export const getCultivars = params => axios.get('/manager/cultivars/', { params })
export const postCultivars = data => axios.post('/manager/cultivars/', data)
export const patchCultivars = (id, data) => axios.patch(`/manager/cultivars/${id}`, data)
export const deleteCultivars = id => axios.delete(`/manager/cultivars/${id}`)

export const getModels = params => axios.get('/manager/models/', { params })
export const postModels = data => axios.post('/manager/models/', data)
export const patchModels = (id, data) => axios.patch(`/manager/models/${id}`, data)
export const deleteModels = id => axios.delete(`/manager/models/${id}`)

export const getPhases = params => axios.get('/manager/phases/', { params })
export const postPhases = data => axios.post('/manager/phases/', data)
export const patchPhases = (id, data) => axios.patch(`/manager/phases/${id}`, data)
export const deletePhases = id => axios.delete(`/manager/phases/${id}`)

export const getInstruction = params => axios.get('/manager/instruction/', { params })
export const postInstruction = data => axios.post('/manager/instruction/', data)
export const patchInstruction = (id, data) => axios.patch(`/manager/instruction/${id}`, data)
export const deleteInstruction = id => axios.delete(`/manager/instruction/${id}`)

export const getAction = params => axios.get('/manager/action/', { params })
export const postAction = data => axios.post('/manager/action/', data)
export const patchAction = (id, data) => axios.patch(`/manager/action/${id}`, data)
export const deleteAction = id => axios.delete(`/manager/action/${id}`)

export const getTriggers = params => axios.get('/manager/triggers/', { params })
export const postTriggers = data => axios.post('/manager/triggers/', data)
export const patchTriggers = (id, data) => axios.patch(`/manager/triggers/${id}`, data)
export const deleteTriggers = id => axios.delete(`/manager/triggers/${id}`)
