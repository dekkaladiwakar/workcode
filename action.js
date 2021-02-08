var action = {
  pre: function (request) {
    var data = JSON.parse(request.Body);

    data.user_id = request.AuthFields.user_id;
    data.auth_token = request.AuthFields.auth_token;

    for (keys in data.keyValue) {
      data[keys] = data.keyValue[keys];
    }

    delete data.keyValue;

    return {
      Body: JSON.stringify(data),
    };
  },
  post: function (response) {
    var result = app.checkError(response);
    var data = JSON.parse(response.Body);

    if (result.success === true) {
      return result.func(response.Body);
    } else if (result.success === false) {
      return result.func(result.msg, response.Body);
    } else {
      return result.func(result.msg, response.Body);
    }
  },
};
