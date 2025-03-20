<template>
  <div v-if="portfolioData && portfolioData.length > 0" class="bg-white shadow-sm rounded-lg p-4" style="border-right: 1px solid #e2e8f0; box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.05);">
    <div class="flex items-center space-x-3 mb-4 pb-3 border-b border-gray-100">
      <div>
        <h3 class="text-base font-semibold text-gray-800">
          {{ portfolioData[0].customer_name }} {{ portfolioData[0].customer_surname }}
        </h3>
      </div>
    </div>
    
    <h4 class="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Portfolios</h4>
    
    <div class="flex flex-wrap gap-2">
      <div 
        v-for="(portfolio, index) in portfolioData" 
        :key="index"
        @click="selectPortfolio(index)"
        class="flex flex-col items-center p-2 rounded-md cursor-pointer"
        :class="selectedPortfolioIndex === index ? 'selected-portfolio' : 'hover:bg-gray-50'"
      >
        <div 
          class="h-8 w-8 rounded-full flex items-center justify-center text-white text-xs mb-1"
          :style="{ backgroundColor: getGreenAquaColor(portfolio.portofolio_name) }"
        >
          {{ portfolio.portofolio_name.charAt(0) }}
        </div>
        <p class="text-xs font-medium text-gray-700 text-center whitespace-nowrap">
          {{ portfolio.portofolio_name.length > 10 
            ? portfolio.portofolio_name.substring(0, 10) + '...' 
            : portfolio.portofolio_name }}
        </p>
      </div>
    </div>
  </div>
  <div v-else class="bg-white shadow-sm rounded-lg p-4">
    <div class="animate-pulse flex space-x-4">
      <div class="rounded-full bg-gray-200 h-10 w-10"></div>
      <div class="flex-1 space-y-2 py-1">
        <div class="h-4 bg-gray-200 rounded w-3/4"></div>
        <div class="h-3 bg-gray-200 rounded w-1/2"></div>
      </div>
    </div>
    <div class="h-4 bg-gray-200 rounded w-1/4 mt-4 mb-2"></div>
    <div class="flex gap-2">
      <div class="animate-pulse p-2">
        <div class="rounded-full bg-gray-200 h-8 w-8 mb-1"></div>
        <div class="h-2 bg-gray-200 rounded w-8"></div>
      </div>
      <div class="animate-pulse p-2">
        <div class="rounded-full bg-gray-200 h-8 w-8 mb-1"></div>
        <div class="h-2 bg-gray-200 rounded w-8"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    portfolioData: {
      type: Array,
      default: () => []
    },
    selectedPortfolioIndex: {
      type: Number,
      default: 0
    }
  },
  methods: {
    selectPortfolio(index) {
      this.$emit('update:selectedPortfolioIndex', index);
    },
    getGreenAquaColor(name) {
      // Generate a consistent color based on the name
      let hash = 0;
      for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
      }
      
      // List of green and aqua tonalities
      const greenAquaColors = [
        '#0D9488', // teal-600
        '#059669', // emerald-600
        '#10B981', // emerald-500
        '#34D399', // emerald-400
        '#2DD4BF', // teal-400
        '#14B8A6', // teal-500
        '#0891B2', // cyan-600
        '#06B6D4', // cyan-500
        '#22D3EE', // cyan-400
        '#67E8F9', // cyan-300
        '#5EEAD4', // teal-300
        '#2B4948', // dark teal
        '#43766C', // forest green
        '#00A896', // bright teal
        '#3CAEA3', // medium teal
        '#38A3A5', // blueish teal
      ];
      
      // Use the hash to pick a color
      const index = Math.abs(hash) % greenAquaColors.length;
      return greenAquaColors[index];
    }
  }
}
</script>

<style scoped>
.selected-portfolio {
  background-color: #EDF4F4;
}
</style>