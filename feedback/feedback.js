/*** 
 * Author: Said Chaida 
 * Date: Oct 24 2019
 * ===
 * This script sends a feedback to firebase to 
 * confirm a command was received.
***/

function feedback() {

  var   firebase     = require("firebase");
  const feedbackNode = 2;
  var   status       = 0;

  this.sendFeedback = function(data)
  {
    var dashboard     = data.ref.parent.key;  // Get the dshboard name
    var controlName   = data.val().controlName;
    var payload       = data.val().payload ;
    var type          = data.val().type;

    status = (status==0)? 1: 0 // Force node update

    updateFeedbackNode(dashboard, controlName, status);
    printToConsole(data);
  }

  this.initFeedback = function(firebase) {

    this.firebase = firebase;
    updateFeedbackNode(" "," "," ");
  }

  updateFeedbackNode = function (dashboard, controlName, status) {

    firebase
    .database()
    .ref(feedbackNode)
    .set({
    	"dashboard"  : dashboard,
        "controlName": controlName,
        "status"     : status
        });
  }

  function printToConsole (data) {

    var dashboard   = data.ref.parent.key;  // Get the dashboard name
    var controlName = data.val().controlName;
    var payload     = data.val().payload ;
    var type        = data.val().type;

    console.log(" Dashboard: " + dashboard );
    console.log(" Control:   " + controlName);
    console.log(" Type:      " + type);
    console.log(" payload:   " + payload);
    console.log("---");
  }
}

module.exports = feedback;
