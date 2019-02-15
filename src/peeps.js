const peepsContainer = document.getElementById('peeps');
const loginbtn = document.getElementById('login-btn');
const postForm = document.getElementById('post-form');
const newPeep = document.getElementById('new-peep');

// EVENT HANDLERS FOR WINDOW

window.onload = () => {
  renderPeeps(); // loads data then fills container with id peeps
  buttonChange(); // determines whether to display log in or sign out
};

loginbtn.addEventListener('click', () => {
  if (sessionStorage.getItem('sessionkey')) {
    signOut();
  } else {
    window.location.href = './login.html';
  }
});

postForm.addEventListener('submit', (event) => {
  postPeep();
  event.preventDefault();
});

// FUNCTIONS FOR EVENT HANDLERS

function signOut() {
  sessionStorage.clear();
  loginbtn.innerHTML = 'Log In';
}

async function renderPeeps() {
  const peepsData = await getPeepsData();
  renderHTML(peepsData);
}

function getPeepsData() {
  return fetch('https://chitter-backend-api.herokuapp.com/peeps')
    .then((response) => {
      return response.json();
    }).then((jsonData) => {
      return jsonData;
    }).catch((err) => {
      console.log('Oops, Something went wrong!', err);
    });
}

function renderHTML(data) {
  let HTMLstring = '';
  let type = '';

  for (let i = 0; i < data.length; i += 1) {
    const likeButtonText = returnLikeButtonText(data[i]);

    if (data[i].user.id === parseInt(sessionStorage.getItem('id'), 10)) {
      type = '';
    } else {
      type = 'hidden';
    }

    HTMLstring += `<p class="bold"> ${data[i].user.handle}: </p> <p class="italics">"${data[i].body}"</p><p> @${data[i].created_at.slice(11, 16)} 
    on ${data[i].created_at.slice(0, 10)}</p> <button ${type} id="delete${data[i].id}" onClick="deletePeep(this.id)">Delete Peep?</button>
    <br><p>liked by ${data[i].likes.length} people <button id="like${data[i].id}" onClick="clickLike(this.id)">${likeButtonText}</button> </p></br>
    <hr>`;
  }

  peepsContainer.insertAdjacentHTML('beforeEnd', HTMLstring);
}

function returnLikeButtonText(data) {
  const likedBy = [];
  for (let i = 0; i < data.likes.length; i += 1) {
    likedBy.push(data.likes[i].user.id);
  }

  const userId = parseInt(sessionStorage.getItem('id'), 10); // parseInt converts string into integer
  if (likedBy.includes(userId)) {
    return 'Unlike';
  }
  return 'Like';
}

function buttonChange() {
  if (sessionStorage.getItem('sessionkey')) {
    loginbtn.innerHTML = 'Sign Out';
  } else {
    loginbtn.innerHTML = 'Log In';
  }
}

function postPeep() {
  const url = 'https://chitter-backend-api.herokuapp.com/peeps';
  const data = { peep: { user_id: sessionStorage.getItem('id'), body: newPeep.value } };

  fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token token=${sessionStorage.getItem('sessionkey')}`,
    },
  }).then(res => res.json())
    .then((response) => {
      console.log('Success!: ', response);
      window.location.reload();
    })
    .catch(error => console.log('Error: ', error));
}

function clickLike(postId) {
  const id = postId.slice(4);
  const url = `https://chitter-backend-api.herokuapp.com/peeps/${id}/likes/${sessionStorage.getItem("id")}`;
  const likeButton = document.getElementById(postId);

  if (likeButton.innerHTML === 'Unlike') {
    unlikePost(url);
  } else {
    likePost(url);
  }
}

function deletePeep(postId) {
  const id = postId.slice(6);
  const url = `https://chitter-backend-api.herokuapp.com/peeps/${id}`;

  fetch(url, {
    method: 'DELETE',
    headers: { Authorization: `Token token=${sessionStorage.getItem('sessionkey')}` },
  })
    .then((response) => {
      console.log('Success!: ', response);
      window.location.reload();
    })
    .catch(error => console.log('Error: ', error));
}

function likePost(url) {
  fetch(url, {
    method: 'PUT',
    headers: { Authorization: `Token token=${sessionStorage.getItem('sessionkey')}` },
  }).then(res => res.json())
    .then((response) => {
      console.log('Success!: ', response);
      window.location.reload();
    })
    .catch(error => console.log('Error: ', error));
}

function unlikePost(url) {
  fetch(url, {
    method: 'DELETE',
    headers: { Authorization: `Token token=${sessionStorage.getItem('sessionkey')}` },
  })
    .then((response) => {
      console.log('Success!: ', response);
      window.location.reload();
    })
    .catch(error => console.log('Error: ', error));
}
