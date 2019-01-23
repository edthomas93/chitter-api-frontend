let loginForm = document.getElementById('login-form');
let handleInput = document.getElementById('handle');
let passwordInput = document.getElementById('password');
let signupForm = document.getElementById('singup-form');
let newHandleInput = document.getElementById('newhandle');
let newPasswordInput = document.getElementById('newpassword');

loginForm.addEventListener('submit', logIn);
signupForm.addEventListener('submit', signUp);

function logIn(){
  let handle = handleInput.value;
  let password = passwordInput.value;
  let url = `https://chitter-backend-api.herokuapp.com/sessions`;
  let data = {session: {
    handle: handle,
    password: password
    }
  };

  console.log(`log in called upon with data: ${JSON.stringify(data)}`);

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

function signUp(){
  let newHandle = newHandleInput.value;
  let newPassword = newPasswordInput.value;
  let url = `https://chitter-backend-api.herokuapp.com/users`;
  let data = {session: {
    handle: newHandle,
    password: newPassword
    }
  };
  
  console.log(`sign up called upon with data: ${JSON.stringify(data)}`);

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