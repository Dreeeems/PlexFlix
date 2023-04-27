import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useGlobalStore = defineStore("global", () => {
  const url = ref("0");
  function changeUrl(fileUrl) {
    url.value = fileUrl;
  }

  return { url, changeUrl };
});
