function getJSON(url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    // Send cookies
    xhr.withCredentials = true;

    // Handle failures
    // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/status
    const fail = () => {
      const error = new Error(xhr.status);
      error.request = xhr;
      reject(error);
    };

    // Successfully made the request
    xhr.addEventListener("load", () => {
      const { response } = xhr;

      // Something went wrong either with the request or server
      if (xhr.status >= 400) {
        fail();
        return;
      }

      // Parse JSON responses
      try {
        resolve(JSON.parse(response));
      } catch (e) {
        reject(e);
      }
    });

    // Request failed
    xhr.addEventListener("error", fail);

    // Start the request
    xhr.open("GET", url, true);

    // Send data if passed
    xhr.send();
  });
}
