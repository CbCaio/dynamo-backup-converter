var headers = [];
var fs = require("fs");
var readline = require('readline');
var filename = process.argv[2];

fs.readFile(filename, function(err, data) {
  if (err) {
    console.error(err);
  };
  printout(JSON.parse(data.toString('utf-8')));
});

function printout(items) {
  var headersMap = {};
  var values;
  var header;
  var value;

  if (headers.length == 0) {
    if (items.length > 0) {
      for (var i = 0; i < items.length; i++) {
        for (var key in items[i]) {
          headersMap[key] = true;
        }
      }
    }
    for (var key in headersMap) {
      headers.push(key);
    }
    console.log(arrayToCSV(headers))
  }

  for (index in items) {
    values = [];
    for (i = 0; i < headers.length; i++) {
      value = "";
      header = headers[i];
      // Loop through the header rows, adding values if they exist
      if (items[index].hasOwnProperty(header)) {
        if (items[index][header].n) {
          value = items[index][header].n;
        } else if (items[index][header].s) {
          value = items[index][header].s;
        } else if (items[index][header].ss) {
          value = items[index][header].ss.toString();
        } else if (items[index][header].ns) {
          value = items[index][header].ns.toString();
        } else if (items[index][header].b) {
          value = items[index][header].b.toString('base64');
        } else if (items[index][header].m) {
          value = JSON.stringify(items[index][header].m);
        } else if (items[index][header].l) {
          value = JSON.stringify(items[index][header].l);
        } else if (items[index][header].bOOL !== undefined) {
          value = items[index][header].bOOL.toString();
        }
      }
      values.push(value);
    }
    console.log(arrayToCSV(values))
  }
}

function arrayToCSV(array_input) {
  var string_output = "";
  for (var i = 0; i < array_input.length; i++) {
    array_input[i] = array_input[i].replace(/\r?\n/g, "");
    string_output += ('"' + array_input[i].replace(/\"/g, '\\"') + '"')
    if (i != array_input.length - 1) string_output += ","
  };
  return string_output;
}
