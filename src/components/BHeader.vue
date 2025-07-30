<template>
  <header class="header py-3 shadow-sm">
    <div class="container">
      <!-- 单行、垂直居中、不换行 -->
      <div class="d-flex align-items-center justify-content-between flex-nowrap">

        <!-- 左侧导航链接 -->
        <div class="header-links d-flex gap-3">
          <router-link to="/" class="header-link text-decoration-none">Home (Week 5)</router-link>
          <router-link to="/about" class="header-link text-decoration-none">About</router-link>
        </div>
        <li class="nav-item">
          <router-link to="/add-book" class="nav-link" active-class="active">Add Book</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/WeatherCheck" class="nav-link" active-class="active">Get Weather</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/CountBookAPI" class="nav-link" active-class="active">Count Book API</router-link>
        </li>
        <!-- 右侧按钮组 -->
        <div class="header-buttons d-flex align-items-center gap-2 flex-shrink-0">
          <!-- 未登录 -->
          <template v-if="!isAuthenticated">
            <router-link to="/login">
              <button class="btn btn-primary">Login</button>
            </router-link>
            <router-link to="/Firelogin">
              <button class="btn btn-outline-primary">Firebase Login</button>
            </router-link>
            <router-link to="/FireRegister">
              <button class="btn btn-outline-secondary">Firebase Register</button>
            </router-link>
          </template>

          <!-- 已登录 -->
          <button v-else class="btn btn-danger" @click="logout">Logout</button>
        </div>

      </div>
    </div>
  </header>
</template>


<script setup>
import { ref, onMounted } from 'vue'
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
import { useRouter } from 'vue-router'
const auth = getAuth()
const isAuthenticated = ref(false)
const router = useRouter()

//onMounted(() => {
//  isAuthenticated.value = localStorage.getItem('isAuthenticated') === 'true'
//})
onMounted(() => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      isAuthenticated.value = true
      console.log("User is authenticated:", user)
    } else {
      isAuthenticated.value = false
      console.log("User is not authenticated")
    }
  })
})
//const logout = () => {
//  isAuthenticated.value = false
//  localStorage.removeItem('isAuthenticated')
//  router.push('/login')
//}
const logout = () => {
  signOut(auth).then(() => {
    isAuthenticated.value = false
    localStorage.removeItem('isAuthenticated')
    router.push('/FireLogin')
  }).catch((error) => {
    console.error("Sign out error:", error)
  })
}

</script>

<style scoped>
.header {
  background-color: #343a40;
  color: white;
  padding: 10px 0;
}

.header-link {
  color: white;
  margin: 0 10px;
  text-decoration: none;
}

.header-link:hover {
  text-decoration: underline;
}

.header-links {
  display: flex;
}

.header-buttons {
  display: flex;
}

.btn {
  margin: 5px;
}
</style>