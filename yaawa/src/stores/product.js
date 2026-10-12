import { defineStore } from "pinia";
import { products } from "../services/api";
import { computed } from "vue";

export const useProductStore = defineStore('product', ()=> {
    const items = ref([]); 
    const loading = ref(true);
    const error = ref('');

    function load()
    {
        setTimeout(()=>{
            return [...products];
        },2000)
    }
    
    const categories = ref([]);
    const categoryError = ref('');

    const active = computed(()=> items.value.filter((item)=> item.active === true));
});
