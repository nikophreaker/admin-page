<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useFirestore, useCollection, useDocument } from 'vuefire';
import { collection, query, where, getDocs, doc } from 'firebase/firestore';
import { adminRef } from '../firebase';
let username = ref();
let password = ref();
export default defineComponent({
    data() {
        return {
            show: "password",
            username: ref(),
            password: ref(),
        }
    },
    props: {
        username: String
    },
    methods: {
        showPassword() {
            this.show = this.show === "password" ? "text" : "password"
        },
        async login() {
            let q = query(adminRef, where("username", "==", `${this.username}`), where("password", "==", `${this.password}`));
            const queryAdmin = await getDocs(q);
            if (queryAdmin.size != 0) {
                localStorage.setItem("token", this.username);
                this.$router.push({ name: "panel" });
                this.$store.commit('isLogin');
                console.log(this.$store.state.isLogged);
            } else {
                alert("Wrong username & password");
            }
            console.log(this.username);
            console.log(this.password);
        }
    }
});
</script>

<template>
    <div class="container mx-auto bg-gray-200 rounded-xl shadow border p-8 m-10">
        <p class="text-3xl text-gray-700 font-bold mb-5">
            Admin Login
        </p>
        <form @submit.prevent="login">
            <!-- <p class="text-blue-500 text-lg">
                Vue and Tailwind CSS in action
            </p> -->
            <div class="mb-6">
                <input type="text"
                    class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    id="username" placeholder="Username" required v-model="username" />
            </div>
            <div class="relative">
                <input :type="show"
                    class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    id="password" placeholder="Password" required v-model="password" />
                <button @click="showPassword" type="button"
                    class="text-white absolute right-2.5 bottom-1 bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-extralight rounded-lg text-sm px-4 py-2 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
                    {{ show === "password" ? "Show" : "Hide"}}</button>
            </div>
            <br />
            <input class="text-white bg-gray-600 px-5 py-2 hover:bg-gray-800 hover:cursor-pointer" type="submit" name="login"
                value="Login"/>
        </form>
    </div>
</template>