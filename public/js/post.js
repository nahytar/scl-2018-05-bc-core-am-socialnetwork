
const processPostInput = () => {
  const postInput = document.getElementById('postInput');
  if (postInput.value.length < 1) {
    alert('Mensaje vacío')
  } else {
    firebase.database().ref().child('posts').push({
      creator: firebase.auth().currentUser.displayName,
      text: postInput.value,
      starCount: 0
    })
    postInput.value = '';
  }
};


const drawPosts = (snapshot) => {
  let posting = '';
  Object.entries(snapshot.val()).forEach((post) => {
    posting = `
    <ul class="list-group list-group-flush">
     <li class="list-group-item">
       <h6 class='card-title'>${post[1].creator}</h6>
       <p class='card-text text-justify editPost'>${post[1].text}</p>
       <i class="fas fa-trash-alt" id ="eliminarPost" data-postId="${post[0]}" onclick="deletePost(event)"></i>
       <i class="fas fa-edit" id="editPost" data-editPost="${post[1].text}
         "onclick="editPosts(event, drawPosts, uid)">
       </i>
       <i class="fas fa-star" id="botonlike" onClick="like(event)" data-likePost="${post[0]}">
         <span id="likePosts">${post[1].starCount}</span>
       </i>
       
     </li>
    </ul>
    ` + posting;
  });
  document.getElementById('postScreen').innerHTML = posting;
  
};


//borrar post
const deletePost = (event) => {
  event.stopPropagation();
  let confirmar = confirm('¿desea eliminar el post?');
  if(confirmar === true){
  const idPosts = event.target.getAttribute('data-postId');
  firebase.database().ref('posts').child(idPosts).remove();
  }else{}
};

//like post
function like(event){
  event.stopPropagation();
  event.target.style.color = 'red';
 const idLike = event.target.getAttribute('data-likePost');
  firebase.database().ref('posts/' + idLike).once('value', function(post){
    let result = (post.val().starCount || 0)+ 1;
     console.log(result);
     //likePosts.innerHTML = result;
     //likePosts.innerHTML += result;
  firebase.database().ref('posts').child(idLike).update({
    starCount: result
  });
});
};

//editar post

function editPost(){

}
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

