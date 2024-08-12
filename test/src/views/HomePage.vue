<template>
  <div>
    <h1>Data</h1>
    <pre v-for="(dataItem, dataIndex) in selectedCountries" :key="dataIndex" @click="removeDataItem(dataIndex)">
      Click me to remove: {{ dataItem }}
    </pre> 
  </div>
</template>

<script setup>
import { onMounted, watch, reactive } from 'vue';
import { useCountryStore } from '@/stores/countryStore';

const countryStore = useCountryStore();

const selectedCountries = reactive([]);

const fetchData = async () => {
  await countryStore.fetchData();
};

watch(() => countryStore.selectedCountryId, (newId) => {
  function filterDataById(items, id) {
    return items.flatMap(item => {
      if (item.id === id) { return [item] }

      const children = item.children ? filterDataById(item.children, id) : [];

      return children.length ? [{ ...item, children }] : [];
    });
  }

  selectedCountries.push(...filterDataById(countryStore.countryData.data, newId));
});

const removeDataItem = (index) => {
  selectedCountries.splice(index, 1);
};

onMounted(() => {
  fetchData();
});
</script>
