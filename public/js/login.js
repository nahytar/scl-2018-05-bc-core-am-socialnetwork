const drawLogin = () => {
  var uiConfig = {
    signInSuccessUrl: '/',
    signInOptions: [
      // Leave the lines as is for the providers you want to offer your users.
       firebase.auth.EmailAuthProvider.PROVIDER_ID,
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
     
    ],
    // Terms of service url.
    tosUrl: '/'
  };

  document.getElementById('userData').innerHTML = '';
  // Initialize the FirebaseUI Widget using Firebase.
  var ui = new firebaseui.auth.AuthUI(firebase.auth());
  // The start method will wait until the DOM is loaded.
  ui.start('#firebaseui-auth-container', uiConfig);
}
 // ============================================PROMESAAAA=========================================
function animateElementLeft(element, start, target, duration) { //Retornará promesa con elemento.
  element.style.left = start;
  let counter = 0;
  const delta = (target - start) * 40 / duration; //Delta es lo que se debe mover por cuadro.
  return new Promise((resolve, reject) => { //Acá se está declarando la promesa. Los parametros indican lo que resuelven y lo que se rechaza, cuando se resuelve se llama a resolve() y si no se llama a reject().
      const loop = setInterval(() => { // Toma una funcion y la repite cada ciertos milisegundos.
          const current = start + counter++ * delta; //Acá indicamos el movimientoto, ++counter hace que sume y luego se multiplique. Counter ++ suma después. Formula = posición inicial + velocidad*tiempo.
          element.style.left = current;
          if (start > target && current <= target) { //Acá indicamos cuando queremos que finalize el moviento que seria al llegar a target.
              element.style.left = current;
              clearInterval(loop); //Acá se termina la promesa.
              resolve();//Si queremos pasar una respuesta es a través del parámetro de resolve.
          } else if (start < target && current >= target) {
              element.style.left = current;
              clearInterval(loop); //Acá se termina la promesa.
              resolve();//Si queremos pasar una respuesta es a través del parámetro de resolve.
          }
      }, 40);//40 es lo que se va a demorar en ejecutar la funcion de nuevo, entre cada llamada a la funcion. Frames per second.
  });
}
const allLi = document.getElementsByTagName("li");
Promise.all( //Esto devuelve un arreglo de promesas y ejecutarlas a la vez, se resuelve cuando terminan todas las promesas.
    [
        animateElementLeft(allLi[0], -200, 865, 8000),
        animateElementLeft(allLi[1], -200, 865, 6000)
    ]
).then((results) => {
    console.log("Todas las animaciones llegaron a la derecha.");
    return Promise.all( 
        [
            animateElementTop(allLi[0], 0, 380, 6000),
            animateElementTop(allLi[1], 150, 530, 4000)
        ]
    )
    }).then((results) => {
    }).catch(() => {
      console.log("Falló la animación");
  });
