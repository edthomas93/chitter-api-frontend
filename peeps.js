var peeps = new XMLHttpRequest();

peeps.open('GET', 'https://chitter-backend-api.herokuapp.com/peeps');
peeps.onload = function () {
  var data = JSON.parse(peeps.responseText);
  console.log(data[0]);
}

peeps.send();