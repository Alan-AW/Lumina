import urllib.request
import base64
import json
import re

"""
def get_only_queue_data(queue_name: str) -> list:
    # 创建请求 URL，其中 your_vhost 和 your_queue 需要替换为你的实际虚拟主机和队列名称
    url = f"http://{HOST}:{PORT}/api/queues/%2F/{queue_name}"

    # 创建请求头，包含 Basic Auth 认证
    auth = base64.b64encode(f'admin:1ee2097c'.encode()).decode()
    headers = {'Authorization': f'Basic {auth}'}

    # 创建请求
    req = urllib.request.Request(url, headers=headers)

    # 发送请求并获取响应
    with urllib.request.urlopen(req) as response:
        # 解析响应的 JSON 数据
        data = json.loads(response.read().decode())
        if data:
            return data['consumers']
        # 打印队列的消费者数量
        print(data['consumers'])
    return []
"""


def get_all_data(queue_name: str = None) -> list:
    if not queue_name:
        raise ValueError('queue_name is required')
    # 创建请求 URL
    url = "http://43.138.127.42:15672/api/consumers"

    # 创建请求头，包含 Basic Auth 认证
    auth = base64.b64encode(b'admin:1ee2097c').decode()
    headers = {
        'Authorization': 'Basic ' + auth
    }

    # 创建请求
    req = urllib.request.Request(url, headers=headers)

    # 发送请求并获取响应
    with urllib.request.urlopen(req) as response:
        # 解析响应的 JSON 数据
        data = json.loads(response.read().decode())
        if data:
            pattern = re.compile(r'^(.*?)_' + re.escape(queue_name) + '$')
            # 生成设备deviceId列表
            result = [match.group(1) for s in data if (match := pattern.match(s['queue']['name']))]
            return result
        else:
            return []

# def get_queue_status(queue_name: str = None) -> list:
#     if queue_name:
#         return get_only_queue_data(queue_name)
#     else:
#         return get_all_data()


# if __name__ == '__main__':
#     results = get_all_data()
#     print(results)
