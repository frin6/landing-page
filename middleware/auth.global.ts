export default defineNuxtRouteMiddleware((to, from) => {
    const token = localStorage.getItem('isAuthenticated');
    const currentRoute = to.path;

    if (!token && currentRoute == '/portofolio-dashboard' || currentRoute == '/asset-dashboard') {
        return navigateTo('/login');
    }
});