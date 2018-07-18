const processPostInput = () => {
  const postInput = document.getElementById('postInput');
  if (postInput.value.length < 1) {
    alert('Mensaje vacío')
  } else {
    firebase.database().ref().child('posts').push({
      creator: firebase.auth().currentUser.displayName,
      text: postInput.value,
      counter: counter
    })
    postInput.value = '';
  }
};

const drawPosts = (snapshot) => {
  let posting = '';
  Object.entries(snapshot.val()).forEach((post) => {
    posting += `
    <ul class="list-group list-group-flush">
     <li class="list-group-item">
       <h6 class='card-title'>${post[1].creator}</h6>
       <p class='card-text text-justify editPost'>${post[1].text}</p>
       <i class="fas fa-trash-alt" id ="eliminarPost" data-postId="${post[0]}" onclick="deletePost(event)"></i>
       <i class="fas fa-edit" id="editPost" data-editPost="${post[1].text}" onclick="editPosts(event)"></i>
       <p id="likePost"><input type="button" id="botonlike" value="+1" onClick="like(event)" data-likePost="${post[0]}">0</p>
     </li>
    </ul>
    `;
  });
  document.getElementById('postScreen').innerHTML = posting;
};


//borrar post
const deletePost = (event) => {
  event.stopPropagation();
  const idPosts = event.target.getAttribute('data-postId');
  firebase.database().ref('/posts').child(idPosts).remove();
};

//like post
let counter = 1;
const like = (event) => {
  event.stopPropagation();
  const idPostsLike = event.target.getAttribute('data-likePost');
  firebase.database().ref('posts').child(idPostsLike);
  document.getElementById('likePost').innerHTML = counter++;
};

//editar post

/*function editPosts(event){
  document.getElementById('postInput').value = postInput.value;
  const btnEdit = document.getElementById('sendButtonPost');
  btnEdit.innerHTML = 'editar';
  
  btnEdit.onclick = function() {
    let postingText = document.getElementById('postInput').value;
    const editText = event.target.getAttribute('data-editPost');
    return firebase.database().ref('posts').child(editText).update({
      text: postingText
    }).then(function() {
      console.log('editado');
      btnEdit.innerHTML ='Publicar';
    })
    .catch(function(error){
      console.error('error',error);
    });
  };
};*/

