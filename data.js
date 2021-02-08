var app = {
  checkError: function (data) {
    var input = data.StatusCode;

    if (input > 500 || data.Body[0] === "<") {
      return {
        success: false,
        func: downTimeError,
        msg: "GetForm is down right now. Try again later.",
      };
    }

    var content = JSON.parse(data.Body);

    if (content.code) {
      input = content.code;
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
        msg: content.message,
      };
    } else if (input == 401) {
      return {
        success: false,
        func: expiredAuth,
        msg: content.message,
      };
    } else if (input == 402) {
      return {
        success: false,
        func: error,
        msg: content.message,
      };
    } else if (input == 422) {
      return {
        success: false,
        func: softError,
        msg: content.message,
      };
    } else if (input == 429) {
      return {
        success: false,
        func: rateLimitError,
        msg: content.message,
      };
    } else if (input == 500 || content.error.type === "api_error") {
      return {
        success: false,
        func: retry,
        msg: content.message,
      };
    } else {
      return {
        success: false,
        func: error,
        msg: "Please try again later.",
      };
    }
  },
  toConvertFields: function (customFields) {
    var integratelyFields = [];

    var keys = Object.keys(customFields[0]);

    for (values in customFields) {
      for (value in keys) {
        var dropdownKey = "";
        var searchKey = "";
        var choices = "";
        var parentkey = "";
        var description = "";

        integratelyFields.push({
          label: keys[value],
          name: "customKeys." + keys[value],
          type: typeof (customFields[values] + '["' + keys[value] + ']"'),
          isRequired: false,
          description: description,
          choices: choices,
          parentKey: parentkey,
          dynamicDropdownKey: dropdownKey,
          dynamicSearchKey: searchKey,
        });
      }
    }
    throw JSON.stringify(integratelyFields);
    return integratelyFields;
  },
  outputFields: function () {
    var actionResponseAsJson = executeAction(
      "New form submission is recieved",
      ""
    );
    try {
      var fields = JSON.parse(actionResponseAsJson);
      return JSON.stringify(this.toConvertFields(fields.data.submissions));
    } catch (error) {
      return error;
    }
  },
};
