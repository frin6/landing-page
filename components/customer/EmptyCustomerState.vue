<template>
    <div class="flex-1 flex items-center justify-center h-screen bg-gray-50 ml-96">
        <div class="max-w-md w-full p-8 bg-white rounded-xl shadow-lg animate-fadeIn">
            <div class="text-center mb-6">
                <div class="mb-4 inline-flex items-center justify-center w-16 h-16 rounded-full bg-teal-50 text-teal-600">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                </div>
                <h2 class="text-2xl font-bold text-gray-800 mb-2">No Customer Selected</h2>
                <p class="text-gray-600">Please select a customer to view their portfolio details and financial information.</p>
            </div>
            <div class="space-y-4">
                <div class="p-4 bg-gray-50 rounded-lg border border-gray-100">
                    <div class="flex items-start">
                        <div class="flex-shrink-0 mt-1">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-teal-500" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
                            </svg>
                        </div>
                        <div class="ml-3">
                            <p class="text-sm text-gray-700">Selecting a customer will allow you to view their assets, portfolio performance, and generate reports.</p>
                        </div>
                    </div>
                </div>
                <GradientButton fullWidth size="lg" @click="$emit('select-customer')">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
                    </svg>
                    Select Customer
                </GradientButton>
            </div>
        </div>
    </div>
</template>

<script>
import GradientButton from '../shared/GradientButton.vue'

export default {
    components: {
        GradientButton
    },
    emits: ['select-customer']
}
</script>

<style scoped>
@keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
}

.animate-fadeIn {
    animation: fadeIn 0.5s ease-out;
}
</style>