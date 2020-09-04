var aws = require('aws-sdk');
const config = require('../../config/config');

aws.config.update({
  // region: 'us-east-1',
  accessKeyId: config.AWS.S3_KEY,
  secretAccessKey: config.AWS.S3_SECRET_KEY
});
var s3 = new aws.S3();

/**
 * Upload image to aws
 *aws configure list
 * @param {*} base64
 * @returns
 */
function uploadImageToAWS(base64, folder = '', key = null) {
  console.log(key);
  var ext = base64.split(',')[0];
  ext = ext.split(';')[0];
  ext = ext.split('/')[1];
  var nameImage;

  if (key) {
    nameImage = `${key}`;
  } else {
    nameImage = `${new Date().getTime()}.${ext}`;
  }
  console.log(nameImage);
  return new Promise(function(resolve, reject) {
    var decodedImage = new Buffer.from(
      base64.replace(`data:image/${ext};base64,`, ''),
      'base64'
    );
    s3.upload(
      {
        Bucket: `${config.AWS.S3_BUCKET}${folder}`,
        Key: nameImage,
        // Key: `${new Date().getTime()}.${ext}`,
        Body: decodedImage,
        ContentType: `image/${ext}`
      },
      function(err, data) {
        if (err) return reject(err);
        return resolve(data);
      }
    );
  });
}

/**
 * Delete image to aws
 *
 * @param {*} image
 * @returns
 */
function deleteImageFromAWS(image) {
  return new Promise(function(resolve, reject) {
    s3.deleteObject(
      {
        Bucket: config.AWS.S3_BUCKET,
        Key: image
      },
      function(err, data) {
        if (err) return reject(err);
        return resolve(data);
      }
    );
  });
}

function extractKeyFromUrl(url, compare = null) {
  try {
    var array = url.split('/');
    var key = array[array.length - 1];
    if (key == compare) {
      return null;
    } else {
      return key;
    }
  } catch (e) {
    return null;
  }
}

module.exports = {
  uploadImageToAWS,
  deleteImageFromAWS,
  extractKeyFromUrl
};
