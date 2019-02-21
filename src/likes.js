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