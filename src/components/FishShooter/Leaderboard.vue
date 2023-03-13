<script lang="ts">
import { DocumentData, where, query, doc, setDoc, updateDoc, deleteDoc, limit, orderBy, startAfter } from 'firebase/firestore';
import { defineProps, defineComponent, ref } from 'vue';
import { useFirestore, useCollection, useDocument } from 'vuefire';
import { db, colPinball, leaderboardFishRef } from '../../firebase';
var limits = 10;
export default defineComponent({
    data() {
        return {
            username: ref(),
            leaderboardList: useCollection(query((leaderboardFishRef), limit(limits), orderBy("score", "desc"))),
            id: "",
            isOpen: false,
            searchTxt: "",
            hasScrolledToBottom: false
        };
    },
    props: {
        username: String
    },
    computed: {
        isModalVisible() {
            return this.isOpen;
        },
        isScrolledBottom() {
            return this.hasScrolledToBottom;
        }
    },
    methods: {
        loadMoreData() {
            limits += 10;
            const newList = useCollection(query((leaderboardFishRef), orderBy("score", "desc"), limit(limits)));
            newList.promise.value.then((data) => {
                console.log(this.leaderboardList.length+ "==" +newList.value.length);
                if (this.leaderboardList.length != data.length) {
                    this.leaderboardList = data;
                } else {
                    this.hasScrolledToBottom = !this.hasScrolledToBottom;
                }
            })
        },
        convertToRupiah(angka: number) {
            var rupiah = '';
            var angkarev = angka.toString().split('').reverse().join('');

            for (var i = 0; i < angkarev.length; i++)
                if (i % 3 == 0) rupiah += angkarev.substr(i, 3) + '.';

            return rupiah.split('', rupiah.length - 1).reverse().join('');
        },
        onDelete() {
            deleteDoc(doc(db, colPinball, `${this.id}`));
            this.isOpen = !this.isOpen;
        },
        onDeleteId(id: string) {
            if (confirm(`Yakin untuk menghapus ${id} ?`)) {
                deleteDoc(doc(db, colPinball, `${id}`));
            } else {

            }
        },
        onToggle(id: string) {
            this.isOpen = !this.isOpen;
            if (this.isOpen) {
                this.id = id
            } else {
                this.id = ""
            }
        }
    }
})
</script>

<template>
    <transition name="fade">
        <div v-if="isModalVisible">
            <div @click="onToggle(`0`)" class="absolute bg-black opacity-70 inset-0 z-0"></div>
            <div class="w-full max-w-lg p-3 relative mx-auto my-auto rounded-xl shadow-lg bg-white">
                <div>
                    <div class="text-center p-3 flex-auto justify-center leading-6">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-16 h-16 flex items-center text-purple-500 mx-auto"
                            viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd"
                                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                clip-rule="evenodd" />
                        </svg>
                        <h2 class="text-2xl font-bold py-4">Are you sure?</h2>
                        <p class="text-md text-gray-500 px-8">
                            Do you really want to delete?
                        </p>
                    </div>
                    <div class="p-3 mt-2 text-center space-x-4 md:block">
                        <button @click="onDelete()"
                            class="mb-2 md:mb-0 text-white bg-red-600 hover:bg-red-800 text-sm px-5 py-2 tracking-wider border rounded-md">
                            Delete
                        </button>
                        <button @click="onToggle(`0`)"
                            class="mb-2 md:mb-0 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-white text-sm px-5 py-2 tracking-wider border rounded-md">
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </transition>
    <div class="overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <div class="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
            <input type="text" class="mb-4 min-w-full bg-white text-black" placeholder="Search here..." v-model="searchTxt">
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
                            No. HP</th>
                        <th
                            class="py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                            Score</th>
                        <th
                            class="py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                            Date</th>
                        <th class="py-3 text-sm text-left text-gray-500 border-b border-gray-200 bg-gray-50" colspan="4">
                            Action</th>
                    </tr>
                </thead>
                <tbody class="bg-white">
                    <tr v-for="leaderboard in leaderboardList.filter((a) => a.name.includes(searchTxt.toUpperCase()) || a.date.includes(searchTxt.toUpperCase()) || a.id.includes(searchTxt.toUpperCase()))" :ref_key="leaderboard.id">
                        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                            <div class="flex items-center text-gray-900">
                                {{ leaderboardList.indexOf(leaderboard) + 1 }}
                            </div>
                        </td>

                        <td class="py-4 whitespace-no-wrap border-b border-gray-200">
                            <div class="flex text-sm leading-5 text-gray-900">{{ leaderboard.name }}
                            </div>
                        </td>

                        <td class="py-4 whitespace-no-wrap border-b border-gray-200">
                            <div class="flex text-sm leading-5 text-gray-900">{{ leaderboard.id }}
                            </div>
                        </td>

                        <td class="py-4 whitespace-no-wrap border-b border-gray-200 text-gray-900">
                            <p class="flex">{{ convertToRupiah(leaderboard.score) }}</p>
                        </td>

                        <td class="flex py-4 text-sm leading-5 whitespace-no-wrap border-b border-gray-200 text-gray-900">
                            <span>{{ leaderboard.date }}</span>
                        </td>

                        <td
                            class="text-sm font-medium leading-5 text-center whitespace-no-wrap border-b border-gray-200 text-gray-900">
                            <a href="#" class="text-indigo-600 hover:text-indigo-900">
                                <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                            </a>
                        </td>
                        <td class="text-sm font-medium leading-5 whitespace-no-wrap border-b border-gray-200 ">
                            <a href="#" @click="onDeleteId(leaderboard.id)"><svg xmlns="http://www.w3.org/2000/svg"
                                    class="w-6 h-6 text-red-600 hover:text-red-800" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg></a>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div class="flex justify-center mt-5 mb-5">
                <button v-if="!isScrolledBottom" class="px-4 py-2 rounded-md bg-sky-500 text-sky-100 hover:bg-sky-600" @click="loadMoreData()">Load More</button>
            </div>
        </div>
</div>
</template>