<template>
    <div class="flex h-screen">
        <Sidebar />

        <div class="flex-1 overflow-auto">
            <!-- No Customer Selected UI -->
            <EmptyCustomerState 
                v-if="!finalCustomerSelection" 
                @select-customer="showCustomerModal = true" 
            />

            <!-- Customer Portfolio Content -->
            <div v-else class="h-screen w-full">
                <div class="portal p-10">
                    <div class="flex w-full">
                        <div class="flex-grow"></div>
                        <div class="w-1/4 bg-white shadow-md rounded-lg p-4 mb-6">
                            <div v-if="portfolioData && portfolioData.length > 0">
                                <div class="flex justify-between items-center mb-3">
                                    <h3 class="text-lg font-semibold text-gray-800">
                                        {{ portfolioData[0].customer_name }} {{ portfolioData[0].customer_surname }}
                                    </h3>
                                    <span class="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                                        {{ portfolioData.length }} Portfolios
                                    </span>
                                </div>
                                
                                <div class="mb-3">
                                    <label class="block text-sm font-medium text-gray-700 mb-1">
                                        Select Portfolio
                                    </label>
                                    <select 
                                        v-model="selectedPortfolioIndex" 
                                        class="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                    >
                                        <option 
                                            v-for="(portfolio, index) in portfolioData" 
                                            :key="index" 
                                            :value="index"
                                        >
                                            {{ portfolio.portofolio_name }}
                                        </option>
                                    </select>
                                </div>
                                
                                <div v-if="currentPortfolio" class="border-t pt-3">
                                    <div class="flex justify-between text-sm mb-1">
                                        <span class="text-gray-600">Total Investment:</span>
                                        <span class="font-medium">${{ formatNumber(currentPortfolio.assetjson.total_investment) }}</span>
                                    </div>
                                    <div class="flex justify-between text-sm">
                                        <span class="text-gray-600">Asset Count:</span>
                                        <span class="font-medium">{{ currentPortfolio.assetjson.assets.length }}</span>
                                    </div>
                                </div>
                            </div>
                            <div v-else class="text-center py-4 text-gray-500">
                                Loading portfolio data...
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Customer Selection Modal -->
        <CustomerSelectionModal
            :show="showCustomerModal"
            :customers="customers"
            :loading="loading"
            @close="closeCustomerModal"
            @confirm="confirmSelection"
        />
    </div>
</template>

<script>
import Sidebar from '../components/sidebar/Sidebar.vue'
import EmptyCustomerState from '../components/customer/EmptyCustomerState.vue'
import CustomerSelectionModal from '../components/customer/CustomerSelectionModal.vue'
import PortfolioContent from '../components/portfolio/PortfolioContent.vue'

export default {
    components: {
        Sidebar,
        EmptyCustomerState,
        CustomerSelectionModal,
        PortfolioContent
    },
    data() {
        return {
            showCustomerModal: false,
            customers: [],
            finalCustomerSelection: null, // This tracks confirmed customer selection
            loading: false,
            portfolioData: null,
            selectedPortfolioIndex: 0
        }
    },
    computed: {
        currentPortfolio() {
            if (!this.portfolioData || this.portfolioData.length === 0) return null;
            return this.portfolioData[this.selectedPortfolioIndex];
        }
    },
    mounted() {
        // Show the modal when component is mounted
        this.fetchCustomers();
        setTimeout(() => {
            this.showCustomerModal = true;
        }, 500);
    },
    methods: {
        async fetchCustomers() {
            this.loading = true;
            try {
                const response = await fetch('https://api-y7xu.onrender.com/clients', {
                    method: 'GET',
                });

                this.customers = await response.json();

                // add name + ' ' + surname to the customer object in name field
                for (let i = 0; i < this.customers.length; i++) {
                    this.customers[i].name = this.customers[i].name + ' ' + this.customers[i].surname;
                    this.customers[i].id = i;
                }

                this.loading = false;
            } catch (error) {
                console.error('Error fetching customers:', error);
                this.loading = false;
            }
        },
        closeCustomerModal() {
            this.showCustomerModal = false;
        },
        confirmSelection(customer) {
            this.finalCustomerSelection = customer;
            this.showCustomerModal = false;
            this.fetchCustomerPortfolio(customer);
        },
        async fetchCustomerPortfolio(customer) {
            try {
                const response = await fetch('https://api-y7xu.onrender.com/portfolio', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ name: customer.name.split(' ')[0], surname: customer.name.split(' ')[1] })
                });
                
                this.portfolioData = await response.json();
                console.log('Customer portfolio data:', this.portfolioData);
                this.selectedPortfolioIndex = 0; // Set to first portfolio by default
                
            } catch (error) {
                console.error('Error fetching customer portfolio:', error);
            }
        },
        formatNumber(value) {
            return new Intl.NumberFormat('en-US', { 
                maximumFractionDigits: 0
            }).format(value);
        }
    }
}
</script>