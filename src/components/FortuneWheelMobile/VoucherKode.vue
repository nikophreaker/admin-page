<script lang="ts">
import { DocumentData, where, query, doc, getDocs, setDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { defineProps, defineComponent, ref } from 'vue';
import { useFirestore, useCollection, useDocument } from 'vuefire';
import { db, colMobile as col, colMobile2 as col2, colMobile3 as col3, prizeMobileRef as prizeRef, kuponMobileRef as kuponRef, winnerMobileRef as winnerRef } from '../../firebase';
export default defineComponent({
    data() {
        return {
            kuponList: useCollection(kuponRef),
            id: "",
            kode: "",
            status: true,
            openAdd: false,
            openUpdate: false,
            isOpen: false,
            searchTxt: ""
        };
    },
    computed: {
        isModalVisible() {
            return this.isOpen;
        }
    },
    methods: {
        async makeCode(length: number) {
            let result = '';
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
            const charactersLength = characters.length;
            let counter = 0;
            while (counter < length) {
                result += characters.charAt(Math.floor(Math.random() * charactersLength));
                counter += 1;
            }
            const q = query(kuponRef, where("kode", "==", result));
            const querySnapshot = await getDocs(q);
            if (querySnapshot.size == 0) {
                let last = this.kuponList.sort((a, b) => a.id - b.id)[this.kuponList.length - 1]
                let id = last != undefined ? parseInt(last.id) + 1 : 1;
                let data = {
                    id: id,
                    kode: result.toUpperCase(),
                    active: true,
                }
                setDoc(doc(db, col2, `${id}`), data);
                return result
            } else {
                return;
            }
        },
        onClickAdd() {
            this.openAdd = true;
            this.openUpdate = !this.openUpdate;
        },
        onClickUpdate(kupon: DocumentData) {
            this.openAdd = false;
            this.openUpdate = !this.openUpdate;
            if (this.openUpdate === true) {
                this.id = kupon.id
                this.kode = kupon.kode
                this.status = kupon.active
            } else {
                this.id = ""
                this.kode = ""
                this.status = true
            }
        },
        onAdd(kupon: DocumentData) {
            let id = kupon != undefined ? parseInt(kupon.id) + 1 : 1;
            let data = {
                id: id,
                kode: this.kode.toUpperCase(),
                active: this.status,
            }
            if (this.kode != "" && this.status != null) {
                setDoc(doc(db, col2, `${id}`), data).then(() => {
                    this.id = ""
                    this.kode = ""
                    this.status = true
                    this.openUpdate = !this.openUpdate;
                    this.openAdd = false;
                });
            }
        },
        onUpdate() {
            let data = {
                id: parseInt(this.id),
                kode: this.kode.toUpperCase(),
                active: this.status,
            }
            updateDoc(doc(db, col2, `${this.id}`), data).then(() => {
                this.id = ""
                this.kode = ""
                this.status = true
            });
            this.openUpdate = !this.openUpdate;
        },
        onDelete() {
            deleteDoc(doc(db, col2, `${this.id}`));
            this.isOpen = !this.isOpen;
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
    <div class="flex flex-col">
        <div :class="{ 'overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8': true, 'hidden': openUpdate }">
            <div class="mb-4">
                <div class="flex justify-start">
                    <button class="px-4 py-2 rounded-md bg-sky-500 text-sky-100 hover:bg-sky-600" @click="onClickAdd">Create
                        Voucher</button>
                </div>
                <div class="flex justify-end">
                    <button class="px-4 py-2 rounded-md bg-sky-500 text-sky-100 hover:bg-sky-600" @click="makeCode(5)">Add
                        Random Code</button>
                </div>
            </div>
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
                                Kode</th>
                            <th
                                class="py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                                Status</th>
                            <th class="py-3 text-sm text-left text-gray-500 border-b border-gray-200 bg-gray-50"
                                colspan="4">
                                Action</th>
                        </tr>
                    </thead>
                    <tbody class="bg-white">
                        <tr v-for="kupon in kuponList.sort((a, b) => a.id - b.id).filter((a) => a.kode.includes(searchTxt.toUpperCase()))" :key="kupon.id">
                            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                <div class="flex items-center text-gray-900">
                                    {{ kupon.id }}
                                </div>
                            </td>

                            <td class="py-4 whitespace-no-wrap border-b border-gray-200 text-gray-900">
                                <p class="flex">{{ kupon.kode }}</p>
                            </td>

                            <td class="py-4 text-sm leading-5 whitespace-no-wrap border-b border-gray-200 text-gray-900">
                                <p class="flex">{{ kupon.active ? "Aktif" : "Tidak Aktif" }}</p>
                            </td>

                            <td
                                class="text-sm font-medium leading-5 text-center whitespace-no-wrap border-b border-gray-200 text-gray-900">
                                <a href="#" class="text-indigo-600 hover:text-indigo-900" @click="onClickUpdate(kupon)">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24"
                                        stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                </a>
                            </td>
                            <td class="text-sm font-medium leading-5 whitespace-no-wrap border-b border-gray-200 ">
                                <a href="#" @click="onToggle(kupon.id)"><svg xmlns="http://www.w3.org/2000/svg"
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
        <div
            :class="{ 'w-full px-6 py-4 bg-white rounded shadow-md ring-1 ring-gray-900/10': true, 'hidden': !openUpdate }">
            <form method="POST" action="" @submit.prevent="false">

                <div>
                    <label class="flex text-sm font-bold text-gray-700">
                        Kode
                    </label>
                    <div>
                        <input
                            class="block mt-1 border-gray-300 rounded-md shadow-sm placeholder:text-gray-400 placeholder:text-right focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            type="text" maxlength="5" v-model="kode" style="text-transform:uppercase" required />
                    </div>
                </div>

                <div class="mt-4">
                    <label class="flex text-sm font-bold text-gray-700">
                        Status
                    </label>
                    <select class="flex text-sm" v-model="status">
                        <option :value="true">Aktif</option>
                        <option :value="false">Tidak Aktif</option>
                    </select>
                </div>

                <div class="flex items-center justify-start mt-4 gap-x-2">
                    <button type="submit" @click="onAdd(kuponList.sort((a, b) => a.id - b.id)[kuponList.length - 1])"
                        :class="{ 'px-6 py-2 text-sm font-semibold rounded-md shadow-md text-sky-100 bg-sky-500 hover:bg-sky-700 focus:outline-none focus:border-gray-900 focus:ring ring-gray-300': true, 'hidden': !openAdd }">
                        Add
                    </button>
                    <button type="submit" @click="onUpdate"
                        :class="{ 'px-6 py-2 text-sm font-semibold rounded-md shadow-md text-sky-100 bg-sky-500 hover:bg-sky-700 focus:outline-none focus:border-gray-900 focus:ring ring-gray-300': true, 'hidden': openAdd }">
                        Update
                    </button>
                    <button type="submit" @click="onClickUpdate"
                        class="px-6 py-2 text-sm font-semibold text-gray-100 bg-gray-400 rounded-md shadow-md hover:bg-gray-600 focus:outline-none focus:border-gray-900 focus:ring ring-gray-300">
                        Cancel
                    </button>
                </div>
            </form>
        </div>
</div>
</template>