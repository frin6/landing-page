<template>
    <div v-if="show" class="fixed inset-0 z-50 overflow-y-auto">
        <div class="flex items-center justify-center min-h-screen p-4">
            <!-- Backdrop -->
            <div class="fixed inset-0 bg-black opacity-30" @click="$emit('close')"></div>

            <!-- Modal Content -->
            <div class="relative bg-white rounded-xl shadow-xl max-w-2xl w-full mx-auto">
                <div class="p-6">
                    <!-- Header -->
                    <div class="flex justify-between items-center mb-4">
                        <h3 class="text-lg font-semibold text-gray-900">Movement Details</h3>
                        <button @click="$emit('close')" class="p-2 hover:bg-gray-100 rounded-full">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                            </svg>
                        </button>
                    </div>

                    <!-- Movement Content -->
                    <div class="space-y-6">
                        <!-- Movement Header -->
                        <div class="flex items-center justify-between">
                            <div class="flex items-center space-x-3">
                                <div class="p-2 rounded-full bg-blue-50">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zm6-4a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zm6-3a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                                    </svg>
                                </div>
                                <div class="text-sm text-gray-600">
                                    {{ new Date(movement.time).toLocaleString() }}
                                </div>
                            </div>
                            <div class="flex items-center space-x-2">
                                <div class="w-2 h-2 rounded-full" 
                                    :class="parseFloat(movement.company.movement) >= 0 ? 'bg-green-500' : 'bg-red-500'">
                                </div>
                            </div>
                        </div>

                        <!-- Company Details -->
                        <div class="px-4 py-3 bg-gray-50 rounded-lg">
                            <div class="flex items-center justify-between">
                                <div class="text-sm font-medium text-gray-900">
                                    {{ movement.company.name }}
                                </div>
                                <div :class="[
                                    'text-sm font-semibold px-2 py-1 rounded-full',
                                    parseFloat(movement.company.movement) >= 0 
                                        ? 'text-green-700 bg-green-50' 
                                        : 'text-red-700 bg-red-50'
                                ]">
                                    {{ parseFloat(movement.company.movement * 100).toFixed(2) }}%
                                </div>
                            </div>
                            <div class="mt-1 text-sm text-gray-600">
                                {{ movement.message }}
                            </div>
                        </div>

                        <!-- Analysis -->
                        <div class="space-y-3">
                            <div class="text-sm font-medium text-gray-700">Analysis</div>
                            <div class="text-sm text-gray-600 bg-gray-50 p-4 rounded-lg whitespace-pre-line leading-relaxed" 
                                v-html="formatText(movement.reason)">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        show: {
            type: Boolean,
            required: true
        },
        movement: {
            type: Object,
            required: true
        }
    },
    methods: {
        formatText(text) {
            if (!text) return '';
            
            // Split text into lines to handle headers
            return text.split('\n').map(line => {
                // Handle headers
                if (line.startsWith('###')) {
                    const headerText = line.replace(/^###\s*/, '');
                    return `<h3 class="text-lg font-bold text-gray-900 mb-2">${headerText}</h3>`;
                }
                // Handle bold text
                return line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
            }).join('\n');
        }
    }
}
</script>