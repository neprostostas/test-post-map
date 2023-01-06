<template>
  <div class="map-wrapper-outer">
    <div class="map-wrapper-inner">
      <div class="map-content">
        <div id="map"></div>
        <Modal v-if="modalOpen" @close="closeModal">
          <form @submit.prevent="addMarker">

            <div class="row">
              <label for="name">Name:</label>
              <input type="text" id="name" v-model="markerName" />
            </div>

            <div class="row">
              <label for="lat">Latitude:</label>
              <input type="text" id="lat" v-model="markerLat" disabled />
            </div>

            <div class="row">
              <label for="lng">Longitude:</label>
              <input type="text" id="lng" v-model="markerLng" disabled />
            </div>

            <button type="submit" :disabled="!markerName">Add Marker</button>
          </form>
        </Modal>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watch, onMounted } from 'vue';
import L from 'leaflet';
import "leaflet/dist/leaflet.css"
import Modal from "@/components/Modal.vue";

export default {
  components: {Modal},
  setup() {
    const map = ref(null);
    const marker = ref(null);
    const modalOpen = ref(false);
    const markerName = ref('');
    const markerLat = ref(0);
    const markerLng = ref(0);

    watch(marker, () => {
      if (marker.value) {
        marker.value.remove();
        marker.value = null;
      }
    });

    const openModal = (lat, lng) => {
      markerLat.value = lat;
      markerLng.value = lng;
      modalOpen.value = true;
    };

    const closeModal = () => {
      markerName.value = ''
      modalOpen.value = false;
    };

    const addMarker = () => {

      const icon = L.icon({
        iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
        iconSize: [22, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32]
      });

      const newMarker = L.marker([markerLat.value, markerLng.value],{icon}).addTo(map.value);
      newMarker.bindPopup(markerName.value).openPopup();

      newMarker.bindPopup(`<p>${markerName.value}</p>`);
      newMarker.on('mouseover', e => {
        e.target.openPopup();
      });
      newMarker.on('mouseout', e => {
        e.target.closePopup();
      });

      const storedMarkers = JSON.parse(localStorage.getItem('markers') || '[]');
      storedMarkers.push({ name: markerName.value, lat: markerLat.value, lng: markerLng.value });
      localStorage.setItem('markers', JSON.stringify(storedMarkers));

      closeModal();
    };

    onMounted(()=>{

      const icon = L.icon({
        iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
        iconSize: [22, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32]
      });

      map.value = L.map('map').setView([49, 32], 6);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map.value);
      map.value.on('click', e => openModal(e.latlng.lat, e.latlng.lng));

      const storedMarkers = JSON.parse(localStorage.getItem('markers'));
      if (storedMarkers) {
        storedMarkers.forEach(m => {
          const marker = L.marker([m.lat, m.lng],{icon}).addTo(map.value);
          marker.bindPopup(m.name).openPopup();

          marker.bindPopup(`<p>${m.name}</p>`);
          marker.on('mouseover', e => {
            e.target.openPopup();
          });
          marker.on('mouseout', e => {
            e.target.closePopup();
          });

        });
      }})

    return {
      map,
      marker,
      modalOpen,
      markerName,
      markerLat,
      markerLng,
      openModal,
      closeModal,
      addMarker
    };
  },
};
</script>

<style scoped>

#map {
  width: 100vw;
  height: 700px;
}

.map-wrapper-outer {
  background: #ffffff;
}

.map-wrapper-inner {
  /*max-width: 1200px;*/
  /*margin: 0 auto;*/
  padding-top: 72px;
  background: rgba(255, 255, 255, 0.2);
}

input {
  border: 1px solid #d7def9;
  border-radius: 6px;
  padding: 11px;
  font-weight: 400;
  font-size: 16px;
}

input:disabled {
  color: #000000;
  background: rgba(162, 162, 162, 0.6);
  opacity: .3;
}

.row {
  padding: 5px 0;
  display: grid;
  grid-template-columns: repeat(2, auto);
  justify-content: space-between;
  align-items: center;
  gap: 20px;
}

button {
  width: 100%;
  margin-top: 10px;
  padding: 10px;
  border: none;
  font-style: normal;
  font-weight: 600;
  font-size: 19px;
  text-align: center;
  color: #fff;
  background: #f1bf3c;
  border-radius: 6px;
}

button:disabled {
  cursor: unset;
  background: rgba(162, 162, 162, 0.49);

}

</style>