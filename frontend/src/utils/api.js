import Cookies from "js-cookie";

export function getServerHost() {
  if (process.env.VUE_APP_BACK_HOST) {
    return process.env.VUE_APP_BACK_HOST;
  } else {
    return "http://localhost:8443";
  }
}

function axiosConfig(
  method,
  url,
  data = null,
  //   store = null,
  callback = null,
  callback_error = null
) {
  if (url[0] == "/") {
    url = getServerHost() + url;
  }
  var axios = require("axios");
  let config = {
    method: method,
    url: url,
    headers: {
      "X-CSRFToken": Cookies.get("csrftoken"),
    },
  };
  if (method == "get") {
    config["params"] = data;
  } else {
    // Post
    config["data"] = data;
  }
  axios(config)
    .then((response) => {
      // Extract the data to use it later
      let data = response.data;
      if (data.result != undefined) {
        data = data.result;
      } else if (data.results != undefined) {
        data = data.results;
      }
      // Display log if any
      if (
        data !== null &&
        data !== undefined &&
        data.debug_msg !== null &&
        data.debug_msg !== undefined
      ) {
        console.log("Debug Message:", data.debug_msg);
      }
      // If callback, execute it with the data
      if (callback !== null) {
        callback(data);
      }
    })
    .catch((e) => {
      console.log(e);
      if (callback_error !== null) {
        callback_error(e);
      }
    });
}

function formData(
  model = null,
  field = null,
  value = null,
  extra_params = null
) {
  var FormData = require("form-data");
  var data = new FormData();
  data.append("model", model);
  if (field !== null) {
    data.append("field", field);
    data.append("value", value);
  }
  if (extra_params !== null) {
    data.append("extra_params", extra_params);
  }
  return data;
}
//updating an already existing mission using the data-id by retriving it from the store
export function create_model_data(model, field, value, extra_params, callback) {
  axiosConfig(
    "post",
    "/api/",
    formData(model, field, value, JSON.stringify(extra_params)),
    null,
    callback
  );
}

export function create_data($this, params) {
  create_model_data(
    params.model,
    params.field,
    params.value,
    params.extraparams,
    (data) => {
      console.log(data);
      // If any callback, execute it
      if (params.callback !== undefined) {
        if (Array.isArray(params.callback) === true) {
          for (let idx in params.callback) {
            params.callback[idx](data);
          }
        } else {
          params.callback(data);
        }
      }
    }
  );
}

// export function create_user($this, params) {
//   create_model_data(
//     params.model,
//     params.field,
//     params.value,
//     params.extraparams,
//     (data) => {
//       console.log(data);
//       // If any callback, execute it
//       if (params.callback !== undefined) {
//         if (Array.isArray(params.callback) === true) {
//           for (let idx in params.callback) {
//             params.callback[idx](data);
//           }
//         } else {
//           params.callback(data);
//         }
//       }
//     }
//   );
// }
