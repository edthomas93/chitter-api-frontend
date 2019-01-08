const loginForm = document.getElementById('login-form');
const handleInput = document.getElementById('handle');
const passwordInput = document.getElementById('password');
const signupForm = document.getElementById('singup-form');
const newHandleInput = document.getElementById('newhandle');
const newPasswordInput = document.getElementById('newpassword');

loginForm.addEventListener('submit', event => {
  const handle = handleInput.value;
  const password = passwordInput.value;

  console.log(handle + " " + password);
});

signupForm.addEventListener('submit', event => {
  const newHandle = newHandleInput.value;
  const newPassword = newPasswordInput.value;

  console.log(newHandle + " " + newPassword);
});