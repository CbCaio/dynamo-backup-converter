var fs = require("fs");
var readline = require('readline');
var rl = readline.createInterface({
  input: fs.createReadStream(process.argv[2])
});

var arr = [];

rl.on('line', function(line) {
    arr.push(line + ',');
  })
  .on('close', () => {
    for (line in arr) {
      switch (parseInt(line)) {
        case 0:
          console.log('[' + arr[line]);
          break;
        case (arr.length - 1):
          console.log(arr[line].slice(0, arr[line].length - 1) + ']');
          break;
        default:
          console.log(arr[line]);
          break;
      }
    }
    process.exit(0);
  });
