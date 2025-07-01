<script>
  import { createEventDispatcher } from 'svelte';

  let name = '';
  let email = '';
  let password = '';
  let confirm = '';
  let touched = { name: false, email: false, password: false, confirm: false };
  let error = '';
  let loading = false;

  const dispatch = createEventDispatcher();

  function validateEmail(val) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
  }
  function validatePassword(val) {
    return val.length >= 6;
  }
  function validateName(val) {
    return val.trim().length > 1;
  }

  $: nameValid = validateName(name);
  $: emailValid = validateEmail(email);
  $: passwordValid = validatePassword(password);
  $: confirmValid = confirm === password && passwordValid;
  $: formValid = nameValid && emailValid && passwordValid && confirmValid;

  async function handleRegister() {
    touched = { name: true, email: true, password: true, confirm: true };
    error = '';
    if (!formValid) {
      error = 'Preencha todos os campos corretamente.';
      return;
    }
    loading = true;
    // Simula cadastro
    await new Promise(r => setTimeout(r, 1000));
    // Sucesso: volta para login
    dispatch('back');
    loading = false;
  }
</script>

<div class="flex flex-col items-center justify-center min-h-screen bg-base-200">
  <div class="w-full max-w-sm p-8 shadow-xl bg-base-100 rounded-xl">
    <h2 class="text-3xl font-bold mb-6 text-center">Cadastro</h2>
    <form on:submit|preventDefault={handleRegister} class="flex flex-col gap-4">
      <label class="form-control w-full">
        <div class="label">
          <span class="label-text">Nome</span>
        </div>
        <input
          type="text"
          class="input input-bordered w-full"
          bind:value={name}
          on:input={() => { touched.name = true; error = ''; }}
          class:input-error={touched.name && !nameValid}
          placeholder="Seu nome"
          autocomplete="name"
        />
        {#if touched.name && !nameValid}
          <span class="text-error text-xs mt-1">Nome obrigatório</span>
        {/if}
      </label>
      <label class="form-control w-full">
        <div class="label">
          <span class="label-text">Email</span>
        </div>
        <input
          type="email"
          class="input input-bordered w-full"
          bind:value={email}
          on:input={() => { touched.email = true; error = ''; }}
          class:input-error={touched.email && !emailValid}
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
          class="input input-bordered w-full"
          bind:value={password}
          on:input={() => { touched.password = true; error = ''; }}
          class:input-error={touched.password && !passwordValid}
          placeholder="******"
          autocomplete="new-password"
        />
        {#if touched.password && !passwordValid}
          <span class="text-error text-xs mt-1">Senha deve ter pelo menos 6 caracteres</span>
        {/if}
      </label>
      <label class="form-control w-full">
        <div class="label">
          <span class="label-text">Confirmar Senha</span>
        </div>
        <input
          type="password"
          class="input input-bordered w-full"
          bind:value={confirm}
          on:input={() => { touched.confirm = true; error = ''; }}
          class:input-error={touched.confirm && !confirmValid}
          placeholder="******"
          autocomplete="new-password"
        />
        {#if touched.confirm && !confirmValid}
          <span class="text-error text-xs mt-1">As senhas não coincidem</span>
        {/if}
      </label>
      <button
        class="btn btn-primary w-full mt-2"
        type="submit"
        disabled={!formValid || loading}
        class:loading={loading}
      >
        {loading ? 'Cadastrando...' : 'Cadastrar'}
      </button>
      <button
        class="btn btn-ghost w-full mt-2"
        type="button"
        on:click={() => dispatch('back')}
      >
        Voltar para login
      </button>
      {#if error}
        <div class="alert alert-error shadow-sm mt-2 py-2 px-3">{error}</div>
      {/if}
    </form>
  </div>
</div>
