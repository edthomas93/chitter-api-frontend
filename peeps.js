var peepsContainer = document.getElementById("peeps");
var peeps = new XMLHttpRequest();

peeps.open('GET', 'https://chitter-backend-api.herokuapp.com/peeps');
peeps.onload = function () {
  var data = JSON.parse(peeps.responseText);
  renderHTML(data);
}

peeps.send();

function renderHTML(data) {
  var HTMLstring = "";

  for(var i=0; i<data.length; i++) {
    HTMLstring += "<p>" + data[i].user.handle + ": " + data[i].body + "</p>"
  }

  peepsContainer.insertAdjacentHTML('beforeEnd', HTMLstring);
}