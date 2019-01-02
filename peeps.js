var peepsContainer = document.getElementById("peeps");
var peeps = new XMLHttpRequest();
var btn = document.getElementById("btn");
var logged_in = false;

btn.addEventListener("click", function() {
  location.href = "./login.html";
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