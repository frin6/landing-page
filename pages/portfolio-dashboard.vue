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
                <div class="portal p-8">
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
                                </div>
                                
                                <!-- Comparison Content (animated) -->
                                <div 
                                    class="overflow-hidden transition-all duration-300"
                                    style="max-height: 500px; background-color: #EDF4F4;"
                                >
                                    <div class="p-4">
                                        <div class="grid grid-cols-3 gap-4">
                                            <!-- S&P 500 -->
                                            <div class="p-3 bg-white rounded-lg border border-gray-100 shadow-sm">
                                                <div class="text-xs text-gray-500 uppercase tracking-wide">S&P 500</div>
                                                <div class="mt-1 text-lg font-bold text-blue-600">{{ benchmarkData.sp500 }}%</div>
                                            </div>
                                            
                                            <!-- Portfolio -->
                                            <div class="p-3 bg-white rounded-lg border border-gray-100 shadow-sm">
                                                <div class="text-xs text-gray-500 uppercase tracking-wide truncate">{{ currentPortfolioName }}</div>
                                                <div class="mt-1 text-lg font-bold text-indigo-600">{{ benchmarkData.portfolio }}%</div>
                                            </div>
                                            
                                            <!-- Difference -->
                                            <div class="p-3 bg-white rounded-lg border border-gray-100 shadow-sm">
                                                <div class="text-xs text-gray-500 uppercase tracking-wide">Difference</div>
                                                <div 
                                                    class="mt-1 text-lg font-bold"
                                                    :class="benchmarkData.portfolio > benchmarkData.sp500 ? 'text-green-600' : 'text-red-600'"
                                                >
                                                    {{ benchmarkData.portfolio > benchmarkData.sp500 ? '+' : '' }}{{ (benchmarkData.portfolio - benchmarkData.sp500).toFixed(2) }}%
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Assets Queue -->
                            <div class="mt-6">
                                <div class="min-h-full assets-queue bg-white shadow-sm rounded-lg p-4">
                                    <!-- Header Section -->
                                    <div class="header flex items-center justify-between mb-4 p-4">
                                        <div class="flex justify-center space-x-4 flex-col items-start">
                                            <h4 class="text-lg font-semibold">
                                                {{ portfolioData[selectedPortfolioIndex].assetjson.assets[currentAssetIndex].name }}<br> 
                                                ({{ portfolioData[selectedPortfolioIndex].assetjson.assets[currentAssetIndex].ticker }})
                                            </h4>
                                            <div class="flex items-center space-x-2 mt-4">
                                                <div class="text-gray-600 text-md">${{ currentPrice }}</div>
                                                <div class="flex items-center space-x-1">
                                                    <div class="px-3 py-1 rounded-md text-sm font-medium flex items-center" 
                                                        :class="assetPriceChange >= 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'">
                                                        <span class="mr-1">LIVE</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <!-- Navigation Buttons -->
                                        <div class="flex items-center space-x-2">
                                            <button 
                                                @click="previousAsset"
                                                class="p-2 rounded-full hover:bg-gray-100 transition-colors"
                                                :disabled="currentAssetIndex === 0"
                                                :class="{'opacity-50 cursor-not-allowed': currentAssetIndex === 0}"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" :class="currentAssetIndex === 0 ? 'text-gray-300' : 'text-gray-600'" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
                                                </svg>
                                            </button>
                                            <button 
                                                @click="nextAsset"
                                                class="p-2 rounded-full hover:bg-gray-100 transition-colors"
                                                :disabled="currentAssetIndex === portfolioData[selectedPortfolioIndex].assetjson.assets.length - 1"
                                                :class="{'opacity-50 cursor-not-allowed': currentAssetIndex === portfolioData[selectedPortfolioIndex].assetjson.assets.length - 1}"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" :class="currentAssetIndex === portfolioData[selectedPortfolioIndex].assetjson.assets.length - 1 ? 'text-gray-300' : 'text-gray-600'" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>

                                    <!-- Queue Content -->
                                    <div class="queue-content relative">
                                        <div v-if="getLastMovement" 
                                            class="p-6 bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden"
                                            style="max-height: 400px">
                                            <!-- Movement Header -->
                                            <div class="flex justify-between items-center mb-4">
                                                <div class="flex items-center space-x-4">
                                                    <div class="font-semibold text-gray-900">Latest Relevant Movement</div>
                                                </div>
                                                <div class="flex items-center space-x-2">
                                                    <div class="w-2 h-2 rounded-full" 
                                                        :class="parseFloat(getLastMovement.company.movement) >= 0 ? 'bg-green-500' : 'bg-red-500'">
                                                    </div>
                                                    <div class="text-sm text-gray-600">
                                                        {{ new Date(getLastMovement.time).toLocaleString() }}
                                                    </div>   
                                                </div>
                                            </div>

                                            <!-- Movement Preview -->
                                            <div class="space-y-4">
                                                <div class="px-4 py-3 bg-gray-50 rounded-lg">
                                                    <div class="flex items-center justify-between">
                                                        <div class="text-sm font-medium text-gray-900">
                                                            {{ getLastMovement.company.name }}
                                                        </div>
                                                        <div :class="[
                                                            'text-sm font-semibold px-2 py-1 rounded-full',
                                                            parseFloat(getLastMovement.company.movement) >= 0 
                                                                ? 'text-green-700 bg-green-50' 
                                                                : 'text-red-700 bg-red-50'
                                                        ]">
                                                            {{ parseFloat(getLastMovement.company.movement * 100).toFixed(2) }}%
                                                        </div>
                                                    </div>
                                                    <div class="mt-1 text-sm text-gray-600 line-clamp-2">
                                                        {{ getLastMovement.message }}
                                                    </div>
                                                </div>
                                            </div>

                                            <!-- Read More Button -->
                                            <button
                                                @click="showMovementModal = true"
                                                class="mt-4 w-full px-4 py-2 text-sm font-medium text-blue-600 
                                                    bg-white border border-blue-200 rounded-full 
                                                    hover:bg-blue-50 transition-colors duration-200
                                                    shadow-sm">
                                                View Details
                                            </button>
                                        </div>

                                        <!-- Empty State -->
                                        <div v-else class="p-8 text-center">
                                            <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                                                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            </div>
                                            <div class="text-gray-500 font-medium">No movements available</div>
                                            <div class="text-sm text-gray-400 mt-1">Check back later for updates</div>
                                        </div>

                                        <!-- Read More Button -->
                                        <button v-if="contentExceedsLimit"
                                                @click="showFullContent = !showFullContent"
                                                class="absolute bottom-4 left-1/2 transform -translate-x-1/2 
                                                    px-4 py-2 text-sm font-medium text-blue-600 
                                                    bg-white border border-blue-200 rounded-full 
                                                    hover:bg-blue-50 transition-colors duration-200
                                                    shadow-sm z-10">
                                            {{ showFullContent ? 'Show Less' : 'Read More' }}
                                        </button>
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

        <!-- Movement Detail Modal -->
        <MovementDetailModal
            v-if="getLastMovement"
            :show="showMovementModal"
            :movement="getLastMovement"
            @close="showMovementModal = false"
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
import MovementDetailModal from '../components/portfolio/MovementDetailModal.vue'

