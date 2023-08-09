<script lang="ts">
import { defineProps, defineComponent, ref } from 'vue'
import { useFirestore, useCollection, useDocument } from 'vuefire';
import { leaderboardFishRef2 } from '../firebase';
import Leaderboard from './FishShooterJuara/Leaderboard.vue';
export default defineComponent({
    data() {
        return {
            username: ref(),
            openTab: 1,
            leaderboardList: useCollection(leaderboardFishRef2)
        };
    },
    props: {
        username: String
    },
    methods: {
        toggleTabs(tabNumber: number) {
            this.openTab = tabNumber;
        }
    },
    components: { Leaderboard }
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
            <!-- <li class="-mb-px mr-2 last:mr-0 flex-auto text-center">
                            <a class="text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal"
                                @click="toggleTabs(2)"
                                :class="{ 'text-pink-600 bg-white': openTab !== 2, 'text-white bg-pink-600': openTab === 2 }">
                                VoucherKode
                            </a>
                        </li> -->
        </ul>
        <div class="flex flex-col">
            <div class="tab-content tab-space">
                <div :class="{ 'hidden': openTab !== 1, 'block': openTab === 1 }">
                    <Leaderboard />
                </div>
                <!-- <div :class="{ 'hidden': openTab !== 2, 'block': openTab === 2 }">
                                <VoucherKode />
                            </div> -->
            </div>
        </div>
</div>
</template>