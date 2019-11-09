 /*** 
 * Author: Said Chaida 
 * Date: Oct 24 2019
 * ===
 * Uploads an image to firebase.
***/
 
 
 const fs        = require('fs');
 const {Storage} = require('@google-cloud/storage');

 const fileName = __dirname + '/myImage.jpg';
 const fileDestination = 'images/myImage.jpg';
 const bucketName = 'ethereal-creek-201622.appspot.com';
 const metadata = 'image/jpeg'

 const storage = new Storage({
   keyFilename: __dirname + '/keyFilename.json'
 });

 const bucket = storage.bucket(bucketName);
 const file = bucket.file(fileDestination);

 fs.createReadStream(fileName)
   .pipe(file.createWriteStream({ 
      metadata: { contentType: metadata }
   }))
   .on('error', function(err) { 
      console.log ("there was a problem"); console.log (err);
   })
   .on('finish', function() {
     // The file upload is complete.
      console.log ("check the storage");
   });