import { defineStore } from "pinia";
import { api } from "../services/api";
import { ref, computed } from "vue";

export const useProductStore = defineStore('product', ()=> {
    const items = ref([]); 
    const loading = ref(true);
    const error = ref('');

    async function load()
    {
        loading.value = true;
        try {
            const prods = await api.get('products');        
            items.value = prods;
            return prods;
        } catch (e) {
            error.value = e.message;
        }finally{
            loading.value = false;
        }
        
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

    async function loadCategories(){
        try {
            const category = await api.get('categories');        
            categories.value = category;
        } catch (e) {            
            categoryError.value = e.message;
        }
    }

    async function init(){
        return await Promise.all([load(), loadCategories()])
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
