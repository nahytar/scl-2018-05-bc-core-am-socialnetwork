
const processPostInput = () => {
  const postInput = document.getElementById('postInput');
  firebase.database().ref().child('posts').push({
   creator : firebase.auth().currentUser.displayName,
   text: postInput.value
  });
  postInput.value = '';
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
  const refPosts = firebase.database().ref('posts').child(idPostsLike);
  document.getElementById('likePost').innerHTML = counter++;
}



const drawPosts = (snapshot) => {
  let posting = '';
  Object.entries(snapshot.val()).forEach((post) => {
    posting += `
    <ul class="list-group list-group-flush">
     <li class="list-group-item">
       <h6 class='card-title'>${post[1].creatorName}</h6>
       <p class='card-text text-justify editPost'>${post[1].text}</p>
       <i class="fas fa-trash-alt" id ="eliminarPost" data-postId="${post[0]}" onclick="deletePost(event)"></i>
       <i class="fas fa-edit" id="editPost" data-editPost="" onclick=""></i>
       <p id="likePost"><input type="button" id="botonlike" value="+1" onClick="like(event)" data-likePost="${post[1].key}">0</p>
     </li>
    </ul>
    `;
  });
  document.getElementById('postScreen').innerHTML = posting;
};