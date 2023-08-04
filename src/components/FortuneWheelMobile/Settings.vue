<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    data() {
        return {
            urlBg: "",
            urlFieldVoucher: "",
            urlBtn: "",
            urlOuterWheel: "",
            imgResult: ""
        }
    },
    methods: {
        onFileChange(e: any) {
            const image = e.target.files[0];
            const reader = new FileReader();
            const idInput = e.srcElement.id;
            reader.readAsDataURL(image);
            reader.onload = e => {
                this.imgResult = `${reader.result}`;
                if (idInput == "bg") {
                    this.urlBg = URL.createObjectURL(image);
                } else if (idInput == "field_voucher") {
                    this.urlFieldVoucher = URL.createObjectURL(image);
                } else if (idInput == "btn") {
                    this.urlBtn = URL.createObjectURL(image);
                } else if (idInput == "outer_wheel") {
                    this.urlOuterWheel = URL.createObjectURL(image);
                }
            };
        },
    }
})
</script>

<template>
    <div class="px-6 py-4 bg-white rounded shadow-md ring-1 ring-gray-900/10 flex flex-row columns-2">
        <div class="col">
            <div class="m-5">
                <h4 class="text-black text-start mb-2">Background</h4>
                <input id="bg" class="block text-black" type="file" @change="onFileChange" accept=".jpg, .jpeg, .png"/>
                <img v-if="urlBg" :src="urlBg" class="w-32" />
            </div>
            <div class="m-5">
                <h4 class="text-black text-start mt-5 mb-2">Field Voucher</h4>
                <input id="field_voucher" class="block text-black" type="file" @change="onFileChange" accept=".jpg, .jpeg, .png"/>
                <img v-if="urlFieldVoucher" :src="urlFieldVoucher" class="w-32" />
            </div>
        </div>
        <div class="col">
            <div class="m-5">
                <h4 class="text-black text-start mt-5 mb-2">Button</h4>
                <input id="btn" class="block text-black" type="file" @change="onFileChange" accept=".jpg, .jpeg, .png"/>
                <img v-if="urlBtn" :src="urlBtn" class="w-32" />
            </div>
            <div class="m-5">
                <h4 class="text-black text-start mt-5 mb-2">Outer Wheel</h4>
                <input id="outer_wheel" class="block text-black" type="file" @change="onFileChange" accept=".jpg, .jpeg, .png"/>
                <img v-if="urlOuterWheel" :src="urlOuterWheel" class="w-32" />
            </div>
        </div>
    </div>
</template>