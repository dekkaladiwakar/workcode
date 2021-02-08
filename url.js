var action = {
  post: function (response) {
    if (response.Body[0] === "<" || response.StatusCode > 500) {
      return downTimeError(
        "LionDesk is down, please try again later.",
        response.Body
      );
    }
    var responseBody = JSON.parse(response.Body);

    if (typeof responseBody === "string") {
      return error("Response from the server: " + responseBody, responseBody);
    }

    if (typeof responseBody === "object" && Object.keys(responseBody) !== 0) {
      var result = app.isValid(response);
      if (result !== null) {
        return result.func(result.msg, response.Body);
      }
      if ("code" in responseBody && responseBody.code !== null) {
        //throw response.Body;
        return error(response.Body);
      } else if ("total" in responseBody && responseBody.total > 0) {
        //throw response.Body;
        for (var i = 0; i < responseBody.data.length; i++) {
          if (responseBody.data[i].custom_fields) {
            responseBody.data[i].customKeys = {};
            for (
              var j = 0;
              j < responseBody.data[i].custom_fields.length;
              j++
            ) {
              var key = responseBody.data[i].custom_fields[j].id;
              var value = responseBody.data[i].custom_fields[j].value;
              responseBody.data[i].customKeys[key] = value;
            }
          }
        }
        return success(JSON.stringify(responseBody));
      } else {
        for (var i = 0; i < responseBody.data.length; i++) {
          if (responseBody.data[i].custom_fields) {
            for (
              var j = 0;
              j < responseBody.data[i].custom_fields.length;
              j++
            ) {
              var key = responseBody.data[i].custom_fields[j].id;
              var value = responseBody.data[i].custom_fields[j].value;
              responseBody.data[i][key] = value;
            }
          }
        }
        return success(JSON.stringify(responseBody));
      }
    }
  },

  outputFields: function () {
    var data = app.outputFields();
    return data;
  },
};
