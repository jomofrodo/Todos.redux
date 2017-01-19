/* eslint-disable no-undef */
import _ from 'lodash';

const API = {
  updateProjectSort,
  createTodo, deleteTodo, updateTodo, updateTodoSort
};
export default API;

function toArray(obj) {
  let arr = new Array();
  Object.keys(obj).forEach(function (k) { arr[k] = obj[k] });
  debugger;
  return arr;
}

function kbdAPI(action, args, cb) {
  let url = `/api/kbd`;
  let qString;
  //debugger;
  if (args) {
    qString = "";
     Object.keys(args).forEach(function (k) {
      qString += "&" + k + "=" + args[k];
    });
  }
  //url += "?pAction=" + action;
  url += "/" + action;
  if (qString) url += "?q=true" + qString;
  return fetch(url, {
    accept: 'application/json',
  }).then(checkStatus)
    .then(parseJSON);
  // .then(cb);
}


function createTodo(todo) {
  const action = "CreateTodo";
  return kbdAPI(action, todo);
}
function deleteTodo(todo) {
  const action = "DeleteTodo";
  return kbdAPI(action, todo);
}


function updateTodo(todo) {
  const action = "UpdateTodo";
  return kbdAPI(action, todo);
}

function updateTodoSort(currentSort, cb) {
  const action = "UpdateTodoSort/currentSort/" + currentSort;
  return kbdAPI(action, null, cb);
}
function updateProjectSort(currentSort, cb) {
  const action = "UpdateSectionSort/currentSort/" + currentSort;
  return kbdAPI(action, null, cb);
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


