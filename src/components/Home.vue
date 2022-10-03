<template>
  <div>
    <div class="search-box">
      <input type="text" v-model="cityName" placeholder="search city..." @input="onSearch" />
      <button @click="getData()">search</button>
    </div>
    <div class="header">
      <h2>8-Day Forecast</h2>
    </div>

    <div class="container" v-if="allDetails != ''">

      <div v-for="inf in allDetails" :key="inf.date" class="contai">
        <div>
          <p class="first">{{ inf.date }}</p>
        </div>

        <div>
          <p class="second">
            <font-awesome-icon icon="fa-solid fa-cloud-showers-heavy" v-if="inf.description === 'very heavy rain'" />
            <font-awesome-icon icon="fa-solid fa-cloud-showers-water"
              v-if="inf.description === 'heavy intensity rain'" />
            <font-awesome-icon icon="fa-sharp fa-solid fa-cloud-rain" v-if="inf.description === 'light rain'" />
            <font-awesome-icon icon="fa-sharp fa-solid fa-cloud-rain" v-if="inf.description === 'moderate rain'" />
            <font-awesome-icon icon="fa-solid fa-cloud" v-if="inf.description === 'scattered clouds'" />
            <font-awesome-icon icon="fa-solid fa-circle" v-if="inf.description === 'clear sky'" />
            <font-awesome-icon icon="fa-solid fa-cloud-bolt" v-if="inf.description === 'broken clouds'" />
            <font-awesome-icon icon="fa-solid fa-cloud" v-if="inf.description === 'few clouds'" />
            <font-awesome-icon icon="fa-solid fa-cloud" v-if="inf.description === 'overcast clouds'" />

            {{ inf.max }}/{{ inf.min }}&#8451;
          </p>
        </div>

        <div>
          <p class="third">{{ inf.description }}</p>
        </div>

        <div>
          <button @click="save(inf)">Details</button>
        </div>
      </div>

      <div v-if="details" class="details">
        <div>
          <p>
            <font-awesome-icon icon="fa-solid fa-cloud-showers-heavy"
              v-if="showDetails.description === 'very heavy rain'" />
            <font-awesome-icon icon="fa-solid fa-cloud-showers-water"
              v-if="showDetails.description === 'heavy intensity rain'" />
            <font-awesome-icon icon="fa-sharp fa-solid fa-cloud-rain" v-if="showDetails.description === 'light rain'" />
            <font-awesome-icon icon="fa-sharp fa-solid fa-cloud-rain"
              v-if="showDetails.description === 'moderate rain'" />
            <font-awesome-icon icon="fa-solid fa-cloud" v-if="showDetails.description === 'scattered clouds'" />
            <font-awesome-icon icon="fa-solid fa-circle" v-if="showDetails.description === 'clear sky'" />
            <font-awesome-icon icon="fa-solid fa-cloud-bolt" v-if="showDetails.description === 'broken clouds'" />
            <font-awesome-icon icon="fa-solid fa-cloud" v-if="showDetails.description === 'few clouds'" />
            <font-awesome-icon icon="fa-solid fa-cloud" v-if="showDetails.description === 'overcast clouds'" />
            {{ showDetails.description }}
          </p>
          <p>
            The High will be {{ showDetails.max }}&#8451; and Low will be
            {{ showDetails.min }}&#8451;
          </p>
          <p><strong>Humidity</strong> {{ showDetails.humi }}%</p>
          <p>Dew Point: {{ showDetails.dewpoint }}&#8451;</p>
          <p>Wind Speed: {{ showDetails.windspeed }}</p>
          <div>
            <table>
              <tr>
                <th></th>
                <th>Morning</th>
                <th>AfterNoon</th>
                <th>Evening</th>
                <th>Night</th>
              </tr>
              <tr>
                <td>Temperature</td>
                <td>{{ Math.round(showDetails.temp.morn) }}&#8451;</td>
                <td>{{ Math.round(showDetails.temp.day) }}&#8451;</td>
                <td>{{ Math.round(showDetails.temp.eve) }}&#8451;</td>
                <td>{{ Math.round(showDetails.temp.night) }}&#8451;</td>
              </tr>
              <tr>
                <td>Feels Like</td>
                <td>{{ Math.round(showDetails.feellike.morn) }}&#8451;</td>
                <td>{{ Math.round(showDetails.feellike.day) }}&#8451;</td>
                <td>{{ Math.round(showDetails.feellike.eve) }}&#8451;</td>
                <td>{{ Math.round(showDetails.feellike.night) }}&#8451;</td>
              </tr>
            </table>
          </div>
          <br />

          <div class="tab">
            <table>
              <tr>
                <th>Sunrise</th>
                <th>Sunset</th>
                <th>Moonrise</th>
                <th>Moonset</th>
              </tr>

              <tr>
                <td>{{ showDetails.sunrise }}</td>
                <td>{{ showDetails.sunset }}</td>
                <td>{{ showDetails.moonrise }}</td>
                <td>{{ showDetails.moonset }}</td>
              </tr>
            </table>
          </div>

          <button @click="Close">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      value: "",
      cityName: "",
      details: false,
      showDetails: {},
    };
  },
  methods: {
    getData() {
      this.$store.dispatch("passData", this.cityName),
        this.$store.commit("loadspinner", true);
    },
    save(e) {
      this.showDetails = "";
      this.showDetails = e;
      this.details = true;
    },
    Close() {
      this.details = false;
    },
  },
  computed: {
    ...mapState(["allDetails"]),
  },
};
</script>

<style scoped>
.header {
  margin-left: 37%;
  margin-top: 3%;
}

.container {
  text-align: center;
  width: 38%;
  margin-left: 32rem;
  padding: 1rem;
  font-size: 20px;
}

.contai {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
}

.search-box {
  text-align: center;
}

input {
  height: 30px;
  width: 14rem;
  font-size: 18px;
  border-radius: 7px;
}

button {
  margin-left: 1.2rem;
  height: 35px;
  border-radius: 7px;
  font-size: 18px;
  cursor: pointer;
  margin-top: 0.8rem;
}

h3 {
  margin-left: 33rem;
  margin-top: 2.5rem;
  font-size: 18px;
}

.details {
  top: 20%;
  left: 32%;
  text-align: left;
  position: fixed;
  width: 40%;
  border: 1px solid transparent;
  padding: 0.9rem;
  border-radius: 8px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
}

table {
  width: 38.2rem;
  border: 1px solid transparent;
}

td,
th {
  text-align: left;
  margin: 0.7rem;
  padding: 0.7rem;
  background-color: antiquewhite;
  border-radius: 10px;
}
</style>
