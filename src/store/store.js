import { createStore } from "vuex";
import axios from "axios";
export default createStore({
  state: {
    data: [],
    allDetails: [],
    showLoading: false,
  },

  actions: {
    async passData(context, city) {
      try {
        const response = await axios.get(
          ` https://openweathermap.org/data/2.5/find?q=${city}&appid=439d4b804bc8187953eb36d2a8c26a02&units=metric`
        );
        context.commit("setDetails", response.data);
        // console.log(response.data)
        context.dispatch("sendData", response.data);
        context.commit("loadspinner", false);
      } catch (error) {
        context.commit("loadspinner", false);
        alert("invalid city name.please enter valid cityname");
      }
    },

    async sendData({ commit }, details) {
      let lat = details.list[0].coord.lat;
      let lon = details.list[0].coord.lon;
      const result = await axios.get(
        `https://openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&appid=439d4b804bc8187953eb36d2a8c26a02`
      );

      commit("setGeolocation", result.data);
      // console.log(result.data)
    },
  },
  mutations: {
    loadspinner(state, val) {
      state.showLoading = val;
    },
    setDetails(state, details) {
      state.data = details;
    },

    setGeolocation(state, info) {
      const weatherDetails = info.daily;
      weatherDetails.map((elem) => {
        var utcseconds = elem.dt;
        var d = new Date(0);
        d.setUTCSeconds(utcseconds);
        var convert = d.toDateString();
        var formatDat = convert.slice(0, -5);
        let moment = require("moment");
        const sunrise = elem.sunrise;
        const sunset = elem.sunset;
        const moonrise = elem.moonrise;
        const moonset = elem.moonset;
        let mr = d.setUTCSeconds(moonrise);
        let mst = d.setUTCSeconds(moonset);
        let sr = d.setUTCSeconds(sunrise);
        let st = d.setUTCSeconds(sunset);
        let moonr = moment(mr).format("LT");
        let moonst = moment(mst).format("LT");
        let sunr = moment(sr).format("LT");
        let sunt = moment(st).format("LT");
       
        const point = Math.round(elem.dew_point);
        const temperature = elem.temp;
        const feel = elem.feels_like;
        const wind = elem.wind_speed;
        const humidity = elem.humidity;

        const min = Math.round(elem.temp.min);
        const max = Math.round(elem.temp.max);
        const des = elem.weather[0].description;
        const city = state.data.list[0].name;

        const minMax = {
          date: formatDat,
          min: min,
          max: max,
          description: des,
          name: city,
          sunrise: sunr,
          sunset: sunt,
          dewpoint: point,
          temp: temperature,
          feellike: feel,
          windspeed: wind,
          humi: humidity,
          moonrise: moonr,
          moonset: moonst,
        };
        //  console.log(minMax)
        state.allDetails.push(minMax);
      });
    },
  },
});
