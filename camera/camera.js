/*** 
 * Author: Said Chaida 
 * Date: Oct 24 2019
 * ===
 * Takes a picture.
 * Calls upload-image.js to upload the picture to firebase.
***/

function picture() {

    var fs            = require("fs");
    var exec          = require('child_process').execSync;

    const pictureName = __dirname + "/myImage.jpg";

    this.takePicture = function () {

        exec ('fswebcam -S 20 ' + pictureName,  function(error, stdout, stderr) {

          return error;
        });
    }

    this.uploadPicture = function () {

        exec ('node ' + __dirname + '/upload-image.js', function(error, stdout, stderr) {

          console.log (error); return !error;
        });
    }
}
module.exports = picture;
