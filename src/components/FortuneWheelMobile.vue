<script lang="ts">
import { DocumentData, where, query, doc, setDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { getStorage, ref as refs, getDownloadURL, uploadString } from 'firebase/storage'
import { url } from 'inspector';
import { defineProps, defineComponent, ref } from 'vue'
import { useFirestore, useCollection, useDocument } from 'vuefire';
import { db, prizeRef, kuponRef, winnerRef } from '../firebase';
import PrizeList from './FortuneWheelMobile/PrizeList.vue';
import VoucherKode from './FortuneWheelMobile/VoucherKode.vue';
import Winner from './FortuneWheelMobile/Winner.vue';
export default defineComponent({
    data() {
        return {
            username: ref(),
            openTab: 1,
            prizeList: useCollection(prizeRef),
            kuponList: useCollection(kuponRef),
            winnerList: useCollection(winnerRef),
            id: "",
            url: "",
            imgResult: "",
            percentage: 0,
            prize: "",
            color: "#000000",
            openAdd: false,
            openUpdate: false,
        };
    },
    props: {
        username: String
    },
    methods: {
        toggleTabs(tabNumber: number) {
            this.openTab = tabNumber;
        },
        onFileChange(e: any) {
            const image = e.target.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(image);
            reader.onload = e => {
                this.imgResult = `${reader.result}`;
                this.url = URL.createObjectURL(image);
            };
        },
        onClickAdd() {
            this.openAdd = true;
            this.openUpdate = !this.openUpdate;
        },
        onClickUpdate(prize: DocumentData) {
            this.openAdd = false;
            this.openUpdate = !this.openUpdate;
            if (this.openUpdate === true) {
                this.id = prize.id
                this.url = prize.icon
                this.percentage = prize.percentage
                this.color = prize.startColor.replace("0x", "#")
                this.prize = prize.text
            } else {
                this.id = ""
                this.url = ""
                this.percentage = 0
                this.color = ""
                this.prize = ""
            }
        },
        onAdd(prize: DocumentData) {
            var time = Date.now().toString();
            const storage = getStorage();
            const storageRef = refs(storage, `slice/${time}.png`);
            uploadString(storageRef, this.imgResult, 'data_url').then((snapshot) => {
                getDownloadURL(snapshot.ref).then((downloadURL) => {
                    this.url = downloadURL
                    let data = {
                        id: parseInt(prize.id) + 1,
                        icon: this.url,
                        percentage: `${this.percentage}`,
                        sliceText: this.prize,
                        text: this.prize,
                        startColor: this.color.replace("#", "0x"),
                        endColor: this.color.replace("#", "0x"),
                        type: "prize",
                        rings: 1
                    }
                    if (this.url != "" && this.percentage != null && this.prize != "" && this.color != null) {
                        setDoc(doc(db, "luckyspin", `${parseInt(prize.id) + 1}`), data).then(() => {
                            this.id = ""
                            this.url = ""
                            this.percentage = 0
                            this.color = ""
                            this.prize = ""
                            this.openUpdate = !this.openUpdate;
                            this.openAdd = false;
                        });
                    }
                });
            });
        },
        onUpdate() {
            let data = {
                id: parseInt(this.id),
                icon: this.url,
                percentage: `${this.percentage}`,
                sliceText: this.prize,
                text: this.prize,
                startColor: this.color.replace("#", "0x"),
                endColor: this.color.replace("#", "0x"),
                type: "prize",
                rings: 1
            }
            updateDoc(doc(db, "luckyspin", `${this.id}`), data).then(() => {
                this.id = ""
                this.url = ""
                this.percentage = 0
                this.color = ""
                this.prize = ""
            });
            this.openUpdate = !this.openUpdate;
        },
        onDelete(prize: DocumentData) {
            deleteDoc(doc(db, "luckyspin", `${prize.id}`));
        }
    },
    components: { PrizeList, VoucherKode, Winner }
})
</script>

<template>
    <div class="container max-w-7xl mx-10 mt-2">
        <ul class="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row">
            <li class="-mb-px mr-2 last:mr-0 flex-auto text-center">
                <a class="text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal"
                    @click="toggleTabs(1)"
                    :class="{ 'text-pink-600 bg-white': openTab !== 1, 'text-white bg-pink-600': openTab === 1 }">
                    Prize List
                </a>
            </li>
            <li class="-mb-px mr-2 last:mr-0 flex-auto text-center">
                <a class="text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal"
                    @click="toggleTabs(2)"
                    :class="{ 'text-pink-600 bg-white': openTab !== 2, 'text-white bg-pink-600': openTab === 2 }">
                    Voucher code
                </a>
            </li>
            <li class="-mb-px mr-2 last:mr-0 flex-auto text-center">
                <a class="text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal"
                    @click="toggleTabs(3)"
                    :class="{ 'text-pink-600 bg-white': openTab !== 3, 'text-white bg-pink-600': openTab === 3 }">
                    Winner
                </a>
            </li>
        </ul>
        <div class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded">
            <div class="tab-content tab-space">
                <div :class="{ 'hidden': openTab !== 1, 'block': openTab === 1 }">
                    <PrizeList />
                </div>
                <div :class="{ 'hidden': openTab !== 2, 'block': openTab === 2 }">
                    <VoucherKode />
                </div>
                <div :class="{ 'hidden': openTab !== 3, 'block': openTab === 3 }">
                    <Winner />
                </div>
            </div>
        </div>
    </div>
</template>