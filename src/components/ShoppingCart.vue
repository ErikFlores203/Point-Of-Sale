<script setup>
    import { useCartStore } from '@/stores/cart';
    import { formatCurrency } from "@/helpers";
    import Amount from '@/components/Amount.vue'
    import ShoppingCartItem from '@/components/ShoppingCartItem.vue'
    const cart = useCartStore()
</script>

<template>
    <p v-if="cart.isEmpty" class="text-xl text-center text-gray-900">El Carrito esta vacio</p>
    <div v-else>
        <p class="text-4xl font-bold text-center text-gray-900" >Resumen de venta</p>
        <ul
            role="list"
            class="mt-6 divide-y divide-gray-200"
        >
            <ShoppingCartItem
                v-for="item in cart.items"
                :key="item.id"
                :item="item"
            />

        </ul>
        <dl class="space-7-6 border-t border-gray-200 pt-6 text-sm font-medium text-gray-600">
            <Amount>
                <template #label>Subtotal:</template>
                {{ formatCurrency(cart.subtotal) }}
            </Amount>
            <Amount>
                <template #label>impuestos:</template>
                {{ formatCurrency(cart.taxtes) }}
            </Amount>
            <Amount>
                <template #label>Total:</template>
                {{ formatCurrency(cart.total) }}
            </Amount>
        </dl>
    </div>
</template>