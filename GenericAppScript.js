/*

App Script

*/

var app = {
  checkError: function (data) {
    var input = data.StatusCode;

    if (input > 500 || data.Body[0] === "<") {
      return {
        success: false,
        func: downTimeError,
        msg: "ServiceM8 is down right now. Try again later.",
      };
    }

    var content = JSON.parse(data.Body);

    if (input == 200) {
      return {
        success: true,
        func: success,
      };
    } else if (input == 201) {
      return {
        success: true,
        func: success,
      };
    } else if (input == 202) {
      return {
        success: true,
        func: success,
      };
    } else if (input == 400) {
      return {
        success: false,
        func: softError,
        msg: content.error,
      };
    } else if (input == 401) {
      return {
        success: false,
        func: expiredAuth,
        msg: content.error,
      };
    } else if (input == 402) {
      return {
        success: false,
        func: error,
        msg: content.error,
      };
    } else if (input == 403) {
      return {
        success: false,
        func: expiredAuth,
        msg: content.error,
      };
    } else if (input == 422) {
      return {
        success: false,
        func: softError,
        msg: content.error,
      };
    } else if (input == 429) {
      return {
        success: false,
        func: rateLimitError,
        msg: content.error,
      };
    } else if (input == 500 || content.error.type === "api_error") {
      return {
        success: false,
        func: retry,
        msg: content.error,
      };
    } else {
      return {
        success: false,
        func: error,
        msg: "Please try again later.",
      };
    }
  },
};
