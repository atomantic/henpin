const fs = require("fs");

const stateFile = `${__dirname}/../.state.json`;

let pinned = [];

const stateFileExists = fs.existsSync(stateFile);
if (!stateFileExists) {
  fs.writeFileSync(stateFile, JSON.stringify(pinned));
} else {
  pinned = JSON.parse(fs.readFileSync(stateFile).toString());
}

module.exports = {
  pinned,
  save: () => {
    // console.log("saving state");
    fs.writeFileSync(stateFile, JSON.stringify(pinned));
    // console.log("state saved");
  },
};
