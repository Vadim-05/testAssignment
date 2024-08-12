<template>
  <header class="header">
      <Treeselect
      :options="options"
      :value="selectedOption"
      :normalizer="normalizer"
      @update:modelValue="handleValueChange"
      />
  </header>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { useCountryStore } from '@/stores/countryStore';
import Treeselect from 'vue3-treeselect';
import 'vue3-treeselect/dist/vue3-treeselect.css';

const selectedOption = ref(null);
const options = reactive([]); 
const countryStore = useCountryStore();

const handleValueChange = (selectedId) => {
  selectedOption.value = selectedId;
  countryStore.setData(selectedId); 
};

const fetchData = async () => {
  await countryStore.fetchData(); 
  options.push(...countryStore.countryData.data);
};

onMounted(async () => {
  await fetchData();
});

const normalizer = (node) => ({
  id: node.id,
  label: node.name,
  children: node.children,
});
</script>

<style>
.header {
  background-color: silver;
  padding: 20px;
}
</style>