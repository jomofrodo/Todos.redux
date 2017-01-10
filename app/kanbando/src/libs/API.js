/* eslint-disable no-undef */
const API = {
  updateProjectSort
};
export default API;


function kbdAPI(action, args, cb) {
  let url = `kdb-api/`;
  if (action) url = `${url}/${action}`;
  if(args){
      args.map(function(el,idx){
          url += "/" + el[0] + "/" + el[1];
      })
  }
  return fetch(url, {
    accept: 'application/json',
  }).then(checkStatus)
    .then(parseJSON);
   // .then(cb);
}


function updateProjectSort(currentSort, cb) {
  const action = "UpdateSectionSort/currentSort/" + currentSort;
  kbdAPI(action, null, cb);
}


function parseJSON(response) {
  return response.json();
}


function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    const error = new Error(`HTTP Error ${response.statusText}`);
    error.status = response.statusText;
    error.response = response;
    console.log(error); // eslint-disable-line no-console
    throw error;
  }
}


