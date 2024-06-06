import { defineStore } from "pinia";
import { computed, ref, watch } from "vue";
import { useCartStore } from "./cart";


export const useCouponStore = defineStore('coupon', ()=>{
    const cart =  useCartStore()
    const couponInput = ref('')
    const couponValidationMessage = ref('')
    const discountPercentage = ref(0)
    const discount = ref(0)

    const VALID_COUPONS = [
        {name: '10', discount: .10},
        {name: '20DESCUENTO', discount: .20}

    ]

    watch(discountPercentage, () =>{
        discount.value = (cart.total * discountPercentage.value).toFixed(2)
    })

    function applyCoupon (){
        if(VALID_COUPONS.some(coupon => coupon.name === couponInput.value)){
            couponValidationMessage.value = 'Aplicando cupón'
            
            setTimeout(() => {
                discountPercentage.value = VALID_COUPONS.find(coupon => coupon.name === couponInput.value).discount
                couponValidationMessage.value = '¡Cupón Aplicado!'

            }, 3000);
        } else{
            couponValidationMessage.value = 'No existe el cupón'
        }

        setTimeout(()=> {
            couponValidationMessage.value = ''
        }, 6000)
    }

    const isValidCoupon = computed(()=> discountPercentage.value > 0)

    return{
        applyCoupon,
        couponInput,
        couponValidationMessage,
        discount,
        isValidCoupon
        
    }
})