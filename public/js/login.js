const drawLogin = () => {
    document.getElementById('imgLogo').style.display = 'block';
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

const singOut = () => {
    firebase.auth().signOut()
}