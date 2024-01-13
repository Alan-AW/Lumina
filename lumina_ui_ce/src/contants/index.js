/**
 * 全局常量
 */

// 用户登陆信息localStorage key
export const USER_TOKEN = "userToken"

// 分页器每页默认数据条数
export const pageSize = 10

// 右下角提醒内容title
export const MAP_MESSAGE_TITLE = {
  'success': '操作成功：',
  'info': '消息提醒：',
  'warning': '警告信息：',
  'error': '错误信息：'
}

// 动画效果class name
export const FADEIN = " animate__animated animate__fadeIn "
export const FADEINLEFT = " animate__animated  animate__fadeInLeft "
export const FADEINRIGHT = " animate__animated animate__fadeInRight "
export const FADEINDOWN = " animate__animated animate__fadeInDown "
export const FADEINUP = " animate__animated animate__fadeInUp "

// 后台首页诗句集锦
export const p = [
  '云想衣裳花想容，春风拂槛露华浓。',
  '有花有酒春常在，无烛无灯夜自明。',
  '千秋无绝色，悦目是佳人！',
  '人生若只如初见，何事秋风悲画扇。',
  '曾经沧海难为水，除却巫山不是云。',
  '玲珑骰子安红豆，入骨相思知不知。',
  '人生如逆旅，我亦是行人。',
  '一生大笑能几回，斗酒相逢须醉倒。',
  '仰天大笑出门去，我辈岂是蓬蒿人。',
  '同是天涯沦落人，相逢何必曾相识！',
  '海上生明月，天涯共此时。',
  '只因你太美~你干嘛~哎哟~',
  '幸得识卿桃花面，从此阡陌多暖春。',
  '年年岁岁花相似，岁岁年年人不同。',
  '欲买桂花同载酒，终不似，少年游。',
  '今人不见古时月，今月曾经照古人。',
  '江南无所有，聊赠一枝春。',
  '黄河落天走东海，万里写入胸怀间。',
  '春水碧于天，画船听雨眠。',
  '小楼一夜听春雨，深巷明朝卖杏花。',
  '自在飞花轻似梦，无边丝雨细如愁',
  '荷风送香气，竹露滴清响',
  '日暮酒醒人已远，满天风雨下西楼',
  '愿我如星君月，夜夜流光相皎洁',
  '浮云一别后，流水十年间。',
  '本是青灯不归客，却因浊酒留风尘。',
  '花有重开日，人无再少年。',
  '今朝若是同淋雪，此生也算共白头。',
  '远赴人间惊鸿宴，一睹人间盛世颜。',
  '落霞与孤鹜齐飞，秋水共长天一色。',
]

// 密码强度正则表达式校验（8-16位必须包含大小写字母、数字、特殊符号中的两种）
export const passwordReg = /^(?![A-Za-z]+$)(?![A-Z0-9]+$)(?![a-z0-9]+$)(?![a-z\W]+$)(?![A-Z\W]+$)(?![0-9\W]+$)[a-zA-Z0-9\W]{8,16}$/

// 手机号和座机号混合校验
export const telReg = /^1[3-9]\d{9}$|^\d{3}-\d{8}|\d{4}-\d{7}$/

// 身份证号校验
export const idCodeReg = /^[0-9]{18}$/

// 允许上传的图片文件类型
export const allowImgFilesType = [
  'image/png',
  'image/jpg',
  'image/jpeg',
]
