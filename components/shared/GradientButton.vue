<template>
    <button 
        @click="$emit('click')" 
        class="gradient-button flex items-center justify-center"
        :class="[fullWidth ? 'w-full' : '', size === 'lg' ? 'py-3 px-4' : 'px-4 py-2']"
        :disabled="disabled"
    >
        <slot></slot>
    </button>
</template>

<script>
export default {
    props: {
        disabled: {
            type: Boolean,
            default: false
        },
        fullWidth: {
            type: Boolean,
            default: false
        },
        size: {
            type: String,
            default: 'md', // 'sm', 'md', 'lg'
            validator: value => ['sm', 'md', 'lg'].includes(value)
        }
    },
    emits: ['click']
}
</script>

<style scoped>
.gradient-button {
    background: linear-gradient(135deg, #2B4948 0%, #1E3F3E 100%);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    color: white;
    font-weight: 600;
    transition: all 0.2s ease;
}

.gradient-button:hover:not(:disabled) {
    background: linear-gradient(135deg, #263f3e 0%, #193534 100%);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.15);
}

.gradient-button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}
</style>