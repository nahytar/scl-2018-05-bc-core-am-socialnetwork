const hideAll = () => {
  document.getElementById("chatArea").style.display = "none";
  document.getElementById('imgLogo').style.display = 'none';
  document.getElementById('pingui').style.display = 'none';
  document.getElementById('postArea').style.display = 'none';
}

const showChat = () => {
  hideAll();
  document.getElementById("chatArea").style.display = "block";
}
const showPost = () => {
  hideAll();
  document.getElementById('postArea').style.display = 'block';
}