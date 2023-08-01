<script lang="ts">
import { DocumentData, where, query, doc, setDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { getStorage, ref as refs, getDownloadURL, uploadString } from 'firebase/storage'
import { url } from 'inspector';
import { defineProps, defineComponent, ref } from 'vue'
import { useFirestore, useCollection, useDocument } from 'vuefire';
import { db, colScratch3, winnerScratchRef } from '../../firebase';
export default defineComponent({
    data() {
        return {
            winnerList: useCollection(winnerScratchRef),
            isOpen: false,
            winnerId: 0,
            searchTxt: ""
        };
    },
    computed: {
        isModalVisible() {
            return this.isOpen;
        }
    },
    methods: {
        onDelete() {
            deleteDoc(doc(db, colScratch3, `${this.winnerId}`));
            this.isOpen = !this.isOpen;
        },
        onToggle(winner: number) {
            this.isOpen = !this.isOpen;
            if (this.isOpen) {
                this.winnerId = winner
            } else {
                this.winnerId = 0
            }
        }
    }
})
</script>

<template>
    <transition name="fade">
        <div v-if="isModalVisible">
            <div @click="onToggle(0)" class="absolute bg-black opacity-70 inset-0 z-0"></div>
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
                        <button @click="onToggle(0)"
                            class="mb-2 md:mb-0 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-white text-sm px-5 py-2 tracking-wider border rounded-md">
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </transition>
    <div class="flex flex-col">
        <div class="overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
            <div class="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
                <input type="text" class="mb-4 min-w-full bg-white text-black" placeholder="Search here..." v-model="searchTxt">
                <table class="min-w-full">
                    <thead>
                        <tr>
                            <th
                                class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                                No</th>
                            <th
                                class="py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                                Kupon</th>
                            <th
                                class="py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                                Prize</th>
                            <th
                                class="py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                                Date</th>
                            <th class="py-3 text-sm text-left text-gray-500 border-b border-gray-200 bg-gray-50"
                                colspan="4">
                                Action</th>
                        </tr>
                    </thead>
                    <tbody class="bg-white">
                        <tr v-for="winner, index in winnerList.sort((a, b) => b.timestamp - a.timestamp).filter((a) => a.kupon.includes(searchTxt.toUpperCase()) || a.prize.includes(searchTxt.toUpperCase()) || a.tanggal.includes(searchTxt.toUpperCase()))" :key="winner.id">
                            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                <div class="flex items-center text-gray-900">
                                    {{ index + 1 }}
                                </div>
                            </td>

                            <td class="py-4 whitespace-no-wrap border-b border-gray-200 text-gray-900">
                                <p class="flex">{{ winner.kupon }}</p>
                            </td>

                            <td class="py-4 whitespace-no-wrap border-b border-gray-200 text-gray-900">
                                <p class="flex">{{ winner.prize }}</p>
                            </td>

                            <td class="py-4 text-sm leading-5 whitespace-no-wrap border-b border-gray-200 text-gray-900">
                                <p class="flex">{{ winner.tanggal }}</p>
                                <p class="flex">{{ winner.waktu }}</p>
                            </td>

                            <td class="text-sm font-medium leading-5 whitespace-no-wrap border-b border-gray-200 ">
                                <a href="#" @click="onToggle(winner.id)" data-modal-target="popup-modal"
                                    data-modal-toggle="popup-modal"><svg xmlns="http://www.w3.org/2000/svg"
                                        class="w-6 h-6 text-red-600 hover:text-red-800" fill="none" viewBox="0 0 24 24"
                                        stroke="currentColor">
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
</template>