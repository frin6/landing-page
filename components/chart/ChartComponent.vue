<template>
  <div class="portfolio-chart-container h-full w-full">
    <div class="flex items-center justify-between mb-4">
      <div>
        <h3 class="text-lg font-semibold text-gray-800">Portfolio Performance</h3>
        <p class="text-sm text-gray-500">Last 30 days</p>
      </div>
    </div>
    <div class="relative h-[400px] mx-6">
      <canvas ref="chartCanvas"></canvas>
    </div>
  </div>
</template>

<script>
import Chart from 'chart.js/auto';

export default {
  props: {
    portfolioData: {
      type: Object,
      required: true,
      validator: (value) => {
        return value && Array.isArray(value.dates) && Array.isArray(value.values);
      }
    }
  },
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    this.renderChart();
  },
  methods: {
    renderChart() {
      if (!this.$refs.chartCanvas || !this.portfolioData) {
        console.error('Chart canvas or portfolio data not available');
        return;
      }

      try {
        // Destroy existing chart if it exists
        if (this.chart) {
          this.chart.destroy();
          this.chart = null;
        }

        const ctx = this.$refs.chartCanvas.getContext('2d');
        
        // Process data from props
        const { portfolioValues, labels } = this.processChartData();
        
        // Chart configuration
        this.chart = new Chart(ctx, {
          type: 'line',
          data: {
            labels: labels,
            datasets: [
              {
                label: 'Portfolio',
                data: portfolioValues,
                borderColor: '#4F46E5',
                backgroundColor: 'rgba(79, 70, 229, 0.1)',
                borderWidth: 2,
                tension: 0.3,
                fill: true,
                pointRadius: 1,
                pointHoverRadius: 5
              }
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
              mode: 'index',
              intersect: false,
            },
            plugins: {
              legend: {
                display: false
              },
              tooltip: {
                usePointStyle: true,
                callbacks: {
                  label: function(context) {
                    let label = context.dataset.label || '';
                    if (label) {
                      label += ': ';
                    }
                    if (context.parsed.y !== null) {
                      label += new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'USD'
                      }).format(context.parsed.y);
                    }
                    return label;
                  }
                }
              }
            },
            scales: {
              x: {
                grid: {
                  display: false
                }
              },
              y: {
                grid: {
                  color: '#F3F4F6',
                },
                ticks: {
                  callback: function(value) {
                    return new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: 'USD',
                      notation: 'compact',
                      compactDisplay: 'short'
                    }).format(value);
                  }
                }
              }
            }
          }
        });
      } catch (error) {
        console.error('Error rendering chart:', error);
      }
    },
    processChartData() {
      console.log('Processing chart data:', this.portfolioData);
      
      // Ensure we have valid data before proceeding
      if (!this.portfolioData || !this.portfolioData.values || !this.portfolioData.dates) {
        console.error('Invalid portfolio data structure');
        return { portfolioValues: [], labels: [] };
      }
      
      const portfolioValues = [...this.portfolioData.values];
      
      // Process dates to create labels
      const labels = this.portfolioData.dates.map(dateStr => {
        const date = new Date(dateStr);
        // Only show label if it's Monday, otherwise empty string
        const isMonday = date.getDay() === 1; // 0 is Sunday, 1 is Monday
        return isMonday ? date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : '';
      });
      
      return { portfolioValues, labels };
    }
  }
}
</script>