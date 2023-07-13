一，温度传感器 \
api: http://lumina.toriches.cn/manager/save/sensor/temperature \
method: post\
data:
```json
// 请求体内容格式：
{
  "deviceId": "string",
  "deviceSecret": "string",
  "temperature": [温度1, 温度2, 温度3, 温度64]
}
```

二，水肥传感器 \
api: http://lumina.toriches.cn/manager/save/sensor/lighting \
method: post \
data:
```json
// 请求体内容格式：
{
  "deviceId": "string",
  "deviceSecret": "string",
  "lighting": [...]  // 水肥数据格式只要是一个json串即可
}
```
