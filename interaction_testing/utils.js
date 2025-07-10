const Path = require("path");
const { existsSync, readdirSync, lstatSync, unlinkSync } = require("fs");

async function sleep(time) {
  return new Promise((resolve) => {
    console.log(`Sleeping for ${time} ms`);
    setTimeout(resolve, time);
  });
}

function deleteFolderRecursive(path) {
  try {
    if (fs.existsSync(path)) {
      fs.readdirSync(path).forEach((file, index) => {
        const curPath = Path.join(path, file);
        if (fs.lstatSync(curPath).isDirectory()) {
          deleteFolderRecursive(curPath);
        } else {
          fs.unlinkSync(curPath);
        }
      });
      fs.rmdirSync(path);
    }
  } catch {
    console.log("Un able to delete folder");
  }
}

module.exports = { sleep, deleteFolderRecursive };
