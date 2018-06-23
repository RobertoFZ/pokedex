/* eslint-disable no-undef */
const REACT_APP_POKE_API_ENDPOINT = process.env.REACT_APP_POKE_API_ENDPOINT;

function get(endpoint, id, params) {
  let endpointID = id ? `/${id}/` : '/';
  let url = `${REACT_APP_POKE_API_ENDPOINT}/${endpoint}${endpointID}?`;
  for (let prop in params) {
    if (params.hasOwnProperty(prop)) {
      url = `${url}${prop}=${params[prop]}&`;
    }
  }
  return fetch(url).then(handleError);
}

function handleError(response) {
  let json = response.status !== 204 ? response.json() : response; // there's always a body
  if (response.status >= 200 && response.status < 300) {
    return json;
  } else {
    return json.then(Promise.reject.bind(Promise));
  }
}

const Api = {get};
export default Api;
