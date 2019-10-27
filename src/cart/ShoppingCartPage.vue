<template>
    <div id="app">
    <h1>Shopping Cart Example</h1>
    <hr>
    <h2>Products</h2>
    <ProductList1/>
    <hr>
    <ShoppingCart/>
  </div>
</template>

<script>
import ProductList1 from "../components/ProductList1";
import ShoppingCart from "../components/ShoppingCart";

export default {
    components: {
        ProductList1,
        ShoppingCart
    }
}
</script>