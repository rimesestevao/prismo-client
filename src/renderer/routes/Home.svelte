<script>
  import { onMount } from "svelte";
  import { Home, FileText, Settings, User } from "lucide-svelte";

  let active = "home";
  let showProfile = false;

  // Tema DaisyUI
  let theme = "system";

  function changeTheme() {
    if (theme === "system") {
      document.documentElement.removeAttribute("data-theme");
    } else {
      document.documentElement.setAttribute("data-theme", theme);
    }
    localStorage.setItem("theme", theme);
  }

  // Device info
  let device = {
    hostname: window?.location?.hostname || "localhost",
    os: navigator.platform,
    version: navigator.userAgent,
    resolution: `${window.screen.width}x${window.screen.height}`,
    language: navigator.language,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    memory: typeof navigator.deviceMemory === "number" ? navigator.deviceMemory : "",
    cpu: navigator.hardwareConcurrency || "N/A"
  };

  function copyDeviceInfo() {
    const text = Object.entries(device).map(([k, v]) => `${k}: ${v}`).join("\n");
    navigator.clipboard.writeText(text);
  }

  // Carregar preferências salvas
  onMount(() => {
    theme = localStorage.getItem("theme") || "system";
    changeTheme();
  });

  // Comunicação com servidor
  let apiUrl = localStorage.getItem("apiUrl") || "http://localhost:3000";
  let apiKey = localStorage.getItem("apiKey") || "";
  function generateApiKey() {
    apiKey = crypto.randomUUID();
    localStorage.setItem("apiKey", apiKey);
  }
  function saveApiConfig() {
    localStorage.setItem("apiUrl", apiUrl);
    localStorage.setItem("apiKey", apiKey);
  }
  async function testApi() {
    try {
      const res = await fetch(apiUrl + "/health");
      alert(res.ok ? "Conexão bem-sucedida!" : "Falha na conexão.");
    } catch {
      alert("Erro ao conectar ao servidor.");
    }
  }

  const menu = [
    {
      key: "home",
      icon: Home,
      label: "Home"
    },
    {
      key: "forms",
      icon: FileText,
      label: "Forms"
    },
    {
      key: "settings",
      icon: Settings,
      label: "Settings"
    }
  ];
</script>

