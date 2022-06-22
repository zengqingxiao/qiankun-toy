import { ref } from 'vue'

// 当前loading的值
export let loadingStatus = ref(true)

// 修改当前的loading
export const changeLoading = type => loadingStatus.value = type
