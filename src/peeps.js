let peepsContainer = document.getElementById("peeps");
let peeps = new XMLHttpRequest();
let loginbtn = document.getElementById("login-btn");
let postForm = document.getElementById("post-form");
let newPeep = document.getElementById("new-peep");

window.onload = function () {
  buttonChange();
}

loginbtn.addEventListener("click", function() {
  if(sessionStorage.getItem("sessionkey")){
    signOut();
  } else {
    location.href = "./login.html";
  }
})

postForm.addEventListener('submit', function(event){
  postPeep();
  event.preventDefault();
});

peeps.open('GET', 'https://chitter-backend-api.herokuapp.com/peeps');
peeps.onload = function () {
  var data = JSON.parse(peeps.responseText);
  renderHTML(data);
};

peeps.send();

function renderHTML(data) {
  var HTMLstring = "";

  for(var i=0; i<data.length; i++) {
    HTMLstring += `<p> ${data[i].user.handle}: "${data[i].body}" @${data[i].created_at.slice(11, 16)} 
    on ${data[i].created_at.slice(0, 10)}</p>
    <p>liked by ${data[i].likes.length} people <button id="like${data[i].id}" onClick="likePost(this.id)">Like</button> </p>
    <hr>`
  }

  peepsContainer.insertAdjacentHTML('beforeEnd', HTMLstring);
};

function buttonChange(){
  if(sessionStorage.getItem("sessionkey")){
    loginbtn.innerHTML = "Sign Out";
  }
  else{
    loginbtn.innerHTML = "Log In";
  }
}

function postPeep(){
  let url = `https://chitter-backend-api.herokuapp.com/peeps`;
  let data = {peep: {user_id: sessionStorage.getItem("id"), body: newPeep.value}};

  console.log("post peep working" + JSON.stringify(data));

  fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token token=${sessionStorage.getItem("sessionkey")}`
      }
  }).then(res => res.json())
  .then(response => {
    console.log('Success!: ', response);
    location.reload();
  })
  .catch(error => console.error('Error: ', error))
}

function signOut(){
  sessionStorage.clear();
  loginbtn.innerHTML = "Log In";
}

async function likePost(postId){
  let id = postId.slice(4);
  let url = `https://chitter-backend-api.herokuapp.com/peeps/${id}/likes/${sessionStorage.getItem("id")}`;

  let likers = await getLikers(id);
  console.log(likers);
  console.log(likers.includes(parseInt(sessionStorage.getItem("id"), 10)));

  if(likers.includes(parseInt(sessionStorage.getItem("id"), 10))){
    fetch(url, {
        method: 'DELETE',
        headers: {'Authorization': `Token token=${sessionStorage.getItem("sessionkey")}`}
    })
    .then(response => {
      console.log('Success!: ', response);
      location.reload();
    })
    .catch(error => console.error('Error: ', error))
  } else{
    fetch(url, {
        method: 'PUT',
        headers: {'Authorization': `Token token=${sessionStorage.getItem("sessionkey")}`}
    }).then(res => res.json())
    .then(response => {
      console.log('Success!: ', response);
      location.reload();
    })
    .catch(error => console.error('Error: ', error))
  }
}

function getLikers(id){
  let peepurl = `https://chitter-backend-api.herokuapp.com/peeps/${id}`
  let likedBy = [];
  
  return fetch(peepurl)
    .then(res => res.json())
    .then(data => {
      for(var i=0; i<data.likes.length; i++) {
        likedBy.push(data.likes[i].user.id);
      }
      return likedBy;
  })
}