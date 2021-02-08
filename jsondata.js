var x =
  "https://api.getform.io/v1/forms/f02ce7a9-bf5b-43e4-9d67-02e06d76b41c?token=WuGQ2HDB9sO1bUKfzjRRJ2FeMIvllWJ3WznAxK7nVBeRXj1BvIa3UbVcCNPt";

console.log(x.lastIndexOf("token"));

var data = x.slice(x.indexOf("token") + "token".length + 1, x[-1]);
console.log(data);

var key = request.AuthFields.api_key;
request.AuthFields.api_key = key.slice(
  key.indexOf("token") + "token".length + 1,
  key[-1]
);
