<template>
    <v-container>
        <v-row no-gutters>
            <product-list></product-list>
        </v-row>
    </v-container>
</template>

<script>
import ProductList from "./ProductList"
export default {
    components: {
        ProductList,
    }
}
</script>