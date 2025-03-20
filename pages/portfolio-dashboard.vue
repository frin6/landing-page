<template>
    <div class="flex h-screen">
        <Sidebar />

        <div class="w-full">
            <!-- No Customer Selected UI -->
            <EmptyCustomerState 
                v-if="!finalCustomerSelection" 
                @select-customer="showCustomerModal = true" 
            />

            <!-- Customer Portfolio Content -->
            <div v-else class="h-screen w-full">
                <div class="portal p-4">
                    <div class="flex w-full">
                        <!-- Chart Section (Left Side) -->
                        <div class="flex-grow w-3/4">
                            <ChartComponent 
                                :key="selectedPortfolioIndex"
                                :portfolioData="{
                                    dates: generateDates(),
                                    values: selectedPortfolioIndex === 0 ? europeanBankingETFPrices : 
                                            selectedPortfolioIndex === 1 ? sustainableEnergyUSAETFPrices : renewableEnergyEuropeETFPrices
                                }"
                            />
                        </div>
                        <!-- Portfolio Owner Section (Right Side) -->
                        <div class="w-1/4">
                            <PortfolioOwner 
                                :portfolioData="portfolioData"
                                :selectedPortfolioIndex="selectedPortfolioIndex"
                                @update:selectedPortfolioIndex="selectedPortfolioIndex = $event"
                            />
                            
                            <!-- Benchmark Card -->
                            <div class="mt-6 overflow-hidden rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300">
                                <!-- Card Header -->
                                <div 
                                    class="px-4 py-3 flex justify-between items-center cursor-pointer"
                                    @click="toggleComparison"
                                >
                                    <div class="flex items-center space-x-2">
                                        <div class="p-2 rounded-full" style="background-color: #EDF4F4;">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-600" viewBox="0 0 20 20" fill="#2B4948">
                                                <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zm6-4a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zm6-3a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                                            </svg>
                                        </div>
                                        <span class="font-medium">S&P 500 BM vs Portfolio</span>
                                    </div>
                                    <div>
                                        <div class="relative w-11 h-6 flex items-center bg-gray-200 rounded-full transition duration-300 focus:outline-none"
                                             :class="{'bg-blue-600': showComparison}">
                                            <div class="absolute left-0.5 w-5 h-5 bg-white rounded-full transition transform duration-300 shadow-md"
                                                 :class="{'translate-x-5': showComparison}" :style="{ backgroundColor: showComparison ? '#2B4948' : '#EDF4F4' }">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <!-- Comparison Content (animated) -->
                                <div 
                                    v-if="showComparison"
                                    class="overflow-hidden transition-all duration-300"
                                    style="max-height: 500px; background-color: #EDF4F4;"
                                >
                                    <div class="p-4">
                                        <div class="grid grid-cols-3 gap-4">
                                            <!-- S&P 500 -->
                                            <div class="p-3 bg-white rounded-lg border border-gray-100 shadow-sm">
                                                <div class="text-xs text-gray-500 uppercase tracking-wide">S&P 500</div>
                                                <div class="mt-1 text-lg font-bold text-blue-600">+{{ benchmarkData.sp500 }}%</div>
                                            </div>
                                            
                                            <!-- Portfolio -->
                                            <div class="p-3 bg-white rounded-lg border border-gray-100 shadow-sm">
                                                <div class="text-xs text-gray-500 uppercase tracking-wide truncate">{{ currentPortfolioName }}</div>
                                                <div class="mt-1 text-lg font-bold text-indigo-600">+{{ benchmarkData.portfolio }}%</div>
                                            </div>
                                            
                                            <!-- Difference -->
                                            <div class="p-3 bg-white rounded-lg border border-gray-100 shadow-sm">
                                                <div class="text-xs text-gray-500 uppercase tracking-wide">Difference</div>
                                                <div 
                                                    class="mt-1 text-lg font-bold"
                                                    :class="benchmarkData.portfolio > benchmarkData.sp500 ? 'text-green-600' : 'text-red-600'"
                                                >
                                                    {{ benchmarkData.portfolio > benchmarkData.sp500 ? '+' : '' }}{{ benchmarkData.portfolio - benchmarkData.sp500 }}%
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
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
import PortfolioOwner from '../components/portfolio/PortfolioOwner.vue'
import ChartComponent from '../components/chart/ChartComponent.vue'

export default {
    components: {
        Sidebar,
        EmptyCustomerState,
        CustomerSelectionModal,
        PortfolioContent,
        PortfolioOwner,
        ChartComponent
    },
    data() {
        return {
            showCustomerModal: false,
            customers: [],
            finalCustomerSelection: null, // This tracks confirmed customer selection
            loading: false,
            portfolioData: null,
            selectedPortfolioIndex: 0,
            showComparison: false,
            benchmarkData: {
                sp500: 7,
                portfolio: 4
            },
            europeanBankingETFPrices: [
                23.45, 23.67, 24.12, 23.98, 24.35, 25.45, 24.78, 24.56,
                24.87, 25.02, 25.12, 24.89,
                25.23, 25.10, 24.95, 25.32, 25.67,
                25.45, 26.34, 26.09,
                25.32, 25.18, 24.89, 25.87, 25.64,
                25.78, 26.12, 26.45, 25.78, 26.03, 
            ],
            sustainableEnergyUSAETFPrices: [
                52.78, 53.21, 52.67, 53.45, 42.35, 44.65, 
                45.23, 47.15,
                47.89, 48.34, 47.93, 48.56, 49.21,
                48.76, 48.32, 47.98, 48.45, 49.12,
                49.87, 50.34, 51.28, 50.87, 51.45,
                52.12, 43.12, 44.28, 43.87, 46.10, 45.78, 46.32
            ],
            renewableEnergyEuropeETFPrices: [ 37.89, 38.23, 37.95,
                36.45, 37.12,  
                38.45, 39.12, 38.87, 39.34, 40.12,
                40.87, 41.23, 44.87, 
                40.78, 40.56, 41.28,
                41.89, 42.34, 42.87, 42.45, 41.98,
                42.56, 43.12, 43.67, 44.23, 43.89,
                44.45, 45.34, 46.12, 45.12
            ],
        }
    },
    computed: {
        currentPortfolio() {
            if (!this.portfolioData || this.portfolioData.length === 0) return null;
            return this.portfolioData[this.selectedPortfolioIndex];
        },
        currentPortfolioName() {
            if (!this.currentPortfolio) return '';
            return this.currentPortfolio.name || 'Portfolio';
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
        generateDates() {
            // Generate dates for the last 30 days
            const dates = [];
            const today = new Date();
            for (let i = 29; i >= 0; i--) {
                const date = new Date();
                date.setDate(today.getDate() - i);
                dates.push(date.toISOString().split('T')[0]); // Format as YYYY-MM-DD
            }
            return dates;
        },
        toggleComparison() {
            this.showComparison = !this.showComparison;
            
            // Fetch comparison data when enabled
            if (this.showComparison) {
                this.fetchComparisonData();
            }
        },
        
        async fetchComparisonData() {
            // This would fetch real comparison data from an API
            // For now using the mock data from data property
            
            // Example API call (commented out):
            // try {
            //     const response = await fetch('https://api-y7xu.onrender.com/benchmark', {
            //         method: 'POST',
            //         headers: {
            //             'Content-Type': 'application/json'
            //         },
            //         body: JSON.stringify({ portfolioId: this.currentPortfolio.id })
            //     });
            //     
            //     this.benchmarkData = await response.json();
            // } catch (error) {
            //     console.error('Error fetching benchmark data:', error);
            // }
        },
        
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