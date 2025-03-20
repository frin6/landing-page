<template>
    <div 
        @click="$emit('select')"
        class="p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors duration-200 flex items-center"
        :class="{'bg-teal-50 border-l-4 border-teal-500': selected}"
    >
        <div class="avatar-container mr-4 relative">
            <Avatar :name="customer.name" :color="getAvatarColor(customer.name)" />
            <div v-if="selected" class="absolute -bottom-1 -right-1 bg-teal-500 rounded-full p-1">
                <svg class="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                </svg>
            </div>
        </div>
        <div class="flex-1">
            <div class="font-medium text-gray-900">{{ customer.name }}</div>
        </div>
        <div v-if="selected" class="text-teal-500">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
            </svg>
        </div>
    </div>
</template>

<script>
import Avatar from '../shared/Avatar.vue'

export default {
    components: {
        Avatar
    },
    props: {
        customer: {
            type: Object,
            required: true
        },
        selected: {
            type: Boolean,
            default: false
        }
    },
    emits: ['select'],
    methods: {
        getAvatarColor(name) {
            if (!name) return '#2B4948';
            
            // Generate a consistent color based on the name
            let hash = 0;
            for (let i = 0; i < name.length; i++) {
                hash = name.charCodeAt(i) + ((hash << 5) - hash);
            }
            
            const colors = [
                '#4F46E5', '#10B981', '#F59E0B', '#EF4444', 
                '#8B5CF6', '#EC4899', '#06B6D4', '#84CC16'
            ];
            
            return colors[Math.abs(hash) % colors.length];
        }
    }
}
</script>

<style scoped>
.avatar-container {
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>