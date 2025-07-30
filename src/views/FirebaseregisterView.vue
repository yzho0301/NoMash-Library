<template>
  <h1>Create an Account</h1>
  <p><input type="email" placeholder="Email" v-model="email" /></p>
  <p><input type="password" placeholder="Password" v-model="password" /></p>
  <p>
    <select v-model="role">
      <option disabled value="">Select role</option>
      <option>Admin</option>
      <option>Teacher</option>
      <option>Student</option>
    </select>
  </p>
  <p><button @click="register">Save to Firebase</button></p>
</template>
<script setup>
import { ref } from "vue";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile
} from "firebase/auth";
import { useRouter } from "vue-router";

const email    = ref("");
const password = ref("");
const role     = ref("");          
const router   = useRouter();
const auth     = getAuth();
const register = () => {
  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then(async (cred) => {
      
      await updateProfile(cred.user, { displayName: role.value });
      console.log("Firebase Register Successful!", cred.user);
      router.push("/FireLogin");
    })
    .catch((err) => console.log(err.code));
};
</script>