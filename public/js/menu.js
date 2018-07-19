const addListenerToClass = (className, callback) => {
  const elements = document.getElementsByClassName(className);
  for (let i = 0; i < elements.length; i++) {
    elements.item(i).addEventListener('click', callback);    
  }
};

const hideAll = () => {
  document.getElementById("chatArea").style.display = "none";
  document.getElementById('imgLogo').style.display = 'none';
  document.getElementById('postArea').style.display = 'none';
  document.getElementById('profileArea').style.display = 'none';
  document.getElementById('sectioncalendario').style.display = 'none';
  document.getElementById('sectionreunion').style.display = 'none';
  document.getElementById('sectionautorizacion').style.display = 'none';
  document.getElementById('sectionactividades').style.display = 'none';
}

const showChat = () => {
  hideAll();
  document.getElementById("chatArea").style.display = "block";
}
const showPost = () => {
  hideAll();
  document.getElementById('postArea').style.display = 'block';
}
const showProfile = () => {
  hideAll();
  document.getElementById('profileArea').style.display = 'block';
}
const showCalendario = () => {
  hideAll();
  document.getElementById('sectioncalendario').style.display = 'block';
}
const showReunion = () => {
  hideAll();
  document.getElementById('sectionreunion').style.display = 'block';
}
const showAutorizacion = () => {
  hideAll();
  document.getElementById('sectionautorizacion').style.display = 'block';
}
const showActividades = () => {
  hideAll();
  document.getElementById('sectionactividades').style.display = 'block';
}