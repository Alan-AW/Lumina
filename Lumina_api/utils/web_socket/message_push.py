"""
概述：
  WebSocket 是什么？
     WebSocket 是 HTML5 提供的一种浏览器与服务器间进行全双工通讯的协议。
     依靠这种协议可以实现客户端和服务器端 ，一次握手，双向实时通信。

WebSocket 服务端：
  用的是 dwebsocket,安装命令pip install dwebsocket.

WebSocket  基本方法：
    1.request.is_websocket()
        如果是个websocket请求返回True，如果是个普通的http请求返回False,可以用这个方法区分它们。

    2.request.websocket
        在一个websocket请求建立之后，这个请求将会有一个websocket属性，用来给客户端提供一个简单的api通讯，
        如果request.is_websocket()是False，这个属性将是None。

    3.WebSocket.wait()
        返回一个客户端发送的信息，在客户端关闭连接之前他不会返回任何值，这种情况下，方法将返回None

    4.WebSocket.read()
        如果没有从客户端接收到新的消息，read方法会返回一个新的消息，如果没有，就不返回。这是一个替代wait的非阻塞方法

    5.WebSocket.count_messages()
        返回消息队列数量

    6.WebSocket.has_messages()
        如果有新消息返回True，否则返回False

    7.WebSocket.send(message)
        向客户端发送消息

    8.WebSocket.__iter__()
        websocket迭代器

这是客户端的一些说明,在客户端,websocket的两个属性：readyState和bufferedAmount,区别和说明如下:
    根据readyState属性可以判断webSocket的连接状态，该属性的值可以是下面几种：
    0 ：对应常量CONNECTING (numeric value 0)，
     正在建立连接连接，还没有完成。The connection has not yet been established.
     1 ：对应常量OPEN (numeric value 1)，
     连接成功建立，可以进行通信。The WebSocket connection is established and communication is possible.
    2 ：对应常量CLOSING (numeric value 2)
     连接正在进行关闭握手，即将关闭。The connection is going through the closing handshake.
    3 : 对应常量CLOSED (numeric value 3)
     连接已经关闭或者根本没有建立。The connection has been closed or could not be opened.
根据bufferedAmount可以知道有多少字节的数据等待发送，若websocket已经调用了close方法则该属性将一直增长。


代码简单实现：
views.py:

    import redis
    from dwebsocket.decorators import accept_websocket

    r = redis.Redis(host='localhost', port=6379)


使用全局变量
    data = ''
    #接受前端信息 socket
    @accept_websocket
    def test_socket(request):
    　　调用全局变量
    　　global data
    　　判断是否是websocket
    　　if request.is_websocket():
    　　　　for message in request.websocket:

    　　　　data = message.decode()
    　　print(data)
    # request.websocket.send(message)

    @accept_websocket
    def test_websocket(request):
    　　调用全局变量
    　　global data
    　　# data = data.decode()
    　　判断是否是websocket请求
    　　if request.is_websocket():
    　　while 循环一次
    　　while 1:
    　　　　time.sleep(1) ## 向前端发送时间
    　　　　判断是否有值，如果有返回日期还是data中的数据
    　　　　if data:

    　　　　dit = {
    　　　　　　'time':time.strftime('%Y.%m.%d %H:%M:%S',time.localtime(time.time())),
    　　　　　　'data': data
    　　　　}
    　　　　request.websocket.send(json.dumps(dit))
    　　　循环一次之后赋值为空
    　　　data = ''


路由url.py:
# 推送
    path('/socket_test',TemplateView.as_view(template_name='md_admin_user/socket.html')),
    path('/websocket_test',TemplateView.as_view(template_name='md_admin_user/socket_push.html')),
    path('/test_socket',test_socket),
    path('/test_websocket',test_websocket),

后端html:
<body>
    <input id="chat-message-input" type="text" size="100"/><br/>
    <input id="chat-message-submit" type="button" value="Send" onclick='sendmessage()'/>
</body>
<script>
    var websocket
    //生成socket对象
    var socket = new WebSocket("ws:" + window.location.host + "/md_admin_user/test_socket");
    socket.onopen = function () {
        console.log('WebSocket open');//成功连接上Websocket
    };
    socket.onmessage = function (e) {
        console.log('message: ' + e.data);//打印服务端返回的数据
    };
    socket.onclose=function(e){
        console.log(e);
        socket.close(); //关闭TCP连接
    };
    if (socket.readyState == WebSocket.OPEN){
        socket.onopen();
    }
    window.s = socket;
    function sendmessage(){
        window.s.send(document.getElementById("chat-message-input").value);
    }
</script>
"""
