const createUser = new XMLHttpRequest();
const signIn = new XMLHttpRequest();

const loginForm = document.getElementById('login-form');
const handleInput = document.getElementById('handle');
const passwordInput = document.getElementById('password');
const signupForm = document.getElementById('singup-form');
const newHandleInput = document.getElementById('newhandle');
const newPasswordInput = document.getElementById('newpassword');

loginForm.addEventListener('submit', event => {
  const handle = handleInput.value;
  const password = passwordInput.value;

  signIn.open('POST', 'https://chitter-backend-api.herokuapp.com/sessions', true);
  signIn.setRequestHeader('Content-Type', 'application/json');
  signIn.send(JSON.stringify({"user": {"handle":`"${handle}"`, "password":`"${password}"`}}));
});

signupForm.addEventListener('submit', event => {
  const newHandle = newHandleInput.value;
  const newPassword = newPasswordInput.value;
  
  createUser.open('POST', 'https://chitter-backend-api.herokuapp.com/users', true);
  createUser.setRequestHeader('Content-Type', 'application/json');
  createUser.send(JSON.stringify({"user": {"handle":`"${newHandle}"`, "password":`"${newPassword}"`}}));
});