<script lang="ts">
import { DocumentData, where, query, doc, setDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { getStorage, ref as refs, getDownloadURL, uploadString } from 'firebase/storage'
import { url } from 'inspector';
import { defineProps, defineComponent, ref } from 'vue'
import { useFirestore, useCollection, useDocument } from 'vuefire';
import { db, prizeRef, kuponRef, winnerRef } from '../../firebase';
export default defineComponent({
    data() {
        return {
            winnerList: useCollection(winnerRef)
        };
    },
    methods: {
        onDelete(winner: DocumentData) {
            deleteDoc(doc(db, "prizespinwheel", `${winner.id}`));
        }
    }
})
</script>

<template>
    <div class="flex flex-col">
        <div class="overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
            <div
                class="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
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
                        <tr v-for="winner, index in winnerList.sort((a, b) => b.timestamp - a.timestamp)"
                            :key="winner.id">
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

                            <td
                                class="py-4 text-sm leading-5 whitespace-no-wrap border-b border-gray-200 text-gray-900">
                                <p class="flex">{{ winner.tanggal }}</p>
                                <p class="flex">{{ winner.waktu }}</p>
                            </td>

                            <td class="text-sm font-medium leading-5 whitespace-no-wrap border-b border-gray-200 ">
                                <a href="#" @click="onDelete(winner)"><svg xmlns="http://www.w3.org/2000/svg"
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