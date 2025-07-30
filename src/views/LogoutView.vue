<template>
  <h2>Logging out...</h2>
</template>

<script setup>
import { onMounted } from "vue";
import { getAuth, signOut } from "firebase/auth";
import { useRouter } from "vue-router";

const auth   = getAuth();
const router = useRouter();

onMounted(() => {
  
  console.log("Current user before sign-out:", auth.currentUser);

  signOut(auth)
    .then(() => {
      console.log("User signed out.");
      router.push("/");          
    });
});
</script>