<div class="flex min-h-screen bg-base-200">
  <!-- Sidebar -->
  <aside class="flex flex-col justify-between bg-base-100 shadow-xl w-20 py-6 h-screen max-h-screen">
    <nav class="flex flex-col gap-4 items-center">
      {#each menu as item}
        <button
          class="btn btn-ghost btn-circle relative group {active === item.key ? 'bg-primary text-primary-content' : ''}"
          aria-label={item.label}
          on:click={() => active = item.key}
        >
          <svelte:component this={item.icon} size="24" />
          <span class="tooltip tooltip-right absolute left-full ml-2 hidden group-hover:inline-block bg-base-300 text-base-content px-2 py-1 rounded text-xs shadow">
            {item.label}
          </span>
        </button>
      {/each}
    </nav>
    <div class="flex flex-col items-center">
      <button
        class="btn btn-ghost btn-circle mb-2"
        aria-label="Perfil"
        on:click={() => showProfile = true}
      >
        <User size="28" />
        <span class="tooltip tooltip-right absolute left-full ml-2 hidden group-hover:inline-block bg-base-300 text-base-content px-2 py-1 rounded text-xs shadow">
          Perfil
        </span>
      </button>
    </div>
  </aside>
  <!-- Main Content -->
  <main class="flex-1 h-screen overflow-auto flex flex-col items-center justify-center">
    {#if active === "home"}
      <div class="w-full max-w-md p-8 shadow-xl bg-base-100 rounded-xl text-center">
        <h1 class="text-4xl font-bold mb-4">Bem-vindo!</h1>
        <p class="text-lg mb-6">Você está logado. Esta é a página inicial.</p>
        <div class="card bg-primary text-primary-content shadow-lg">
          <div class="card-body">
            <h2 class="card-title">Home</h2>
            <p>Personalize esta tela conforme necessário.</p>
          </div>
        </div>
      </div>
    {:else if active === "forms"}
      <div class="w-full max-w-md p-8 shadow-xl bg-base-100 rounded-xl text-center">
        <h1 class="text-3xl font-bold mb-4">Forms</h1>
        <p class="text-lg mb-6">Conteúdo de formulários aqui.</p>
      </div>
    {:else if active === "settings"}
      <div class="w-full max-w-2xl p-8 shadow-xl bg-base-100 rounded-xl">
        <h1 class="text-3xl font-bold mb-4 text-center">Configurações</h1>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Configurações do App -->
          <div class="card bg-base-200 shadow">
            <div class="card-body">
              <h2 class="card-title">App Electron</h2>
              <label class="flex items-center gap-2">
                <input type="checkbox" class="toggle" />
                Abrir ao iniciar
              </label>
              <label class="flex items-center gap-2">
                <input type="checkbox" class="toggle" />
                Minimizar para tray
              </label>
              <label class="flex items-center gap-2">
                <input type="checkbox" class="toggle" />
                Notificações
              </label>
              <label class="flex items-center gap-2">
                <input type="checkbox" class="toggle" />
                Atualização automática
              </label>
              <label class="flex items-center gap-2">
                <input type="checkbox" class="toggle" />
                Salvar logs
              </label>
              <label class="flex items-center gap-2">
                <input type="checkbox" class="toggle" />
                Modo offline
              </label>
            </div>
          </div>
          <!-- Tema DaisyUI -->
          <div class="card bg-base-200 shadow">
            <div class="card-body">
              <h2 class="card-title">Tema DaisyUI</h2>
              <label class="form-control mb-2">
                <span class="label-text">Tema</span>
                <select class="select select-bordered" bind:value={theme} on:change={changeTheme}>
                  <option value="system">Padrão do sistema</option>
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                </select>
              </label>
            </div>
          </div>
          <!-- Comunicação com o Servidor -->
          <div class="card bg-base-200 shadow col-span-1 md:col-span-2">
            <div class="card-body">
              <h2 class="card-title">Comunicação com o Servidor</h2>
              <label class="form-control mb-2">
                <span class="label-text">URL do Servidor</span>
                <input class="input input-bordered" bind:value={apiUrl} placeholder="http://localhost:3000" />
              </label>
              <label class="form-control mb-2">
                <span class="label-text">API_KEY</span>
                <div class="flex gap-2">
                  <input class="input input-bordered flex-1" bind:value={apiKey} readonly />
                  <button class="btn btn-outline" type="button" on:click={generateApiKey}>Gerar</button>
                </div>
              </label>
              <div class="flex gap-2 mt-2">
                <button class="btn btn-primary btn-sm" type="button" on:click={saveApiConfig}>Salvar</button>
                <button class="btn btn-outline btn-sm" type="button" on:click={testApi}>Testar conexão</button>
              </div>
            </div>
          </div>
          <!-- Detalhes do Dispositivo -->
          <div class="card bg-base-200 shadow col-span-1 md:col-span-2">
            <div class="card-body">
              <h2 class="card-title">Detalhes do Dispositivo</h2>
              <ul class="text-left text-sm">
                <li><b>Nome:</b> {device.hostname}</li>
                <li><b>Sistema:</b> {device.os}</li>
                <li><b>Versão:</b> {device.version}</li>
                <li><b>Resolução:</b> {device.resolution}</li>
                <li><b>Idioma:</b> {device.language}</li>
                <li><b>Timezone:</b> {device.timezone}</li>
                <li><b>Memória RAM:</b> {device.memory ? `${device.memory} GB` : "Indisponível"}</li>
                <li><b>CPU:</b> {device.cpu}</li>
              </ul>
              <button class="btn btn-sm btn-outline mt-2" on:click={copyDeviceInfo}>Copiar detalhes</button>
            </div>
          </div>
        </div>
      </div>
    {/if}
  </main>

  <!-- Profile Modal -->
  {#if showProfile}
    <div class="modal modal-open">
      <div class="modal-box bg-base-100 shadow-xl">
        <h3 class="font-bold text-lg mb-4">Configurações de Perfil</h3>
        <div class="flex flex-col gap-2">
          <label class="form-control">
            <span class="label-text">Nome</span>
            <input class="input input-bordered" placeholder="Seu nome" />
          </label>
          <label class="form-control">
            <span class="label-text">Email</span>
            <input class="input input-bordered" placeholder="seu@email.com" />
          </label>
          <label class="form-control">
            <span class="label-text">Senha</span>
            <input type="password" class="input input-bordered" placeholder="Nova senha" />
          </label>
          <label class="form-control">
            <span class="label-text">Confirmar Senha</span>
            <input type="password" class="input input-bordered" placeholder="Confirme a nova senha" />
          </label>
        </div>
        <div class="modal-action mt-4">
          <button class="btn" on:click={() => showProfile = false}>Fechar</button>
        </div>
      </div>
      <div class="modal-backdrop" on:click={() => showProfile = false}></div>
    </div>
  {/if}
</div>

<style>
  .group:hover .tooltip {
    display: inline-block !important;
  }
</style>
