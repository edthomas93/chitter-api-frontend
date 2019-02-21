const loginForm = document.getElementById('login-form');
const handleInput = document.getElementById('handle');
const passwordInput = document.getElementById('password');
const signupForm = document.getElementById('signup-form');
const newHandleInput = document.getElementById('newhandle');
const newPasswordInput = document.getElementById('newpassword');

function returnHome() {
  window.location.href = './index.html';
}

function setSessionItems(response, username) {
  sessionStorage.setItem('username', username);
  sessionStorage.setItem('id', response.user_id);
  sessionStorage.setItem('sessionkey', response.session_key);
}

function logIn(userHandle, userPassword) {
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
        setSessionItems(response, userHandle);
        returnHome();
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
      logIn(newHandle, newPassword);
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
  const handle = handleInput.value;
  const password = passwordInput.value;
  logIn(handle, password);
});

signupForm.addEventListener('submit', function (event) {
  event.preventDefault();
  signUp();
});
