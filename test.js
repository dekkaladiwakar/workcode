var app = {
  checkError: function (data) {
    var input = data.StatusCode;

    if (input === 404 && data.Body[0] === "<") {
      return {
        success: false,
        func: softError,
        msg: "ID not found.",
      };
    } else if (input > 500 || data.Body[0] === "<") {
      return {
        success: false,
        func: downTimeError,
        msg: "Tapfiliate is down right now. Try again later.",
      };
    }

    var content = "";

    if (data.Body[1] !== "{") {
      content = JSON.parse(data.Body);
    } else {
      content = data.Body;
    }

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
        msg: content,
      };
    } else if (input == 401) {
      return {
        success: false,
        func: expiredAuth,
        msg: content,
      };
    } else if (input == 402) {
      return {
        success: false,
        func: error,
        msg: content,
      };
    } else if (input == 403) {
      return {
        success: false,
        func: expiredAuth,
        msg: content,
      };
    } else if (input == 422) {
      return {
        success: false,
        func: softError,
        msg: content,
      };
    } else if (input == 429) {
      return {
        success: false,
        func: rateLimitError,
        msg: content,
      };
    } else if (input == 500 || content.type === "api_error") {
      return {
        success: false,
        func: retry,
        msg: content,
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
