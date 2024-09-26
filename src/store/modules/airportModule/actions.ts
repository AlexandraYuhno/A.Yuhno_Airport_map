import { ActionContext } from "vuex";
import { AirportState, Airport } from "@/store/types";
import axios from "axios";

const apiKey = '2BejQXyKdb4YRhft3QrXCg==fMdl33Om85YYq4II';

export default {
  async fetchAirportData({ commit }: ActionContext<AirportState, Airport>, icaoCodes: string[]) {
    try {
      commit("setAirportRequest"); 
      const airportPromises = icaoCodes.map(icao => {
        return axios.get(`https://api.api-ninjas.com/v1/airports?icao=${icao}`, {
          headers: { 'X-Api-Key': apiKey }
        });
      });
      const responses = await Promise.all(airportPromises);
      const airportData: Airport[] = responses
        .map(response => response.data[0]) 
        .filter(Boolean) 
        .map((airport: Airport) => ({
          icao: airport.icao,
          name: airport.name,
          lat: airport.lat,
          lon: airport.lon
        }));
      commit("setAirportSuccess", airportData); 
    } catch (error) {
      commit("setAirportError", error); 
    }
  }
};
