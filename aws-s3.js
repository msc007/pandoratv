const AWS = require('aws-sdk');
const dotenv = require('dotenv').config();
const axios= require('axios');
const uuidv5 = require('uuid/v5');
const { wait, contentTypeParser } = require('./utils');
// Create AWS IAM Client
const s3Client = new AWS.S3({
    accessKeyId: process.env.IAM_USER_KEY,
    secretAccessKey: process.env.IAM_USER_SECRET,
});

// Handle upload image url
exports.uploadToS3 = async (url) => {
  try {
    // Download image stream from URL
    const response = await axios({
      method: 'GET',
      url: url,
      responseType: 'stream',
    });

    if(response.status === 200) {
      // Upload image stream to S3 bucket
      const contentType = response.headers['content-type'];
      const fileExtension = contentTypeParser(contentType);
      return s3Client.upload({
        Bucket: process.env.BUCKET_NAME,
        ACL: 'public-read',                             // public-read access
        Key: uuidv5(url, uuidv5.URL) + fileExtension,   // generate unique key based on image URL with file extension
        Body: response.data,                            // upload file
        ContentType: contentType,
      }).promise();
    }
  } catch(err) {
    throw err;
  }
}


/*
function uploadToS3(file) {
  let s3IAM = new AWS.S3({
    accessKeyId: process.env.IAM_USER_KEY,
    secretAccessKey: process.env.IAM_USER_SECRET,
  });
  s3IAM.createBucket(function () {
      var params = {
        Bucket: process.env.BUCKET_NAME,
        Key: file.name,
        Body: file.data
      };
      s3IAM.upload(params, function (err, data) {
        if (err) {
          console.log('error in callback');
          console.log(err);
        }
        console.log('success');
        console.log(data);
      });
  });
}*/
