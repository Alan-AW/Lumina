import axios from './request'

// 上传API请求头配置
const uploadHeaders = { headers: { 'Content-Type': 'multipart/form-data' } }

/* 公共API */
// 登陆
export const login = data => axios.post('/auth/login', data)

// 全局上传接口
export const uploadFile = data => axios.post('/upload/img', data, uploadHeaders)

// 新的全局上传接口
export const uploadFileApi = (dirName, file) => axios.post(`/upload/file/${dirName}`, file, uploadHeaders)

// 上传头像图片接口
export const uploadImg = data => axios.post('/auth/update', data, uploadHeaders)
// 修改个人信息
export const updateUserInfo = data => axios.post('/auth/update', data)

// 下拉框数据获取
export const choicesRooms = () => axios.get('/manager/room/choices')
export const choicesRoles = () => axios.get('/manager/role/choices')
export const choicesEnvironmentalOptions = () => axios.get('/manager/choices/environmentalOptions')
export const choicesCompany = () => axios.get('/manager/company/choices')
export const choicesUnitSetList = language => axios.get(`/manager/unit/settings/list/choices?language=${language}`)
export const getNavPermission = () => axios.get('/auth/permission/choices')
export const choicesAlgorithm = (language = 'cn') => axios.get(`/manager/algorithm/choices?language=${language}`)
export const choicesCultivars = (language = 'cn') => axios.get(`/manager/choices/cultivars?language=${language}`)

// 用户管理页面
export const getUser = params => axios.get('/auth/user/', { params })
export const postUser = data => axios.post('/auth/user/', data)
export const patchUser = (id, data) => axios.patch(`/auth/user/${id}`, data)
export const deleteUser = id => axios.delete(`/auth/user/${id}`)
// 区域管理页面-取消了区域管理
// export const getZone = params => axios.get('/manager/zone/', { params })
// export const postZone = data => axios.post('/manager/zone/', data)
// export const patchZone = (id, data) => axios.patch(`/manager/zone/${id}`, data)
// export const deleteZone = id => axios.delete(`/manager/zone/${id}`)
// 角色管理页面
export const getRoles = params => axios.get('/auth/roles/', { params })
export const postRoles = data => axios.post('/auth/roles/', data)
export const patchRoles = (id, data) => axios.patch(`/auth/roles/${id}`, data)
export const deleteRoles = id => axios.delete(`/auth/roles/${id}`)
// 权限管理页面
export const getPermission = params => axios.get('/auth/permission/', { params })
export const postPermission = data => axios.post('/auth/permission/', data)
export const patchPermission = data => axios.patch('/auth/permission/', data)
export const deletePermission = data => axios.delete('/auth/permission/', { data })
// 日志查看
export const getLogs = params => axios.get('/auth/logs', { params })
// 公司管理
export const getCompany = params => axios.get('/manager/company/', { params })
export const postCompany = data => axios.post('/manager/company/', data)
export const patchCompany = (id, data) => axios.patch(`/manager/company/${id}`, data)
export const deleteCompany = id => axios.delete(`/manager/company/${id}`)
export const uploadCompanyLogoApi = (id, data) => axios.post(`/manager/company/uploadlogo/${id}`, data, uploadHeaders)
export const postCompanyCultivars = (id, data) => axios.post(`/manager/company/cultivars/${id}`, data)
export const getCompanyUnitDesc = id => axios.get(`/manager/company/unitdesc/${id}`)
export const reloadCompanyUnitDesc = id => axios.get(`/manager/company/unitdesc/reload/${id}`)
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
// 机器功能设置
export const getUnitSet = id => axios.get(`/manager/unit/settings/${id}`)
export const patchUnitSet = (id, data) => axios.patch(`/manager/unit/settings/${id}`, data)
// 机器功能列表
export const getSetList = params => axios.get('/manager/unit/settings/list/', { params })
export const postSetList = data => axios.post('/manager/unit/settings/list/', data)
export const patchSetList = (id, data) => axios.patch(`/manager/unit/settings/list/${id}`, data)
export const deleteSetList = id => axios.delete(`/manager/unit/settings/list/${id}`)
// 品类管理
export const getCultvar = params => axios.get('/manager/cultivar/', { params })
export const postCultvarAlgorithm = data => axios.post('/manager/cultivar/algorithm', data)
export const postCultvar = data => axios.post('/manager/cultivar/', data)
export const patchCultvar = (id, data) => axios.patch(`/manager/cultivar/${id}`, data)
export const deleteCultvar = id => axios.delete(`/manager/cultivar/${id}`)
export const getCultivarCmdChoices = (id, company_id) => axios.get(`/manager/cultivar/algorithm/cmd/edit/${id}?company_id=${company_id}`)
export const postCultivarCmd = (id, data, company_id) => axios.post(`/manager/cultivar/algorithm/cmd/edit/${id}?company_id=${company_id}`, data)
// 算法管理
export const getAlgorithm = params => axios.get('/manager/algorithm/', { params })
export const postAlgorithm = data => axios.post('/manager/algorithm/', data)
export const patchAlgorithm = (id, data) => axios.patch(`/manager/algorithm/${id}`, data)
export const deleteAlgorithm = id => axios.delete(`/manager/algorithm/${id}`)
// 树结构
export const exportThreeData = () => axios.get('/manager/export/three')
export const getSpecies = params => axios.get('/manager/species/', { params })
export const postSpecies = data => axios.post('/manager/species/', data)
export const patchSpecies = (id, data) => axios.patch(`/manager/species/${id}`, data)
export const deleteSpecies = id => axios.delete(`/manager/species/${id}`)

export const getCultivars = (id, params) => axios.get(`/manager/cultivars/${id}`, { params })
export const postCultivars = data => axios.post('/manager/cultivars/', data)
export const patchCultivars = (id, data) => axios.patch(`/manager/cultivars/${id}`, data)
export const deleteCultivars = id => axios.delete(`/manager/cultivars/${id}`)

export const getModels = (id, params) => axios.get(`/manager/models/${id}`, { params })
export const postModels = data => axios.post('/manager/models/', data)
export const patchModels = (id, data) => axios.patch(`/manager/models/${id}`, data)
export const deleteModels = id => axios.delete(`/manager/models/${id}`)

export const getPhases = (id, params) => axios.get(`/manager/phases/${id}`, { params })
export const postPhases = data => axios.post('/manager/phases/', data)
export const patchPhases = (id, data) => axios.patch(`/manager/phases/${id}`, data)
export const deletePhases = id => axios.delete(`/manager/phases/${id}`)

export const getInstruction = (id, params) => axios.get(`/manager/instruction/${id}`, { params })
export const postInstruction = data => axios.post('/manager/instruction/', data)
export const patchInstruction = (id, data) => axios.patch(`/manager/instruction/${id}`, data)
export const deleteInstruction = id => axios.delete(`/manager/instruction/${id}`)

export const getAction = (id, params) => axios.get(`/manager/action/${id}`, { params })
export const postAction = data => axios.post('/manager/action/', data)
export const patchAction = (id, data) => axios.patch(`/manager/action/${id}`, data)
export const deleteAction = id => axios.delete(`/manager/action/${id}`)

export const getTriggers = (id, params) => axios.get(`/manager/triggers/${id}`, { params })
export const postTriggers = data => axios.post('/manager/triggers/', data)
export const patchTriggers = (id, data) => axios.patch(`/manager/triggers/${id}`, data)
export const deleteTriggers = id => axios.delete(`/manager/triggers/${id}`)
