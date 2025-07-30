<template>
  <div class="access-denied">
    <h2>Access Denied</h2>
    <p>You do not have permission to access this page.</p>
    <router-link to="/login">Go to Login</router-link>
  </div>
</template>

<script>
export default {
  name: 'AccessDeniedView'
}
</script>

<style scoped>
.access-denied {
  text-align: center;
  padding: 20px;
}
</style>