export default {
    components: {
        Sidebar,
        EmptyCustomerState,
        CustomerSelectionModal,
        PortfolioContent,
        PortfolioOwner,
        ChartComponent,
        MovementDetailModal
    },
    data() {
        return {
            showFullContent: false,
            contentExceedsLimit: false,
            showCustomerModal: false,
            customers: [],
            finalCustomerSelection: null, // This tracks confirmed customer selection
            loading: false,
            portfolioData: null,
            selectedPortfolioIndex: 0,
            showComparison: false,
            benchmarkData: {
                sp500: -12.40,
                portfolio: 0  // This will be updated by the watcher
            },
            currentAssetIndex: 0,
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
            showMovementModal: false,
        }
    },
    computed: {
        getLastMovement() {
    if (!this.portfolioData || 
        !this.portfolioData[this.selectedPortfolioIndex] || 
        !this.portfolioData[this.selectedPortfolioIndex].queuejson ||
        !this.portfolioData[this.selectedPortfolioIndex].queuejson.movements ||
        this.portfolioData[this.selectedPortfolioIndex].queuejson.movements.length === 0 ||
        !this.portfolioData[this.selectedPortfolioIndex].assetjson ||
        !this.portfolioData[this.selectedPortfolioIndex].assetjson.assets[this.currentAssetIndex]) {
        return null;
    }

    const currentTicker = this.portfolioData[this.selectedPortfolioIndex].assetjson.assets[this.currentAssetIndex].ticker;
    const movements = this.portfolioData[this.selectedPortfolioIndex].queuejson.movements;
    
    // Find the last movement that matches the current asset's ticker
    for (let i = movements.length - 1; i >= 0; i--) {
        if (movements[i].company.ticker === currentTicker) {
            return movements[i];
        }
    }
    
    return null;
},
        selectedDataset() {
            switch(this.selectedPortfolioIndex) {
                case 0:
                    return this.europeanBankingETFPrices;
                case 1:
                    return this.sustainableEnergyUSAETFPrices;
                case 2:
                    return this.renewableEnergyEuropeETFPrices;
                default:
                    return this.europeanBankingETFPrices;
            }
        },
        canNavigate() {
            return this.portfolioData && 
                this.portfolioData[this.selectedPortfolioIndex] && 
                this.portfolioData[this.selectedPortfolioIndex].assetjson &&
                this.portfolioData[this.selectedPortfolioIndex].assetjson.assets;
        },
        currentPrice() {
            const prices = this.selectedDataset;
            return prices[prices.length - 1].toFixed(2);
        },
        assetPriceChange() {
            const prices = this.selectedDataset;
            if (!prices || prices.length < 2) return 0;
            const firstPrice = prices[0];
            const lastPrice = prices[prices.length - 1];
            return ((lastPrice - firstPrice) / firstPrice * 100).toFixed(2);
        },
        portfolioPerformance() {
            const prices = this.selectedDataset;
            if (!prices || prices.length < 2) return 0;
            
            const firstValue = prices[0];
            const lastValue = prices[prices.length - 1];
            const percentageChange = ((lastValue - firstValue) / firstValue) - 10;
            
            return Number(percentageChange.toFixed(2));
        },
        currentPortfolio() {
            if (!this.portfolioData || this.portfolioData.length === 0) return null;
            return this.portfolioData[this.selectedPortfolioIndex];
        },
        currentPortfolioName() {
            if (!this.currentPortfolio) return '';
            return this.currentPortfolio.name || 'Portfolio';
        },
    },
    watch: {
        getLastMovement: {
            handler() {
                this.showFullContent = false;
                this.checkContentHeight();
            },
            immediate: true
        },
        portfolioPerformance: {
            handler(newValue) {
                this.benchmarkData.portfolio = newValue;
            },
            immediate: true
        },
        selectedPortfolioIndex() {
            // Reset asset index when changing portfolios
            this.currentAssetIndex = 0;
        }
    },
    mounted() {
        // Show the modal when component is mounted
        this.fetchCustomers();
        setTimeout(() => {
            this.showCustomerModal = true;
        }, 500);

        this.checkContentHeight();
        window.addEventListener('resize', this.checkContentHeight);
    },
    methods: {
        checkContentHeight() {
            this.$nextTick(() => {
                const content = this.$el.querySelector('.queue-content > div');
                if (content) {
                    this.contentExceedsLimit = content.scrollHeight > 500;
                }
            });
        },
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
        previousAsset() {
            if (this.currentAssetIndex > 0) {
                this.currentAssetIndex--;
            }
        },
        
        nextAsset() {
            const maxIndex = this.portfolioData[this.selectedPortfolioIndex].assetjson.assets.length - 1;
            if (this.currentAssetIndex < maxIndex) {
                this.currentAssetIndex++;
            }
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
        // Add to beforeDestroy
beforeDestroy() {
    window.removeEventListener('resize', this.checkContentHeight);
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