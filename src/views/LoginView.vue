<template>
  <div class="login-container">
    <h2>Login</h2>
    <form @submit.prevent="handleLogin">
      <div class="form-group">
        <label for="username">Username:</label>
        <input v-model="username" type="text" id="username" required>
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input v-model="password" type="password" id="password" required>
      </div>
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export default {
  setup() {
    const username = ref('')
    const password = ref('')
    const router = useRouter()

    const handleLogin = () => {
      const hardCodedUsername = 'test'
      const hardCodedPassword = 'password'

      if (username.value === hardCodedUsername && password.value === hardCodedPassword) {
        localStorage.setItem('isAuthenticated', 'true')
        router.push('/about')
      } else {
        alert('Invalid username or password')
      }
    }

    return {
      username,
      password,
      handleLogin
    }
  }
}
</script>

<style>
.login-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
}
.form-group {
  margin-bottom: 15px;
}
</style>