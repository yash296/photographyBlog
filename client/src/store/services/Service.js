import axios from "axios";

class Service {
  constructor(component, url) {
    this.url = url;
    this.component = component;
  }

  showFail(api, msg) {
    if (typeof this.component === "undefined") return;
    this.component.$Progress.fail();
  }

  postToServer(api, data) {
    return new Promise(async (resolve, reject) => {
      try {
        var res = await axios.post(this.url + api, data);
        if (res.datasuccess) {
          resolve(res.data.msg);
        } else {
          reject(res.data.msg);
          this.showFail(api, res.data.msg);
        }
      } catch (cause) {
        reject(cause);
      }
    });
  }

  getFromServer(api, data) {
    return new Promise(async (resolve, reject) => {
      try {
        var res = await axios.get(this.url + api, {
          params: data
        });
        if (res.data.success) {
          resolve(res.data.msg);
        } else {
          reject(res.data.msg);
        }
      } catch (cause) {
        reject(cause);
      }
    });
  }

  fileUploadToServer(api, fileParameterName, file, parameters, values) {
    return new Promise(async (resolve, reject) => {
      try {
        let formData = new FormData();
        formData.append(fileParameterName, file);
        for (
          let parameterIndex = 0;
          parameterIndex < parameters.length;
          parameterIndex++
        ) {
          let parameter = parameters[parameterIndex];
          let value = values[parameterIndex];
          formData.set(parameter, value);
        }
        let res = await axios.post(this.url + api, formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        });
        if (res.datasuccess) {
          resolve(res.data.msg);
          this.component.$Progress.finish();
        } else {
          reject(res.data.msg);
          this.showFail(api, res.data.msg);
        }
      } catch (cause) {
        this.showFail(api, "NETWORK ERROR");
        reject(cause);
      }
    });
  }

  fileDownloadFromServer(
    api,
    parameterName,
    parameterValue,
    downloadedFileName
  ) {
    return new Promise(async (resolve, reject) => {
      try {
        let myUrl = this.url + api + "?" + parameterName + "=" + parameterValue;

        axios({
          url: myUrl,
          method: "GET",
          responseType: "blob" // important
        }).then(response => {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", downloadedFileName); //or any other extension
          document.body.appendChild(link);
          link.click();
          resolve("done");
        });
      } catch (cause) {
        this.showFail(api, "NETWORK ERROR");
        reject(cause);
      }
    });
  }
}

export default Service;
