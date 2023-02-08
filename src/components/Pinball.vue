<script lang="ts">
import { defineProps, defineComponent, ref } from 'vue'
import { RouterView, RouterLink } from 'vue-router';
import { useFirestore, useCollection, useDocument } from 'vuefire';
import { leaderboardRef } from '../firebase';
export default defineComponent({
    data() {
        return {
            username: ref(),
            openTab: 1,
            leaderboardList: useCollection(leaderboardRef)
        };
    },
    props: {
        username: String
    },
    methods: {
        toggleTabs(tabNumber: number) {
            this.openTab = tabNumber;
        },
        convertToRupiah(angka: number) {
            var rupiah = '';
            var angkarev = angka.toString().split('').reverse().join('');

            for (var i = 0; i < angkarev.length; i++)
                if (i % 3 == 0) rupiah += angkarev.substr(i, 3) + '.';

            return rupiah.split('', rupiah.length - 1).reverse().join('');
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
    }
})
</script>

<template>
    <div class="container max-w-7xl mx-10 mt-2">
        <ul class="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row">
            <li class="-mb-px mr-2 last:mr-0 flex-auto text-center">
                <a class="text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal"
                    @click="toggleTabs(1)"
                    :class="{ 'text-pink-600 bg-white': openTab !== 1, 'text-white bg-pink-600': openTab === 1 }">
                    Leaderboard
                </a>
            </li>
        </ul>
        <div class="flex flex-col">
            <div class="overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                <div
                    class="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
                    <table class="min-w-full">
                        <thead>
                            <tr>
                                <th
                                    class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                                    Rank</th>
                                <th
                                    class="py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                                    Username</th>
                                <th
                                    class="py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                                    Score</th>
                                <th
                                    class="py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                                    Date</th>
                                <th class="py-3 text-sm text-left text-gray-500 border-b border-gray-200 bg-gray-50"
                                    colspan="4">
                                    Action</th>
                            </tr>
                        </thead>
                        <tbody class="bg-white">
                            <tr v-for="leaderboard in leaderboardList.sort((a, b) => b.score - a.score)"
                                :key="leaderboard.id">
                                <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                    <div class="flex items-center text-gray-900">
                                        {{ leaderboardList.indexOf(leaderboard) + 1 }}
                                    </div>

                                </td>

                                <td class="py-4 whitespace-no-wrap border-b border-gray-200">
                                    <div class="flex text-sm leading-5 text-gray-900">{{ leaderboard.name }}
                                    </div>
                                </td>

                                <td class="py-4 whitespace-no-wrap border-b border-gray-200 text-gray-900">
                                    <p class="flex">{{ convertToRupiah(leaderboard.score) }}</p>
                                </td>

                                <td
                                    class="flex py-4 text-sm leading-5 whitespace-no-wrap border-b border-gray-200 text-gray-900">
                                    <span>{{ leaderboard.date }}</span>
                                </td>

                                <td
                                    class="text-sm font-medium leading-5 text-center whitespace-no-wrap border-b border-gray-200 text-gray-900">
                                    <a href="#" class="text-indigo-600 hover:text-indigo-900">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none"
                                            viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                        </svg>
                                    </a>
                                </td>
                                <td class="text-sm font-medium leading-5 whitespace-no-wrap border-b border-gray-200 ">
                                    <a href="#"><svg xmlns="http://www.w3.org/2000/svg"
                                            class="w-6 h-6 text-red-600 hover:text-red-800" fill="none"
                                            viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg></a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>