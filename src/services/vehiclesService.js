import axios from "axios";

var endpoint = `http://api.coxauto-interview.com/api`;

let getAllVehicles = (datasetId) => {
  const config = {
    method: "GET",
    url: `${endpoint}/${datasetId}/vehicles`,

    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config);
};

let getVehicle = (datasetId, vehicleid) => {
  const config = {
    method: "GET",
    url: `${endpoint}/${datasetId}/vehicles/${vehicleid}`,

    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config);
};

const exportedObject = {
  getAllVehicles,
  getVehicle,
};

export default exportedObject;
