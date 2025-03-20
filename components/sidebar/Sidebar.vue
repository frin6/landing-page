<template>
    <div class="w-96 h-screen menu">
        <div class="flex flex-col h-full">
            <div class="flex items-center justify-around py-6 menu-header px-4">
                <div class="logo flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-white">
                        <path d="M19 21V5a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v16"></path>
                        <path d="M3 7h18"></path>
                        <path d="M8 21h8"></path>
                        <path d="M12 12v5"></path>
                        <path d="M10 14h4"></path>
                    </svg>
                </div>
                <div>
                    <h5 class="text-lg font-semibold">FINWISE</h5>
                    <p class="text-sm text-gray-600">Portfolio Dashboard</p>
                </div>
                <div class="beta-tag">BETA</div>
            </div>

            <div class="flex-1 flex flex-col justify-between overflow-y-auto px-4">
                <div class="mt-5">
                    <h6 class="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3 px-2">Main</h6>
                    <NavItem 
                        to="/portofolio-dashboard" 
                        icon="home" 
                        label="Portfolios"
                        :active="true" 
                    />
                    <NavItem 
                        to="/assets" 
                        icon="wallet" 
                        label="Assets"
                    />
                </div>
                
                <div class="mt-auto mb-6">
                    <h6 class="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3 px-2">Account</h6>
                    <NavItem 
                        to="/settings" 
                        icon="settings" 
                        label="Settings"
                    />
                    <NavItem 
                        to="/help" 
                        icon="help" 
                        label="Help"
                    />
                    <div class="mt-4 text-center">
                        <p class="text-xs text-gray-500">Version 0.1.0</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import NavItem from './NavItem.vue'

export default {
    components: {
        NavItem
    }
}
</script>

<style scoped>
.menu {
    border-right: 1px solid #e2e8f0;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.05);
    background-color: #FFFFFF;
    position: fixed;
    left: 0;
    top: 0;
}

.menu-header {
    border-bottom: 1px solid #e2e8f0;
}

.logo {
    width: 44px;
    height: 44px;
    background: #2B4948;
    border-radius: 8px;
}

.beta-tag {
    border: 1px solid #2B4948;
    background: #EDF4F4;
    color: #2B4948;
    padding: 6px 12px;
    border-radius: 12px;
    font-size: 12px;
    font-weight: 600;
}
</style>