const fs = require('fs');
const path = require('path');

const deleteOldFile = (oldFilePath) => {
  return new Promise((resolve, reject) => {
    const filePath = path.join(__dirname, '..', oldFilePath);
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error('Error deleting file:', err);
        reject(err);
      } else {
        console.log('File deleted successfully');
        resolve();
      }
    });
  });
};

module.exports = { deleteOldFile };