// setTimeOut wrapper for async/await
exports.wait = (min, max) => {
  const randTime = Math.floor(Math.random() * (max - min + 1) + min) * 1000;
  return new Promise(resolve => {
    setTimeout(resolve, randTime);
  });
}
/* Get the image extension
exports.getFileExtension = (url) => {
  const fileIndex = url.lastIndexOf('/');
  const fileName = fileIndex !== -1 ? url.substring(fileIndex) : url;
  const sanitizeIndex = fileName.indexOf('?');
  const sanitizedFileName = sanitizeIndex !== -1 ? fileName.substring(0, sanitizeIndex) : fileName;
  const extensionIndex = sanitizedFileName.lastIndexOf('.');
  return extensionIndex !== -1 ? sanitizedFileName.substring(extensionIndex) : '';
}*/

// Parse content-type header to file extension (based on MDN web doc)
exports.contentTypeParser = (contentType) => {
  switch(contentType) {
    case 'image/jpeg':
      return  '.jpg';
    case 'image/png':
      return '.png';
    case 'image/gif':
      return '.gif';
    case 'image/x-icon':
      return '.ico';
    case 'image/svg+xml':
      return '.svg';
    case 'image/apng':
      return '.apng';
    case 'image/bmp':
      return '.bmp';
    case 'image/webp':
      return '.webp';
    case 'image/tiff':
      return '.tif';
    default:
      throw new Error('Error occured: Unsupported image type.');
  }
}