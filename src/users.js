let loginForm = document.getElementById('login-form');
let handleInput = document.getElementById('handle');
let passwordInput = document.getElementById('password');
let signupForm = document.getElementById('singup-form');
let newHandleInput = document.getElementById('newhandle');
let newPasswordInput = document.getElementById('newpassword');

var userId = sessionStorage.getItem("id");
var sessionKey = sessionStorage.getItem("sessionkey");

loginForm.addEventListener('submit', function(event){
  event.preventDefault();
  logIn();
});
signupForm.addEventListener('submit', function(event){
  event.preventDefault();
  signUp();
});

function logIn(){
  let handle = handleInput.value;
  let password = passwordInput.value;
  let url = `https://chitter-backend-api.herokuapp.com/sessions`;
  let data = {session: {
    handle: handle,
    password: password
    }
  };

  fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
  }).then(res => res.json())
  .then(response => {
    console.log('Success!: ', response);
    sessionStorage.setItem("id", response.user_id);
    sessionStorage.setItem("sessionkey", response.session_key);
  })
  .catch(error => console.error('Error: ', error))
}

function signUp(){
  let newHandle = newHandleInput.value;
  let newPassword = newPasswordInput.value;
  let url = `https://chitter-backend-api.herokuapp.com/users`;
  let data = {user: {
    handle: newHandle,
    password: newPassword
    }
  };

  fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
  }).then(res => res.json())
  .then(response => console.log(response))
  .catch(error => console.error(error))
}