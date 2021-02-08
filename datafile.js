var x = {
  template_id: "801",
  keyValue: {
    name: "diwakar",
    email: "diwakar@gmail.com",
    number: "43832904832",
  },
};

for (keys in x.keyValue) {
  x[keys] = x.keyValue[keys];
}
delete x.keyValue;
console.log(x);
