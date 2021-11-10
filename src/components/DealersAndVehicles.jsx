import React from "react";
import dataSetService from "../services/dataSetService";
import * as dealersService from "../services/dealersService";
import vehiclesService from "../services/vehiclesService";

class DealersAndVehicles extends React.Component {
  state = {
    dataSetId: "",
    dealerId: [],
    dealers: [],
    vehicles: [],
    result: {},
  };
  componentDidMount() {
    dataSetService
      .getDataSet()
      .then(this.onGetDataSetIdSuccess)
      .catch(function (response) {
        console.warn(response);
      });
  }
  onGetDataSetIdSuccess = (response) => {
    let newDataSetId = response.data.datasetId;
    console.log(newDataSetId);
    this.setState((prevstate) => {
      return { dataSetId: newDataSetId };
    });

    vehiclesService
      .getAllVehicles(newDataSetId)
      .then(this.onGetAllVehiclesSuccess)
      .catch(function (response) {
        console.warn(response);
      });
  };

  onGetAllVehiclesSuccess = (response) => {
    console.log(response);
    let vehicleIdsArray = response.data.vehicleIds;
    vehicleIdsArray.map(this.mapVehicles);
  };

  mapVehicles = (vehicleId) => {
    vehiclesService
      .getVehicle(this.state.dataSetId, vehicleId)
      .then(this.onGetVehicleSuccess)
      .catch(function (response) {
        console.warn(response);
      });
  };

  onGetVehicleSuccess = (response) => {
    console.log(response);
    const { dealerId } = this.state;
    let tempArr = [...dealerId];
    console.log(tempArr);
    if (tempArr.includes(response.data.dealerId) === true) {
      this.setState((prevState) => ({
        vehicles: [...prevState.vehicles, response.data],
      }));
    } else {
      this.setState((prevState) => ({
        vehicles: [...prevState.vehicles, response.data],
        dealerId: [...prevState.dealerId, response.data.dealerId],
      }));
      dealersService
        .getDealer(this.state.dataSetId, response.data.dealerId)
        .then(this.onGetDealerSuccess)
        .catch(function (response) {
          console.log(response);
        });
    }
  };

  onGetDealerSuccess = (response) => {
    console.log(response);
    let dealer = response.data;
    this.setState((prevState) => ({
      dealers: [...prevState.dealers, dealer],
    }));
    this.mergeData();
  };

  mergeData() {
    let vehicles = [...this.state.vehicles];
    console.log(vehicles);
    let dealers = [...this.state.dealers];

    for (let j = 0; j < dealers.length; j++) {
      for (let i = 0; i < vehicles.length; i++) {
        if (dealers[j].dealerId === vehicles[i].dealerId) {
          let final = {
            vehicleId: vehicles[i].vehicleId,
            year: vehicles[i].year,
            make: vehicles[i].make,
            model: vehicles[i].model,
          };
          if (!dealers[j].vehicles) {
            console.log(final);
            dealers[j].vehicles = [final];
          } else if (
            !dealers[j].vehicles.some((k) => k.vehicleId === final.vehicleId)
          ) {
            console.log(dealers[j], final);
            dealers[j].vehicles.push(final);
          }
        }
      }
    }
    let finalDealers = { dealers: dealers };
    console.log(finalDealers);
    dataSetService
      .add(this.state.dataSetId, finalDealers)
      .then(this.onAddSuccess)
      .catch(function (response) {
        console.warn(response);
      });
  }

  onAddSuccess = (response) => {
    console.log({ success: response.data });

    this.setState(() => ({
      result: response.data,
    }));
  };
  render() {
    return (
      <>
        <header>DataSetID: {this.state.dataSetId}</header>
        <div>Total Milli Sec: {this.state.result.totalMilliseconds}</div>
        <div>{this.state.result.message}</div>
      </>
    );
  }
}
export default DealersAndVehicles;
