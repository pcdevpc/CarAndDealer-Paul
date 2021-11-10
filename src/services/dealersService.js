import axios from "axios";

let getDealer = (datasetId, dealerid) => {
  const config = {
    method: "GET",
    url: `http://api.coxauto-interview.com/api/${datasetId}/dealers/${dealerid}`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config);
};

export { getDealer };
