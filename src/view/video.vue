<script setup>
import { useGlobalStore } from '../stores/counter';

const global = useGlobalStore()

</script>


<template>
    <video controls autoplay>

        <source :src="global.url" type="video/mp4">
    </video>
</template>