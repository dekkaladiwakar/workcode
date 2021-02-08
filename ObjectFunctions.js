/*

***********************
Rename Keys of a Object
***********************

var x = {
  a: "a",
  b: "b",
};

for (keys in x) {
  temp_key = keys;
  keys = "c_" + keys;
  x[keys] = x[temp_key];
  delete x[temp_key];
}

console.log(x);

******************************************
Adding key/values of one Object to another
******************************************

var x = {
  a: 1,
  b: 2,
};

var y = {
  c: 3,
  d: 4,
};

for (keys in y) {
  x[keys] = y[keys];
}

console.log(x);

********************
Push keys of a Object into an array.
********************

var data = {
  x: {
    a: 1,
    b: 2,
  },
  y: {
    c:3,
    d: 4,
  }
};
var temp = [];

for (keys in data) {
  temp.push(data[keys]);
}

console.log(temp);

*******************************************************************
Add comma seperated string values into an object as key/value pairs
*******************************************************************

var key = "a, b, c, d";
var value = "1, 2, 3, 4";

var keySplit = key.split(",");
var valueSplit = value.split(",");

for (values in keySplit) {
  keySplit[values] = keySplit[values].trim();
}

for (values in valueSplit) {
  valueSplit[values] = valueSplit[values].trim();
}

if (keySplit.length === valueSplit.length) {
  var properties = {};
  for (i = 0; i < keySplit.length; i++) {
    properties[keySplit[i]] = valueSplit[i];
  }
}

console.log(properties);
*/
