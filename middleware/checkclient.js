
import { storeToRefs } from 'pinia';

export default defineNuxtRouteMiddleware((to, from) => {
  const { $pinia } = useNuxtApp();
  const {clientStore} = storeToRefs(useClientStore());
  if (!clientStore.value && to.query.dev !== "true") {
    return navigateTo("/pin");
  }
});
