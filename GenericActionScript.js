var action = {
  post: function (response) {
    var result = app.checkError(response);

    if (result.success === true) {
      return result.func(response.Body);
    } else if (result.success === false) {
      return result.func(result.msg, response.Body);
    } else {
      return result.func(result.msg, response.Body);
    }
  },
};

/*

Empty response action 

*/

var action = {
  pre: function (request) {
    return {
      Body: JSON.stringify({}),
    };
  },
  post: function (response) {
    var result = app.checkError(response);

    if (result.success === true) {
      if (response.Body === null) {
        return result.func("{}");
      }
      return result.func(response.Body);
    } else if (result.success === false) {
      return result.func(result.msg, response.Body);
    } else {
      return result.func(result.msg, response.Body);
    }
  },
};
