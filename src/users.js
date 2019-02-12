const loginForm = document.getElementById('login-form');
const handleInput = document.getElementById('handle');
const passwordInput = document.getElementById('password');
const signupForm = document.getElementById('singup-form');
const newHandleInput = document.getElementById('newhandle');
const newPasswordInput = document.getElementById('newpassword');

loginForm.addEventListener('submit', function (event) {
  event.preventDefault();
  logIn();
});
signupForm.addEventListener('submit', function (event) {
  event.preventDefault();
  signUp();
});

function logIn() {
  const handle = handleInput.value;
  const password = passwordInput.value;
  const url = 'https://chitter-backend-api.herokuapp.com/sessions';
  const data = { session: { handle: handle, password: password } };

  fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(res => res.json())
    .then((response) => {
      console.log('Success!: ', response);
      sessionStorage.setItem('id', response.user_id);
      sessionStorage.setItem('sessionkey', response.session_key);
      location.href = './index.html';
    })
    .catch(error => console.error('Error: ', error));
}

function signUp() {
  const newHandle = newHandleInput.value;
  const newPassword = newPasswordInput.value;
  const url = 'https://chitter-backend-api.herokuapp.com/users';
  const data = { user: { handle: newHandle, password: newPassword } };

  fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(res => res.json())
    .then((response) => {
      console.log(response);
      newHandleInput.value = '';
      newPasswordInput.value = '';
    })
    .catch(error => console.error(error));
}
