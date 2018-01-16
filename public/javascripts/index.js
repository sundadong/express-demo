var btnSubmit = document.getElementById('submit');

btnSubmit.onclick = function(e){
  e.preventDefault();

  // var username = document.getElementById('username').value;
  // var password = document.getElementById('password').value;

  var xhr = new XMLHttpRequest();

  console.log(document.getElementById('myForm'));

  xhr.onreadystatechange = function(res){
    if (xhr.readyState == 4) {
      if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
        var data = JSON.parse(xhr.responseText);
        if(data.status == 200){
          var img = document.createElement('img');
          img.src = data.data.url;

          document.body.appendChild(img);
        }
      } else {
        console.log("Response was unsuccessful:" + xhr.status);
      }
    }
  };

  xhr.open('POST', '/upload', true);
  // xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=utf-8');
  // xhr.setRequestHeader('Content-Type', 'multipart/form-data; charset=utf-8');

  var data = new FormData();
  data.append('myfile', document.getElementById('myForm').myfile.files[0])
  // var data = new URLSearchParams();

  // data.append('username', username);
  // data.append('password', password);

  xhr.send(data);
}