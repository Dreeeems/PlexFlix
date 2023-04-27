<script setup>
import { FetchingCategory, FetchingData } from "../utils/request";
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useGlobalStore } from '../stores/counter'
const global = useGlobalStore()
const files = ref([])
const url = ref("")
const router = useRouter()

async function getFileMetadata(id) {
    url.value = ""
    url.value = await FetchingData(id)
    global.changeUrl(url.value)
    console.log(url.value)
    router.push({ name: "video" })
}

onMounted(() => {
    files.value = null
})
async function Fetch(elem) {
    files.value = null
    console.log(elem.srcElement.innerHTML)
    if (elem.srcElement.innerHTML == "Films") {
        files.value = await FetchingCategory("movie")
        console.log(files.value)


    }
}
</script>


<template>
    <button @click="Fetch" class="bg-red-600">Films</button>
    <button @click="Fetch">Series</button>
    <button @click="Fetch">Télé</button>

    <div v-if="files !== null" class="mt-10">
        <div v-for="file in files" @click="getFileMetadata(file.key)">
            {{ file.title }}
        </div>
    </div>
</template>