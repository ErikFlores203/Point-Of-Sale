
import { defineStore }  from "pinia"
import { computed, ref, watch, watchEffect } from "vue"
import { useCouponStore } from "./coupons"

export const useCartStore = defineStore('cart',()=>{

    const coupon = useCouponStore()
    const items = ref([])
    const subtotal = ref(0)
    const taxtes = ref(0)
    const total = ref(0)

    const MAX_PRODUCTS = 5
    const TAX_RATE = .16

    watchEffect(() =>{
        subtotal.value = items.value.reduce((total, item) => total + (item.quantity * item.price), 0)
        taxtes.value = subtotal.value * TAX_RATE
        total.value = (subtotal.value + taxtes.value) - coupon.discount
    })

    function addItem(item) {
        const index = isItemInCart(item.id)
        if (index >= 0){
            if(isProductAvailable(item,index)){
                alert('Has alcanzado el limite de este producto')
                return
            } 
            items.value[index].quantity++
        }else{

            items.value.push({...item, quantity: 1, id: item.id})
        }
    }

    function updateQuantity(id,quantity){
        items.value = items.value.map(item => item.id === id ? {...item, quantity} : item)
    }

    function removeItem(id){
        items.value = items.value.filter(item => item.id !== id)
    }

    const isItemInCart = id => items.value.findIndex(item => item.id === id)

    const isProductAvailable = (item, index) =>{
        return items.value[index].quantity >=item.availability || items.value[index].quantity >= MAX_PRODUCTS
    }

    const isEmpty = computed(() => items.value.length === 0)

    const checkProductAvailability = computed(()=>{
        return (product) => product.availability < MAX_PRODUCTS ? product.availability : MAX_PRODUCTS
    })

    return {
        addItem,
        updateQuantity,
        removeItem,
        isEmpty,
        items,
        subtotal,
        taxtes,
        total,
        checkProductAvailability
    }
})

