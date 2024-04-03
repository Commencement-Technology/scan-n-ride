import {parse} from "csv-parse";
import {Vehicle} from "../model/vehicle";

// TODO: move to env vars
const API_URL = "https://www.wroclaw.pl/open-data/datastore/dump/17308285-3977-42f7-81b7-fdd168c210a2"

// TODO: add handling empty response or sth
const parseCSV = (csvString: string): string[][] => {
  const lines = csvString.trim().split('\n');
  const columnsNumber = lines[0].split(',').length
  const parsed: string[][] = Array.from({ length: columnsNumber }).map(() => []);
  lines.map((line) => line.split(',').map((elem, index) => {
    parsed[index].push(elem);
  }))
  return parsed;
}

const fetchVehicles = async () => {
  const parser = parse({
    delimiter: ','
  });
  const response = await fetch(API_URL)
    .then((response) => response.text())
    .then((body) => parseCSV(body))
  // .catch(e => {
  //   // TODO: response
  //   console.error(e);
  // })
  const rowsNumber = response[0].length
  const vehicles: Vehicle[] = []
  for (let i = 1; i < rowsNumber; i++) {
    vehicles.push({
      id: Number(response[0][i]),
      line: response[4][i],
      vehicleNumber: response[1][i],
      position: {
        latitude: Number(response[5][i]),
        longitude: Number(response[6][i])
      }
    })
  }
  return vehicles;
}

export const getVehiclesLines = async (): Promise<string[]> => {
  const vehicles = await fetchVehicles();
  return [...new Set(vehicles.map((vehicle) => vehicle.line))]
    .filter(line => line !== "None" && line !== ""); 
}

export const getVehicles = async (lines: string[]): Promise<Vehicle[]> => {
  const vehicles = await fetchVehicles();
  return vehicles.filter(v => lines.includes(v.line));
}