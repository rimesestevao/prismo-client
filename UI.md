Objetivo:
Criar um aplicativo em React Native e TypeScript que implementa um layout de navegação espacial. O usuário começa em uma tela "Home" central e pode navegar para outras quatro telas arrastando para cima, baixo, esquerda ou direita. O aplicativo deve ter um frame (borda) estático ao redor da área de conteúdo, que permanece visível enquanto as telas internas se movem.

Requisitos Técnicos:

    Framework: React Native

    Linguagem: TypeScript

    Biblioteca de Navegação: react-native-pager-view para gerenciar a navegação por gestos (pan).

    Estrutura de Navegação:

        Um PagerView horizontal será o container principal.

        Ele terá 3 "páginas": ProfileScreen (índice 0), um container vertical (índice 1), e MessagesScreen (índice 2).

        O PagerView deve iniciar na página do meio (índice 1).

        O container vertical (página do meio) será outro PagerView, com orientation="vertical".

        Este PagerView vertical terá 3 "páginas": NotificationsScreen (índice 0), HomeScreen (índice 1), e HistoryScreen (índice 2).

        Ele deve iniciar na página do meio (HomeScreen, índice 1).

Estrutura de Arquivos:

/src
|-- /components
|   |-- SpatialNavigator.tsx
|-- /screens
|   |-- HomeScreen.tsx
|   |-- ProfileScreen.tsx
|   |-- MessagesScreen.tsx
|   |-- NotificationsScreen.tsx
|   |-- HistoryScreen.tsx
|-- App.tsx

Detalhes de Implementação e Estilo:

1. App.tsx (Componente Raiz):

    Deve renderizar um View principal que atua como o frame do aplicativo.

    Estilo do Frame:

        flex: 1

        backgroundColor: '#1C1C1E' (um cinza escuro)

        padding: 8px

    Dentro deste View de frame, renderize outro View que será o container do conteúdo.

    Estilo do Container de Conteúdo:

        flex: 1

        borderRadius: 16px (para que os cantos não sobreponham o padding do frame)

        overflow: 'hidden' (essencial para que o conteúdo do PagerView não "vaze" para fora das bordas arredondadas)

        borderColor: 'orange'

        borderWidth: 8px

    Dentro do container de conteúdo, renderize o componente <SpatialNavigator />.

2. SpatialNavigator.tsx:

    Este componente conterá a lógica dos PagerView aninhados, conforme descrito na seção "Estrutura de Navegação".

    Importe todas as 5 telas do diretório /screens.

    A estrutura deve ser:

    <PagerView style={{flex: 1}} initialPage={1}>
      <View key="1"><ProfileScreen /></View>
      <View key="2">
        <PagerView style={{flex: 1}} orientation="vertical" initialPage={1}>
          <View key="1"><NotificationsScreen /></View>
          <View key="2"><HomeScreen /></View>
          <View key="3"><HistoryScreen /></View>
        </PagerView>
      </View>
      <View key="3"><MessagesScreen /></View>
    </PagerView>

3. Componentes de Tela (/screens/*.tsx):

    Cada tela deve ser um componente funcional simples.

    Deve ter um View container principal com o estilo flex: 1, justifyContent: 'center', e alignItems: 'center'.

    Cada tela deve ter uma cor de fundo única e um texto para identificação.

    Estilos Específicos:

        HomeScreen.tsx: Fundo #2C2C2E. Texto "Home" em branco, fontSize: 32, fontWeight: 'bold'.

        ProfileScreen.tsx: Fundo #007AFF (azul). Texto "Perfil" em branco, fontSize: 24.

        MessagesScreen.tsx: Fundo #34C759 (verde). Texto "Mensagens" em branco, fontSize: 24.

        NotificationsScreen.tsx: Fundo #FF9500 (laranja). Texto "Notificações" em branco, fontSize: 24.

        HistoryScreen.tsx: Fundo #5856D6 (roxo). Texto "Histórico" em branco, fontSize: 24.

Resumo da Experiência do Usuário:
O usuário abre o app e vê a tela "Home" dentro de uma borda laranja fixa. Ao arrastar para a esquerda, a tela "Perfil" desliza para o lugar. Se ele arrastar de volta para a direita, a "Home" retorna. Da "Home", arrastar para cima revela a tela de "Notificações". A borda laranja nunca se move, apenas o conteúdo dentro dela.