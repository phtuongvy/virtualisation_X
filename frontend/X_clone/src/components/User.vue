<script>
defineProps({
    value: {
        type: String,
        required: true
    }
})
</script>
<template>
    <div>

        <p>{{ value.name }}</p>
        <p>{{ value.email }}</p>
        <p>{{ value.password }}</p>
    </div>
</template>

<style scoped>
</style>