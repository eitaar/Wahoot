<script setup>
const supabase = useSupabaseClient();

const login = async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'github',
  });
  if (error) {
    console.error(error);
  }
};

const logout = async () => {
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error(error);
    return;
  }
};
</script>
<template>
  <div>
    <button @click="login">Sign In with Github</button>
    <button @click="logout">Sign Out</button>
    <p>Status</p>
  </div>
</template>
