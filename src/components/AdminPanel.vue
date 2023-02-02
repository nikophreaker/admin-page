<script lang="ts">
import { defineProps, defineComponent, computed, onMounted } from 'vue'
import { RouterView, RouterLink, useRoute } from 'vue-router';
export default defineComponent({
    setup() {
        const route = useRoute();
        const usernames = computed(() => route.params.usernames);
        return { usernames }
    },
    data() {
        return {
            username: this.$route.params.username
        }
    },
    props: {

    },
    methods: {
        goToLogin() {
            console.log(`USER: ${this.username}`);
            console.log(`USER2: ${this.$route.params.username}`);
            if (this.username == undefined) {
                console.log("LOGIN");
            } else {
                console.log(`USER: ${this.$route.params.username}`);
            }
        }
    }
})
</script>

<template>
    <h1 @click="goToLogin">Welcome, {{ usernames }}!</h1>
    <router-link to="login">Login</router-link>
</template>