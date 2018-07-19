
  window.onload =(() =>{
  //DECLARACION 
const chatArea = document.getElementById('chatArea');
const postArea = document.getElementById('postArea');
const sectionactividades = document.getElementById('sectionactividades');
const sectionautorizacion= document.getElementById('sectionautorizacion');
const sectionreunion= document.getElementById('sectionreunion');
const sectioncalendario= document.getElementById('sectioncalendario');
const imgLogo= document.getElementById('imgLogo');
const profileArea = document.getElementById('profileArea');
}); 
//PRENDIDO Y APAGADO


const btncalendario = document.getElementById('calendario');
btncalendario.addEventListener('click', () => {
  console.log('hola')
  sectionactividades.style.display = 'none';
  sectionautorizacion.style.display = 'none';
  sectionreunion.style.display = 'none';
  sectioncalendario.style.display = 'block';
  chatArea.style.display = "none";
  imgLogo.style.display = 'none';
  postArea.style.display = 'none';
  profileArea.style.display = 'none';

 }); 
