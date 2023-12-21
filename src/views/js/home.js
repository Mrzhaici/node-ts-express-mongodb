(function () {
  let loginBtn = document.getElementsByTagName("button");
  loginBtn[0].onclick = (e) => {
    const xhttp = new XMLHttpRequest();
    xhttp.open('get', location.href + 'longin');
    xhttp.send('login');
    xhttp.onreadystatechange = () => {
      if(xhttp.status == 200 && xhttp.readyState == 4) {
        console.log('send ok');
      }
    }
  };
})();
