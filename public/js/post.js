
const processPostInput = () => {

  firebase.database().ref('posts')
  .limitToLast(7)
  .on('child_added', (newPost) => {

    postScreen.innerHTML += `
    <ul class="list-group list-group-flush" id ="${newPost.key}">
    <li class="list-group-item">
    <h6 class='card-title'>${newPost.val().creatorName}</h6>
    <p class='card-text text-justify'>${newPost.val().text}</p>
    <i class="fas fa-trash-alt" id ="eliminarPost" data-postId="${newPost.key}" onclick="deletePost(event)"></i>
    </li>
    </ul>
    `;
  })

  const currentUser = firebase.auth().currentUser;
  const postInputText = postInput.value;
  postInput.value = '';
  // para obtener una nueva llave de la coleccion posts
  let newPostsKey = firebase.database().ref().child('posts').push().key;
  
  firebase.database().ref(`posts/${newPostsKey}`).set({
   //creator: currentUser.displayName,
   creator : currentUser.uid,
   creatorName: currentUser.displayName,
   text: postInputText
  });
}


function deletePost(event) {
  event.stopPropagation();
  const idPosts = event.target.getAttribute('data-postId');
  const refPosts = firebase.database().ref('posts').child('idPosts');
  refPosts.remove();
  postScreen.removeChild(postScreen.childNodes[0] && postScreen.childNodes[1]);

}

  



