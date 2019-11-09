/*** 
 * Author: Said Chaida 
 * Date: Oct 24 2019
 * ===
 * Starting point.
 * Connects to firebase.
 * Process incoming command and sends feedback to firebase.
***/

var firebase = require("firebase");
var fs       = require("fs");

const workingDirectory = __dirname;

// Load modules
var feedbackModule = require( workingDirectory + '/feedback/feedback' );
var feedback = new feedbackModule();

var ledModule = require( workingDirectory + '/led/led');
var led = new ledModule();

var cameraModule = require( workingDirectory + '/camera/camera');
var camera = new cameraModule();

// Connect to Firebase
const wc = fs.readFileSync( workingDirectory + "/webconfig.json");
const webConfig = JSON.parse (wc);
firebase.initializeApp(webConfig);

// Authenticate the project
const email    = process.env.EMAIL;
const password = process.env.PASSWORD;

firebase.auth()
        .signInWithEmailAndPassword( email, password )
        .catch( function(error) { console.log(error); });

// Listen to incoming command
firebase.auth().onAuthStateChanged(user);

function user(userAuthorized) {

   const node = "4/";
   const dashboardName = process.env.DASHBOARD_NAME;

   if (userAuthorized)
   {
     console.log ("Watching: " + node + dashboardName);
     //
     firebase.database().ref( node + dashboardName).on ("child_changed", processIncomingData );
     feedback.initFeedback(firebase);
   }
}

function processIncomingData (data) {

  try {

     console.log(data.val().controlName)

     if ( data.val().controlName == "Led" ){

        led.switchLed (data.val().payload);
        feedback.sendFeedback(data);
     }

     if ( data.val().controlName == "Bambi Picture" ){

        camera.takePicture();
        camera.uploadPicture();
        feedback.sendFeedback(data);
     }
  }
  catch (e) { console.log ("Error is a: " + e)}
}