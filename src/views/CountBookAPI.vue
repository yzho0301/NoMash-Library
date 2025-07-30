<template>
  <div>
    <h1>GetAllBookAPI</h1>
    <div v-if="apiResponse" class="api-response">
      <pre>{{ JSON.stringify(apiResponse, null, 2) }}</pre>
    </div>
    <div v-else-if="loading">
      <p>Loading...</p>
    </div>
    <div v-else-if="error">
      <p>Error: {{ error }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const apiResponse = ref(null)
const loading = ref(false)
const error = ref(null)

const getApiData = async () => {
  loading.value = true
  error.value = null
  try {
    const response = await axios.get('src/assets/json/authors.json') 
    if (response.status === 200) {
      const data = response.data
      
      const allBooks = data.flatMap(author => author.famousWorks)
      apiResponse.value = allBooks
    } else {
     
      throw new Error(`HTTP error! status: ${response.status}`)
    }
  } catch (err) {
    error.value = `Error loading books data: ${err.message}`
    console.error('Error loading books data:', err)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  getApiData()
})
</script>

<style scoped>
.api-response pre {
  background-color: #f4f4f4;
  padding: 10px;
  border: 1px solid #ddd;
}
</style>