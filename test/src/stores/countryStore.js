import { defineStore } from 'pinia';

export const useCountryStore = defineStore('country', {
  state: () => ({
    selectedCountryId: null, 
    countryData: null, 
  }),
  actions: {
    setData(selectedId) {
      this.selectedCountryId = selectedId; 
    },
    async fetchData() {
      try {
        const response = await fetch('/data/data.json');
        const jsonData = await response.json(); 
        this.countryData = jsonData; 
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
  },
});
