const hideAll = () => {
  document.getElementById("chatArea").style.display = "none";
  document.getElementById("postImput").style.display = "none";
  document.getElementById('imgLogo').style.display = 'none';
  document.getElementById('pingui').style.display = 'none';
}

const showChat = () => {
  hideAll();
  document.getElementById("chatArea").style.display = "block";
}