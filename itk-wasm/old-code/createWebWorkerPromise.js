/**
 * Creates a web worker promise that can be used to run itk.js web workers.
 * @param {string} name The name of the itk.js web worker to create.
 * @param {object} existingWorker An existing web worker to use.
 * @returns {Promise} A promise that resolves to an object containing the web worker promise and the worker.
 */

import WebworkerPromise from 'webworker-promise';
import axios from 'axios';
import config from './itkConfig'; // Internal function to create a web worker promise

var createWebworkerPromise = function createWebworkerPromise(name, existingWorker) {
  if (existingWorker) {
    var _webworkerPromise = new WebworkerPromise(existingWorker);

    return Promise.resolve({
      webworkerPromise: _webworkerPromise,
      worker: existingWorker
    });
  }

  var webWorkerUrl = "".concat(config.itkModulesPath, "/WebWorkers/").concat(name, ".worker.js");

// This function returns a promise for a webworkerPromise and worker, which
// are used to communicate with a webworker. The webworkerPromise is used to
// send messages to the webworker. The worker is used to listen for messages
// from the webworker.
// The webWorkerUrl can be a local file, or a remote file. If it's a local
// file, we create a new Worker with the webWorkerUrl. If it's a remote file,
// we use axios to get the file as a blob, and then create a new Worker with
// that blob as the source.
// We return a promise for an object containing the webworkerPromise, and the
// worker.

if (webWorkerUrl.startsWith('http')) {
    return axios.get(webWorkerUrl, {
      responseType: 'blob'
    }).then(function (response) {
      var worker = new window.Worker(URL.createObjectURL(response.data) // eslint-disable-line
      );
      var webworkerPromise = new WebworkerPromise(worker);
      return {
        webworkerPromise: webworkerPromise,
        worker: worker
      };
    });
  }

  var worker = new window.Worker(webWorkerUrl);
  var webworkerPromise = new WebworkerPromise(worker);
  return Promise.resolve({
    webworkerPromise: webworkerPromise,
    worker: worker
  });
};

export default createWebworkerPromise;