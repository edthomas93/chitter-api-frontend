var peepsContainer = document.getElementById("peeps");
var peeps = new XMLHttpRequest();
var btn = document.getElementById("login-btn");
var logged_in = false;

window.onload = function () {
  buttonChange();
}

btn.addEventListener("click", function() {
  if(sessionStorage.getItem("sessionkey")){
    signOut();
  } else {
    location.href = "./login.html";
  }
})

peeps.open('GET', 'https://chitter-backend-api.herokuapp.com/peeps');
peeps.onload = function () {
  var data = JSON.parse(peeps.responseText);
  renderHTML(data);
};

peeps.send();

function renderHTML(data) {
  var HTMLstring = "";

  for(var i=0; i<data.length; i++) {
    HTMLstring += `<p> ${data[i].user.handle}: "${data[i].body}" @${data[i].created_at.slice(11, 16)} on ${data[i].created_at.slice(0, 10)}</p>`
  }

  peepsContainer.insertAdjacentHTML('beforeEnd', HTMLstring);
};

function buttonChange(){
  if(sessionStorage.getItem("sessionkey")){
    btn.innerHTML = "Sign Out";
  }
  else{
    btn.innerHTML = "Log In";
  }
}

function signOut(){
  sessionStorage.clear();
  location.reload();
}