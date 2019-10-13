<template>
    <button class="btn btn-primary" @click="$emit('onSubmit')" >{{ nameButton }}</button>
</template>

<script>
export default {
    props: {
        nameButton: {
            type: String,
            default: ''
        }
    },

}
</script>