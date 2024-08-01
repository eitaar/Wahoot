export default defineNuxtRouteMiddleware((to, from) => {
  console.log('common middleware');
  if (from.href != "/pan") {
    return navigateTo('/pan');
  }
})