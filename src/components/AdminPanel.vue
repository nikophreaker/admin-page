<script lang="ts">
import { defineProps, defineComponent, ref } from 'vue'
import { RouterView, RouterLink } from 'vue-router';
import FortuneWheel from './FortuneWheel.vue';
import Pinball from './Pinball.vue';
export default defineComponent({
    data() {
        return {
            username: ref(),
            openNav: 1,
            openTab: 1
        };
    },
    props: {
        username: String
    },
    methods: {
        goToLogin() {
            if (this.username == undefined) {
                console.log("LOGIN");
            }
            else {
                console.log(`USER: ${this.$route.params.username}`);
            }
        },
        toggleNavs(navNumber: number) {
            this.openNav = navNumber;
            window.scrollTo(0, 0);
        },
        toggleTabs(tabNumber: number) {
            this.openTab = tabNumber;
        }
    },
    beforeCreate() {
        if (this.$store.state.isLogged) {
            this.$router.push({ name: "login" });
        }
        else {
            // this.username = localStorage.getItem("token");
            console.log(localStorage.getItem("token"));
        }
    },
    components: { FortuneWheel, Pinball }
})
</script>

<template>
    <aside class="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar">
        <div class="w-60 h-full shadow-md bg-white px-1 absolute">
            <div class="pt-4 pb-2 px-6">
                <a href="#!">
                    <div class="flex items-center">
                        <div class="shrink-0">
                            <img src="https://mdbcdn.b-cdn.net/img/new/avatars/8.webp" class="rounded-full w-10"
                                alt="Avatar">
                        </div>
                        <div class="grow ml-3">
                            <p class="text-sm font-semibold text-blue-600">Admin</p>
                        </div>
                    </div>
                </a>
            </div>
            <ul class="relative">
                <li class="relative">
                    <a class="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-blue-50 transition duration-300 ease-in-out"
                        href="#!" data-mdb-ripple="true" data-mdb-ripple-color="primary">
                        <svg aria-hidden="true" focusable="false" data-prefix="fas" class="w-3 h-3 mr-3" role="img"
                            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                            <path fill="currentColor"
                                d="M216 0h80c13.3 0 24 10.7 24 24v168h87.7c17.8 0 26.7 21.5 14.1 34.1L269.7 378.3c-7.5 7.5-19.8 7.5-27.3 0L90.1 226.1c-12.6-12.6-3.7-34.1 14.1-34.1H192V24c0-13.3 10.7-24 24-24zm296 376v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h146.7l49 49c20.1 20.1 52.5 20.1 72.6 0l49-49H488c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z">
                            </path>
                        </svg>
                        <span>ADMIN PANEL</span>
                    </a>
                </li>
                <li class="relative">
                    <a class="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-ellipsis whitespace-nowrap rounded transition duration-300 ease-in-out"
                        href="#!" data-mdb-ripple="true" data-mdb-ripple-color="dark" @click="toggleNavs(1)"
                        :class="{ 'text-gray-700 bg-white hover:text-gray-900 hover:bg-gray-100': openNav !== 1, 'text-white bg-pink-600 ': openNav === 1 }">Fortune
                        Wheel</a>
                </li>
                <li class="relative">
                    <a class="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-ellipsis whitespace-nowrap rounded transition duration-300 ease-in-out"
                        href="#!" data-mdb-ripple="true" data-mdb-ripple-color="dark" @click="toggleNavs(2)"
                        :class="{ 'text-gray-700 bg-white hover:text-gray-900 hover:bg-gray-100': openNav !== 2, 'text-white bg-pink-600': openNav === 2 }">Pinball</a>
                </li>
                <li class="relative">
                    <a class="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-ellipsis whitespace-nowrap rounded transition duration-300 ease-in-out"
                        href="#!" data-mdb-ripple="true" data-mdb-ripple-color="dark" @click="toggleNavs(3)"
                        :class="{ 'text-gray-700 bg-white hover:text-gray-900 hover:bg-gray-100': openNav !== 3, 'text-white bg-pink-600': openNav === 3 }">Coming
                        Soon</a>
                </li>
            </ul>
        </div>
    </aside>
    <div class="relative flex flex-col h-screen w-screen -top-12 -left-28">
        <div :class="{ 'hidden': openNav !== 1, 'block': openNav === 1 }">
            <FortuneWheel />
        </div>
        <div :class="{ 'hidden': openNav !== 2, 'block': openNav === 2 }">
            <Pinball />
        </div>
        <div :class="{ 'hidden': openNav !== 3, 'block': openNav === 3 }">
            <h1 class="text-center text-black relative py-96">COOMING SOON!</h1>
        </div>
    </div>
</template>