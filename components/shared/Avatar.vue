<template>
    <div class="avatar" :style="{ backgroundColor: color }">
        {{ initials }}
    </div>
</template>

<script>
export default {
    props: {
        name: {
            type: String,
            required: true
        },
        color: {
            type: String,
            default: '#2B4948'
        }
    },
    computed: {
        initials() {
            if (!this.name) return '';
            return this.name.split(' ')
                .map(part => part.charAt(0))
                .join('')
                .toUpperCase()
                .substring(0, 2);
        }
    }
}
</script>

<style scoped>
.avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: 600;
    font-size: 14px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
}
</style>