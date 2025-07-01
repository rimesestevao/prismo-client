<script>
  import { createEventDispatcher } from 'svelte';
  import { navigate } from 'svelte-routing';
  import { fade } from 'svelte/transition';

  let email = '';
  let password = '';
  let touched = { email: false, password: false };
  let error = '';
  let loading = false;
  let shakeEmail = false;
  let shakePassword = false;

  const dispatch = createEventDispatcher();

  function validateEmail(val) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
  }
  function validatePassword(val) {
    return val.length >= 6;
  }

  $: emailValid = validateEmail(email);
  $: passwordValid = validatePassword(password);
  $: formValid = emailValid && passwordValid;

  async function handleLogin() {
    touched = { email: true, password: true };
    error = '';
    shakeEmail = !emailValid;
    shakePassword = !passwordValid;
    if (!formValid) {
      error = 'Preencha os campos corretamente.';
      setTimeout(() => {
        shakeEmail = false;
        shakePassword = false;
      }, 600);
      return;
    }
    loading = true;
    // Simula login
    await new Promise(r => setTimeout(r, 1000));
    if (email === 'user@email.com' && password === '123456') {
      // Sucesso: animação e navegação
      dispatch('login');
      setTimeout(() => {
        navigate('/home');
      }, 400);
    } else {
      error = 'Email ou senha inválidos.';
      shakeEmail = true;
      shakePassword = true;
      setTimeout(() => {
        shakeEmail = false;
        shakePassword = false;
      }, 600);
    }
    loading = false;
  }
</script>

<div class="flex flex-col items-center justify-center min-h-screen bg-base-200">
  <div class="w-full max-w-sm p-8 shadow-xl bg-base-100 rounded-xl">
    <h2 class="text-3xl font-bold mb-6 text-center">Entrar</h2>
    <form on:submit|preventDefault={handleLogin} class="flex flex-col gap-4">
      <label class="form-control w-full">
        <div class="label">
          <span class="label-text">Email</span>
        </div>
        <input
          type="email"
          class="input input-bordered w-full transition-all duration-150 {touched.email && !emailValid ? 'input-error animate-shake' : ''}"
          bind:value={email}
          on:input={() => { touched.email = true; error = ''; }}
          class:input-error={touched.email && !emailValid}
          class:animate-shake={shakeEmail}
          placeholder="seu@email.com"
          autocomplete="username"
        />
        {#if touched.email && !emailValid}
          <span class="text-error text-xs mt-1">Email inválido</span>
        {/if}
      </label>
      <label class="form-control w-full">
        <div class="label">
          <span class="label-text">Senha</span>
        </div>
        <input
          type="password"
          class="input input-bordered w-full transition-all duration-150 {touched.password && !passwordValid ? 'input-error animate-shake' : ''}"
          bind:value={password}
          on:input={() => { touched.password = true; error = ''; }}
          class:input-error={touched.password && !passwordValid}
          class:animate-shake={shakePassword}
          placeholder="******"
          autocomplete="current-password"
        />
        {#if touched.password && !passwordValid}
          <span class="text-error text-xs mt-1">Senha deve ter pelo menos 6 caracteres</span>
        {/if}
      </label>
      <button
        class="btn btn-primary w-full mt-2"
        type="submit"
        disabled={!formValid || loading}
        class:loading={loading}
      >
        {loading ? 'Entrando...' : 'Entrar'}
      </button>
      <div class="flex justify-between mt-2 text-sm">
        <a href="#" class="link link-hover text-primary" on:click|preventDefault={() => dispatch('recover')}>Recuperar senha</a>
        <a href="#" class="link link-hover text-primary" on:click|preventDefault={() => dispatch('register')}>Cadastrar</a>
      </div>
      {#if error}
        <div class="alert alert-error shadow-sm mt-2 py-2 px-3">{error}</div>
      {/if}
    </form>
  </div>
</div>

<style>
  @keyframes shake {
    10%, 90% { transform: translateX(-2px); }
    20%, 80% { transform: translateX(4px); }
    30%, 50%, 70% { transform: translateX(-8px); }
    40%, 60% { transform: translateX(8px); }
  }
  .animate-shake {
    animation: shake 0.4s;
  }
</style>
