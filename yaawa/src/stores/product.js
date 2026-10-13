import { defineStore } from "pinia";
import { products } from "../services/api";
import { ref, computed } from "vue";

export const useProductStore = defineStore('product', ()=> {
    const items = ref([]); 
    const loading = ref(true);
    const error = ref('');

    function load()
    {
        // setTimeout(()=>{
            items.value = [...products];
        // },2000)
    }
    
    const categories = ref([]);
    const categoryError = ref('');

    const active = computed(()=> items.value.filter((item)=> item.active === true));

    function upsert(product){
        const index = items.value.findIndex((item)=> item.id === product.id);
        if(index < 0){
            items.value.push(product)
        }else{
            items.value[index] = product
        }
    }

    function loadCategories(){
        return [];
    }

    function init(){
        loadCategories();
        load();
    }

    return {
        items,
        loading,
        error,
        load,
        categories,
        categoryError,
        active,
        upsert,
        loadCategories,
        init
    }
});
