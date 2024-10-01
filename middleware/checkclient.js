// middleware/checkclient.js
export default defineNuxtRouteMiddleware((to, from) => {
  const { $pinia } = useNuxtApp(); 
  const clientStore = useClientStore($pinia); 
  const { Client } = clientStore;
  if (!Client && to.query.dev !== "true") {
    return navigateTo("/pin");
  } 
});
