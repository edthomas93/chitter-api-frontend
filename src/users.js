const loginForm = document.getElementById('login-form');
const handleInput = document.getElementById('handle');
const passwordInput = document.getElementById('password');
const signupForm = document.getElementById('singup-form');
const newHandleInput = document.getElementById('newhandle');
const newPasswordInput = document.getElementById('newpassword');

function logIn() {
  const userHandle = handleInput.value;
  const userPassword = passwordInput.value;
  const url = 'https://chitter-backend-api.herokuapp.com/sessions';
  const data = { session: { handle: userHandle, password: userPassword } };

  fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(res => res.json())
    .then((response) => {
      if (response.user_id) {
        sessionStorage.setItem('username', handleInput.value);
        sessionStorage.setItem('id', response.user_id);
        sessionStorage.setItem('sessionkey', response.session_key);
        window.location.href = './index.html';
      } else {
        alert(`Log in failed, please re-enter credentials`);
        clearFields();
      }
    })
    .catch((error) => {
      console.log('Error: ', error);
      clearFields();
      alert('Log in failed, username does not exist');
    });
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
  }).then((res) => {
    if (res.status === 422) {
      alert('Creation failed, username already taken');
    } else {
      alert(`Account created, username ${newHandleInput.value}`);
    }
    clearFields();
  })
    .catch(error => console.log(error));
}

function clearFields() {
  newHandleInput.value = '';
  newPasswordInput.value = '';
  handleInput.value = '';
  passwordInput.value = '';
}

loginForm.addEventListener('submit', function (event) {
  event.preventDefault();
  logIn();
});

signupForm.addEventListener('submit', function (event) {
  event.preventDefault();
  signUp();
});
