<template>
    <div v-if="show" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white rounded-xl shadow-2xl w-full max-w-md transform transition-all duration-300 ease-in-out" 
             :class="{'scale-100 opacity-100': show, 'scale-95 opacity-0': !show}">
            <div class="p-6">
                <div class="flex justify-between items-center mb-5">
                    <div>
                        <h3 class="text-xl font-bold text-gray-900">Select Customer</h3>
                        <p class="text-sm text-gray-500 mt-1">Choose a customer to view their portfolio</p>
                    </div>
                    <button @click="$emit('close')" class="text-gray-400 hover:text-gray-500 bg-gray-100 hover:bg-gray-200 rounded-full p-2 transition-colors">
                        <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                
                <div class="mb-6">
                    <div class="relative">
                        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
                            </svg>
                        </div>
                        <input 
                            type="text" 
                            placeholder="Search customers..." 
                            v-model="searchTerm"
                            class="w-full pl-10 px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-gray-50"
                        />
                    </div>
                </div>
                
                <div class="max-h-64 overflow-y-auto customer-list">
                    <div v-if="loading" class="flex flex-col justify-center items-center py-10">
                        <div class="loader mb-3"></div>
                        <p class="text-sm text-gray-500">Loading customers...</p>
                    </div>
                    
                    <div v-else-if="filteredCustomers.length === 0" class="text-center py-10">
                        <div class="icon-container mx-auto mb-2 text-gray-300">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <p class="text-gray-500">No customers found</p>
                        <p class="text-sm text-gray-400 mt-1">Try changing your search criteria</p>
                    </div>
                    
                    <div v-else class="space-y-2">
                        <CustomerCard 
                            v-for="customer in filteredCustomers"
                            :key="customer.id"
                            :customer="customer"
                            :selected="selectedCustomer && selectedCustomer.id === customer.id"
                            @select="selectCustomer(customer)"
                        />
                    </div>
                </div>
                
                <div class="mt-6 pt-4 border-t border-gray-200 flex justify-end space-x-3">
                    <button 
                        @click="$emit('close')" 
                        class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors duration-200 font-medium"
                    >
                        Cancel
                    </button>
                    <GradientButton 
                        @click="confirmSelection" 
                        :disabled="!selectedCustomer"
                    >
                        <span>Continue</span>
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
                        </svg>
                    </GradientButton>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import CustomerCard from '../customer/CustomerCard.vue'
import GradientButton from '../shared/GradientButton.vue'

export default {
    components: {
        CustomerCard,
        GradientButton
    },
    props: {
        show: Boolean,
        customers: Array,
        loading: Boolean
    },
    emits: ['close', 'confirm'],
    data() {
        return {
            searchTerm: '',
            selectedCustomer: null
        }
    },
    computed: {
        filteredCustomers() {
            if (!this.searchTerm) {
                return this.customers;
            }
            
            const searchTermLower = this.searchTerm.toLowerCase();
            return this.customers.filter(customer => {
                return customer.name.toLowerCase().includes(searchTermLower) || 
                       customer.email.toLowerCase().includes(searchTermLower);
            });
        }
    },
    methods: {
        selectCustomer(customer) {
            this.selectedCustomer = customer;
        },
        confirmSelection() {
            if (this.selectedCustomer) {
                this.$emit('confirm', this.selectedCustomer);
            }
        }
    }
}
</script>

<style scoped>
.loader {
    border: 3px solid rgba(43, 73, 72, 0.1);
    border-radius: 50%;
    border-top: 3px solid #2B4948;
    width: 32px;
    height: 32px;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

.customer-list {
    scrollbar-width: thin;
    scrollbar-color: #D1D5DB transparent;
}

.customer-list::-webkit-scrollbar {
    width: 6px;
}

.customer-list::-webkit-scrollbar-track {
    background: transparent;
}

.customer-list::-webkit-scrollbar-thumb {
    background-color: #D1D5DB;
    border-radius: 20px;
}
</style>