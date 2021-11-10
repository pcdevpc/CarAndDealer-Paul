import axios from "axios";

var endpoint = "http://api.coxauto-interview.com/api";

let getDataSet = () => {
  const config = {
    method: "GET",
    url: `${endpoint}/datasetId`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config);
};

let add = (datasetId, payload) => {
  const config = {
    method: "POST",
    url: `${endpoint}/${datasetId}/answer`,
    data: payload,
    crossdomain: true,
    headers: { "Content-Type": "application/json-patch+json" },
  };
  return axios(config);
};

const exportedObject = {
  getDataSet,
  add,
};

export default exportedObject;
