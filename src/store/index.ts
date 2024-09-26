import Vuex from "vuex";

import { airports } from "./modules/airportModule";

export default new Vuex.Store({
  modules: {
    airports: airports,
  },
});