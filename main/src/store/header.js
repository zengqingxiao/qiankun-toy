// 头部header的现实或者隐藏
import { ref } from 'vue';

export const headerStatus = ref(true)

export const changeHeader = type => headerStatus.value = type;
