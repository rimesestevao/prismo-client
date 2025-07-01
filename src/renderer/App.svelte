<script>
  import Login from "./components/Login.svelte";
  import Register from "./components/Register.svelte";
  import Home from "./routes/Home.svelte";

  let loggedIn = false;
  let showRegister = false;

  function handleLogin() {
    loggedIn = true;
  }
  function handleRegister() {
    showRegister = true;
  }
  function handleBackToLogin() {
    showRegister = false;
  }
</script>

{#if loggedIn}
  <Home />
{:else if showRegister}
  <Register on:back={handleBackToLogin} />
{:else}
  <Login on:login={handleLogin} on:register={handleRegister} />
{/if}
