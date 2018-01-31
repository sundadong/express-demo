$(function(){
  var $loginForm = $('#login-form'),
    $username = $('#username'),
    $btnLogin = $('#btn-login'),
    $chatContainer = $('#chat-container'),
    $msgForm = $('#msg-form'),
    $msgText = $('#msg-text'),
    $btnSend = $('#btn-send');

  var ws = null;

  window.onbeforeunload = function(){
    ws && ws.close();
  }

  $btnLogin.on('click', function(){
    var username = $username.val().trim();

    if(!username){
      return;
    }

    createConnection();

    $loginForm.hide();
    $chatContainer.show();
    $msgForm.show();
  });

  $btnSend.on('click', function(){
    var msg = $msgText.val().trim();

    if(!msg){
      return;
    }

    sendMsg({
      type: 'msg',
      data: msg
    });
  });

  function createConnection(){
    var username = $username.val().trim();

    ws = new WebSocket('ws://localhost:3000');

    ws.onopen = function(evt){
      console.log('Connectioned: ');
      sendMsg({
        type: 'username',
        data: username
      });
    };

    ws.onmessage = function(evt){
      var data = JSON.parse(evt.data);

      switch(data.type) {
        case 'online':
        case 'offline':
          handleBoast(data);
          break;
        case 'msg':
          handleMsg(data);
          break;
        default:
          // 位置类型
          console.log(evt.data);
          break;
      }
      console.log('Received: ' + evt.data);
    };

    ws.onclose = function(evt){
      console.log('Closed: ' + evt.code);
    };

    ws.onerror = function(evt){
      console.log('Errror: ' + evt.code)
    };
  }

  function sendMsg(data){
    if(ws.readyState === 1){
      ws.send(JSON.stringify(data));
    }
  }

  function handleBoast(data){
    var $html = '<p>'+ new Date().toLocaleString() + ': ' + data.from + (data.type === 'online'?'上线了':'下线了') +'</p>';
    $chatContainer.append($html);
  }

  function handleMsg(data){
    var $html = '<p>'+ new Date().toLocaleString() + ': ' + data.from + '：' + data.data +'</p>';
    $chatContainer.append($html);
    $msgText.val('');
  }
});