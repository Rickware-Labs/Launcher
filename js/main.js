const API_BASE_RAW = 'http://prem-eu4.bot-hosting.net:20940';
const CF_WORKER = 'https://rickware-proxy.YOUR-SUBDOMAIN.workers.dev';
function apiUrl(path) {
    if (window.location.protocol === 'https:') {
        return CF_WORKER + path;
    }
    return API_BASE_RAW + path;
}

function showBanner(message, type) {
    var existing = document.getElementById('rickware-banner');
    if (existing) existing.remove();
    var banner = document.createElement('div');
    banner.id = 'rickware-banner';
    banner.style.cssText = 'position:fixed;top:0;left:0;width:100%;z-index:99999;padding:14px 24px;text-align:center;font-size:14px;font-weight:600;color:#fff;backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);transition:opacity 0.4s;opacity:1;letter-spacing:0.01em;box-shadow:0 2px 24px rgba(0,0,0,0.3);';
    if (type === 'error') {
        banner.style.background = 'rgba(120,0,160,0.82)';
        banner.style.borderBottom = '1px solid rgba(200,80,255,0.45)';
    } else if (type === 'success') {
        banner.style.background = 'rgba(30,100,40,0.82)';
        banner.style.borderBottom = '1px solid rgba(80,200,100,0.45)';
    } else {
        banner.style.background = 'rgba(90,0,130,0.82)';
        banner.style.borderBottom = '1px solid rgba(180,60,255,0.45)';
    }
    banner.textContent = message;
    document.body.appendChild(banner);
    var timer = setTimeout(function() {
        banner.style.opacity = '0';
        setTimeout(function() { if (banner.parentNode) banner.remove(); }, 400);
    }, 10000);
    banner.addEventListener('click', function() {
        clearTimeout(timer);
        banner.style.opacity = '0';
        setTimeout(function() { if (banner.parentNode) banner.remove(); }, 400);
    });
}

let config = {};
let products = [];
let currentLanguage = 'en';
let cart = [];
let wishlist = [];
let userPurchases = [];
let currentUser = null;

const translations = {
    en: {
        store: 'Store',
        library: 'Library',
        customer_panel: 'Customer Panel',
        discover: 'Discover',
        browse: 'Browse',
        news: 'News',
        search_store: 'Search store',
        wishlist: 'Wishlist',
        cart: 'Cart',
        show: 'Show:',
        new_release: 'New Release',
        price_low: 'Price: Low to High',
        price_high: 'Price: High to Low',
        popular: 'Most Popular',
        filters: 'Filters',
        reset: 'reset',
        keywords: 'Keywords',
        events: 'Events',
        price: 'Price',
        genre: 'Genre',
        features: 'Features',
        types: 'Types',
        apps: 'Apps',
        editor: 'Editor',
        stock_unlimited: 'Unlimited',
        stock_left: 'left',
        add_to_cart: 'Add to Cart',
        view_details: 'View Details',
        my_products: 'My Products',
        all: 'All',
        purchases: 'Purchases',
        recent: 'Recent',
        name: 'Name',
        category: 'Category',
        date: 'Date',
        product: 'Product',
        amount: 'Amount',
        coupon: 'Coupon',
        saved: 'Saved',
        no_coupon: 'No coupon',
        account_settings: 'Account Settings',
        preferences: 'Preferences',
        payment_methods: 'Payment Methods',
        order_history: 'Order History',
        help_support: 'Help & Support',
        logout: 'Logout',
        login: 'Login',
        register: 'Register',
        login_title: 'Sign In',
        login_description: 'Enter your credentials to access your account',
        email: 'Email',
        password: 'Password',
        remember_me: 'Remember me',
        forgot_password: 'Forgot password?',
        login_button: 'Sign In',
        or: 'OR',
        google_login: 'Continue with Google',
        discord_login: 'Continue with Discord',
        register_title: 'Create Account',
        register_description: 'Sign up to get started with premium products',
        username: 'Username',
        username_or_email: 'Username or Email',
        phone_number: 'Phone Number',
        confirm_password: 'Confirm Password',
        accept_terms: 'I accept the Terms of Service and Privacy Policy',
        email_newsletter: 'Subscribe to email newsletter',
        register_button: 'Create Account',
        google_register: 'Sign up with Google',
        discord_register: 'Sign up with Discord',
        store_name: 'Rickware - Labs - Launcher',
        auth_welcome: 'Welcome to the future of digital products',
        feature_1: 'Instant Access to Products',
        feature_2: 'Secure Payment Processing',
        feature_3: 'Premium Support',
        auto_setup: 'Auto Setup',
        install: 'Install',
        uninstall: 'Uninstall',
        update: 'Update',
        installed: 'Installed',
        buy_now: 'Buy Now',
        select_duration: 'Select Duration',
        description: 'Description',
        specifications: 'Specifications',
        system_requirements: 'System Requirements'
    },
    de: {
        store: 'Store',
        library: 'Bibliothek',
        customer_panel: 'Kundenbereich',
        discover: 'Entdecken',
        browse: 'Durchsuchen',
        news: 'Neuigkeiten',
        search_store: 'Store durchsuchen',
        wishlist: 'Wunschliste',
        cart: 'Warenkorb',
        show: 'Anzeigen:',
        new_release: 'Neu erschienen',
        price_low: 'Preis: Niedrig bis Hoch',
        price_high: 'Preis: Hoch bis Niedrig',
        popular: 'Am beliebtesten',
        filters: 'Filter',
        reset: 'zurücksetzen',
        keywords: 'Stichwörter',
        events: 'Ereignisse',
        price: 'Preis',
        genre: 'Genre',
        features: 'Funktionen',
        types: 'Typen',
        apps: 'Apps',
        editor: 'Editor',
        stock_unlimited: 'Unbegrenzt',
        stock_left: 'übrig',
        add_to_cart: 'In den Warenkorb',
        view_details: 'Details anzeigen',
        my_products: 'Meine Produkte',
        all: 'Alle',
        purchases: 'Käufe',
        recent: 'Neueste',
        name: 'Name',
        category: 'Kategorie',
        date: 'Datum',
        product: 'Produkt',
        amount: 'Betrag',
        coupon: 'Gutschein',
        saved: 'Gespart',
        no_coupon: 'Kein Gutschein',
        account_settings: 'Kontoeinstellungen',
        preferences: 'Einstellungen',
        payment_methods: 'Zahlungsmethoden',
        order_history: 'Bestellverlauf',
        help_support: 'Hilfe & Support',
        logout: 'Abmelden',
        login: 'Anmelden',
        register: 'Registrieren',
        login_title: 'Anmelden',
        login_description: 'Geben Sie Ihre Anmeldedaten ein',
        email: 'E-Mail',
        password: 'Passwort',
        remember_me: 'Angemeldet bleiben',
        forgot_password: 'Passwort vergessen?',
        login_button: 'Anmelden',
        or: 'ODER',
        google_login: 'Mit Google fortfahren',
        discord_login: 'Mit Discord fortfahren',
        register_title: 'Konto erstellen',
        register_description: 'Registrieren Sie sich für Premium-Produkte',
        username: 'Benutzername',
        username_or_email: 'Benutzername oder E-Mail',
        phone_number: 'Telefonnummer',
        confirm_password: 'Passwort bestätigen',
        accept_terms: 'Ich akzeptiere die Nutzungsbedingungen und Datenschutzrichtlinie',
        email_newsletter: 'Newsletter abonnieren',
        register_button: 'Konto erstellen',
        google_register: 'Mit Google registrieren',
        discord_register: 'Mit Discord registrieren',
        store_name: 'Rickware - Labs - Launcher',
        auth_welcome: 'Willkommen in der Zukunft digitaler Produkte',
        feature_1: 'Sofortiger Zugriff auf Produkte',
        feature_2: 'Sichere Zahlungsabwicklung',
        feature_3: 'Premium-Support',
        auto_setup: 'Auto-Setup',
        install: 'Installieren',
        uninstall: 'Deinstallieren',
        update: 'Aktualisieren',
        installed: 'Installiert',
        buy_now: 'Jetzt kaufen',
        select_duration: 'Dauer wählen',
        description: 'Beschreibung',
        specifications: 'Spezifikationen',
        system_requirements: 'Systemanforderungen'
    },
    ru: {
        store: 'Магазин',
        library: 'Библиотека',
        customer_panel: 'Панель клиента',
        discover: 'Обзор',
        browse: 'Просмотр',
        news: 'Новости',
        search_store: 'Поиск в магазине',
        wishlist: 'Избранное',
        cart: 'Корзина',
        show: 'Показать:',
        new_release: 'Новые релизы',
        price_low: 'Цена: от низкой к высокой',
        price_high: 'Цена: от высокой к низкой',
        popular: 'Популярное',
        filters: 'Фильтры',
        reset: 'сбросить',
        keywords: 'Ключевые слова',
        events: 'События',
        price: 'Цена',
        genre: 'Жанр',
        features: 'Особенности',
        types: 'Типы',
        apps: 'Приложения',
        editor: 'Редактор',
        stock_unlimited: 'Неограничено',
        stock_left: 'осталось',
        add_to_cart: 'Добавить в корзину',
        view_details: 'Подробнее',
        my_products: 'Мои продукты',
        all: 'Все',
        purchases: 'Покупки',
        recent: 'Недавние',
        name: 'Название',
        category: 'Категория',
        date: 'Дата',
        product: 'Продукт',
        amount: 'Сумма',
        coupon: 'Купон',
        saved: 'Сэкономлено',
        no_coupon: 'Без купона',
        account_settings: 'Настройки аккаунта',
        preferences: 'Предпочтения',
        payment_methods: 'Способы оплаты',
        order_history: 'История заказов',
        help_support: 'Помощь и поддержка',
        logout: 'Выйти',
        login: 'Войти',
        register: 'Регистрация',
        login_title: 'Вход',
        login_description: 'Введите данные для входа',
        email: 'Электронная почта',
        password: 'Пароль',
        remember_me: 'Запомнить меня',
        forgot_password: 'Забыли пароль?',
        login_button: 'Войти',
        or: 'ИЛИ',
        google_login: 'Продолжить с Google',
        discord_login: 'Продолжить с Discord',
        register_title: 'Создать аккаунт',
        register_description: 'Зарегистрируйтесь для доступа к премиум продуктам',
        username: 'Имя пользователя',
        username_or_email: 'Имя пользователя или Email',
        phone_number: 'Номер телефона',
        confirm_password: 'Подтвердите пароль',
        accept_terms: 'Я принимаю Условия использования и Политику конфиденциальности',
        email_newsletter: 'Подписаться на рассылку',
        register_button: 'Создать аккаунт',
        google_register: 'Зарегистрироваться через Google',
        discord_register: 'Зарегистрироваться через Discord',
        store_name: 'Rickware - Labs - Launcher',
        auth_welcome: 'Добро пожаловать в будущее цифровых продуктов',
        feature_1: 'Мгновенный доступ к продуктам',
        feature_2: 'Безопасная обработка платежей',
        feature_3: 'Премиум поддержка',
        auto_setup: 'Авто-установка',
        install: 'Установить',
        uninstall: 'Удалить',
        update: 'Обновить',
        installed: 'Установлено',
        buy_now: 'Купить сейчас',
        select_duration: 'Выберите срок',
        description: 'Описание',
        specifications: 'Характеристики',
        system_requirements: 'Системные требования'
    },
    fr: {
        store: 'Boutique',
        library: 'Bibliothèque',
        customer_panel: 'Panneau client',
        discover: 'Découvrir',
        browse: 'Parcourir',
        news: 'Actualités',
        search_store: 'Rechercher dans la boutique',
        wishlist: 'Liste de souhaits',
        cart: 'Panier',
        show: 'Afficher:',
        new_release: 'Nouvelles sorties',
        price_low: 'Prix: Croissant',
        price_high: 'Prix: Décroissant',
        popular: 'Populaire',
        filters: 'Filtres',
        reset: 'réinitialiser',
        keywords: 'Mots-clés',
        events: 'Événements',
        price: 'Prix',
        genre: 'Genre',
        features: 'Fonctionnalités',
        types: 'Types',
        apps: 'Applications',
        editor: 'Éditeur',
        stock_unlimited: 'Illimité',
        stock_left: 'restant',
        add_to_cart: 'Ajouter au panier',
        view_details: 'Voir les détails',
        my_products: 'Mes produits',
        all: 'Tous',
        purchases: 'Achats',
        recent: 'Récent',
        name: 'Nom',
        category: 'Catégorie',
        date: 'Date',
        product: 'Produit',
        amount: 'Montant',
        coupon: 'Coupon',
        saved: 'Économisé',
        no_coupon: 'Pas de coupon',
        account_settings: 'Paramètres du compte',
        preferences: 'Préférences',
        payment_methods: 'Méthodes de paiement',
        order_history: 'Historique des commandes',
        help_support: 'Aide et support',
        logout: 'Se déconnecter',
        login: 'Connexion',
        register: 'Inscription',
        login_title: 'Se connecter',
        login_description: 'Entrez vos identifiants',
        email: 'E-mail',
        password: 'Mot de passe',
        remember_me: 'Se souvenir de moi',
        forgot_password: 'Mot de passe oublié?',
        login_button: 'Se connecter',
        or: 'OU',
        google_login: 'Continuer avec Google',
        discord_login: 'Continuer avec Discord',
        register_title: 'Créer un compte',
        register_description: 'Inscrivez-vous pour accéder aux produits premium',
        username: 'Nom d\'utilisateur',
        username_or_email: 'Nom d\'utilisateur ou Email',
        phone_number: 'Numéro de téléphone',
        confirm_password: 'Confirmer le mot de passe',
        accept_terms: 'J\'accepte les Conditions d\'utilisation et la Politique de confidentialité',
        email_newsletter: 'S\'abonner à la newsletter',
        register_button: 'Créer un compte',
        google_register: 'S\'inscrire avec Google',
        discord_register: 'S\'inscrire avec Discord',
        store_name: 'Rickware - Labs - Launcher',
        auth_welcome: 'Bienvenue dans le futur des produits numériques',
        feature_1: 'Accès instantané aux produits',
        feature_2: 'Traitement des paiements sécurisé',
        feature_3: 'Support premium',
        auto_setup: 'Configuration automatique',
        install: 'Installer',
        uninstall: 'Désinstaller',
        update: 'Mettre à jour',
        installed: 'Installé',
        buy_now: 'Acheter maintenant',
        select_duration: 'Sélectionner la durée',
        description: 'Description',
        specifications: 'Spécifications',
        system_requirements: 'Configuration requise'
    },
    es: {
        store: 'Tienda',
        library: 'Biblioteca',
        customer_panel: 'Panel de cliente',
        discover: 'Descubrir',
        browse: 'Navegar',
        news: 'Noticias',
        search_store: 'Buscar en la tienda',
        wishlist: 'Lista de deseos',
        cart: 'Carrito',
        show: 'Mostrar:',
        new_release: 'Nuevo lanzamiento',
        price_low: 'Precio: Bajo a Alto',
        price_high: 'Precio: Alto a Bajo',
        popular: 'Más popular',
        filters: 'Filtros',
        reset: 'restablecer',
        keywords: 'Palabras clave',
        events: 'Eventos',
        price: 'Precio',
        genre: 'Género',
        features: 'Características',
        types: 'Tipos',
        apps: 'Aplicaciones',
        editor: 'Editor',
        stock_unlimited: 'Ilimitado',
        stock_left: 'restante',
        add_to_cart: 'Añadir al carrito',
        view_details: 'Ver detalles',
        my_products: 'Mis productos',
        all: 'Todos',
        purchases: 'Compras',
        recent: 'Reciente',
        name: 'Nombre',
        category: 'Categoría',
        date: 'Fecha',
        product: 'Producto',
        amount: 'Cantidad',
        coupon: 'Cupón',
        saved: 'Ahorrado',
        no_coupon: 'Sin cupón',
        account_settings: 'Configuración de cuenta',
        preferences: 'Preferencias',
        payment_methods: 'Métodos de pago',
        order_history: 'Historial de pedidos',
        help_support: 'Ayuda y soporte',
        logout: 'Cerrar sesión',
        login: 'Iniciar sesión',
        register: 'Registrarse',
        login_title: 'Iniciar sesión',
        login_description: 'Ingrese sus credenciales',
        email: 'Correo electrónico',
        password: 'Contraseña',
        remember_me: 'Recuérdame',
        forgot_password: '¿Olvidaste tu contraseña?',
        login_button: 'Iniciar sesión',
        or: 'O',
        google_login: 'Continuar con Google',
        discord_login: 'Continuar con Discord',
        register_title: 'Crear cuenta',
        register_description: 'Regístrate para acceder a productos premium',
        username: 'Nombre de usuario',
        username_or_email: 'Nombre de usuario o Email',
        phone_number: 'Número de teléfono',
        confirm_password: 'Confirmar contraseña',
        accept_terms: 'Acepto los Términos de servicio y la Política de privacidad',
        email_newsletter: 'Suscribirse al boletín',
        register_button: 'Crear cuenta',
        google_register: 'Registrarse con Google',
        discord_register: 'Registrarse con Discord',
        store_name: 'Rickware - Labs - Launcher',
        auth_welcome: 'Bienvenido al futuro de los productos digitales',
        feature_1: 'Acceso instantáneo a productos',
        feature_2: 'Procesamiento de pagos seguro',
        feature_3: 'Soporte premium',
        auto_setup: 'Configuración automática',
        install: 'Instalar',
        uninstall: 'Desinstalar',
        update: 'Actualizar',
        installed: 'Instalado',
        buy_now: 'Comprar ahora',
        select_duration: 'Seleccionar duración',
        description: 'Descripción',
        specifications: 'Especificaciones',
        system_requirements: 'Requisitos del sistema'
    },
    it: {
        store: 'Negozio',
        library: 'Biblioteca',
        customer_panel: 'Pannello cliente',
        discover: 'Scopri',
        browse: 'Sfoglia',
        news: 'Notizie',
        search_store: 'Cerca nel negozio',
        wishlist: 'Lista dei desideri',
        cart: 'Carrello',
        show: 'Mostra:',
        new_release: 'Nuove uscite',
        price_low: 'Prezzo: dal più basso',
        price_high: 'Prezzo: dal più alto',
        popular: 'Più popolare',
        filters: 'Filtri',
        reset: 'ripristina',
        keywords: 'Parole chiave',
        events: 'Eventi',
        price: 'Prezzo',
        genre: 'Genere',
        features: 'Caratteristiche',
        types: 'Tipi',
        apps: 'Applicazioni',
        editor: 'Editor',
        stock_unlimited: 'Illimitato',
        stock_left: 'rimasti',
        add_to_cart: 'Aggiungi al carrello',
        view_details: 'Vedi dettagli',
        my_products: 'I miei prodotti',
        all: 'Tutti',
        purchases: 'Acquisti',
        recent: 'Recenti',
        name: 'Nome',
        category: 'Categoria',
        date: 'Data',
        product: 'Prodotto',
        amount: 'Importo',
        coupon: 'Coupon',
        saved: 'Risparmiato',
        no_coupon: 'Nessun coupon',
        account_settings: 'Impostazioni account',
        preferences: 'Preferenze',
        payment_methods: 'Metodi di pagamento',
        order_history: 'Cronologia ordini',
        help_support: 'Aiuto e supporto',
        logout: 'Esci',
        login: 'Accedi',
        register: 'Registrati',
        login_title: 'Accedi',
        login_description: 'Inserisci le tue credenziali',
        email: 'Email',
        password: 'Password',
        remember_me: 'Ricordami',
        forgot_password: 'Password dimenticata?',
        login_button: 'Accedi',
        or: 'OPPURE',
        google_login: 'Continua con Google',
        discord_login: 'Continua con Discord',
        register_title: 'Crea account',
        register_description: 'Registrati per accedere ai prodotti premium',
        username: 'Nome utente',
        username_or_email: 'Nome utente o Email',
        phone_number: 'Numero di telefono',
        confirm_password: 'Conferma password',
        accept_terms: 'Accetto i Termini di servizio e la Privacy Policy',
        email_newsletter: 'Iscriviti alla newsletter',
        register_button: 'Crea account',
        google_register: 'Registrati con Google',
        discord_register: 'Registrati con Discord',
        store_name: 'Rickware - Labs - Launcher',
        auth_welcome: 'Benvenuto nel futuro dei prodotti digitali',
        feature_1: 'Accesso istantaneo ai prodotti',
        feature_2: 'Elaborazione pagamenti sicura',
        feature_3: 'Supporto premium',
        auto_setup: 'Configurazione automatica',
        install: 'Installa',
        uninstall: 'Disinstalla',
        update: 'Aggiorna',
        installed: 'Installato',
        buy_now: 'Acquista ora',
        select_duration: 'Seleziona durata',
        description: 'Descrizione',
        specifications: 'Specifiche',
        system_requirements: 'Requisiti di sistema'
    },
    pt: {
        store: 'Loja',
        library: 'Biblioteca',
        customer_panel: 'Painel do cliente',
        discover: 'Descobrir',
        browse: 'Navegar',
        news: 'Notícias',
        search_store: 'Pesquisar na loja',
        wishlist: 'Lista de desejos',
        cart: 'Carrinho',
        show: 'Mostrar:',
        new_release: 'Novo lançamento',
        price_low: 'Preço: Menor para Maior',
        price_high: 'Preço: Maior para Menor',
        popular: 'Mais popular',
        filters: 'Filtros',
        reset: 'redefinir',
        keywords: 'Palavras-chave',
        events: 'Eventos',
        price: 'Preço',
        genre: 'Gênero',
        features: 'Recursos',
        types: 'Tipos',
        apps: 'Aplicativos',
        editor: 'Editor',
        stock_unlimited: 'Ilimitado',
        stock_left: 'restante',
        add_to_cart: 'Adicionar ao carrinho',
        view_details: 'Ver detalhes',
        my_products: 'Meus produtos',
        all: 'Todos',
        purchases: 'Compras',
        recent: 'Recente',
        name: 'Nome',
        category: 'Categoria',
        date: 'Data',
        product: 'Produto',
        amount: 'Valor',
        coupon: 'Cupom',
        saved: 'Economizado',
        no_coupon: 'Sem cupom',
        account_settings: 'Configurações da conta',
        preferences: 'Preferências',
        payment_methods: 'Métodos de pagamento',
        order_history: 'Histórico de pedidos',
        help_support: 'Ajuda e suporte',
        logout: 'Sair',
        login: 'Entrar',
        register: 'Registrar',
        login_title: 'Entrar',
        login_description: 'Insira suas credenciais',
        email: 'E-mail',
        password: 'Senha',
        remember_me: 'Lembrar de mim',
        forgot_password: 'Esqueceu a senha?',
        login_button: 'Entrar',
        or: 'OU',
        google_login: 'Continuar com Google',
        discord_login: 'Continuar com Discord',
        register_title: 'Criar conta',
        register_description: 'Cadastre-se para acessar produtos premium',
        username: 'Nome de usuário',
        username_or_email: 'Nome de usuário ou Email',
        phone_number: 'Número de telefone',
        confirm_password: 'Confirmar senha',
        accept_terms: 'Aceito os Termos de Serviço e Política de Privacidade',
        email_newsletter: 'Assinar newsletter',
        register_button: 'Criar conta',
        google_register: 'Cadastrar com Google',
        discord_register: 'Cadastrar com Discord',
        store_name: 'Rickware - Labs - Launcher',
        auth_welcome: 'Bem-vindo ao futuro dos produtos digitais',
        feature_1: 'Acesso instantâneo aos produtos',
        feature_2: 'Processamento de pagamento seguro',
        feature_3: 'Suporte premium',
        auto_setup: 'Configuração automática',
        install: 'Instalar',
        uninstall: 'Desinstalar',
        update: 'Atualizar',
        installed: 'Instalado',
        buy_now: 'Comprar agora',
        select_duration: 'Selecionar duração',
        description: 'Descrição',
        specifications: 'Especificações',
        system_requirements: 'Requisitos do sistema'
    },
    ja: {
        store: 'ストア',
        library: 'ライブラリ',
        customer_panel: '顧客パネル',
        discover: '発見',
        browse: '閲覧',
        news: 'ニュース',
        search_store: 'ストアを検索',
        wishlist: 'ウィッシュリスト',
        cart: 'カート',
        show: '表示:',
        new_release: '新着',
        price_low: '価格: 安い順',
        price_high: '価格: 高い順',
        popular: '人気',
        filters: 'フィルター',
        reset: 'リセット',
        keywords: 'キーワード',
        events: 'イベント',
        price: '価格',
        genre: 'ジャンル',
        features: '機能',
        types: 'タイプ',
        apps: 'アプリ',
        editor: 'エディター',
        stock_unlimited: '無制限',
        stock_left: '残り',
        add_to_cart: 'カートに追加',
        view_details: '詳細を表示',
        my_products: 'マイ製品',
        all: 'すべて',
        purchases: '購入履歴',
        recent: '最近',
        name: '名前',
        category: 'カテゴリー',
        date: '日付',
        product: '製品',
        amount: '金額',
        coupon: 'クーポン',
        saved: '節約',
        no_coupon: 'クーポンなし',
        account_settings: 'アカウント設定',
        preferences: '設定',
        payment_methods: '支払い方法',
        order_history: '注文履歴',
        help_support: 'ヘルプとサポート',
        logout: 'ログアウト',
        login: 'ログイン',
        register: '登録',
        login_title: 'サインイン',
        login_description: '認証情報を入力してください',
        email: 'メール',
        password: 'パスワード',
        remember_me: 'ログイン状態を保持',
        forgot_password: 'パスワードをお忘れですか？',
        login_button: 'サインイン',
        or: 'または',
        google_login: 'Googleで続ける',
        discord_login: 'Discordで続ける',
        register_title: 'アカウント作成',
        register_description: 'プレミアム製品にアクセスするために登録',
        username: 'ユーザー名',
        username_or_email: 'ユーザー名またはメール',
        phone_number: '電話番号',
        confirm_password: 'パスワード確認',
        accept_terms: '利用規約とプライバシーポリシーに同意します',
        email_newsletter: 'ニュースレターを購読',
        register_button: 'アカウント作成',
        google_register: 'Googleで登録',
        discord_register: 'Discordで登録',
        store_name: 'Rickware - Labs - Launcher',
        auth_welcome: 'デジタル製品の未来へようこそ',
        feature_1: '製品への即時アクセス',
        feature_2: '安全な支払い処理',
        feature_3: 'プレミアムサポート',
        auto_setup: '自動セットアップ',
        install: 'インストール',
        uninstall: 'アンインストール',
        update: '更新',
        installed: 'インストール済み',
        buy_now: '今すぐ購入',
        select_duration: '期間を選択',
        description: '説明',
        specifications: '仕様',
        system_requirements: 'システム要件'
    },
    ko: {
        store: '스토어',
        library: '라이브러리',
        customer_panel: '고객 패널',
        discover: '발견',
        browse: '찾아보기',
        news: '뉴스',
        search_store: '스토어 검색',
        wishlist: '위시리스트',
        cart: '장바구니',
        show: '표시:',
        new_release: '신규 출시',
        price_low: '가격: 낮은순',
        price_high: '가격: 높은순',
        popular: '인기',
        filters: '필터',
        reset: '재설정',
        keywords: '키워드',
        events: '이벤트',
        price: '가격',
        genre: '장르',
        features: '기능',
        types: '유형',
        apps: '앱',
        editor: '편집기',
        stock_unlimited: '무제한',
        stock_left: '남음',
        add_to_cart: '장바구니에 추가',
        view_details: '세부정보 보기',
        my_products: '내 제품',
        all: '전체',
        purchases: '구매 내역',
        recent: '최근',
        name: '이름',
        category: '카테고리',
        date: '날짜',
        product: '제품',
        amount: '금액',
        coupon: '쿠폰',
        saved: '절약',
        no_coupon: '쿠폰 없음',
        account_settings: '계정 설정',
        preferences: '환경설정',
        payment_methods: '결제 수단',
        order_history: '주문 내역',
        help_support: '도움말 및 지원',
        logout: '로그아웃',
        login: '로그인',
        register: '등록',
        login_title: '로그인',
        login_description: '자격 증명을 입력하세요',
        email: '이메일',
        password: '비밀번호',
        remember_me: '로그인 상태 유지',
        forgot_password: '비밀번호를 잊으셨나요?',
        login_button: '로그인',
        or: '또는',
        google_login: 'Google로 계속하기',
        discord_login: 'Discord로 계속하기',
        register_title: '계정 생성',
        register_description: '프리미엄 제품 액세스를 위한 가입',
        username: '사용자 이름',
        username_or_email: '사용자 이름 또는 이메일',
        phone_number: '전화번호',
        confirm_password: '비밀번호 확인',
        accept_terms: '서비스 약관 및 개인정보 보호정책에 동의합니다',
        email_newsletter: '뉴스레터 구독',
        register_button: '계정 생성',
        google_register: 'Google로 가입',
        discord_register: 'Discord로 가입',
        store_name: 'Rickware - Labs - Launcher',
        auth_welcome: '디지털 제품의 미래에 오신 것을 환영합니다',
        feature_1: '제품에 즉시 액세스',
        feature_2: '안전한 결제 처리',
        feature_3: '프리미엄 지원',
        auto_setup: '자동 설정',
        install: '설치',
        uninstall: '제거',
        update: '업데이트',
        installed: '설치됨',
        buy_now: '지금 구매',
        select_duration: '기간 선택',
        description: '설명',
        specifications: '사양',
        system_requirements: '시스템 요구사항'
    },
    zh: {
        store: '商店',
        library: '库',
        customer_panel: '客户面板',
        discover: '发现',
        browse: '浏览',
        news: '新闻',
        search_store: '搜索商店',
        wishlist: '愿望清单',
        cart: '购物车',
        show: '显示:',
        new_release: '新发布',
        price_low: '价格: 从低到高',
        price_high: '价格: 从高到低',
        popular: '最受欢迎',
        filters: '筛选',
        reset: '重置',
        keywords: '关键词',
        events: '活动',
        price: '价格',
        genre: '类型',
        features: '特性',
        types: '类型',
        apps: '应用',
        editor: '编辑器',
        stock_unlimited: '无限',
        stock_left: '剩余',
        add_to_cart: '添加到购物车',
        view_details: '查看详情',
        my_products: '我的产品',
        all: '全部',
        purchases: '购买记录',
        recent: '最近',
        name: '名称',
        category: '类别',
        date: '日期',
        product: '产品',
        amount: '金额',
        coupon: '优惠券',
        saved: '节省',
        no_coupon: '无优惠券',
        account_settings: '账户设置',
        preferences: '偏好设置',
        payment_methods: '支付方式',
        order_history: '订单历史',
        help_support: '帮助与支持',
        logout: '登出',
        login: '登录',
        register: '注册',
        login_title: '登录',
        login_description: '输入您的凭据',
        email: '电子邮件',
        password: '密码',
        remember_me: '记住我',
        forgot_password: '忘记密码？',
        login_button: '登录',
        or: '或',
        google_login: '使用Google继续',
        discord_login: '使用Discord继续',
        register_title: '创建账户',
        register_description: '注册以访问高级产品',
        username: '用户名',
        username_or_email: '用户名或邮箱',
        phone_number: '电话号码',
        confirm_password: '确认密码',
        accept_terms: '我接受服务条款和隐私政策',
        email_newsletter: '订阅电子邮件通讯',
        register_button: '创建账户',
        google_register: '使用Google注册',
        discord_register: '使用Discord注册',
        store_name: 'Rickware - Labs - Launcher',
        auth_welcome: '欢迎来到数字产品的未来',
        feature_1: '即时访问产品',
        feature_2: '安全的支付处理',
        feature_3: '高级支持',
        auto_setup: '自动设置',
        install: '安装',
        uninstall: '卸载',
        update: '更新',
        installed: '已安装',
        buy_now: '立即购买',
        select_duration: '选择时长',
        description: '描述',
        specifications: '规格',
        system_requirements: '系统要求'
    }
};

const languageNames = {
    en: 'English',
    de: 'Deutsch',
    ru: 'Русский',
    fr: 'Français',
    es: 'Español',
    it: 'Italiano',
    pt: 'Português',
    ja: '日本語',
    ko: '한국어',
    zh: '中文'
};


function translate(key) {
    const t = translations[currentLanguage] || translations['en'];
    return t[key] || translations['en'][key] || key;
}

function updateLanguage() {
    document.querySelectorAll('[data-translate]').forEach(function(el) {
        var key = el.getAttribute('data-translate');
        var val = translate(key);
        if (el.tagName === 'INPUT') {
            el.placeholder = val;
        } else {
            el.textContent = val;
        }
    });
}

function updateCartBadge() {
    var badge = document.getElementById('cartBadge');
    if (badge) badge.textContent = cart.length;
}

async function loadConfig() {
    try {
        var res = await fetch('./config/config.json');
        if (res.ok) config = await res.json();
    } catch(e) {
        config = {};
    }
    return config;
}

async function checkLoginStatus() {
    var authButtons = document.getElementById('authButtons');
    var userProfileBtn = document.getElementById('userProfileBtn');
    var token = sessionStorage.getItem('rickware_token');
    if (token) {
        try {
            var parts = token.split('.');
            if (parts.length === 3) {
                var decoded = JSON.parse(atob(parts[1]));
                currentUser = decoded;
                updateUserProfile(decoded);
                if (authButtons) authButtons.style.display = 'none';
                if (userProfileBtn) userProfileBtn.style.display = 'flex';
                return;
            }
        } catch(e) {}
        sessionStorage.removeItem('rickware_token');
    }
    currentUser = null;
    if (authButtons) authButtons.style.display = 'flex';
    if (userProfileBtn) userProfileBtn.style.display = 'none';
}

function getAccountTypeBadgeStyle(accountType) {
    var type = (accountType || 'User').toLowerCase();
    if (type === 'owner') return 'background:rgba(255,215,0,0.15);color:#ffd700;border:1px solid rgba(255,215,0,0.4);';
    if (type === 'admin') return 'background:rgba(244,67,54,0.15);color:#f44336;border:1px solid rgba(244,67,54,0.4);';
    if (type === 'beta') return 'background:rgba(155,0,204,0.15);color:#c97eff;border:1px solid rgba(155,0,204,0.4);';
    if (type === 'partner') return 'background:rgba(0,188,212,0.15);color:#00bcd4;border:1px solid rgba(0,188,212,0.4);';
    return 'background:rgba(155,0,204,0.12);color:#b87fff;border:1px solid rgba(155,0,204,0.3);';
}

function updateUserProfile(user) {
    document.querySelectorAll('#usernameDisplay, #usernameDisplaySidebar').forEach(function(el) {
        el.textContent = user.username || 'Guest';
    });
    document.querySelectorAll('#userType, #userTypeSidebar').forEach(function(el) {
        el.textContent = user.account_type || 'User';
        el.setAttribute('style', getAccountTypeBadgeStyle(user.account_type));
    });
    document.querySelectorAll('#profileImage, #profileImageLarge').forEach(function(img) {
        img.src = user.profile_picture || '';
    });
}

async function loginUser(usernameOrEmail, password) {
    try {
        var res = await fetch(apiUrl('/api/login'), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: usernameOrEmail, password: password })
        });
        if (res.ok) {
            var data = await res.json();
            sessionStorage.setItem('rickware_token', data.token);
            var decoded = JSON.parse(atob(data.token.split('.')[1]));
            sessionStorage.setItem('rickware_user', JSON.stringify(decoded));
            return decoded;
        } else {
            showBanner('Invalid credentials', 'error');
            return null;
        }
    } catch(e) {
        showBanner('Login failed', 'error');
        return null;
    }
}

async function registerUser(username, email, phone, password) {
    try {
        var res = await fetch(apiUrl('/api/register'), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: username, password: password, email: email, phone: phone })
        });
        if (res.ok) {
            return await loginUser(username, password);
        } else {
            showBanner('Registration failed', 'error');
            return null;
        }
    } catch(e) {
        showBanner('Registration failed', 'error');
        return null;
    }
}

function showTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(function(el) {
        el.classList.remove('active');
        el.style.display = 'none';
    });
    var target = document.getElementById(tabId);
    if (target) {
        target.classList.add('active');
        target.style.display = 'block';
    }
}

function setupTabs() {
    var tabs = document.querySelectorAll('.top-tab');
    tabs.forEach(function(btn) {
        btn.addEventListener('click', function() {
            tabs.forEach(function(b) { b.classList.remove('active'); });
            btn.classList.add('active');
            var key = btn.getAttribute('data-tab');
            if (key === 'discover') showTab('discoverTab');
            else if (key === 'partner') showTab('partnerTab');
            else if (key === 'github') showTab('githubTab');
            else if (key === 'status') { showTab('statusTab'); renderStatusTab(); }
            else if (key === 'news') showTab('newsTab');
            else if (key === 'qa') showTab('qaTab');
        });
    });
}

function renderStatusTab() {
    var listEl = document.getElementById('statusList');
    if (!listEl) return;
    if (listEl.dataset.rendered === '1') return;
    if (!productsData || !productsData.products) {
        listEl.innerHTML = '<div class="status-empty">No product data available.</div>';
        return;
    }
    listEl.dataset.rendered = '1';
    var prods = productsData.products;
    var html = '';
    prods.forEach(function(p, i) {
        var title = (p.title || 'Unknown').replace(/^[\u2022\u00b7\-\s]+/, '').trim();
        var version = p.version ? p.version : '';
        var cl = p.change_log ? String(p.change_log).trim() : '';
        var hasChangelog = cl.length > 0 && cl.toLowerCase() !== 'soon' && cl.toLowerCase() !== 'none' && cl.toLowerCase() !== 'n/a';
        var banner = (p.banner || '').toLowerCase();
        var statusKey, statusLabel, statusColor, statusBg, statusBorder, statusGlow;
        var isComingSoon = banner === 'coming soon' || (banner.indexOf('coming soon') >= 0);
        var isMaintenance = banner.indexOf('maintenance') >= 0 || (cl && cl.toLowerCase().indexOf('maintenance') >= 0);
        var isSoon = !isComingSoon && (banner.indexOf('soon') >= 0 || banner.indexOf('update') >= 0 || banner.indexOf('wip') >= 0);
        if (isComingSoon) {
            statusKey = 'outdated';
            statusLabel = 'Coming Soon';
            statusColor = '#ef4444';
            statusBg = 'rgba(239,68,68,0.10)';
            statusBorder = 'rgba(239,68,68,0.28)';
            statusGlow = '#ef4444';
        } else if (isMaintenance || isSoon) {
            statusKey = 'maintenance';
            statusLabel = isMaintenance ? 'Maintenance' : 'Update Soon';
            statusColor = '#f59e0b';
            statusBg = 'rgba(245,158,11,0.10)';
            statusBorder = 'rgba(245,158,11,0.28)';
            statusGlow = '#f59e0b';
        } else {
            statusKey = 'up to date';
            statusLabel = 'Up To Date';
            statusColor = '#22c55e';
            statusBg = 'rgba(34,197,94,0.10)';
            statusBorder = 'rgba(34,197,94,0.28)';
            statusGlow = '#22c55e';
        }
        var delay = (i * 0.045).toFixed(3);
        html += '<div class="status-product-card" style="animation-delay:' + delay + 's">';
        html += '<div class="status-product-left">';
        html += '<div class="status-product-title">' + escHtml(title) + '</div>';
        if (version) html += '<span class="status-product-version">' + escHtml(version) + '</span>';
        if (hasChangelog) {
            html += '<button class="status-changelog-toggle" onclick="toggleStatusChangelog(this)" aria-expanded="false">';
            html += '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>';
            html += 'Changelog';
            html += '</button>';
            html += '<div class="status-changelog-body" style="display:none;">';
            var clFormatted = escHtml(cl).replace(/\n/g, '<br>');
            html += clFormatted;
            html += '</div>';
        }
        html += '</div>';
        html += '<div class="status-product-right">';
        html += '<div class="status-badge-pill" style="background:' + statusBg + ';border:1px solid ' + statusBorder + ';color:' + statusColor + ';">';
        html += '<span class="status-pulse-dot" style="background:' + statusGlow + ';box-shadow:0 0 7px ' + statusGlow + ';animation:statusPulse 2.2s ease-in-out infinite ' + delay + 's;"></span>';
        html += escHtml(statusLabel);
        html += '</div>';
        html += '</div>';
        html += '</div>';
    });
    listEl.innerHTML = html;
}

function setupNavigation() {
    var navItems = document.querySelectorAll('.nav-item[data-page]');
    navItems.forEach(function(item) {
        item.addEventListener('click', function() {
            var page = item.getAttribute('data-page');
            if (page === 'customer' && !currentUser) {
                window.location.href = './sites/login_register.html?tab=login';
                return;
            }
            if (page === 'customer') {
                hideBankPage();
                hideReviewsPage();
                hideSupportPage();
                showCustomerPanel();
                navItems.forEach(function(n) { n.classList.remove('active'); });
                item.classList.add('active');
                return;
            }
            if (page === 'bank') {
                hideReviewsPage();
                showBankPage();
                navItems.forEach(function(n) { n.classList.remove('active'); });
                item.classList.add('active');
                return;
            }
            if (page === 'reviews') {
                hideBankPage();
                hideReviewsPage();
                hideSupportPage();
                showReviewsPage();
                navItems.forEach(function(n) { n.classList.remove('active'); });
                item.classList.add('active');
                return;
            }
            if (page === 'support') {
                hideBankPage();
                hideReviewsPage();
                showSupportPage();
                navItems.forEach(function(n) { n.classList.remove('active'); });
                item.classList.add('active');
                return;
            }
            if (page === 'store') {
                hideBankPage();
                hideReviewsPage();
                hideSupportPage();
                hideCustomerPanel();
            }
            navItems.forEach(function(n) { n.classList.remove('active'); });
            item.classList.add('active');
        });
    });
}

var labCoinsBalance = 0;
function getLabCoinsBalance() { return labCoinsBalance; }
function setLabCoinsBalance(v) {
    labCoinsBalance = v;
    var el = document.getElementById('labCoinsDisplay');
    if (el) el.textContent = v + ' LC';
}

function showBankPage() {
    var content = document.getElementById('content');
    if (!content) return;
    var existing = document.getElementById('bankPageSection');
    if (existing) {
        existing.style.display = '';
        content.querySelectorAll('.tab-content:not(#bankPageSection)').forEach(function(t) { t.style.display = 'none'; });
        return;
    }
    content.querySelectorAll('.tab-content').forEach(function(t) { t.style.display = 'none'; });
    var section = document.createElement('section');
    section.id = 'bankPageSection';
    section.className = 'tab-content active';
    var coinPackages = [
        { id: 'pack10', coins: 10, bonus: 0, price: 0.50, label: 'Starter', color: '#6a0080' },
        { id: 'pack50', coins: 50, bonus: 5, price: 2.50, label: 'Basic', color: '#7b00a0' },
        { id: 'pack100', coins: 100, bonus: 15, price: 5.00, label: 'Standard', color: '#8e00b8', popular: true },
        { id: 'pack250', coins: 250, bonus: 50, price: 12.50, label: 'Value', color: '#a000d0' },
        { id: 'pack500', coins: 500, bonus: 125, price: 25.00, label: 'Pro', color: '#b200e8' },
        { id: 'pack1000', coins: 1000, bonus: 300, price: 50.00, label: 'Elite', color: '#c000ff' },
        { id: 'pack2000', coins: 2000, bonus: 700, price: 100.00, label: 'Master', color: '#d000ff' },
        { id: 'pack5000', coins: 5000, bonus: 2000, price: 250.00, label: 'Legend', color: '#e000ff' },
        { id: 'pack10000', coins: 10000, bonus: 5000, price: 500.00, label: 'Titan', color: '#f000ff' },
        { id: 'pack25000', coins: 25000, bonus: 15000, price: 1250.00, label: 'God Tier', color: '#ff00ff' }
    ];
    var packHtml = coinPackages.map(function(pkg) {
        var total = pkg.coins + pkg.bonus;
        var popularBadge = pkg.popular ? '<div class="bank-pack-popular">Most Popular</div>' : '';
        return '<div class="bank-coin-pack glass-card' + (pkg.popular ? ' bank-pack-featured' : '') + '" data-pack="' + pkg.id + '">' +
            popularBadge +
            '<div class="bank-pack-icon"><img src="./images/main/Rickware-Labs_Labs_Coin_LC_Galaxy_Main.png" alt="LC" style="width:48px;height:48px;object-fit:contain;" onerror="this.style.display=\'none\'"></div>' +
            '<div class="bank-pack-label">' + pkg.label + '</div>' +
            '<div class="bank-pack-coins">' + total + ' <span>LC</span></div>' +
            (pkg.bonus > 0 ? '<div class="bank-pack-bonus">+' + pkg.bonus + ' bonus coins</div>' : '<div class="bank-pack-bonus">&nbsp;</div>') +
            '<div class="bank-pack-price"><span class="shiny-text-js" style="background-image:linear-gradient(120deg,#ffffff 35%,#e0c0ff 50%,#ffffff 65%);">$' + pkg.price.toFixed(2) + '</span></div>' +
            '<button class="bank-pack-btn shiny-btn" onclick="openCoinCheckout(\'' + pkg.id + '\',' + pkg.coins + ',' + pkg.bonus + ',' + pkg.price + ',\'' + pkg.label + '\')">Buy Now</button>' +
        '</div>';
    }).join('');
    section.innerHTML =
        '<div class="bank-page">' +
            '<div style="display:flex;align-items:flex-start;gap:24px;">' +
                '<img src="./images/main/Rickware-Labs_Labs_Coin_LC_Galaxy_Main.png" alt="Lab Coin" style="width:200px;height:200px;object-fit:contain;flex-shrink:0;" onerror="this.style.display=\'none\'">' +
                '<div class="bank-page-header glass-card" style="flex:1;">' +
                    '<div class="bank-header-left">' +
                        '<h1><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align:middle;margin-right:10px"><line x1="3" y1="22" x2="21" y2="22"/><line x1="6" y1="18" x2="6" y2="11"/><line x1="10" y1="18" x2="10" y2="11"/><line x1="14" y1="18" x2="14" y2="11"/><line x1="18" y1="18" x2="18" y2="11"/><polygon points="12 2 2 7 22 7"/></svg><span class="shiny-text-js" style="background-image:linear-gradient(120deg,#c97eff 35%,#ffffff 50%,#c97eff 65%);">Lab Bank</span></h1>' +
                        '<p>Manage your Lab Coins and purchase coin packages</p>' +
                    '</div>' +
                    '<div class="bank-balance-card glass-card">' +
                        '<div class="bank-balance-label">Your Balance</div>' +
                        '<div class="bank-balance-amount" id="bankBalanceDisplay">' + labCoinsBalance + ' <span>LC</span></div>' +
                        '<div class="bank-balance-usd">≈ $' + (labCoinsBalance * 5).toFixed(2) + ' USD</div>' +
                    '</div>' +
                '</div>' +
            '</div>' +
            '<div class="bank-coin-value-banner glass-card">' +
                '<div class="bank-coin-icon-big"><img src="./images/main/Rickware-Labs_Labs_Coin_LC_Galaxy_Main.png" alt="LC" style="width:40px;height:40px;object-fit:contain;"></div>' +
                '<div>' +
                    '<div class="bank-coin-value-title"><span class="shiny-text-js" style="background-image:linear-gradient(120deg,#c97eff 35%,#ffffff 50%,#c97eff 65%);">Lab Coin (LC)</span></div>' +
                    '<div class="bank-coin-value-desc">Discord Server XP = <strong style="color:#c97eff">Lab Coins (LC)</strong> &nbsp;|&nbsp; Use coins to purchase tools, licenses and exclusive content</div>' +
                '</div>' +
            '</div>' +
            '<div class="bank-xp-exchange-section">' +
                '<button class="bank-xp-exchange-toggle" id="bankXpExchangeToggle">' +
                    '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#c97eff" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>' +
                    '<span>How to exchange Discord Server XP to Lab Coins (LC)</span>' +
                    '<svg class="bank-xp-toggle-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>' +
                '</button>' +
                '<div class="bank-xp-exchange-content" id="bankXpExchangeContent">' +
                    '<div class="bank-xp-step"><span class="bank-xp-step-num">1</span><div><strong>New users — DM Captcha Verification</strong><br>If you are new to our Discord server, you first need to complete the DM captcha verification. After joining, you will automatically receive a DM with a captcha challenge. Complete it to unlock full server access and the ability to use the bank system.</div></div>' +
                    '<div class="bank-xp-step"><span class="bank-xp-step-num">2</span><div><strong>Already verified members</strong><br>If you are already a verified member of our community Discord server, you can skip the verification step and use the bank channel directly.</div></div>' +
                    '<div class="bank-xp-step"><span class="bank-xp-step-num">3</span><div><strong>Use the <code>#ricks-bank</code> channel</strong><br>Navigate to the <code>#ricks-bank</code> text channel in our Discord server. In this channel you can:<br><br>• Check your XP balance and Lab Coin (LC) balance by entering your username or user ID.<br>• Trade your Discord Server XP for Lab Coins (LC) directly in the channel.<br><br>Simply follow all instructions posted in the <code>#ricks-bank</code> channel — all commands and exchange rates are listed there.</div></div>' +
                    '<div class="bank-xp-step bank-xp-step-tip"><span class="bank-xp-step-num" style="background:rgba(99,0,138,0.35);border-color:rgba(99,0,138,0.6);">!</span><div><strong>Tip</strong><br>The more active you are in our Discord community, the more XP you earn — and the more Lab Coins you can exchange. Stay active, participate, and grow your balance!</div></div>' +
                '</div>' +
            '</div>' +
            '<div class="bank-section-title"><span class="shiny-text-js" style="background-image:linear-gradient(120deg,#c97eff 35%,#ffffff 50%,#c97eff 65%);">Buy Coin Packages</span></div>' +
            '<div class="bank-packs-grid">' + packHtml + '</div>' +
        '</div>';
    content.appendChild(section);
    var xpToggle = document.getElementById('bankXpExchangeToggle');
    var xpContent = document.getElementById('bankXpExchangeContent');
    if (xpToggle && xpContent) {
        xpToggle.addEventListener('click', function() {
            var isOpen = xpContent.classList.contains('open');
            xpContent.classList.toggle('open', !isOpen);
            xpToggle.classList.toggle('open', !isOpen);
        });
    }
    applyShinyTextToEls();
}

function openCoinCheckout(packId, coins, bonus, price, label) {
    var total = coins + bonus;
    var overlay = document.getElementById('checkoutModalOverlay');
    var inner = document.getElementById('checkoutModalInner');
    if (!overlay || !inner) return;
    inner.innerHTML =
        '<div class="coin-checkout-modal">' +
            '<div class="coin-checkout-header">' +
                '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#c97eff" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 6v2m0 8v2M9 9a3 3 0 0 1 6 0c0 2-3 3-3 5"/></svg>' +
                '<h2>Buy Lab Coins</h2>' +
            '</div>' +
            '<div class="coin-checkout-summary glass-card">' +
                '<div class="coin-checkout-row"><span>Package</span><strong>' + label + ' Pack</strong></div>' +
                '<div class="coin-checkout-row"><span>Coins</span><strong>' + coins + ' LC</strong></div>' +
                (bonus > 0 ? '<div class="coin-checkout-row coin-bonus-row"><span>Bonus Coins</span><strong>+' + bonus + ' LC</strong></div>' : '') +
                '<div class="coin-checkout-row coin-total-row"><span>Total Coins</span><strong>' + total + ' LC</strong></div>' +
                '<div class="coin-checkout-row"><span>Value</span><strong>≈ $' + (total * 5).toFixed(2) + ' USD</strong></div>' +
                '<div class="coin-checkout-divider"></div>' +
                '<div class="coin-checkout-row coin-price-row"><span>You Pay</span><strong>$' + price.toFixed(2) + ' USD</strong></div>' +
            '</div>' +
            '<div class="coin-checkout-payment">' +
                '<div class="coin-checkout-payment-label">Select Payment Method</div>' +
                '<div class="coin-payment-methods">' +
                    '<button class="coin-payment-btn active" data-method="btc"><span>₿</span> Bitcoin (BTC)</button>' +
                    '<button class="coin-payment-btn" data-method="sol"><span>◎</span> Solana (SOL)</button>' +
                    '<button class="coin-payment-btn" data-method="amazon"><span>📦</span> Amazon Voucher</button>' +
                    '<button class="coin-payment-btn" data-method="psc"><span>🎮</span> Paysafecard</button>' +
                '</div>' +
            '</div>' +
            '<div class="coin-checkout-note">After payment, open a ticket in our Discord server with your payment proof. Coins will be added within 24 hours.</div>' +
            '<button class="coin-checkout-confirm-btn" onclick="coinCheckoutConfirm()">Open Discord Ticket →</button>' +
        '</div>';
    overlay.classList.add('open');
    overlay.classList.remove('active');
    overlay.style.display = 'flex';
    inner.querySelectorAll('.coin-payment-btn').forEach(function(btn) {
        btn.addEventListener('click', function() {
            inner.querySelectorAll('.coin-payment-btn').forEach(function(b) { b.classList.remove('active'); });
            btn.classList.add('active');
        });
    });
}

function coinCheckoutConfirm() {
    window.open('https://discord.gg/', '_blank');
    var overlay = document.getElementById('checkoutModalOverlay');
    if (overlay) {
        overlay.classList.remove('open');
        overlay.classList.remove('active');
        overlay.style.display = 'none';
    }
    document.body.style.overflow = '';
}

function hideBankPage() {
    var section = document.getElementById('bankPageSection');
    if (section) section.remove();
    var content = document.getElementById('content');
    if (content) content.querySelectorAll('.tab-content').forEach(function(t) { t.style.display = ''; });
}

function hideReviewsPage() {
    var section = document.getElementById('reviewsPageSection');
    if (section) section.style.display = 'none';
    var content = document.getElementById('content');
    if (content) content.querySelectorAll('.tab-content:not(#reviewsPageSection):not(#supportPageSection)').forEach(function(t) { t.style.display = ''; });
}

function hideSupportPage() {
    var section = document.getElementById('supportPageSection');
    if (section) section.style.display = 'none';
    var content = document.getElementById('content');
    if (content) content.querySelectorAll('.tab-content:not(#reviewsPageSection):not(#supportPageSection)').forEach(function(t) { t.style.display = ''; });
}

function showSupportPage() {
    var bankSection = document.getElementById('bankPageSection');
    if (bankSection) bankSection.style.display = 'none';
    var reviewsSection = document.getElementById('reviewsPageSection');
    if (reviewsSection) reviewsSection.style.display = 'none';
    var content = document.getElementById('content');
    if (content) content.querySelectorAll('.tab-content:not(#supportPageSection)').forEach(function(t) { t.style.display = 'none'; });
    var section = document.getElementById('supportPageSection');
    if (!section) return;
    section.style.display = 'block';
    if (section.dataset.rendered === '1') return;
    section.dataset.rendered = '1';
    var discordInvite = (config && config.discord_invite) ? config.discord_invite : 'https://discord.gg/Wk7d8mJgyN';
    section.innerHTML =
        '<div class="bank-page">' +
            '<div style="display:flex;align-items:flex-start;gap:24px;margin-bottom:0;">' +
                '<img src="https://cdn.discordapp.com/attachments/1474602413225672744/1477142646509142128/r_l_logo_1.gif?ex=69a3afca&is=69a25e4a&hm=17cef7c592270a9a56c0363338d89eaabf488d6577158bd6aefdd070deae107e&" alt="Logo" style="width:120px;height:120px;border-radius:16px;object-fit:cover;flex-shrink:0;" onerror="this.style.display=\'none\'">' +
                '<div class="bank-page-header glass-card" style="flex:1;">' +
                    '<div class="bank-header-left">' +
                        '<h1><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align:middle;margin-right:10px"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg><span class="shiny-text-js" style="background-image:linear-gradient(120deg,#c97eff 35%,#ffffff 50%,#c97eff 65%);">Support Center</span></h1>' +
                        '<p>Get help from our team and AI assistant — available 24/7 on our Discord server.</p>' +
                    '</div>' +
                '</div>' +
            '</div>' +
            '<div class="bank-coin-value-banner glass-card" style="align-items:flex-start;gap:20px;">' +
                '<div style="flex-shrink:0;margin-top:4px;"><svg width="36" height="36" viewBox="0 0 71 55" fill="#63008a"><path d="M60.1045 4.8978C55.5792 2.8214 50.7265 1.2916 45.6527 0.41542C45.5603 0.39851 45.468 0.440769 45.4204 0.525289C44.7963 1.6353 44.105 3.0834 43.6209 4.2216C38.1637 3.4046 32.7345 3.4046 27.3892 4.2216C26.905 3.0581 26.1886 1.6353 25.5617 0.525289C25.5141 0.443589 25.4218 0.40133 25.3294 0.41542C20.2584 1.2888 15.4057 2.8186 10.8776 4.8978C10.8384 4.9147 10.8048 4.9429 10.7825 4.9795C1.57795 18.7309 -0.943561 32.1443 0.293408 45.3914C0.299005 45.4562 0.335386 45.5182 0.385761 45.5576C6.45866 50.0174 12.3413 52.7249 18.1147 54.5195C18.2071 54.5477 18.305 54.5139 18.3638 54.4378C19.7295 52.5728 20.9469 50.6063 21.9907 48.5383C22.0523 48.4172 21.9935 48.2735 21.8676 48.2256C19.9366 47.4931 18.0979 46.6 16.3292 45.5858C16.1893 45.5041 16.1781 45.304 16.3068 45.2082C16.679 44.9293 17.0513 44.6391 17.4067 44.3461C17.471 44.2926 17.5606 44.2813 17.6362 44.3151C29.2558 49.6202 41.8354 49.6202 53.3179 44.3151C53.3935 44.2785 53.4831 44.2898 53.5502 44.3433C53.9057 44.6363 54.2779 44.9293 54.6529 45.2082C54.7816 45.304 54.7732 45.5041 54.6333 45.5858C52.8646 46.6197 51.0259 47.4931 49.0921 48.2228C48.9662 48.2707 48.9102 48.4172 48.9718 48.5383C50.038 50.6034 51.2554 52.5699 52.5959 54.435C52.6519 54.5139 52.7526 54.5477 52.845 54.5195C58.6464 52.7249 64.529 50.0174 70.6019 45.5576C70.6551 45.5182 70.6887 45.459 70.6943 45.3942C72.1747 30.0791 68.2147 16.7757 60.1968 4.9823C60.1772 4.9429 60.1437 4.9147 60.1045 4.8978ZM23.7259 37.3253C20.2276 37.3253 17.3451 34.1136 17.3451 30.1693C17.3451 26.225 20.1717 23.0133 23.7259 23.0133C27.3087 23.0133 30.1353 26.2532 30.1067 30.1693C30.1067 34.1136 27.2801 37.3253 23.7259 37.3253ZM47.3178 37.3253C43.8196 37.3253 40.9371 34.1136 40.9371 30.1693C40.9371 26.225 43.7636 23.0133 47.3178 23.0133C50.9006 23.0133 53.7272 26.2532 53.6986 30.1693C53.6986 34.1136 50.9006 37.3253 47.3178 37.3253Z"/></svg></div>' +
                '<div>' +
                    '<div class="bank-coin-value-title"><span class="shiny-text-js" style="background-image:linear-gradient(120deg,#c97eff 35%,#ffffff 50%,#c97eff 65%);">How to Get Support</span></div>' +
                    '<div class="bank-coin-value-desc">All support is handled through our Discord community server. Join the server, then open a ticket to reach the team directly. Our owner and moderators personally respond to every request.</div>' +
                '</div>' +
            '</div>' +
            '<div class="support-boxes-wave" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:18px;">' +
                '<div class="glass-card" style="padding:24px;display:flex;flex-direction:column;gap:12px;">' +
                    '<div style="display:flex;align-items:center;gap:12px;">' +
                        '<div style="width:44px;height:44px;border-radius:50%;background:rgba(99,0,138,0.25);border:1px solid rgba(150,0,200,0.45);display:flex;align-items:center;justify-content:center;flex-shrink:0;">' +
                            '<svg width="20" height="20" viewBox="0 0 71 55" fill="#c97eff"><path d="M60.1045 4.8978C55.5792 2.8214 50.7265 1.2916 45.6527 0.41542C45.5603 0.39851 45.468 0.440769 45.4204 0.525289C44.7963 1.6353 44.105 3.0834 43.6209 4.2216C38.1637 3.4046 32.7345 3.4046 27.3892 4.2216C26.905 3.0581 26.1886 1.6353 25.5617 0.525289C25.5141 0.443589 25.4218 0.40133 25.3294 0.41542C20.2584 1.2888 15.4057 2.8186 10.8776 4.8978C10.8384 4.9147 10.8048 4.9429 10.7825 4.9795C1.57795 18.7309 -0.943561 32.1443 0.293408 45.3914C0.299005 45.4562 0.335386 45.5182 0.385761 45.5576C6.45866 50.0174 12.3413 52.7249 18.1147 54.5195C18.2071 54.5477 18.305 54.5139 18.3638 54.4378C19.7295 52.5728 20.9469 50.6063 21.9907 48.5383C22.0523 48.4172 21.9935 48.2735 21.8676 48.2256C19.9366 47.4931 18.0979 46.6 16.3292 45.5858C16.1893 45.5041 16.1781 45.304 16.3068 45.2082C16.679 44.9293 17.0513 44.6391 17.4067 44.3461C17.471 44.2926 17.5606 44.2813 17.6362 44.3151C29.2558 49.6202 41.8354 49.6202 53.3179 44.3151C53.3935 44.2785 53.4831 44.2898 53.5502 44.3433C53.9057 44.6363 54.2779 44.9293 54.6529 45.2082C54.7816 45.304 54.7732 45.5041 54.6333 45.5858C52.8646 46.6197 51.0259 47.4931 49.0921 48.2228C48.9662 48.2707 48.9102 48.4172 48.9718 48.5383C50.038 50.6034 51.2554 52.5699 52.5959 54.435C52.6519 54.5139 52.7526 54.5477 52.845 54.5195C58.6464 52.7249 64.529 50.0174 70.6019 45.5576C70.6551 45.5182 70.6887 45.459 70.6943 45.3942C72.1747 30.0791 68.2147 16.7757 60.1968 4.9823C60.1772 4.9429 60.1437 4.9147 60.1045 4.8978ZM23.7259 37.3253C20.2276 37.3253 17.3451 34.1136 17.3451 30.1693C17.3451 26.225 20.1717 23.0133 23.7259 23.0133C27.3087 23.0133 30.1353 26.2532 30.1067 30.1693C30.1067 34.1136 27.2801 37.3253 23.7259 37.3253ZM47.3178 37.3253C43.8196 37.3253 40.9371 34.1136 40.9371 30.1693C40.9371 26.225 43.7636 23.0133 47.3178 23.0133C50.9006 23.0133 53.7272 26.2532 53.6986 30.1693C53.6986 34.1136 50.9006 37.3253 47.3178 37.3253Z"/></svg>' +
                        '</div>' +
                        '<div style="font-size:15px;font-weight:700;color:#d4a0ff;">Step 1 — Join the Discord</div>' +
                    '</div>' +
                    '<p style="font-size:13px;color:var(--text-secondary);line-height:1.6;">Click the <strong style="color:#c97eff">Join Discord</strong> button in the sidebar to join our community server. You need to be a member before you can open a support ticket.</p>' +
                    '<a href="'+discordInvite+'" target="_blank" rel="noopener noreferrer" style="display:inline-flex;align-items:center;gap:8px;background:#63008a;border-radius:9px;padding:10px 18px;color:#fff;font-size:13px;font-weight:600;text-decoration:none;transition:background 0.2s;width:fit-content;" onmouseover="this.style.background=\'#5865f2\'" onmouseout="this.style.background=\'#63008a\'"><svg width="16" height="16" viewBox="0 0 71 55" fill="currentColor"><path d="M60.1045 4.8978C55.5792 2.8214 50.7265 1.2916 45.6527 0.41542C45.5603 0.39851 45.468 0.440769 45.4204 0.525289C44.7963 1.6353 44.105 3.0834 43.6209 4.2216C38.1637 3.4046 32.7345 3.4046 27.3892 4.2216C26.905 3.0581 26.1886 1.6353 25.5617 0.525289C25.5141 0.443589 25.4218 0.40133 25.3294 0.41542C20.2584 1.2888 15.4057 2.8186 10.8776 4.8978C10.8384 4.9147 10.8048 4.9429 10.7825 4.9795C1.57795 18.7309 -0.943561 32.1443 0.293408 45.3914C0.299005 45.4562 0.335386 45.5182 0.385761 45.5576C6.45866 50.0174 12.3413 52.7249 18.1147 54.5195C18.2071 54.5477 18.305 54.5139 18.3638 54.4378C19.7295 52.5728 20.9469 50.6063 21.9907 48.5383C22.0523 48.4172 21.9935 48.2735 21.8676 48.2256C19.9366 47.4931 18.0979 46.6 16.3292 45.5858C16.1893 45.5041 16.1781 45.304 16.3068 45.2082C16.679 44.9293 17.0513 44.6391 17.4067 44.3461C17.471 44.2926 17.5606 44.2813 17.6362 44.3151C29.2558 49.6202 41.8354 49.6202 53.3179 44.3151C53.3935 44.2785 53.4831 44.2898 53.5502 44.3433C53.9057 44.6363 54.2779 44.9293 54.6529 45.2082C54.7816 45.304 54.7732 45.5041 54.6333 45.5858C52.8646 46.6197 51.0259 47.4931 49.0921 48.2228C48.9662 48.2707 48.9102 48.4172 48.9718 48.5383C50.038 50.6034 51.2554 52.5699 52.5959 54.435C52.6519 54.5139 52.7526 54.5477 52.845 54.5195C58.6464 52.7249 64.529 50.0174 70.6019 45.5576C70.6551 45.5182 70.6887 45.459 70.6943 45.3942C72.1747 30.0791 68.2147 16.7757 60.1968 4.9823C60.1772 4.9429 60.1437 4.9147 60.1045 4.8978ZM23.7259 37.3253C20.2276 37.3253 17.3451 34.1136 17.3451 30.1693C17.3451 26.225 20.1717 23.0133 23.7259 23.0133C27.3087 23.0133 30.1353 26.2532 30.1067 30.1693C30.1067 34.1136 27.2801 37.3253 23.7259 37.3253ZM47.3178 37.3253C43.8196 37.3253 40.9371 34.1136 40.9371 30.1693C40.9371 26.225 43.7636 23.0133 47.3178 23.0133C50.9006 23.0133 53.7272 26.2532 53.6986 30.1693C53.6986 34.1136 50.9006 37.3253 47.3178 37.3253Z"/></svg> Join Discord Server</a>' +
                '</div>' +
                '<div class="glass-card" style="padding:24px;display:flex;flex-direction:column;gap:12px;">' +
                    '<div style="display:flex;align-items:center;gap:12px;">' +
                        '<div style="width:44px;height:44px;border-radius:50%;background:rgba(99,0,138,0.25);border:1px solid rgba(150,0,200,0.45);display:flex;align-items:center;justify-content:center;flex-shrink:0;">' +
                            '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#c97eff" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>' +
                        '</div>' +
                        '<div style="font-size:15px;font-weight:700;color:#d4a0ff;">Step 2 — Open a Ticket</div>' +
                    '</div>' +
                    '<p style="font-size:13px;color:var(--text-secondary);line-height:1.6;">Once you are in the server, navigate to the <strong style="color:#c97eff">#create-ticket</strong> channel and follow the instructions to open a support ticket. Describe your issue clearly and a team member will respond as soon as possible.</p>' +
                    '<div style="background:rgba(99,0,138,0.12);border:1px solid rgba(139,0,160,0.3);border-radius:10px;padding:12px 14px;font-size:12px;color:var(--text-secondary);line-height:1.6;">' +
                        '<strong style="color:#c97eff;">Tip:</strong> Include your username, the product name, and a clear description of the issue to get help faster.' +
                    '</div>' +
                '</div>' +
                '<div class="glass-card" style="padding:24px;display:flex;flex-direction:column;gap:12px;">' +
                    '<div style="display:flex;align-items:center;gap:12px;">' +
                        '<div style="width:44px;height:44px;border-radius:50%;background:rgba(99,0,138,0.25);border:1px solid rgba(150,0,200,0.45);display:flex;align-items:center;justify-content:center;flex-shrink:0;">' +
                            '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#c97eff" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>' +
                        '</div>' +
                        '<div style="font-size:15px;font-weight:700;color:#d4a0ff;">AI Auto Support — 24/7</div>' +
                    '</div>' +
                    '<p style="font-size:13px;color:var(--text-secondary);line-height:1.6;">Inside every support ticket you will find our <strong style="color:#c97eff">AI Auto Support</strong> assistant that is available around the clock. It can answer questions, walk you through setup steps, troubleshoot issues, and explain any feature in detail. Just ask — it will guide you through everything.</p>' +
                    '<div style="display:flex;align-items:center;gap:8px;font-size:12px;color:#22c55e;font-weight:600;">' +
                        '<div style="width:8px;height:8px;border-radius:50%;background:#22c55e;box-shadow:0 0 8px #22c55e;animation:statusPulse 2s ease-in-out infinite;"></div>' +
                        'Online 24/7 — Always Ready' +
                    '</div>' +
                '</div>' +
                '<div class="glass-card" style="padding:24px;display:flex;flex-direction:column;gap:12px;">' +
                    '<div style="display:flex;align-items:center;gap:12px;">' +
                        '<div style="width:44px;height:44px;border-radius:50%;background:rgba(99,0,138,0.25);border:1px solid rgba(150,0,200,0.45);display:flex;align-items:center;justify-content:center;flex-shrink:0;">' +
                            '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#c97eff" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>' +
                        '</div>' +
                        '<div style="font-size:15px;font-weight:700;color:#d4a0ff;">Owner Support</div>' +
                    '</div>' +
                    '<p style="font-size:13px;color:var(--text-secondary);line-height:1.6;">For issues that require human review, our owner personally handles support tickets. Complex technical problems, license questions, billing, and special requests are all handled directly by the owner with full context and care.</p>' +
                    '<div style="background:rgba(99,0,138,0.12);border:1px solid rgba(139,0,160,0.3);border-radius:10px;padding:12px 14px;font-size:12px;color:var(--text-secondary);line-height:1.6;">' +
                        '<strong style="color:#c97eff;">Response Time:</strong> Typically within a few hours during active hours. The AI assistant handles your request instantly at any time.' +
                    '</div>' +
                '</div>' +
            '</div>' +
        '</div>';
    applyShinyTextToEls();
}

function hideCustomerPanel() {
    var section = document.getElementById('customerPanelSection');
    if (section) section.style.display = 'none';
    var content = document.getElementById('content');
    if (content) content.querySelectorAll('.tab-content:not(#reviewsPageSection):not(#supportPageSection):not(#customerPanelSection)').forEach(function(t) { t.style.display = ''; });
}

function showCustomerPanel() {
    var bankSection = document.getElementById('bankPageSection');
    if (bankSection) bankSection.style.display = 'none';
    var reviewsSection = document.getElementById('reviewsPageSection');
    if (reviewsSection) reviewsSection.style.display = 'none';
    var supportSection = document.getElementById('supportPageSection');
    if (supportSection) supportSection.style.display = 'none';
    var content = document.getElementById('content');
    if (!content) return;
    var existing = document.getElementById('customerPanelSection');
    if (existing) {
        content.querySelectorAll('.tab-content:not(#customerPanelSection)').forEach(function(t) { t.style.display = 'none'; });
        existing.style.display = '';
        renderCustomerPanelContent();
        return;
    }
    content.querySelectorAll('.tab-content').forEach(function(t) { t.style.display = 'none'; });
    var section = document.createElement('section');
    section.id = 'customerPanelSection';
    section.className = 'tab-content active';
    section.innerHTML = '<div class="customer-panel-page"><div class="cp-loading">Loading...</div></div>';
    content.appendChild(section);
    renderCustomerPanelContent();
}

function renderCustomerPanelContent() {
    var section = document.getElementById('customerPanelSection');
    if (!section) return;
    var fullUser = null;
    try { fullUser = JSON.parse(sessionStorage.getItem('rickware_user')); } catch(e) {}
    if (!fullUser) fullUser = currentUser;
    if (!fullUser) {
        section.innerHTML = '<div class="customer-panel-page"><div class="cp-loading">Not logged in.</div></div>';
        return;
    }
    var accountTypeBadgeStyle = getAccountTypeBadgeStyle(fullUser.account_type);
    var purchases = fullUser.purchased_products || [];
    var totalSpent = purchases.reduce(function(sum, p) { return sum + (p.amount || 0); }, 0);
    var activeCount = purchases.filter(function(p) { var s = (p.status || '').toLowerCase(); return s === 'active' || s === 'paid' || s === 'completed'; }).length;
    var licenseKeys = fullUser.license_keys || [];
    var statsHtml =
        '<div class="cp-stats-grid">' +
            '<div class="cp-stat-card glass-card"><div class="cp-stat-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#c97eff" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg></div><div class="cp-stat-info"><div class="cp-stat-value">' + purchases.length + '</div><div class="cp-stat-label">Total Purchases</div></div></div>' +
            '<div class="cp-stat-card glass-card"><div class="cp-stat-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#c97eff" stroke-width="2"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg></div><div class="cp-stat-info"><div class="cp-stat-value">' + activeCount + '</div><div class="cp-stat-label">Active</div></div></div>' +
            '<div class="cp-stat-card glass-card"><div class="cp-stat-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#c97eff" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg></div><div class="cp-stat-info"><div class="cp-stat-value">$' + totalSpent.toFixed(2) + '</div><div class="cp-stat-label">Total Spent</div></div></div>' +
            '<div class="cp-stat-card glass-card"><div class="cp-stat-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#c97eff" stroke-width="2"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 11-7.778 7.778 5.5 5.5 0 017.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/></svg></div><div class="cp-stat-info"><div class="cp-stat-value">' + licenseKeys.length + '</div><div class="cp-stat-label">License Keys</div></div></div>' +
        '</div>';
    var ordersHtml = '';
    if (purchases.length === 0) {
        ordersHtml = '<div class="cp-empty-state"><svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="rgba(155,0,204,0.4)" stroke-width="1.5"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/></svg><p>No purchases yet.</p></div>';
    } else {
        var rowsHtml = purchases.map(function(p) {
            var sl = (p.status || 'unknown').toLowerCase();
            var statusClass = 'cp-status-unknown';
            if (sl === 'active' || sl === 'paid' || sl === 'completed') statusClass = 'cp-status-paid';
            else if (sl === 'pending') statusClass = 'cp-status-pending';
            else if (sl === 'cancelled' || sl === 'canceled' || sl === 'failed' || sl === 'aborted') statusClass = 'cp-status-cancelled';
            var couponHtml = p.coupon
                ? '<span class="cp-coupon-badge"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>' + escHtml(p.coupon) + (p.saved ? ' <span class="cp-saved-inline">-$' + Number(p.saved).toFixed(2) + '</span>' : '') + '</span>'
                : '<span class="cp-no-coupon">—</span>';
            return '<div class="cp-order-row">' +
                '<span class="cp-order-date">' + escHtml(p.date || '—') + '</span>' +
                '<span class="cp-order-product">' + escHtml(p.product || '—') + '</span>' +
                '<span class="cp-order-amount">$' + (p.amount || 0).toFixed(2) + '</span>' +
                '<span class="' + statusClass + '">' + escHtml(p.status || 'unknown') + '</span>' +
                '<span>' + couponHtml + '</span>' +
            '</div>';
        }).join('');
        ordersHtml =
            '<div class="cp-orders-table">' +
                '<div class="cp-orders-header"><span>Date</span><span>Product</span><span>Amount</span><span>Status</span><span>Coupon</span></div>' +
                rowsHtml +
            '</div>';
    }
    var profileHtml =
        '<div class="cp-profile-card glass-card">' +
            '<div class="cp-profile-left">' +
                '<img src="' + escHtml(fullUser.profile_picture || '') + '" alt="" class="cp-profile-img" onerror="this.style.display=\'none\'">' +
                '<div class="cp-profile-info">' +
                    '<div class="cp-profile-username">' + escHtml(fullUser.username || 'Unknown') + '</div>' +
                    '<span class="cp-account-type-badge" style="' + accountTypeBadgeStyle + '">' + escHtml(fullUser.account_type || 'User') + '</span>' +
                    '<div class="cp-profile-meta">' +
                        (fullUser.email_adress ? '<span>' + escHtml(fullUser.email_adress) + '</span>' : '') +
                        (fullUser.user_created_at ? '<span>Member since ' + new Date(fullUser.user_created_at).toLocaleDateString() + '</span>' : '') +
                    '</div>' +
                '</div>' +
            '</div>' +
            '<div class="cp-profile-right">' +
                '<a href="./sites/account_settings.html" class="cp-quick-link"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>Account Settings</a>' +
                '<a href="./sites/order_history.html" class="cp-quick-link"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>Full Order History</a>' +
            '</div>' +
        '</div>';
    section.innerHTML =
        '<div class="customer-panel-page">' +
            '<div class="cp-page-header glass-card">' +
                '<div class="cp-header-left">' +
                    '<h1><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align:middle;margin-right:10px"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg><span class="shiny-text-js" style="background-image:linear-gradient(120deg,#c97eff 35%,#ffffff 50%,#c97eff 65%);">Customer Panel</span></h1>' +
                    '<p>Your purchases, licenses and account overview</p>' +
                '</div>' +
            '</div>' +
            profileHtml +
            statsHtml +
            '<div class="cp-section-title"><span class="shiny-text-js" style="background-image:linear-gradient(120deg,#c97eff 35%,#ffffff 50%,#c97eff 65%);">Purchase History</span></div>' +
            ordersHtml +
        '</div>';
    applyShinyTextToEls();
}

var reviewVotes = {};

function showReviewsPage() {
    var bankSection = document.getElementById('bankPageSection');
    if (bankSection) bankSection.style.display = 'none';
    var content = document.getElementById('content');
    if (content) content.querySelectorAll('.tab-content:not(#reviewsPageSection)').forEach(function(t) { t.style.display = 'none'; });
    var section = document.getElementById('reviewsPageSection');
    if (!section) return;
    section.style.display = 'block';
    var container = document.getElementById('reviewsPageContainer');
    if (!container || container.dataset.rendered === '1') return;
    container.dataset.rendered = '1';

    var reviews = getReviewsData();

    var starDist = [0,0,0,0,0];
    reviews.forEach(function(r) { if (r.stars >= 1 && r.stars <= 5) starDist[r.stars-1]++; });
    var totalReviews = reviews.length;
    var avgScore = (reviews.reduce(function(s,r){return s+r.stars;},0)/totalReviews).toFixed(1);
    var uniqueUsers = [...new Set(reviews.map(function(r){return r.username;}))].length;
    var uniqueProducts = [...new Set(reviews.map(function(r){return r.product;}))].length;

    function starsSVG(count, size) {
        var s = size || 14;
        var html = '';
        for (var i=1;i<=5;i++) {
            var fill = i <= count ? '#c97eff' : 'rgba(150,0,220,0.2)';
            html += '<svg width="'+s+'" height="'+s+'" viewBox="0 0 24 24" fill="'+fill+'"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>';
        }
        return html;
    }

    var barsHtml = '';
    for (var s=5;s>=1;s--) {
        var cnt = starDist[s-1];
        var pct = totalReviews > 0 ? Math.round(cnt/totalReviews*100) : 0;
        barsHtml += '<div class="reviews-bar-row">' +
            '<span style="min-width:10px;color:#c97eff;">' + s + '</span>' +
            '<svg width="11" height="11" viewBox="0 0 24 24" fill="#c97eff"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>' +
            '<div class="reviews-bar-track"><div class="reviews-bar-fill" style="width:'+pct+'%"></div></div>' +
            '<span class="reviews-bar-count">'+cnt+'</span>' +
        '</div>';
    }

    var statsHtml = '<div class="reviews-stats-bar">' +
        '<div class="reviews-stats-score">' +
            '<div class="reviews-stats-big-num">' + avgScore + '</div>' +
            '<div class="reviews-stats-stars-row">' + starsSVG(Math.round(parseFloat(avgScore)), 16) + '</div>' +
            '<div class="reviews-stats-total-label">' + totalReviews + ' reviews</div>' +
        '</div>' +
        '<div class="reviews-stats-divider"></div>' +
        '<div class="reviews-stats-meta">' +
            '<div class="reviews-stats-meta-item"><strong>' + totalReviews + '</strong> total reviews</div>' +
            '<div class="reviews-stats-meta-item"><strong>' + uniqueUsers + '</strong> unique users</div>' +
            '<div class="reviews-stats-meta-item"><strong>' + uniqueProducts + '</strong> products reviewed</div>' +
            '<div class="reviews-stats-meta-item">Average: <strong>' + avgScore + ' / 5</strong> stars</div>' +
        '</div>' +
        '<div class="reviews-stats-divider"></div>' +
        '<div class="reviews-stats-bars">' + barsHtml + '</div>' +
    '</div>';

    var gridHtml = '<div class="reviews-grid" id="reviewsGrid"></div>';
    container.innerHTML = '<div class="news-page-header"><h1><span class="shiny-text-js" style="background-image:linear-gradient(120deg,#c97eff 35%,#ffffff 50%,#c97eff 65%);">Customer Reviews</span></h1><p>Verified reviews from our community users across all products.</p></div>' + statsHtml + gridHtml;

    var grid = document.getElementById('reviewsGrid');
    reviews.forEach(function(r, idx) {
        var card = document.createElement('div');
        card.className = 'review-card';
        var initials = r.username.split('_').map(function(w){return w[0]||'';}).join('').toUpperCase().slice(0,2) || r.username[0].toUpperCase();
        var shortText = r.text.length > 100 ? r.text.slice(0,100) + '…' : r.text;
        var hasMore = r.text.length > 100;

        card.innerHTML =
            '<div class="review-card-top">' +
                '<div class="review-stars">' + starsSVG(r.stars, 13) + '</div>' +
                '<div class="review-product-type">' + escHtml(r.product) + '</div>' +
            '</div>' +
            '<div>' +
                '<div class="review-body-preview" id="rv-preview-'+idx+'">' + escHtml(shortText) + '</div>' +
                '<div class="review-body-full" id="rv-full-'+idx+'">' + escHtml(r.text) + '</div>' +
                (hasMore ? '<button class="review-read-more" id="rv-btn-'+idx+'" onclick="toggleReviewBody('+idx+')">Read more</button>' : '') +
            '</div>' +
            '<div class="review-user-row">' +
                '<div class="review-avatar">' + escHtml(initials) + '</div>' +
                '<span class="review-username">' + escHtml(r.username) + '</span>' +
                '<span class="review-user-badge">User</span>' +
                '<span class="review-datetime">' + escHtml(r.date) + '</span>' +
            '</div>' +
            '<div class="review-card-bottom">' +
                '<div class="review-verified">' +
                    '<div class="review-verified-icon"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg></div>' +
                    'Verified Purchase' +
                '</div>' +
                '<div class="review-vote-row">' +
                    '<button class="review-vote-btn" id="rv-like-'+idx+'" onclick="voteReview('+idx+',\'like\')"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14z"/><path d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/></svg> <span id="rv-like-count-'+idx+'">' + (r.likes||0) + '</span></button>' +
                    '<button class="review-vote-btn" id="rv-dislike-'+idx+'" onclick="voteReview('+idx+',\'dislike\')"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3H10z"/><path d="M17 2h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17"/></svg> <span id="rv-dislike-count-'+idx+'">' + (r.dislikes||0) + '</span></button>' +
                '</div>' +
            '</div>';
        grid.appendChild(card);
    });
    applyShinyTextToEls();
}

function toggleReviewBody(idx) {
    var preview = document.getElementById('rv-preview-'+idx);
    var full = document.getElementById('rv-full-'+idx);
    var btn = document.getElementById('rv-btn-'+idx);
    if (!preview || !full || !btn) return;
    var isOpen = full.classList.contains('open');
    if (isOpen) {
        full.classList.remove('open');
        preview.classList.remove('hidden-preview');
        btn.textContent = 'Read more';
    } else {
        full.classList.add('open');
        preview.classList.add('hidden-preview');
        btn.textContent = 'Read less';
    }
}

function voteReview(idx, type) {
    var key = 'rv-' + idx;
    var prev = reviewVotes[key];
    var likeBtn = document.getElementById('rv-like-'+idx);
    var dislikeBtn = document.getElementById('rv-dislike-'+idx);
    var likeCount = document.getElementById('rv-like-count-'+idx);
    var dislikeCount = document.getElementById('rv-dislike-count-'+idx);
    if (!likeBtn || !dislikeBtn) return;
    var lc = parseInt(likeCount.textContent) || 0;
    var dc = parseInt(dislikeCount.textContent) || 0;
    if (prev === type) {
        reviewVotes[key] = null;
        likeBtn.classList.remove('voted-like');
        dislikeBtn.classList.remove('voted-dislike');
        if (type === 'like') likeCount.textContent = lc - 1;
        else dislikeCount.textContent = dc - 1;
    } else {
        if (prev === 'like') { likeBtn.classList.remove('voted-like'); likeCount.textContent = lc - 1; lc--; }
        if (prev === 'dislike') { dislikeBtn.classList.remove('voted-dislike'); dislikeCount.textContent = dc - 1; dc--; }
        reviewVotes[key] = type;
        if (type === 'like') { likeBtn.classList.add('voted-like'); likeCount.textContent = lc + 1; }
        else { dislikeBtn.classList.add('voted-dislike'); dislikeCount.textContent = dc + 1; }
    }
}

function getReviewsData() {
    return [
        {username:'shadow_rick',product:'Macro Tool',stars:5,date:'Feb 22, 2026 · 14:32',text:'Honestly one of the best macro tools I have ever used. The setup was super easy and within 5 minutes I had everything configured exactly the way I wanted. The auto-update feature works flawlessly and I haven\'t had a single crash in weeks. Highly recommend to anyone who wants to save time with repetitive tasks.',likes:34,dislikes:1},
        {username:'xX_VortexPlayer_Xx',product:'FiveM Script',stars:4,date:'Feb 22, 2026 · 15:07',text:'Really solid script, works well on my server. Only thing I wish it had was a bit more documentation for the config options. Had to trial and error a few things but once it was set up correctly it ran perfectly. Will definitely buy again.',likes:12,dislikes:2},
        {username:'techw0lf99',product:'Discord Bot',stars:5,date:'Feb 22, 2026 · 16:45',text:'This bot transformed my Discord server. The moderation commands are top-notch and the auto-role system saved me hours of manual work. My community went from 200 to 800 members in a month partly because the server now feels so much more professional.',likes:28,dislikes:0},
        {username:'moonlight_dev',product:'License Manager',stars:4,date:'Feb 22, 2026 · 17:20',text:'Solid license manager, does exactly what it promises. Interface is clean and intuitive. Integration with my existing setup took maybe 15 minutes. Would love to see more API endpoints added in future updates but overall very happy.',likes:9,dislikes:1},
        {username:'ByteKing42',product:'Macro Tool',stars:3,date:'Feb 22, 2026 · 18:03',text:'It\'s decent. Works for basic stuff but I found some edge cases where the timing was off. Reached out to support and they were responsive though. They seem to be working on a fix. Upgrading my rating once that patch drops.',likes:5,dislikes:3},
        {username:'darkfire_coder',product:'FiveM Script',stars:5,date:'Feb 22, 2026 · 19:11',text:'Absolutely fire. My players noticed the improvement immediately. Server performance barely changed with this script running which shows how well it\'s optimized. Can\'t believe I was running a worse alternative before.',likes:41,dislikes:0},
        {username:'GrindModeAlex',product:'Discord Bot',stars:4,date:'Feb 22, 2026 · 20:30',text:'Really enjoying using this bot. Commands are intuitive and the embed builder is genuinely useful. My only complaint is that sometimes it takes a few seconds to respond during peak hours but it\'s never broken or gone offline.',likes:17,dislikes:2},
        {username:'neon_striker',product:'License Manager',stars:5,date:'Feb 23, 2026 · 09:15',text:'Perfect tool. I\'ve tested probably 6 or 7 license managers over the years and this is by far the cleanest. UI is modern, backend is fast, and the support team actually knows what they\'re talking about.',likes:22,dislikes:0},
        {username:'staticpulse',product:'Macro Tool',stars:4,date:'Feb 23, 2026 · 10:02',text:'The macro editor is really well thought out. You can chain actions together in ways that most tools don\'t support. I use it daily for my workflow. A dark theme option in the UI would be a nice addition.',likes:14,dislikes:1},
        {username:'phantom_modder',product:'FiveM Script',stars:5,date:'Feb 23, 2026 · 11:45',text:'This is the real deal. Running it on my RP server and the players love it. Zero desync issues, no rubber banding, just clean smooth gameplay. Already bought two more products from this store.',likes:37,dislikes:1},
        {username:'lunar_labs_fan',product:'Discord Bot',stars:3,date:'Feb 23, 2026 · 12:20',text:'Average bot, some features work great, others feel unfinished. The ticket system specifically still has a bug where it doesn\'t always ping the right role. Waiting on an update before I can go higher.',likes:6,dislikes:4},
        {username:'cryptic_zero',product:'License Manager',stars:4,date:'Feb 23, 2026 · 13:55',text:'Good manager. Does what it says. The dashboard analytics are a nice touch I wasn\'t expecting. Only missing a bulk key generation feature which I need for distributing to my team.',likes:11,dislikes:0},
        {username:'r1ckware_loyalist',product:'Macro Tool',stars:5,date:'Feb 23, 2026 · 14:40',text:'Been using Rickware products for a while now and every single one has been worth it. The macro tool specifically is something I use every single day and it has never let me down. 10/10 no hesitation.',likes:53,dislikes:2},
        {username:'serverbuilder_EU',product:'FiveM Script',stars:5,date:'Feb 23, 2026 · 15:22',text:'Bought this for my EU FiveM server and it runs perfectly even with 150+ players online. The optimization is incredible. Most scripts choke above 80 players but this one doesn\'t even blink.',likes:31,dislikes:0},
        {username:'codevault99',product:'Discord Bot',stars:4,date:'Feb 23, 2026 · 16:10',text:'Solid bot overall. The automod is smart enough to catch most rule violations without false positives. Took about an hour to get everything tuned but now it runs in the background without any supervision needed.',likes:19,dislikes:1},
        {username:'ultrasnipe',product:'License Manager',stars:5,date:'Feb 23, 2026 · 17:00',text:'Exactly what I needed. Managing keys for 200+ customers used to be a nightmare. Now it takes 10 minutes a week. The automated expiry reminders alone are worth the price.',likes:26,dislikes:0},
        {username:'ZephyrCraft',product:'Macro Tool',stars:4,date:'Feb 23, 2026 · 17:45',text:'Really impressive recorder functionality. Just record your actions once and replay them as many times as you want. Would appreciate variable delay options but the fixed delay works fine for my use case.',likes:8,dislikes:1},
        {username:'storm_dev_404',product:'FiveM Script',stars:3,date:'Feb 23, 2026 · 18:30',text:'Works but had some compatibility issues with another resource I was running. Had to disable one of my other scripts to get it working properly. Support helped me identify the conflict but I wish the docs mentioned it.',likes:4,dislikes:5},
        {username:'apexcoder_88',product:'Discord Bot',stars:5,date:'Feb 23, 2026 · 19:15',text:'This bot does everything. Literally everything. Moderation, music, utility, custom commands, scheduled messages. It replaced 3 other bots I was running. My server feels so much cleaner now.',likes:44,dislikes:1},
        {username:'labs_member_01',product:'License Manager',stars:4,date:'Feb 23, 2026 · 20:05',text:'Very good product. The license validation API is fast and reliable. I integrated it into my web store in about 2 hours with minimal friction. The webhook support is a huge bonus.',likes:13,dislikes:0},
        {username:'nightcode_rl',product:'Macro Tool',stars:5,date:'Feb 24, 2026 · 08:30',text:'I was skeptical at first but this tool genuinely delivers. Managed to automate a 45-step workflow down to a single hotkey press. The conditional logic support is what sets it apart from cheaper alternatives.',likes:29,dislikes:0},
        {username:'FiveM_admin_pro',product:'FiveM Script',stars:5,date:'Feb 24, 2026 · 09:22',text:'Running 3 Rickware scripts on my server now and each one has been rock solid. This one in particular has been the backbone of my server economy system for weeks without a single issue.',likes:38,dislikes:1},
        {username:'discord_power_user',product:'Discord Bot',stars:4,date:'Feb 24, 2026 · 10:15',text:'Compared this bot to 4 others before choosing and this won easily. The command customization is way more flexible and the logging is detailed enough to catch bad actors. Great product.',likes:21,dislikes:2},
        {username:'key_empire',product:'License Manager',stars:3,date:'Feb 24, 2026 · 11:00',text:'Okay product. Works fine for small scale but I ran into rate limiting when trying to validate more than 100 keys per minute. For my use case I needed something that could handle more throughput.',likes:3,dislikes:7},
        {username:'blackhat_hunter',product:'Macro Tool',stars:5,date:'Feb 24, 2026 · 11:45',text:'Game changer for competitive play. The precision and timing consistency is something I couldn\'t achieve manually. Everything runs exactly as configured every single time. Zero variance.',likes:47,dislikes:3},
        {username:'horizon_games',product:'FiveM Script',stars:4,date:'Feb 24, 2026 · 12:30',text:'Works great for what it is. Integrates nicely with my existing framework. The update that dropped last week fixed the NPC spawn issue I was experiencing so now everything runs clean.',likes:16,dislikes:1},
        {username:'cybertech_labs',product:'Discord Bot',stars:5,date:'Feb 24, 2026 · 13:15',text:'By far the most feature rich bot at this price point. The reaction role system alone would justify the cost but you also get a complete moderation suite on top of it. Really impressive work.',likes:33,dislikes:0},
        {username:'keymaster2000',product:'License Manager',stars:4,date:'Feb 24, 2026 · 14:00',text:'Clean UI and sensible defaults. Got up and running faster than expected. The export to CSV feature is very useful for record keeping. Missing some advanced user management but solid overall.',likes:10,dislikes:1},
        {username:'quantum_flux_99',product:'Macro Tool',stars:5,date:'Feb 24, 2026 · 14:45',text:'I\'ve been using this for 3 days and already can\'t imagine going back. My daily task list that used to take 2 hours now takes 20 minutes. The time savings are real and significant.',likes:41,dislikes:0},
        {username:'rickware_convert',product:'FiveM Script',stars:5,date:'Feb 24, 2026 · 15:30',text:'Was using a free script before this. The difference is night and day. This is actually maintained, actually optimized, and the changelog shows the dev actually listens to feedback.',likes:35,dislikes:0},
        {username:'nova_scripter',product:'Discord Bot',stars:4,date:'Feb 24, 2026 · 16:20',text:'Good bot. The invite tracker is something I\'ve been looking for forever and it works perfectly here. Would like more customization for the welcome messages but the defaults look professional.',likes:18,dislikes:2},
        {username:'vault_manager',product:'License Manager',stars:5,date:'Feb 24, 2026 · 17:10',text:'Running this for a community of 500 users. Zero downtime in the month I\'ve been using it. The redundancy and reliability is genuinely impressive. Worth every coin.',likes:27,dislikes:0},
        {username:'autopilot_wizard',product:'Macro Tool',stars:4,date:'Feb 24, 2026 · 18:00',text:'Excellent macro recorder. The playback is smooth and the window detection feature means it triggers in the right application even when I have multiple windows open. Minor wish: multi-monitor support.',likes:15,dislikes:1},
        {username:'delta_force_EU',product:'FiveM Script',stars:5,date:'Feb 24, 2026 · 18:50',text:'Top quality. The code is clean and the performance impact is minimal. I can see the devs actually know what they\'re doing unlike some scripts that are just copy-pasted garbage.',likes:39,dislikes:1},
        {username:'omega_modder',product:'Discord Bot',stars:3,date:'Feb 24, 2026 · 19:40',text:'It\'s functional but has some quirks. The giveaway module sometimes picks the same winner twice which I\'ve had to manually fix. Opened a support ticket and they acknowledged the bug. Waiting for a fix.',likes:7,dislikes:5},
        {username:'precise_striker',product:'License Manager',stars:4,date:'Feb 24, 2026 · 20:30',text:'Does what it says. The IP binding feature is something I specifically needed and it works great. Setup took a bit longer than expected due to DNS configuration but the support team helped me.',likes:12,dislikes:0},
        {username:'alpha_scripts',product:'Macro Tool',stars:5,date:'Feb 25, 2026 · 09:00',text:'Bought this on a friend\'s recommendation and was not disappointed. The scheduling feature lets me set macros to run at specific times of day which is incredible for automation workflows.',likes:32,dislikes:0},
        {username:'FiveM_RP_king',product:'FiveM Script',stars:4,date:'Feb 25, 2026 · 09:45',text:'My roleplay server players noticed the improvement instantly. The NPCs behave more realistically and the performance is better than the open source alternative we were using. Happy with this.',likes:20,dislikes:2},
        {username:'bot_commander',product:'Discord Bot',stars:5,date:'Feb 25, 2026 · 10:30',text:'I\'ve built Discord servers for 5 years and this bot is genuinely the best I\'ve used. The permission system is granular, the commands are consistent, and it actually stays online unlike some competitors.',likes:48,dislikes:1},
        {username:'lc_collector',product:'License Manager',stars:4,date:'Feb 25, 2026 · 11:15',text:'The analytics dashboard is really well done. I can see at a glance how many active vs expired licenses I have and which products are performing best. Useful data for making business decisions.',likes:14,dislikes:0},
        {username:'flash_macro_user',product:'Macro Tool',stars:5,date:'Feb 25, 2026 · 12:00',text:'This thing is quick. No noticeable input lag whatsoever. I was worried it might add delay to my actions but it\'s completely transparent. The detection avoidance features are also well implemented.',likes:56,dislikes:2},
        {username:'server_veteran',product:'FiveM Script',stars:3,date:'Feb 25, 2026 · 12:45',text:'Has potential but still needs some polish. The config file has options that don\'t seem to do anything. I\'ve been running it for a week and it\'s stable at least. Will revisit my rating after more updates.',likes:5,dislikes:4},
        {username:'auto_admin',product:'Discord Bot',stars:5,date:'Feb 25, 2026 · 13:30',text:'Set this up for my gaming community and it handles everything. Raid protection especially is excellent. Had a raid attempt last week and the bot locked it down automatically before I even noticed. Saved the server.',likes:62,dislikes:0},
        {username:'key_lord_pro',product:'License Manager',stars:4,date:'Feb 25, 2026 · 14:15',text:'Happy with this. The email notification system is a nice touch. Customers get notified before their license expires which reduces my support load significantly. Well thought out feature set.',likes:11,dislikes:1},
        {username:'macro_maestro',product:'Macro Tool',stars:5,date:'Feb 25, 2026 · 15:00',text:'Finally a macro tool that doesn\'t require a PhD to use. The interface is clean, the logic is powerful, and it just works. I set up complex conditional macros in under an hour without any previous experience.',likes:28,dislikes:0},
        {username:'midnight_scripter',product:'FiveM Script',stars:4,date:'Feb 25, 2026 · 15:45',text:'Runs clean on my server. The documentation could be more detailed for some of the advanced config options but the script itself is high quality. Performance footprint is impressively small.',likes:17,dislikes:1},
        {username:'rickware_fan_EU',product:'Discord Bot',stars:5,date:'Feb 25, 2026 · 16:30',text:'Absolute unit of a bot. My staff team loves the logging features because they can track everything that happens on the server. The custom commands are so flexible we built our entire onboarding flow with them.',likes:37,dislikes:0},
        {username:'license_pro_99',product:'License Manager',stars:5,date:'Feb 25, 2026 · 17:15',text:'Switched from a competitor and wish I had done it sooner. The import tool made migrating 300+ existing licenses painless. Now everything is in one place and the interface is much nicer.',likes:24,dislikes:0},
        {username:'speedrun_macro',product:'Macro Tool',stars:4,date:'Feb 25, 2026 · 18:00',text:'Great for gaming purposes. The timing precision is excellent and the hotkey system is very flexible. Works across multiple applications without needing to reconfigure. Only feature missing is a profile cloud sync.',likes:13,dislikes:1},
        {username:'epic_fivem_dev',product:'FiveM Script',stars:5,date:'Feb 25, 2026 · 18:45',text:'The level of polish in this script is rare. Most paid scripts still feel janky but this one feels like a professional product. My server has been running it for almost 2 weeks without a single issue.',likes:43,dislikes:1},
        {username:'community_builder',product:'Discord Bot',stars:4,date:'Feb 25, 2026 · 19:30',text:'Good bot. Especially like the bump reminder functionality and the leveling system. My members are way more engaged since I added the XP rewards. Small bugs here and there but nothing major.',likes:22,dislikes:2},
        {username:'vaultkeeper',product:'License Manager',stars:3,date:'Feb 25, 2026 · 20:15',text:'Decent tool. Works for my needs but nothing special. The UI feels a bit dated compared to some competitors. Core functionality is solid though and I haven\'t experienced any downtime.',likes:4,dislikes:3},
        {username:'turbo_scripter',product:'Macro Tool',stars:5,date:'Feb 26, 2026 · 08:30',text:'I run a software testing business and use this for automated UI testing workflows. The reliability and precision is excellent. We\'ve been able to reduce our QA time by 60% using this tool.',likes:35,dislikes:0},
        {username:'rl_veteran',product:'FiveM Script',stars:4,date:'Feb 26, 2026 · 09:15',text:'Running this on my Rockford Hills RP server. Integrates perfectly with my other Rickware scripts. The car spawn system is smooth and the vehicle handling is properly configured.',likes:19,dislikes:1},
        {username:'guild_master_EU',product:'Discord Bot',stars:5,date:'Feb 26, 2026 · 10:00',text:'This replaced 4 separate bots I was running. Moderation, economy, leveling, and utilities all in one. My server is cleaner, my permissions are simpler, and my members have a better experience.',likes:51,dislikes:0},
        {username:'keycrypt',product:'License Manager',stars:4,date:'Feb 26, 2026 · 10:45',text:'The HWID locking is implemented well. Prevents key sharing effectively without being annoying for legitimate users. One minor issue with the reset cooldown but support sorted it out quickly.',likes:16,dislikes:0},
        {username:'pro_macro_setup',product:'Macro Tool',stars:5,date:'Feb 26, 2026 · 11:30',text:'First time using a paid macro tool and it immediately justified the cost. The pixel detection feature is something I couldn\'t find in free alternatives. Now I have macros that react to what\'s happening on screen.',likes:40,dislikes:1},
        {username:'city_server_admin',product:'FiveM Script',stars:4,date:'Feb 26, 2026 · 12:15',text:'Solid script for city servers. The job system integration works without any modification needed for most frameworks. Had to tweak one config value but the defaults were close to what I needed.',likes:14,dislikes:1},
        {username:'bot_builder_88',product:'Discord Bot',stars:5,date:'Feb 26, 2026 · 13:00',text:'Support for this bot is exceptional. Had a question about webhook integration and got a detailed response within the hour. The product itself is great but the support makes it even better.',likes:29,dislikes:0},
        {username:'license_overlord',product:'License Manager',stars:5,date:'Feb 26, 2026 · 13:45',text:'Scales beautifully. Started with 50 customers, now at 800 and the tool handles it without any performance degradation. The infrastructure behind this is clearly well built.',likes:33,dislikes:0},
        {username:'click_clicker',product:'Macro Tool',stars:4,date:'Feb 26, 2026 · 14:30',text:'Really good auto-clicker component. The randomization features make the clicks look more human-like which is exactly what I needed. The interval variation is adjustable and works well.',likes:11,dislikes:1},
        {username:'rp_server_owner',product:'FiveM Script',stars:5,date:'Feb 26, 2026 · 15:15',text:'Best money I\'ve spent on my server. The quality is professional grade and it makes my server stand out from others running free alternatives. My player retention improved noticeably.',likes:45,dislikes:1},
        {username:'modbot_enthusiast',product:'Discord Bot',stars:4,date:'Feb 26, 2026 · 16:00',text:'The anti-spam features alone are worth it. My community was getting hit with spam bots regularly and this stopped that completely. The false positive rate is very low which I appreciate.',likes:20,dislikes:2},
        {username:'access_gate',product:'License Manager',stars:4,date:'Feb 26, 2026 · 16:45',text:'Very clean API. Our dev team integrated it with our custom platform in one afternoon. The documentation is accurate and complete which is rare. Minor feedback: more example code would help.',likes:9,dislikes:0},
        {username:'macro_junkie_99',product:'Macro Tool',stars:5,date:'Feb 26, 2026 · 17:30',text:'I use macros professionally and this tool is at the top of my list. The batch processing and script chaining features are seriously impressive. Saves me hours every single week.',likes:38,dislikes:0},
        {username:'EU_server_builder',product:'FiveM Script',stars:3,date:'Feb 26, 2026 · 18:15',text:'Had some initial setup issues that took a while to resolve. The script itself works correctly once configured but the first-time setup was not as smooth as I hoped. Docs need improvement.',likes:6,dislikes:6},
        {username:'botcraft_master',product:'Discord Bot',stars:5,date:'Feb 26, 2026 · 19:00',text:'Phenomenal. I\'ve been managing Discord communities for 6 years and this bot made my job significantly easier. The scheduled announcements and role management features especially are top tier.',likes:44,dislikes:0},
        {username:'token_vault',product:'License Manager',stars:4,date:'Feb 26, 2026 · 19:45',text:'Dependable product. Has been running for 3 weeks without hiccup. The concurrent session limiting is useful for preventing account sharing. Would add two-factor license validation in future.',likes:12,dislikes:1},
        {username:'pixel_hunter_gg',product:'Macro Tool',stars:5,date:'Feb 27, 2026 · 08:15',text:'The image recognition trigger is what sold me. I can have macros fire based on what appears on screen rather than just timing. That makes this tool genuinely intelligent. Super impressed.',likes:52,dislikes:1},
        {username:'RP_life_server',product:'FiveM Script',stars:4,date:'Feb 27, 2026 · 09:00',text:'Works really well for roleplay scenarios. The interaction menu is smooth and responsive. My players haven\'t had any complaints since switching and a few have specifically mentioned it feels more polished.',likes:21,dislikes:1},
        {username:'discord_architect',product:'Discord Bot',stars:4,date:'Feb 27, 2026 · 09:45',text:'Built my server around this bot and don\'t regret it. Customization is deep enough that you can make it feel completely bespoke. The embed builder with color preview is a small but excellent detail.',likes:17,dislikes:2},
        {username:'key_fortress',product:'License Manager',stars:5,date:'Feb 27, 2026 · 10:30',text:'I reviewed 8 license managers before choosing this one and I stand by the decision 100%. The feature set is complete and the pricing is fair. Exactly what a small software business needs.',likes:30,dislikes:0},
        {username:'grind_automator',product:'Macro Tool',stars:4,date:'Feb 27, 2026 · 11:15',text:'Runs stably in the background for 8+ hours without memory leaks or slowdown. That\'s a basic requirement that many cheaper tools fail at. This one handles it without any issue.',likes:15,dislikes:0},
        {username:'city_RP_vet',product:'FiveM Script',stars:5,date:'Feb 27, 2026 · 12:00',text:'This is the definitive script for city RP servers. Clean code, excellent performance, and actually maintained by someone who understands FiveM deeply. No other paid script I\'ve tried comes close.',likes:48,dislikes:1},
        {username:'bot_authority',product:'Discord Bot',stars:5,date:'Feb 27, 2026 · 12:45',text:'Got this for a community of 2000+ members and it handles everything without a sweat. Large server features like shard-aware caching work correctly. This bot was clearly designed to scale.',likes:41,dislikes:0},
        {username:'license_mint',product:'License Manager',stars:3,date:'Feb 27, 2026 · 13:30',text:'Works okay. Had some issues with the customer portal loading slowly on mobile. Core functionality is fine. The team seems active based on changelog updates so hopefully UX improvements are coming.',likes:5,dislikes:4},
        {username:'speed_macro_EU',product:'Macro Tool',stars:5,date:'Feb 27, 2026 · 14:15',text:'Incredible tool. The execution speed is as fast as I\'ve ever seen in this category. For competitive gaming applications this matters a lot and this tool delivers on that front.',likes:36,dislikes:1},
        {username:'RP_architect',product:'FiveM Script',stars:4,date:'Feb 27, 2026 · 15:00',text:'This script added real depth to my server. Players now have more reasons to interact with each other and the economy feels more natural. A bit of setup time required but worth it.',likes:23,dislikes:1},
        {username:'discord_elite',product:'Discord Bot',stars:5,date:'Feb 27, 2026 · 15:45',text:'Just renewing my review to say: still the best bot after months of use. No performance issues, no unexpected downtime, regular feature updates. The dev team clearly cares about this product.',likes:55,dislikes:0},
        {username:'unlock_master',product:'License Manager',stars:4,date:'Feb 27, 2026 · 16:30',text:'Clean implementation. The key generation is fast and the validation endpoints are reliable. I\'ve stress tested it and it holds up well under load. API documentation is well written.',likes:18,dislikes:0},
        {username:'macro_alpha',product:'Macro Tool',stars:5,date:'Feb 27, 2026 · 17:15',text:'This is what peak macro tooling looks like. Every feature you need is there, nothing is missing, nothing is broken. I\'ve tried 10+ alternatives and keep coming back to this one.',likes:42,dislikes:1},
        {username:'EU_RP_guru',product:'FiveM Script',stars:4,date:'Feb 27, 2026 · 18:00',text:'Running this with 120 concurrent players without lag. The optimization is real, not just marketing. I benchmarked before and after installing and resource usage stayed flat. Impressed.',likes:25,dislikes:0},
        {username:'community_guard',product:'Discord Bot',stars:4,date:'Feb 27, 2026 · 18:45',text:'Excellent automod with proper context awareness. It doesn\'t just keyword match which is what the cheap bots do. This one understands context better which means far fewer false positives.',likes:19,dislikes:1},
        {username:'key_broker',product:'License Manager',stars:5,date:'Feb 27, 2026 · 19:30',text:'Reselling software licenses and this tool is my backbone. The reseller dashboard is exactly what I needed. Customer assignment, expiry management, bulk operations — all there and all working.',likes:31,dislikes:0},
        {username:'autokey_master',product:'Macro Tool',stars:4,date:'Feb 28, 2026 · 09:00',text:'Bought this for my small dev team. The shared profile feature is great for keeping everyone on the same macro setup. Team productivity went up noticeably. Small UI quirks but nothing significant.',likes:14,dislikes:1},
        {username:'server_legend_EU',product:'FiveM Script',stars:5,date:'Feb 28, 2026 · 09:45',text:'My server went from decent to great the week I installed this. Player feedback was immediate and positive. The polish level on this script is something I haven\'t seen in this price range before.',likes:46,dislikes:0},
        {username:'mod_commander',product:'Discord Bot',stars:5,date:'Feb 28, 2026 · 10:30',text:'This bot gave my mod team superpowers. The audit logs are incredibly detailed. We can trace any incident back through the full chain of events. For community management this is invaluable.',likes:38,dislikes:0},
        {username:'key_guardian',product:'License Manager',stars:4,date:'Feb 28, 2026 · 11:15',text:'The fraud detection flags suspicious patterns which has already saved me from a couple chargebacks. That feature alone recovers the cost. Everything else is solid too. Good investment.',likes:22,dislikes:1},
        {username:'rapid_fire_macros',product:'Macro Tool',stars:5,date:'Feb 28, 2026 · 12:00',text:'Technically the most accurate macro tool I\'ve used. Sub-millisecond timing and the ability to randomize delays to avoid detection makes this genuinely superior to everything else in this space.',likes:49,dislikes:1},
        {username:'RP_server_king',product:'FiveM Script',stars:5,date:'Feb 28, 2026 · 12:45',text:'Three months in and this script has never caused a server crash. That\'s the standard I hold things to. Stable, maintained, and makes my server better. Can\'t ask for more.',likes:53,dislikes:0},
        {username:'discord_pro_admin',product:'Discord Bot',stars:4,date:'Feb 28, 2026 · 13:30',text:'Runs great. The slowmode automation based on activity is clever and my chat during peak hours is much more readable now. One thing I\'d improve is better dashboard mobile support.',likes:17,dislikes:2},
        {username:'keysmith_labs',product:'License Manager',stars:5,date:'Feb 28, 2026 · 14:15',text:'Running this for a 1000+ user SaaS product. No hiccups, no downtime, no complaints from customers about the verification process. That\'s exactly the invisible success this kind of tool needs.',likes:37,dislikes:0},
        {username:'ninja_macro_99',product:'Macro Tool',stars:4,date:'Feb 28, 2026 · 15:00',text:'Great tool for general automation. The clipboard integration is something I use constantly. Copy data, transform it, paste it somewhere else — all automatic. Saves me repetitive keystrokes daily.',likes:16,dislikes:0},
        {username:'FiveM_tech_guru',product:'FiveM Script',stars:4,date:'Feb 28, 2026 · 15:45',text:'Technically impressive script. The way it handles state sync is much smarter than most alternatives. No ghost vehicles, no random desyncs, just clean stable gameplay for all players.',likes:26,dislikes:1},
        {username:'guild_overseer',product:'Discord Bot',stars:5,date:'Feb 28, 2026 · 16:30',text:'I admin 3 different Discord servers and use this bot on all of them. Managing configs across servers is easy with the dashboard and each server can be customized independently.',likes:44,dislikes:0},
        {username:'license_vault_pro',product:'License Manager',stars:4,date:'Feb 28, 2026 · 17:15',text:'Good product. The customer-facing portal is clean enough that I can white-label it without embarrassment. My customers interact with it daily and the experience is smooth.',likes:13,dislikes:0},
        {username:'turbo_keys',product:'Macro Tool',stars:5,date:'Feb 28, 2026 · 18:00',text:'Built a full testing suite using this tool. The loop control and error handling capabilities let me build robust automation workflows that recover from unexpected states. Very mature toolset.',likes:34,dislikes:0},
        {username:'city_script_lord',product:'FiveM Script',stars:5,date:'Feb 28, 2026 · 18:45',text:'My go-to recommendation for anyone setting up a FiveM server. This script sets a quality benchmark. Performance, reliability, and polish. Exactly what a paid product should be.',likes:57,dislikes:1},
        {username:'discord_supervisor',product:'Discord Bot',stars:4,date:'Mar 01, 2026 · 09:10',text:'Really appreciate the update frequency. The devs clearly listen to the community. Features I suggested in the Discord server actually made it into updates. That responsiveness is rare.',likes:20,dislikes:1},
        {username:'license_tech_EU',product:'License Manager',stars:5,date:'Mar 01, 2026 · 10:00',text:'Perfect for my digital product business. The checkout integration and automatic key delivery saved me hours of manual work per week. ROI on this tool was immediate.',likes:28,dislikes:0},
        {username:'macro_expert_88',product:'Macro Tool',stars:4,date:'Mar 01, 2026 · 10:55',text:'The latest update added OCR-based triggers which is a feature I specifically requested. Turnaround from request to implementation was less than 2 weeks. That\'s impressive dev velocity.',likes:21,dislikes:0},
        {username:'fivem_operator',product:'FiveM Script',stars:5,date:'Mar 01, 2026 · 11:50',text:'Just came back to leave a fresh review. Still running perfectly. New update last week added features I didn\'t even know I wanted. The quality stays consistently high. Love this product.',likes:40,dislikes:0},
        {username:'server_guardian_EU',product:'Discord Bot',stars:5,date:'Mar 01, 2026 · 12:45',text:'Hands down the best Discord moderation tool available. My server handles 300+ messages per hour and the bot keeps up without breaking a sweat. Genuinely impressive engineering behind this.',likes:61,dislikes:0},
        {username:'locksmith_pro',product:'License Manager',stars:4,date:'Mar 01, 2026 · 13:40',text:'Solid all around. The subscription management is clean. Customers can upgrade, downgrade, and cancel without needing to contact me. That self-service feature alone saves hours per month.',likes:15,dislikes:1},
        {username:'rapid_macro_king',product:'Macro Tool',stars:5,date:'Mar 01, 2026 · 14:35',text:'This tool is an absolute powerhouse. Complex multi-step automations that used to take me hours to set up now take minutes. The logic builder is intuitive once you get the hang of it.',likes:43,dislikes:0},
        {username:'roleplay_master_99',product:'FiveM Script',stars:4,date:'Mar 01, 2026 · 15:30',text:'Really good for serious RP servers. The animation system and interaction menus feel immersive. My players have commented on how much more natural everything feels compared to the old setup.',likes:24,dislikes:1},
        {username:'supreme_bot_admin',product:'Discord Bot',stars:5,date:'Mar 01, 2026 · 16:25',text:'Started using this for my gaming community 6 days ago and already wouldn\'t go back. The configuration options are extensive but logical. Setup time was under 2 hours for a completely customized experience.',likes:36,dislikes:0},
        {username:'key_systems_pro',product:'License Manager',stars:5,date:'Mar 01, 2026 · 17:20',text:'Renewing my license and leaving an updated review. Still five stars. Nothing has broken, features keep getting added, and support response time is still fast. Exemplary product.',likes:32,dislikes:0},
    ];
}

function setupLoginRegisterButtons() {
    var loginBtn = document.getElementById('loginBtn');
    var registerBtn = document.getElementById('registerBtn');
    if (loginBtn) {
        loginBtn.addEventListener('click', function() {
            window.location.href = './sites/login_register.html?tab=login';
        });
    }
    if (registerBtn) {
        registerBtn.addEventListener('click', function() {
            window.location.href = './sites/login_register.html?tab=register';
        });
    }
}

function setupProfileSidebar() {
    var profileBtn = document.getElementById('userProfileBtn');
    var sidebar = document.getElementById('profileSidebar');
    var overlay = document.getElementById('overlay');
    var logoutBtn = document.getElementById('logoutBtn');
    if (profileBtn) {
        profileBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            if (sidebar) sidebar.classList.toggle('active');
            if (overlay) overlay.classList.toggle('active');
        });
    }
    if (overlay) {
        overlay.addEventListener('click', function() {
            if (sidebar) sidebar.classList.remove('active');
            overlay.classList.remove('active');
        });
    }
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            sessionStorage.clear();
            currentUser = null;
            var ab = document.getElementById('authButtons');
            var up = document.getElementById('userProfileBtn');
            if (ab) ab.style.display = 'flex';
            if (up) up.style.display = 'none';
            window.location.reload();
        });
    }
}

var discordCache = {};

async function fetchDiscordCount(inviteUrl) {
    if (!inviteUrl) return null;
    if (discordCache[inviteUrl] !== undefined) return discordCache[inviteUrl];
    try {
        var code = inviteUrl.split('/').pop().split('?')[0];
        var res = await fetch('https://discord.com/api/v10/invites/' + code + '?with_counts=true');
        if (!res.ok) return null;
        var data = await res.json();
        discordCache[inviteUrl] = data.approximate_member_count;
        return data.approximate_member_count;
    } catch(e) {
        return null;
    }
}

function fmtCount(n) {
    if (n === null || n === undefined) return '...';
    if (n >= 1000) return (n / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
    return String(n);
}

function platformIcon(name) {
    if (name === 'discord') return '<svg width="14" height="14" viewBox="0 0 71 55" fill="currentColor"><path d="M60.1045 4.8978C55.5792 2.8214 50.7265 1.2916 45.6527 0.41542C45.5603 0.39851 45.468 0.440769 45.4204 0.525289C44.7963 1.6353 44.105 3.0834 43.6209 4.2216C38.1637 3.4046 32.7345 3.4046 27.3892 4.2216C26.905 3.0581 26.1886 1.6353 25.5617 0.525289C25.5141 0.443589 25.4218 0.40133 25.3294 0.41542C20.2584 1.2888 15.4057 2.8186 10.8776 4.8978C10.8384 4.9147 10.8048 4.9429 10.7825 4.9795C1.57795 18.7309 -0.943561 32.1443 0.293408 45.3914C0.299005 45.4562 0.335386 45.5182 0.385761 45.5576C6.45866 50.0174 12.3413 52.7249 18.1147 54.5195C18.2071 54.5477 18.305 54.5139 18.3638 54.4378C19.7295 52.5728 20.9469 50.6063 21.9907 48.5383C22.0523 48.4172 21.9935 48.2735 21.8676 48.2256C19.9366 47.4931 18.0979 46.6 16.3292 45.5858C16.1893 45.5041 16.1781 45.304 16.3068 45.2082C16.679 44.9293 17.0513 44.6391 17.4067 44.3461C17.471 44.2926 17.5606 44.2813 17.6362 44.3151C29.2558 49.6202 41.8354 49.6202 53.3179 44.3151C53.3935 44.2785 53.4831 44.2898 53.5502 44.3433C53.9057 44.6363 54.2779 44.9293 54.6529 45.2082C54.7816 45.304 54.7732 45.5041 54.6333 45.5858C52.8646 46.6197 51.0259 47.4931 49.0921 48.2228C48.9662 48.2707 48.9102 48.4172 48.9718 48.5383C50.038 50.6034 51.2554 52.5699 52.5959 54.435C52.6519 54.5139 52.7526 54.5477 52.845 54.5195C58.6464 52.7249 64.529 50.0174 70.6019 45.5576C70.6551 45.5182 70.6887 45.459 70.6943 45.3942C72.1747 30.0791 68.2147 16.7757 60.1968 4.9823C60.1772 4.9429 60.1437 4.9147 60.1045 4.8978ZM23.7259 37.3253C20.2276 37.3253 17.3451 34.1136 17.3451 30.1693C17.3451 26.225 20.1717 23.0133 23.7259 23.0133C27.3087 23.0133 30.1353 26.2532 30.1067 30.1693C30.1067 34.1136 27.2801 37.3253 23.7259 37.3253ZM47.3178 37.3253C43.8196 37.3253 40.9371 34.1136 40.9371 30.1693C40.9371 26.225 43.7636 23.0133 47.3178 23.0133C50.9006 23.0133 53.7272 26.2532 53.6986 30.1693C53.6986 34.1136 50.9006 37.3253 47.3178 37.3253Z"/></svg>';
    if (name === 'website') return '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>';
    if (name === 'github') return '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>';
    if (name === 'tiktok') return '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.34 6.34 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z"/></svg>';
    if (name === 'instagram') return '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>';
    return '';
}

function getProductImageUrl(url) {
    if (!url || !url.trim()) return url;
    var trimmed = url.trim();
    if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) return trimmed;
    var ext = trimmed.split('.').pop().toLowerCase();
    if (ext === 'gif') return trimmed;
    if (trimmed === '' || trimmed.endsWith('/')) return trimmed;
    return './images/products/' + trimmed;
}

function buildPartnerCard(p) {
    var card = document.createElement('div');
    card.className = 'partner-card';

    var imgArea = document.createElement('div');
    imgArea.className = 'partner-image-area';

    if (p.preview_image_url && p.preview_image_url.trim()) {
        var img = document.createElement('img');
        img.className = 'partner-preview-img';
        img.src = getPartnerImageUrl(p.preview_image_url);
        img.alt = p.title;
        img.onerror = function() { img.remove(); };
        imgArea.appendChild(img);
    }

    if (p.banner && p.banner.trim()) {
        var bannerEl = document.createElement('div');
        bannerEl.className = 'partner-banner-label';
        bannerEl.textContent = p.banner;
        imgArea.appendChild(bannerEl);
    }

    if (p.owner_name && p.owner_name.trim()) {
        var ownerEl = document.createElement('div');
        ownerEl.className = 'partner-owner-label';
        ownerEl.textContent = 'Owner: ' + p.owner_name;
        imgArea.appendChild(ownerEl);
    }

    var primaryDiscord = (p.discord_url && p.discord_url.trim()) ? p.discord_url : ((p.discord_url_2 && p.discord_url_2.trim()) ? p.discord_url_2 : null);
    if (primaryDiscord) {
        var counter = document.createElement('div');
        counter.className = 'partner-discord-counter';
        counter.innerHTML = '<span class="partner-discord-dot"></span><span class="dc-count">...</span>';
        imgArea.appendChild(counter);
        fetchDiscordCount(primaryDiscord).then(function(n) {
            var span = counter.querySelector('.dc-count');
            if (span) span.textContent = fmtCount(n) + ' members';
        });
        setInterval(function() {
            delete discordCache[primaryDiscord];
            fetchDiscordCount(primaryDiscord).then(function(n) {
                var span = counter.querySelector('.dc-count');
                if (span) span.textContent = fmtCount(n) + ' members';
            });
        }, 30000);
    }

    card.appendChild(imgArea);

    var body = document.createElement('div');
    body.className = 'partner-body';

    var titleEl = document.createElement('div');
    titleEl.className = 'partner-title';
    titleEl.innerHTML = '<span class="shiny-text-js" style="background-image:linear-gradient(120deg,#c97eff 35%,#ffffff 50%,#c97eff 65%);">' + escHtml(p.title) + '</span>';
    body.appendChild(titleEl);

    if (p.description && p.description.trim()) {
        var desc = document.createElement('div');
        desc.className = 'partner-description';
        desc.textContent = p.description;
        body.appendChild(desc);
    }

    var btns = document.createElement('div');
    btns.className = 'partner-buttons';

    function addBtn(url, cls, label, icon) {
        if (!url || !url.trim()) return;
        var a = document.createElement('a');
        a.className = 'partner-btn shiny-btn ' + cls;
        a.href = url;
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
        a.innerHTML = platformIcon(icon) + ' ' + label;
        btns.appendChild(a);
    }

    addBtn(p.discord_url,   'partner-btn-discord',   'Discord',   'discord');
    addBtn(p.discord_url_2, 'partner-btn-discord',   'Discord 2', 'discord');
    addBtn(p.website_url,   'partner-btn-website',   'Website',   'website');
    addBtn(p.github_url,    'partner-btn-github',    'GitHub',    'github');
    addBtn(p.tiktok_url,    'partner-btn-tiktok',    'TikTok',    'tiktok');
    addBtn(p.instagram_url, 'partner-btn-instagram', 'Instagram', 'instagram');

    body.appendChild(btns);
    card.appendChild(body);
    return card;
}

async function loadPartners() {
    var grid = document.getElementById('partnerGrid');
    if (!grid) return;

    var data = null;
    var paths = ['./config/partner.json', './partner.json'];
    for (var i = 0; i < paths.length; i++) {
        try {
            var res = await fetch(paths[i]);
            if (res.ok) { data = await res.json(); break; }
        } catch(e) {}
    }

    grid.innerHTML = '';

    if (!data || !data.partners || data.partners.length === 0) {
        grid.innerHTML = '<p style="color:#808080;padding:30px;">Keine Partner gefunden. Prüfe config/partner.json</p>';
        return;
    }

    var sorted = data.partners.slice().sort(function(a, b) { return a.id - b.id; });
    sorted.forEach(function(p) {
        grid.appendChild(buildPartnerCard(p));
    });
    applyShinyTextToEls();
}

function initAuthPage() {
    var authTabs = document.querySelectorAll('.auth-tab');
    var loginForm = document.getElementById('login-form');
    var registerForm = document.getElementById('register-form');
    var sliderTrack = document.getElementById('authSliderTrack');
    var tabIndicator = document.getElementById('authTabIndicator');
    var params = new URLSearchParams(window.location.search);

    function switchTab(tabName) {
        authTabs.forEach(function(t) { t.classList.remove('active'); });
        var targetTab = Array.from(authTabs).find(function(t) { return t.getAttribute('data-tab') === tabName; });
        if (targetTab) targetTab.classList.add('active');
        if (sliderTrack) sliderTrack.style.transform = tabName === 'register' ? 'translateX(-50%)' : 'translateX(0)';
        if (tabIndicator && authTabs.length >= 2) {
            tabIndicator.style.transform = tabName === 'register' ? 'translateX(100%)' : 'translateX(0)';
        }
    }

    if (params.get('tab') === 'register') {
        switchTab('register');
    }

    authTabs.forEach(function(tab) {
        tab.addEventListener('click', function() {
            switchTab(tab.getAttribute('data-tab'));
        });
    });

    document.querySelectorAll('.toggle-password').forEach(function(btn) {
        btn.addEventListener('click', function() {
            var inp = document.getElementById(btn.getAttribute('data-target'));
            if (inp) inp.type = inp.type === 'password' ? 'text' : 'password';
        });
    });

    var loginFormEl = document.getElementById('loginForm');
    if (loginFormEl) {
        loginFormEl.addEventListener('submit', async function(e) {
            e.preventDefault();
            var user = await loginUser(
                document.getElementById('login-username-email').value,
                document.getElementById('login-password').value
            );
            if (user) window.location.href = '../index.html';
        });
    }

    var registerFormEl = document.getElementById('registerForm');
    if (registerFormEl) {
        registerFormEl.addEventListener('submit', async function(e) {
            e.preventDefault();
            var pw = document.getElementById('register-password').value;
            var pw2 = document.getElementById('register-confirm-password').value;
            if (pw !== pw2) { showBanner('Passwords do not match!', 'error'); return; }
            if (pw.length < 6) { showBanner('Password must be at least 6 characters', 'error'); return; }
            var user = await registerUser(
                document.getElementById('register-username').value,
                document.getElementById('register-email').value,
                document.getElementById('register-phone').value,
                pw
            );
            if (user) window.location.href = '../index.html';
        });
    }
}

function setupSearch() {
    var input = document.getElementById('searchInput');
    var suggestions = document.getElementById('searchSuggestions');
    if (!input || !suggestions) return;

    input.addEventListener('input', function() {
        var val = input.value.trim();
        if (!val || !productsData || !productsData.products) {
            suggestions.style.display = 'none';
            return;
        }
        var q = val.toLowerCase();
        var matches = productsData.products.filter(function(p) {
            return p.title && p.title.toLowerCase().indexOf(q) >= 0;
        }).slice(0, 8);
        if (matches.length === 0) {
            suggestions.style.display = 'none';
            return;
        }
        suggestions.innerHTML = matches.map(function(p) {
            return '<div class="search-suggestion-item" data-title="' + escHtml(p.title) + '">' +
                '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>' +
                escHtml(p.title) + '</div>';
        }).join('');
        suggestions.style.display = 'block';
        suggestions.querySelectorAll('.search-suggestion-item').forEach(function(item) {
            item.addEventListener('click', function() {
                var title = item.getAttribute('data-title');
                input.value = title;
                suggestions.style.display = 'none';
                searchActiveQuery = title;
                renderProducts(currentCategory);
            });
        });
    });

    input.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            var val = input.value.trim();
            suggestions.style.display = 'none';
            searchActiveQuery = val;
            renderProducts(currentCategory);
        }
        if (e.key === 'Escape') {
            suggestions.style.display = 'none';
        }
    });

    document.addEventListener('click', function(e) {
        if (!input.contains(e.target) && !suggestions.contains(e.target)) {
            suggestions.style.display = 'none';
        }
    });
}

var partnersListScrollAnim = null;

function loadPartnersList() {
    var paths = ['./config/partner.json', './partner.json'];
    var tabStrip = document.getElementById('partnerTabListStrip');
    var tabTrack = document.getElementById('partnerTabListTrack');

    var fetchNext = function(idx) {
        if (idx >= paths.length) return;
        fetch(paths[idx]).then(function(res) {
            if (!res.ok) { fetchNext(idx + 1); return; }
            return res.json();
        }).then(function(data) {
            if (!data) return;
            var list = data.partners_list;
            if (!list || list.length === 0) return;
            var sorted = list.slice().sort(function(a, b) { return a.id - b.id; });

            if (tabTrack && tabStrip) {
                tabTrack.innerHTML = '';
                sorted.forEach(function(p) {
                    var a = document.createElement('a');
                    a.className = 'partner-list-item';
                    a.href = p.discord_url || '#';
                    a.target = '_blank';
                    a.rel = 'noopener noreferrer';
                    if (p.preview_image_url && p.preview_image_url.trim()) {
                        var img = document.createElement('img');
                        img.className = 'partner-list-avatar';
                        img.src = getPartnerImageUrl(p.preview_image_url);
                        img.alt = p.owner_name || '';
                        img.onerror = function() {
                            img.style.display = 'none';
                            var ph = buildAvatarPlaceholder(p.owner_name);
                            a.insertBefore(ph, img.nextSibling);
                        };
                        a.appendChild(img);
                    } else {
                        a.appendChild(buildAvatarPlaceholder(p.owner_name));
                    }
                    if (p.owner_name) {
                        var name = document.createElement('span');
                        name.className = 'partner-list-name';
                        name.textContent = p.owner_name.trim();
                        a.appendChild(name);
                    }
                    tabTrack.appendChild(a);
                });
                tabStrip.style.display = 'block';
            }
        }).catch(function() { fetchNext(idx + 1); });
    };
    fetchNext(0);
}

function buildAvatarPlaceholder(name) {
    var ph = document.createElement('div');
    ph.className = 'partner-list-avatar-placeholder';
    ph.textContent = name ? name.trim().charAt(0).toUpperCase() : '?';
    return ph;
}

var partnersListScrollAnim = null;
var partnerTabScrollAnim = null;

function getPartnerImageUrl(url) {
    if (!url || !url.trim()) return url;
    var trimmed = url.trim();
    if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) return trimmed;
    if (trimmed === '' || trimmed.endsWith('/')) return trimmed;
    return './images/partner/' + trimmed;
}

async function loadNews() {
    var grid = document.getElementById('newsGrid');
    if (!grid) return;
    var data = null;
    var paths = ['./config/news.json', './news.json'];
    for (var i = 0; i < paths.length; i++) {
        try {
            var res = await fetch(paths[i]);
            if (res.ok) { data = await res.json(); break; }
        } catch(e) {}
    }
    if (!data || !data.q_and_a_content || data.q_and_a_content.length === 0) {
        grid.innerHTML = '<div class="empty-state">No news available.</div>';
        return;
    }
    var items = data.q_and_a_content.slice().sort(function(a, b) { return a.id - b.id; });
    var html = '';
    items.forEach(function(item, idx) {
        var badge = item.badge || '';
        var badgeColor = item.badge_color || '#63008a';
        var type = item.type || '';
        var title = item.title || '';
        var description = item.description || '';
        var author = item.author || '';
        var published = item['published:'] || item.published || '';
        var isNew = badge.toLowerCase() === 'new info';
        if (isNew) {
            html += '<div class="news-card news-card-featured" style="grid-column:1/-1;">';
        } else {
            html += '<div class="news-card">';
        }
        html += '<div class="news-card-badge" style="background:' + escHtml(badgeColor) + ';">' + escHtml(badge) + '</div>';
        html += '<div class="news-card-meta">';
        if (published) html += '<span class="news-date">' + escHtml(published) + '</span>';
        if (type) html += '<span class="news-category">' + escHtml(type) + '</span>';
        html += '</div>';
        html += '<h2 class="news-card-title"><span class="shiny-text-js" style="background-image:linear-gradient(120deg,#c97eff 35%,#ffffff 50%,#c97eff 65%);">' + escHtml(title) + '</span></h2>';
        html += '<p class="news-card-body">' + escHtml(description) + '</p>';
        if (author) html += '<div class="news-card-footer"><span class="news-author">by ' + escHtml(author) + '</span></div>';
        html += '</div>';
    });
    grid.innerHTML = html;
    applyShinyTextToEls();
}

async function loadQA() {
    var list = document.getElementById('qaList');
    if (!list) return;
    var data = null;
    var paths = ['./config/q_&_a.json', './config/q_a.json', './config/qa.json', './q_a.json'];
    for (var i = 0; i < paths.length; i++) {
        try {
            var res = await fetch(paths[i]);
            if (res.ok) { data = await res.json(); break; }
        } catch(e) {}
    }
    if (!data || !data.q_and_a_content || data.q_and_a_content.length === 0) {
        list.innerHTML = '<div class="empty-state">No Q&amp;A available.</div>';
        return;
    }
    var items = data.q_and_a_content.slice().sort(function(a, b) { return a.id - b.id; });
    var html = '';
    items.forEach(function(item) {
        html += '<div class="qa-item">';
        html += '<button class="qa-toggle"><span>' + escHtml(item.title || '') + '</span><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg></button>';
        html += '<div class="qa-answer">' + escHtml(item.description || '') + '</div>';
        html += '</div>';
    });
    list.innerHTML = html;
}

async function loadGithubTab() {
    var grid = document.getElementById('githubGrid');
    var listStrip = document.getElementById('githubListStrip');
    var listTrack = document.getElementById('githubListTrack');
    if (!grid) return;
    var data = null;
    var paths = ['./config/github.json', './github.json'];
    for (var i = 0; i < paths.length; i++) {
        try {
            var res = await fetch(paths[i]);
            if (res.ok) { data = await res.json(); break; }
        } catch(e) {}
    }
    if (!data) {
        grid.innerHTML = '<div class="empty-state">No repositories found.</div>';
        return;
    }
    var profiles = data.profiles || data.owners || data.contributors || data.partners_list || [];
    if (profiles.length > 0 && listTrack && listStrip) {
        var statsContainer = document.getElementById('githubStatsStrip');
        if (!statsContainer) {
            statsContainer = document.createElement('div');
            statsContainer.id = 'githubStatsStrip';
            statsContainer.style.cssText = 'display:flex;flex-wrap:wrap;gap:16px;margin-bottom:18px;';
            listStrip.parentNode.insertBefore(statsContainer, listStrip);
        }
        listTrack.innerHTML = '';
        profiles.forEach(function(p) {
            var githubUsername = '';
            if (p.github_url && p.github_url.trim()) {
                var m = p.github_url.trim().match(/github\.com\/([^\/?#]+)/);
                if (m) githubUsername = m[1];
            }
            var a = document.createElement('a');
            a.className = 'partner-list-item github-profile-item';
            a.href = p.github_url || p.website_url || '#';
            a.target = '_blank';
            a.rel = 'noopener noreferrer';
            a.style.cssText = 'display:flex;flex-direction:column;align-items:center;gap:6px;padding:10px 14px;min-width:80px;text-decoration:none;';
            var avatarEl = document.createElement('img');
            avatarEl.className = 'partner-list-avatar';
            avatarEl.style.cssText = 'width:52px;height:52px;border-radius:50%;border:2px solid rgba(139,0,160,0.4);object-fit:cover;';
            avatarEl.alt = p.owner_name || githubUsername || '';
            if (githubUsername) {
                var cacheKey = 'gh_profile_' + githubUsername;
                var cached = sessionStorage.getItem(cacheKey);
                if (cached) {
                    try {
                        var cachedData = JSON.parse(cached);
                        avatarEl.src = cachedData.avatar_url || '';
                        renderGithubProfileStats(statsContainer, cachedData, githubUsername, p);
                    } catch(e) { avatarEl.src = ''; }
                } else {
                    avatarEl.src = 'https://avatars.githubusercontent.com/' + githubUsername + '?size=100';
                    fetch('https://api.github.com/users/' + githubUsername)
                        .then(function(r) { return r.ok ? r.json() : Promise.reject(); })
                        .then(function(udata) {
                            sessionStorage.setItem(cacheKey, JSON.stringify(udata));
                            avatarEl.src = udata.avatar_url || avatarEl.src;
                            renderGithubProfileStats(statsContainer, udata, githubUsername, p);
                            if (!udata.public_repos) return;
                            return fetch('https://api.github.com/users/' + githubUsername + '/repos?per_page=100&type=owner');
                        })
                        .then(function(r) { if (r && r.ok) return r.json(); })
                        .then(function(repos) {
                            if (!repos) return;
                            var totalStars = repos.reduce(function(s, repo) { return s + (repo.stargazers_count || 0); }, 0);
                            var cacheStr = sessionStorage.getItem('gh_profile_' + githubUsername);
                            if (cacheStr) {
                                try {
                                    var cobj = JSON.parse(cacheStr);
                                    cobj._total_stars = totalStars;
                                    sessionStorage.setItem('gh_profile_' + githubUsername, JSON.stringify(cobj));
                                } catch(e) {}
                            }
                            var statCard = document.getElementById('ghstat-' + githubUsername);
                            if (statCard) {
                                var starsEl = statCard.querySelector('.gh-stat-stars');
                                if (starsEl) starsEl.textContent = totalStars >= 1000 ? (totalStars/1000).toFixed(1)+'k' : totalStars;
                            }
                        })
                        .catch(function() {});
                }
            } else if (p.preview_image_url && p.preview_image_url.trim() && !p.preview_image_url.trim().endsWith('/')) {
                avatarEl.src = getPartnerImageUrl(p.preview_image_url);
            } else {
                avatarEl.replaceWith(buildAvatarPlaceholder(p.owner_name));
                avatarEl = null;
            }
            avatarEl && a.appendChild(avatarEl);
            if (p.owner_name) {
                var nameEl = document.createElement('span');
                nameEl.className = 'partner-list-name';
                nameEl.style.fontSize = '12px';
                nameEl.textContent = p.owner_name.trim();
                a.appendChild(nameEl);
            }
            listTrack.appendChild(a);
        });
        listStrip.style.display = 'block';
    }
    var repos = data.Cards || data.cards || data.repositories || data.repos || data.products || [];
    if (!repos || repos.length === 0) {
        grid.innerHTML = '<div class="empty-state">No repositories found. Check ./config/github.json</div>';
        return;
    }
    grid.innerHTML = '';
    repos.sort(function(a, b) { return (a.id || 0) - (b.id || 0); });
    repos.forEach(function(p) {
        grid.appendChild(buildProductCard(p, false));
    });
    applyShinyTextToEls();
}

function renderGithubProfileStats(container, udata, username, profileEntry) {
    if (!container || !udata) return;
    var existing = document.getElementById('ghstat-' + username);
    if (existing) return;
    var card = document.createElement('div');
    card.id = 'ghstat-' + username;
    card.style.cssText = 'background:rgba(22,5,40,0.65);backdrop-filter:blur(14px);border:1px solid rgba(139,0,160,0.28);border-radius:14px;padding:14px 20px;display:flex;align-items:center;gap:14px;min-width:260px;flex:1;';
    var avatarUrl = udata.avatar_url || ('https://avatars.githubusercontent.com/' + username + '?size=80');
    var repoCount = udata.public_repos || 0;
    var followers = udata.followers || 0;
    var following = udata.following || 0;
    var cachedStr = sessionStorage.getItem('gh_profile_' + username);
    var totalStars = 0;
    if (cachedStr) { try { totalStars = JSON.parse(cachedStr)._total_stars || 0; } catch(e) {} }
    var displayFollowers = followers >= 1000 ? (followers/1000).toFixed(1)+'k' : followers;
    var displayFollowing = following >= 1000 ? (following/1000).toFixed(1)+'k' : following;
    var displayRepos = repoCount >= 1000 ? (repoCount/1000).toFixed(1)+'k' : repoCount;
    var displayStars = totalStars >= 1000 ? (totalStars/1000).toFixed(1)+'k' : totalStars;
    card.innerHTML =
        '<img src="'+avatarUrl+'" alt="'+escHtml(udata.login||username)+'" style="width:54px;height:54px;border-radius:50%;border:2px solid rgba(139,0,160,0.45);object-fit:cover;flex-shrink:0;">' +
        '<div style="display:flex;flex-direction:column;gap:4px;flex:1;">' +
            '<div style="display:flex;align-items:center;gap:8px;">' +
                '<a href="'+(udata.html_url||('#'))+'" target="_blank" rel="noopener noreferrer" style="font-size:14px;font-weight:700;color:#d4a0ff;text-decoration:none;">' + escHtml(udata.name || udata.login || username) + '</a>' +
                (udata.login ? '<span style="font-size:11px;color:var(--text-tertiary);">@'+escHtml(udata.login)+'</span>' : '') +
            '</div>' +
            '<div style="display:flex;gap:14px;flex-wrap:wrap;">' +
                '<span style="font-size:12px;color:var(--text-secondary);"><strong style="color:#c97eff">'+displayFollowers+'</strong> followers · <strong style="color:#c97eff">'+displayFollowing+'</strong> following</span>' +
            '</div>' +
            '<div style="display:flex;gap:14px;flex-wrap:wrap;">' +
                '<span style="font-size:12px;color:var(--text-secondary);">Repos: <strong style="color:#c97eff">'+displayRepos+'</strong></span>' +
                '<span style="font-size:12px;color:var(--text-secondary);">Total Stars: <strong class="gh-stat-stars" style="color:#c97eff">'+(totalStars > 0 ? displayStars : '...')+'</strong></span>' +
            '</div>' +
        '</div>';
    container.appendChild(card);
}

document.addEventListener('DOMContentLoaded', async function() {
    (function() {
        var style = document.createElement('style');
        style.textContent = '@keyframes shinyMove{0%{background-position:150% center}100%{background-position:-50% center}}@keyframes cursorBlink{0%,100%{opacity:1}50%{opacity:0}}';
        document.head.appendChild(style);
    })();

    if (window.location.pathname.includes('login_register')) {
        await loadConfig();
        initAuthPage();
        return;
    }

    await loadConfig();
    await checkLoginStatus();
    setupNavigation();
    setupTabs();
    setupLoginRegisterButtons();
    setupProfileSidebar();
    updateLanguage();
    updateCartBadge();

    (function() {
        var leftBtn = document.getElementById('catSliderLeft');
        var rightBtn = document.getElementById('catSliderRight');
        var scroll = document.getElementById('categoryTabsScroll');
        if (leftBtn && scroll) leftBtn.addEventListener('click', function() { scroll.scrollBy({ left: -200, behavior: 'smooth' }); });
        if (rightBtn && scroll) rightBtn.addEventListener('click', function() { scroll.scrollBy({ left: 200, behavior: 'smooth' }); });
    })();

    if (config.discord_invite) {
        var db = document.getElementById('discordBtn');
        if (db) db.href = config.discord_invite;
    }

    loadPartners();
    loadPartnersList();
    loadNews();
    loadQA();
    setupDropdowns();
    setupMobileMenu();
    setupQAToggles();
    setupCheckoutModal();
    loadProducts().then(function() {
        setupSearch();
        setupPerPageSelect();
    });

    var labCoinsWidget = document.getElementById('labCoinsWidget');
    if (labCoinsWidget) {
        labCoinsWidget.addEventListener('click', function() {
            var bankNavBtn = document.querySelector('.nav-item[data-page="bank"]');
            if (bankNavBtn) bankNavBtn.click();
        });
    }

    var githubTabBtn = document.querySelector('.top-tab[data-tab="github"]');
    if (githubTabBtn) {
        githubTabBtn.addEventListener('click', function() {
            var ghGrid = document.getElementById('githubGrid');
            if (ghGrid && ghGrid.querySelector('.news-loading')) {
                loadGithubTab().then(function() { applyShinyTextToEls(); });
            }
        });
    }

    applyShinyTextToEls();
    setTimeout(applyShinyTextToEls, 800);
});

function setupMobileMenu() {
    var btn = document.getElementById('mobileMenuBtn');
    var sidebar = document.getElementById('sidebar');
    var overlay = document.getElementById('sidebarOverlay');
    var closeBtn = document.getElementById('sidebarCloseBtn');
    function openSidebar() {
        if (sidebar) sidebar.classList.add('mobile-active');
        if (overlay) overlay.classList.add('mobile-active');
        document.body.style.overflow = 'hidden';
    }
    function closeSidebar() {
        if (sidebar) sidebar.classList.remove('mobile-active');
        if (overlay) overlay.classList.remove('mobile-active');
        document.body.style.overflow = '';
    }
    if (btn) btn.addEventListener('click', openSidebar);
    if (closeBtn) closeBtn.addEventListener('click', closeSidebar);
    if (overlay) overlay.addEventListener('click', closeSidebar);
}

function setupQAToggles() {
    document.addEventListener('click', function(e) {
        var toggle = e.target.closest('.qa-toggle');
        if (!toggle) return;
        var item = toggle.closest('.qa-item');
        if (!item) return;
        item.classList.toggle('open');
    });
}

function setupCheckoutModal() {
    var openBtn = document.getElementById('dropdownCheckoutBtn');
    var overlay = document.getElementById('checkoutModalOverlay');
    var closeBtn = document.getElementById('checkoutModalClose');
    function closeCheckoutOverlay() {
        if (overlay) {
            overlay.classList.remove('open');
            overlay.classList.remove('active');
            overlay.style.display = 'none';
        }
        document.body.style.overflow = '';
    }
    if (openBtn) openBtn.addEventListener('click', function() { openCheckoutModal(); });
    if (closeBtn) closeBtn.addEventListener('click', closeCheckoutOverlay);
    if (overlay) overlay.addEventListener('click', function(e) {
        if (e.target === overlay) closeCheckoutOverlay();
    });
}

function openCheckoutModal() {
    var overlay = document.getElementById('checkoutModalOverlay');
    var inner = document.getElementById('checkoutModalInner');
    if (!overlay || !inner) return;
    var cartDropdown = document.getElementById('cartDropdown');
    if (cartDropdown) cartDropdown.classList.remove('open');
    var items = cart || [];
    var total = items.reduce(function(sum, item) {
        var p = parseFloat(String(item.price || '0').replace(',', '.')) || 0;
        return sum + p * (item.qty || 1);
    }, 0);
    var payments = [
        { name: 'Bitcoin (BTC)', icon: '₿', available: true },
        { name: 'Solana (SOL)', icon: '◎', available: true },
        { name: 'Amazon Voucher', icon: '📦', available: true },
        { name: 'Paysafecard', icon: '🎮', available: true },
        { name: 'PayPal', icon: '🅿', available: false },
        { name: 'Credit Card', icon: '💳', available: false },
        { name: 'Bank Transfer', icon: '🏦', available: false },
        { name: 'Klarna', icon: '🛍', available: false }
    ];
    var html = '<div class="coin-checkout-modal">';
    html += '<div class="coin-checkout-header"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#c97eff" stroke-width="1.5"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg><h2>Checkout</h2></div>';
    if (items.length === 0) {
        html += '<p style="color:var(--text-tertiary);text-align:center;padding:30px 0;">Your cart is empty.</p>';
    } else {
        html += '<div class="coin-checkout-summary glass-card">';
        items.forEach(function(item) {
            var p = parseFloat(String(item.price || '0').replace(',', '.')) || 0;
            html += '<div class="coin-checkout-row"><span>' + escHtml(item.name) + (item.qty > 1 ? ' ×' + item.qty : '') + '</span><strong>' + (p > 0 ? formatUSD(p * (item.qty || 1)) : 'Free') + '</strong></div>';
        });
        html += '<div class="coin-checkout-divider"></div>';
        html += '<div class="coin-checkout-row coin-price-row"><span>Total</span><strong>' + formatUSD(total) + '</strong></div>';
        html += '</div>';
        html += '<div class="checkout-coupon-row"><input type="text" placeholder="Coupon code (optional)" class="checkout-coupon-input" id="checkoutCoupon"><button class="checkout-coupon-apply" onclick="applyCheckoutCoupon()">Apply</button></div>';
        html += '<div class="coin-checkout-payment">';
        html += '<div class="coin-checkout-payment-label">Select Payment Method</div>';
        html += '<div class="coin-payment-methods">';
        payments.forEach(function(pm) {
            if (pm.available) {
                html += '<button class="coin-payment-btn" onclick="selectCheckoutPayment(this)">' + pm.icon + ' ' + pm.name + '</button>';
            } else {
                html += '<button class="coin-payment-btn" disabled style="opacity:0.4;cursor:not-allowed;">' + pm.icon + ' ' + pm.name + ' <span style="font-size:9px;">Soon</span></button>';
            }
        });
        html += '</div></div>';
        html += '<div class="coin-checkout-note"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="flex-shrink:0;margin-right:6px;vertical-align:middle"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>All purchases are processed manually via Discord. After placing your order, join our Discord and open a support ticket.</div>';
        html += '<button class="coin-checkout-confirm-btn" onclick="confirmCheckout()">Place Order →</button>';
    }
    html += '</div>';
    inner.innerHTML = html;
    overlay.classList.add('open');
    overlay.classList.remove('active');
    overlay.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function applyCheckoutCoupon() {
    var inp = document.getElementById('checkoutCoupon');
    if (inp && inp.value.trim()) {
        inp.style.borderColor = 'rgba(76,175,80,0.6)';
        inp.placeholder = 'Coupon noted - handled by Discord support';
        inp.disabled = true;
    }
}

function selectCheckoutPayment(btn) {
    var grid = btn.closest('.coin-payment-methods');
    if (grid) grid.querySelectorAll('.coin-payment-btn').forEach(function(b) { b.classList.remove('active'); });
    btn.classList.add('active');
}

function confirmCheckout() {
    var overlay = document.getElementById('checkoutModalOverlay');
    var inner = document.getElementById('checkoutModalInner');
    if (inner) inner.innerHTML = '<div style="text-align:center;padding:40px 20px;"><svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#4caf50" stroke-width="2" style="margin-bottom:16px"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg><h2 style="color:#4caf50;margin-bottom:8px;">Order Placed!</h2><p style="color:var(--text-secondary);">Your order has been submitted. Please join Discord and open a ticket to complete your purchase.</p></div>';
    cart = [];
    updateCartBadge();
    setTimeout(function() {
        if (overlay) {
            overlay.classList.remove('open');
            overlay.classList.remove('active');
            overlay.style.display = 'none';
        }
        document.body.style.overflow = '';
    }, 3500);
}

var currentPage = 1;

function setupPerPageSelect() {
    var sel = document.getElementById('perPageSelect');
    if (sel) {
        sel.addEventListener('change', function() {
            currentPage = 1;
            renderProducts(currentCategory);
        });
    }
}

var productsData = null;
var currentCategory = 'all';
var searchActiveQuery = '';

async function loadProducts() {
    var paths = ['./config/products.json', './products.json'];
    for (var i = 0; i < paths.length; i++) {
        try {
            var res = await fetch(paths[i]);
            if (res.ok) { productsData = await res.json(); break; }
        } catch(e) {}
    }
    if (!productsData) return;
    buildCategoryTabs();
    renderProducts('all');
    setupSortSelect();
}

function buildCategoryTabs() {
    var bar = document.getElementById('categoryTabsBar');
    if (!bar || !productsData) return;
    var cats = {};
    if (productsData.categorys && productsData.categorys.length > 0) {
        var c = productsData.categorys[0];
        Object.keys(c).forEach(function(k) { cats[c[k]] = true; });
    }
    delete cats['Coming Soon'];
    bar.innerHTML = '<div class="category-tabs-slider-wrapper"><button class="category-slider-arrow category-slider-arrow-left" id="catSliderLeft" aria-label="Scroll left" style="display:none;"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"></polyline></svg></button><div class="category-tabs-scroll" id="categoryTabsScroll"><button class="category-tab active" data-category="all">All</button></div><button class="category-slider-arrow category-slider-arrow-right" id="catSliderRight" aria-label="Scroll right"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg></button></div>';
    var scroll = document.getElementById('categoryTabsScroll');
    var hasFree = productsData.products && productsData.products.some(function(p) { return isFreeProduct(p); });
    if (hasFree) {
        var freeBtn = document.createElement('button');
        freeBtn.className = 'category-tab category-tab-free';
        freeBtn.setAttribute('data-category', 'free');
        freeBtn.textContent = 'Free';
        freeBtn.addEventListener('click', function() {
            document.querySelectorAll('.category-tab').forEach(function(b) { b.classList.remove('active'); });
            freeBtn.classList.add('active');
            currentCategory = 'free';
            currentPage = 1;
            searchActiveQuery = '';
            var si = document.getElementById('searchInput');
            if (si) si.value = '';
            renderProducts('free');
        });
        var allBtn = scroll.querySelector('[data-category="all"]');
        if (allBtn && allBtn.nextSibling) {
            scroll.insertBefore(freeBtn, allBtn.nextSibling);
        } else {
            scroll.appendChild(freeBtn);
        }
    }
    Object.keys(cats).forEach(function(name) {
        var btn = document.createElement('button');
        btn.className = 'category-tab';
        btn.setAttribute('data-category', name);
        btn.textContent = name;
        btn.addEventListener('click', function() {
            document.querySelectorAll('.category-tab').forEach(function(b) { b.classList.remove('active'); });
            btn.classList.add('active');
            currentCategory = name;
            currentPage = 1;
            searchActiveQuery = '';
            var si = document.getElementById('searchInput');
            if (si) si.value = '';
            renderProducts(name);
        });
        scroll.appendChild(btn);
    });
    var hasSoon = productsData.products && productsData.products.some(function(p) {
        var b = (p.banner || '').toLowerCase().trim();
        return b.indexOf('soon') >= 0 || b.indexOf('coming soon') >= 0;
    });
    if (hasSoon) {
        var soonBtn = document.createElement('button');
        soonBtn.className = 'category-tab category-tab-soon';
        soonBtn.setAttribute('data-category', 'coming-soon');
        soonBtn.textContent = 'Coming Soon';
        soonBtn.addEventListener('click', function() {
            document.querySelectorAll('.category-tab').forEach(function(b) { b.classList.remove('active'); });
            soonBtn.classList.add('active');
            currentCategory = 'coming-soon';
            currentPage = 1;
            searchActiveQuery = '';
            var si = document.getElementById('searchInput');
            if (si) si.value = '';
            renderProducts('coming-soon');
        });
        scroll.appendChild(soonBtn);
    }
    var allBtn2 = scroll.querySelector('[data-category="all"]');
    if (allBtn2) {
        allBtn2.addEventListener('click', function() {
            document.querySelectorAll('.category-tab').forEach(function(b) { b.classList.remove('active'); });
            allBtn2.classList.add('active');
            currentCategory = 'all';
            currentPage = 1;
            searchActiveQuery = '';
            var si = document.getElementById('searchInput');
            if (si) si.value = '';
            renderProducts('all');
        });
    }
    var leftBtn = document.getElementById('catSliderLeft');
    var rightBtn = document.getElementById('catSliderRight');
    function updateArrows() {
        if (!scroll) return;
        var atStart = scroll.scrollLeft <= 2;
        var atEnd = scroll.scrollLeft + scroll.clientWidth >= scroll.scrollWidth - 2;
        if (leftBtn) leftBtn.style.display = atStart ? 'none' : '';
        if (rightBtn) rightBtn.style.display = atEnd ? 'none' : '';
    }
    if (leftBtn) leftBtn.addEventListener('click', function() { scroll.scrollBy({ left: -200, behavior: 'smooth' }); });
    if (rightBtn) rightBtn.addEventListener('click', function() { scroll.scrollBy({ left: 200, behavior: 'smooth' }); });
    if (scroll) scroll.addEventListener('scroll', updateArrows);
    setTimeout(updateArrows, 100);
}

function setupSortSelect() {
    var sel = document.getElementById('sortSelect');
    if (sel) {
        sel.addEventListener('change', function() {
            renderProducts(currentCategory);
        });
    }
}

function getProductPriceInfo(p) {
    if (p.price !== null && p.price !== undefined && p.price !== '') {
        return { type: 'fixed', price: p.price, original: p.original_price || null };
    }
    var cats = p.license_categories && p.license_categories[0] ? p.license_categories[0] : {};
    var keys = Object.keys(cats);
    if (keys.length === 0) return { type: 'free' };
    if (keys.length === 1 && keys[0] === 'free') return { type: 'free' };
    var prices = p.license_categorie_prices && p.license_categorie_prices[0] ? p.license_categorie_prices[0] : {};
    var vals = [];
    keys.forEach(function(k) {
        if (k === 'free') return;
        var v = prices[k];
        if (v !== undefined && v !== null) {
            var num = parseFloat(String(v).replace(',', '.'));
            if (!isNaN(num)) vals.push(num);
        }
    });
    if (vals.length === 0) return { type: 'free' };
    if (vals.length === 1) return { type: 'single', price: vals[0] };
    vals.sort(function(a,b){return a-b;});
    return { type: 'range', min: vals[0], max: vals[vals.length-1] };
}

function formatUSD(val) {
    return '$' + parseFloat(val).toFixed(2).replace('.', ',');
}

function renderPriceArea(p) {
    var info = getProductPriceInfo(p);
    var html = '<div class="product-price-area">';
    if (info.type === 'free') {
        html += '<div class="product-price"><span class="product-price-free">$0.00</span><span class="product-price-free-tag">Free</span></div>';
    } else if (info.type === 'fixed') {
        html += '<div class="product-price">' + formatUSD(info.price) + '</div>';
        if (info.original) html += '<div class="product-price-original">' + formatUSD(info.original) + '</div>';
    } else if (info.type === 'single') {
        html += '<div class="product-price-range">' + formatUSD(info.price) + '</div>';
    } else {
        html += '<div class="product-price-range">' + formatUSD(info.min) + ' – ' + formatUSD(info.max) + '</div>';
    }
    html += '</div>';
    return html;
}

function isFreeProduct(p) {
    var info = getProductPriceInfo(p);
    return info.type === 'free';
}

function isInWishlist(p) {
    return wishlist.some(function(w) { return w._uid === (p.category + '_' + p.id); });
}

function toggleWishlistProduct(p) {
    var uid = p.category + '_' + p.id;
    var idx = wishlist.findIndex(function(w) { return w._uid === uid; });
    if (idx >= 0) {
        wishlist.splice(idx, 1);
    } else {
        wishlist.push(Object.assign({ _uid: uid, name: p.title, price: null }, p));
    }
    var badge = document.getElementById('wishlistBadge');
    if (badge) badge.textContent = wishlist.length;
}

function buildProductCard(p, showCategory) {
    var card = document.createElement('div');
    card.className = 'product-card';

    var imgArea = document.createElement('div');
    imgArea.className = 'product-image-area';

    if (p.preview_image_url && p.preview_image_url.trim()) {
        var img = document.createElement('img');
        img.className = 'product-preview-img';
        img.src = getProductImageUrl(p.preview_image_url);
        img.alt = p.title;
        img.onerror = function() { img.remove(); };
        imgArea.appendChild(img);
    }

    if (p.banner && p.banner.trim()) {
        var bannerEl = document.createElement('div');
        bannerEl.className = 'product-banner-label';
        if (p.banner_color && p.banner_color.trim()) {
            bannerEl.style.backgroundColor = p.banner_color.trim();
        }
        bannerEl.textContent = p.banner;
        imgArea.appendChild(bannerEl);
    }

    if (p.owner_name && p.owner_name.trim()) {
        var ownerEl = document.createElement('div');
        ownerEl.className = 'product-owner-label';
        ownerEl.textContent = 'by ' + p.owner_name;
        imgArea.appendChild(ownerEl);
    }

    if (p.version && p.version.trim()) {
        var verEl = document.createElement('div');
        verEl.className = 'product-version-label';
        verEl.textContent = p.version;
        imgArea.appendChild(verEl);
    }

    if (p.github_url && p.github_url.trim()) {
        var match = p.github_url.match(/github\.com\/([^\/]+\/[^\/\?#]+)/);
        if (match) {
            var repo = match[1].replace(/\.git$/, '');
            var starsEl = document.createElement('div');
            starsEl.className = 'product-github-stars';
            starsEl.innerHTML = '<svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg> ...';
            imgArea.appendChild(starsEl);
            var cacheKey = 'gh_stars_' + repo;
            var cached = sessionStorage.getItem(cacheKey);
            if (cached !== null) {
                var count = parseInt(cached);
                var display = count >= 1000 ? (count / 1000).toFixed(1) + 'k' : count;
                starsEl.innerHTML = '<svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg> ' + display;
            } else {
                fetch('https://api.github.com/repos/' + repo)
                    .then(function(r) { return r.json(); })
                    .then(function(data) {
                        if (data.stargazers_count !== undefined) {
                            sessionStorage.setItem(cacheKey, String(data.stargazers_count));
                            var c = data.stargazers_count >= 1000 ? (data.stargazers_count / 1000).toFixed(1) + 'k' : data.stargazers_count;
                            starsEl.innerHTML = '<svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg> ' + c;
                        }
                    }).catch(function() { starsEl.remove(); });
            }
        }
    }

    card.appendChild(imgArea);

    var body = document.createElement('div');
    body.className = 'product-body';

    var titleEl = document.createElement('div');
    titleEl.className = 'product-title-row';
    var titleText = document.createElement('div');
    titleText.className = 'product-title';
    titleText.innerHTML = '<span class="shiny-text-js" style="background-image:linear-gradient(120deg,#c97eff 35%,#ffffff 50%,#c97eff 65%);">' + escHtml(p.title) + '</span>';
    titleEl.appendChild(titleText);
    if (showCategory && p.category) {
        var catBadge = document.createElement('span');
        catBadge.className = 'product-card-category-badge';
        catBadge.textContent = p.category;
        titleEl.appendChild(catBadge);
    }
    body.appendChild(titleEl);

    if (p.description && p.description.trim()) {
        var desc = document.createElement('div');
        desc.className = 'product-description';
        desc.textContent = p.description;
        body.appendChild(desc);
    }

    if (p.auto_update || p.auto_setup || p.enabled_update !== undefined || p.enabled_setup !== undefined) {
        var togglesDiv = document.createElement('div');
        togglesDiv.className = 'product-auto-toggles';
        if (p.auto_setup) {
            var setupChecked = p.enabled_setup === true;
            var lbl1 = document.createElement('label');
            lbl1.className = 'auto-toggle-label';
            lbl1.innerHTML = '<input type="checkbox"' + (setupChecked ? ' checked' : '') + '> Auto Setup';
            lbl1.querySelector('input').addEventListener('click', function(e) { e.stopPropagation(); });
            togglesDiv.appendChild(lbl1);
        }
        if (p.auto_update) {
            var updateChecked = p.enabled_update === true;
            var lbl2 = document.createElement('label');
            lbl2.className = 'auto-toggle-label';
            lbl2.innerHTML = '<input type="checkbox"' + (updateChecked ? ' checked' : '') + '> Auto Update';
            lbl2.querySelector('input').addEventListener('click', function(e) { e.stopPropagation(); });
            togglesDiv.appendChild(lbl2);
        }
        body.appendChild(togglesDiv);
    }

    card.appendChild(body);

    var footer = document.createElement('div');
    footer.className = 'product-footer';

    var stockEl = document.createElement('div');
    stockEl.className = 'product-stock';
    stockEl.innerHTML = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 7H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg> ' + (p.Stock || '∞');
    footer.appendChild(stockEl);
    footer.innerHTML += renderPriceArea(p);
    card.appendChild(footer);

    var actions = document.createElement('div');
    actions.className = 'product-card-actions';

    var isFree = isFreeProduct(p);

    var wishBtn = document.createElement('button');
    wishBtn.className = 'product-btn product-btn-wishlist' + (isInWishlist(p) ? ' active' : '');
    wishBtn.title = 'Wishlist';
    wishBtn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="' + (isInWishlist(p) ? '#e74c3c' : 'none') + '" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>';
    wishBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        toggleWishlistProduct(p);
        var inWL = isInWishlist(p);
        wishBtn.classList.toggle('active', inWL);
        wishBtn.querySelector('svg').setAttribute('fill', inWL ? '#e74c3c' : 'none');
    });
    actions.appendChild(wishBtn);

    if (isFree) {
        var dlBtn = document.createElement('button');
        if (p.file_product === false) {
            dlBtn.className = 'product-btn product-btn-download shiny-btn';
            var ghUrl = p.github_url && p.github_url.trim() ? p.github_url : '#';
            dlBtn.innerHTML = '<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg> Download via GitHub';
            dlBtn.addEventListener('click', function(e) { e.stopPropagation(); window.open(ghUrl, '_blank', 'noopener,noreferrer'); });
        } else {
            dlBtn.className = 'product-btn product-btn-download shiny-btn';
            dlBtn.innerHTML = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg> Download Free';
            dlBtn.addEventListener('click', function(e) { e.stopPropagation(); });
        }
        actions.appendChild(dlBtn);
    }

    if (!isFree) {
        var hasMultiLicense = false;
        if (p.license_categories && p.license_categories[0]) {
            var lkeys = Object.keys(p.license_categories[0]);
            hasMultiLicense = lkeys.length > 1;
        }
        var cartBtn = document.createElement('button');
        cartBtn.className = 'product-btn product-btn-cart shiny-btn';
        cartBtn.innerHTML = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>' + (hasMultiLicense ? ' Select' : ' Add to Cart');
        if (hasMultiLicense) {
            cartBtn.title = 'Select a license first';
            cartBtn.addEventListener('click', function(e) { e.stopPropagation(); openProductModal(p); });
        } else {
            cartBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                addToCart(p, null);
            });
        }
        actions.appendChild(cartBtn);
    }

    if (p.discord_url && p.discord_url.trim()) {
        var dcBtn = document.createElement('a');
        dcBtn.className = 'product-btn product-btn-discord';
        dcBtn.href = p.discord_url;
        dcBtn.target = '_blank';
        dcBtn.rel = 'noopener noreferrer';
        dcBtn.innerHTML = '<svg width="13" height="13" viewBox="0 0 71 55" fill="currentColor"><path d="M60.1045 4.8978C55.5792 2.8214 50.7265 1.2916 45.6527 0.41542C45.5603 0.39851 45.468 0.440769 45.4204 0.525289C44.7963 1.6353 44.105 3.0834 43.6209 4.2216C38.1637 3.4046 32.7345 3.4046 27.3892 4.2216C26.905 3.0581 26.1886 1.6353 25.5617 0.525289C25.5141 0.443589 25.4218 0.40133 25.3294 0.41542C20.2584 1.2888 15.4057 2.8186 10.8776 4.8978C10.8384 4.9147 10.8048 4.9429 10.7825 4.9795C1.57795 18.7309 -0.943561 32.1443 0.293408 45.3914C0.299005 45.4562 0.335386 45.5182 0.385761 45.5576C6.45866 50.0174 12.3413 52.7249 18.1147 54.5195C18.2071 54.5477 18.305 54.5139 18.3638 54.4378C19.7295 52.5728 20.9469 50.6063 21.9907 48.5383C22.0523 48.4172 21.9935 48.2735 21.8676 48.2256C19.9366 47.4931 18.0979 46.6 16.3292 45.5858C16.1893 45.5041 16.1781 45.304 16.3068 45.2082C16.679 44.9293 17.0513 44.6391 17.4067 44.3461C17.471 44.2926 17.5606 44.2813 17.6362 44.3151C29.2558 49.6202 41.8354 49.6202 53.3179 44.3151C53.3935 44.2785 53.4831 44.2898 53.5502 44.3433C53.9057 44.6363 54.2779 44.9293 54.6529 45.2082C54.7816 45.304 54.7732 45.5041 54.6333 45.5858C52.8646 46.6197 51.0259 47.4931 49.0921 48.2228C48.9662 48.2707 48.9102 48.4172 48.9718 48.5383C50.038 50.6034 51.2554 52.5699 52.5959 54.435C52.6519 54.5139 52.7526 54.5477 52.845 54.5195C58.6464 52.7249 64.529 50.0174 70.6019 45.5576C70.6551 45.5182 70.6887 45.459 70.6943 45.3942C72.1747 30.0791 68.2147 16.7757 60.1968 4.9823C60.1772 4.9429 60.1437 4.9147 60.1045 4.8978ZM23.7259 37.3253C20.2276 37.3253 17.3451 34.1136 17.3451 30.1693C17.3451 26.225 20.1717 23.0133 23.7259 23.0133C27.3087 23.0133 30.1353 26.2532 30.1067 30.1693C30.1067 34.1136 27.2801 37.3253 23.7259 37.3253ZM47.3178 37.3253C43.8196 37.3253 40.9371 34.1136 40.9371 30.1693C40.9371 26.225 43.7636 23.0133 47.3178 23.0133C50.9006 23.0133 53.7272 26.2532 53.6986 30.1693C53.6986 34.1136 50.9006 37.3253 47.3178 37.3253Z"/></svg>';
        dcBtn.addEventListener('click', function(e) { e.stopPropagation(); });
        actions.appendChild(dcBtn);
    }

    card.appendChild(actions);
    card.addEventListener('click', function() { openProductModal(p); });
    return card;
}

function renderProducts(category) {
    var grid = document.getElementById('productsGrid');
    if (!grid || !productsData || !productsData.products) return;

    var isComingSoon = function(p) {
        var b = (p.banner || '').toLowerCase().trim();
        return b.indexOf('soon') >= 0 || b.indexOf('coming soon') >= 0;
    };

    var list = productsData.products.slice();
    if (category === 'coming-soon') {
        list = list.filter(function(p) { return isComingSoon(p); });
    } else {
        list = list.filter(function(p) { return !isComingSoon(p); });
        if (category === 'free' || category === 'Free Tools') {
            list = list.filter(function(p) { return isFreeProduct(p); });
        } else if (category !== 'all') {
            list = list.filter(function(p) { return p.category === category; });
        }
    }

    if (searchActiveQuery && searchActiveQuery.trim()) {
        var q = searchActiveQuery.toLowerCase();
        list = list.filter(function(p) { return p.title && p.title.toLowerCase().indexOf(q) >= 0; });
    }

    var sortVal = document.getElementById('sortSelect') ? document.getElementById('sortSelect').value : 'all';

    if (category !== 'coming-soon' && sortVal !== 'all') {
        list.sort(function(a, b) {
            if (sortVal === 'price-low') {
                var ai = getProductPriceInfo(a), bi = getProductPriceInfo(b);
                var av = ai.type === 'free' ? 0 : (ai.min || ai.price || 0);
                var bv = bi.type === 'free' ? 0 : (bi.min || bi.price || 0);
                return av - bv;
            }
            if (sortVal === 'price-high') {
                var ai2 = getProductPriceInfo(a), bi2 = getProductPriceInfo(b);
                var av2 = ai2.type === 'free' ? 0 : (ai2.max || ai2.price || 0);
                var bv2 = bi2.type === 'free' ? 0 : (bi2.max || bi2.price || 0);
                return bv2 - av2;
            }
            var getBannerRank = function(p) {
                var b = (p.banner || '').toLowerCase();
                if (b.indexOf('most popular') >= 0 || b.indexOf('most-popular') >= 0) return 0;
                if (b.indexOf('popular') >= 0) return 1;
                if (b.indexOf('best seller') >= 0 || b.indexOf('bestseller') >= 0) return 2;
                if (b.indexOf('new release') >= 0 || b.indexOf('new') >= 0) return 3;
                return 4;
            };
            var rA = getBannerRank(a), rB = getBannerRank(b);
            if (rA !== rB) return rA - rB;
            return a.id - b.id;
        });
    }

    var perPageSel = document.getElementById('perPageSelect');
    var perPage = perPageSel ? parseInt(perPageSel.value) || 12 : 12;
    var totalItems = list.length;
    var totalPages = Math.max(1, Math.ceil(totalItems / perPage));
    if (currentPage > totalPages) currentPage = totalPages;
    var start = (currentPage - 1) * perPage;
    var pageList = list.slice(start, start + perPage);

    grid.innerHTML = '';
    if (list.length === 0) {
        grid.innerHTML = '<p style="color:var(--text-tertiary);padding:30px;">No products found.</p>';
        renderPagination(0, 0);
        return;
    }
    var showCategory = (category === 'all' && !searchActiveQuery);
    pageList.forEach(function(p) {
        grid.appendChild(buildProductCard(p, showCategory));
    });
    renderPagination(totalPages, currentPage);
    applyShinyTextToEls();
}

function renderPagination(totalPages, page) {
    var bar = document.getElementById('paginationBar');
    if (!bar) return;
    if (totalPages <= 1) { bar.innerHTML = ''; return; }
    var html = '';
    html += '<button class="pagination-btn"' + (page <= 1 ? ' disabled' : '') + ' onclick="goToPage(' + (page-1) + ')">&#8249;</button>';
    var start = Math.max(1, page - 2);
    var end = Math.min(totalPages, page + 2);
    if (start > 1) { html += '<button class="pagination-btn" onclick="goToPage(1)">1</button>'; if (start > 2) html += '<span style="color:var(--text-tertiary);padding:0 4px">…</span>'; }
    for (var i = start; i <= end; i++) {
        html += '<button class="pagination-btn' + (i === page ? ' active' : '') + '" onclick="goToPage(' + i + ')">' + i + '</button>';
    }
    if (end < totalPages) { if (end < totalPages - 1) html += '<span style="color:var(--text-tertiary);padding:0 4px">…</span>'; html += '<button class="pagination-btn" onclick="goToPage(' + totalPages + ')">' + totalPages + '</button>'; }
    html += '<button class="pagination-btn"' + (page >= totalPages ? ' disabled' : '') + ' onclick="goToPage(' + (page+1) + ')">&#8250;</button>';
    bar.innerHTML = html;
}

function goToPage(n) {
    currentPage = n;
    renderProducts(currentCategory);
    var grid = document.getElementById('productsGrid');
    if (grid) grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function addToCart(p, licenseKey) {
    var uid = p.category + '_' + p.id + (licenseKey ? '_' + licenseKey : '');
    var existing = cart.find(function(c) { return c._uid === uid; });
    if (existing) {
        existing.qty = (existing.qty || 1) + 1;
    } else {
        var prices = p.license_categorie_prices && p.license_categorie_prices[0] ? p.license_categorie_prices[0] : {};
        var priceVal = licenseKey ? prices[licenseKey] : (p.price || null);
        cart.push({
            _uid: uid,
            name: p.title + (licenseKey ? ' — ' + licenseKey.replace(/_/g, ' ') : ''),
            price: priceVal,
            qty: 1,
            product: p,
            licenseKey: licenseKey
        });
    }
    updateCartBadge();
}

var selectedLicenseKey = null;

function openProductModal(p) {
    selectedLicenseKey = null;
    var overlay = document.getElementById('productModalOverlay');
    var inner = document.getElementById('productModalInner');
    if (!overlay || !inner) return;

    var images = [getProductImageUrl(p.preview_image_url)];
    for (var i = 1; i <= 8; i++) {
        var u = p['image_url_' + i];
        if (u && u.trim()) images.push(getProductImageUrl(u));
    }
    images = images.filter(function(x){ return x && x.trim() && !x.trim().endsWith('/'); });

    var currentImg = 0;

    var isFree = isFreeProduct(p);
    var licCats = p.license_categories && p.license_categories[0] ? p.license_categories[0] : {};
    var licKeys = Object.keys(licCats).filter(function(k) { return k !== 'free'; });
    var licPrices = p.license_categorie_prices && p.license_categorie_prices[0] ? p.license_categorie_prices[0] : {};
    var hasMultiLicense = licKeys.length > 1;
    var hasCoupon = p.coupon_codes === true;

    var inWL = isInWishlist(p);

    var html = '';

    if (images.length > 0) {
        html += '<div class="modal-image-gallery" id="modalGallery" style="aspect-ratio:16/7;background:#111;">';
        images.forEach(function(src, idx) {
            html += '<img class="modal-gallery-img' + (idx === 0 ? ' active' : '') + '" src="' + src + '" alt="Image ' + (idx+1) + '" style="object-fit:contain;">';
        });
        if (p.banner && p.banner.trim()) {
            html += '<div class="modal-gallery-banner-label">' + escHtml(p.banner) + '</div>';
        }
        if (images.length > 1) {
            html += '<button class="modal-gallery-nav modal-gallery-prev" id="galleryPrev"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg></button>';
            html += '<button class="modal-gallery-nav modal-gallery-next" id="galleryNext"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg></button>';
            html += '<div class="modal-gallery-counter" id="galleryCounter">1 / ' + images.length + '</div>';
        }
        html += '</div>';
    }

    html += '<div class="modal-header">';
    html += '<div class="modal-title">' + escHtml(p.title) + '</div>';
    html += '<div class="modal-badges">';
    if (p.version) html += '<span class="modal-version-badge">' + escHtml(p.version) + '</span>';
    if (p.category) html += '<span class="modal-category-badge">' + escHtml(p.category) + '</span>';
    html += '</div></div>';

    var descText = (p.full_description && p.full_description.trim()) ? p.full_description : (p.description || '');
    if (descText) {
        html += '<div class="modal-description">' + formatDescription(descText) + '</div>';
    }

    if (p.auto_setup || p.auto_update || p.enabled_setup !== undefined || p.enabled_update !== undefined) {
        html += '<div class="modal-toggles">';
        if (p.auto_setup) {
            var setupChecked = p.enabled_setup === true;
            html += '<label class="modal-toggle-label"><input type="checkbox" id="modalAutoSetup"' + (setupChecked ? ' checked' : '') + '> Auto Setup</label>';
        }
        if (p.auto_update) {
            var updateChecked = p.enabled_update === true;
            html += '<label class="modal-toggle-label"><input type="checkbox" id="modalAutoUpdate"' + (updateChecked ? ' checked' : '') + '> Auto Update</label>';
        }
        html += '</div>';
    }

    if (!isFree && hasMultiLicense) {
        html += '<div class="modal-section-title">Select License</div>';
        html += '<div class="modal-license-grid" id="modalLicenseGrid">';
        licKeys.forEach(function(k) {
            var label = licCats[k] || k;
            var price = licPrices[k];
            var origKey = k + '_original';
            var orig = licPrices[origKey];
            var isTrialKey = k === 'one_time_trial';
            var priceNum = parseFloat(String(price).replace(',','.'));
            html += '<div class="modal-license-option" data-key="' + k + '">';
            if (isTrialKey && (price === undefined || price === null || price === '' || isNaN(priceNum))) {
                html += '<div class="modal-license-trial-note">Limited to 5 Minutes</div>';
                html += '<div class="modal-license-name">' + escHtml(label) + '</div>';
                html += '<div><span class="modal-license-trial-free">(Free)</span></div>';
            } else {
                html += '<div class="modal-license-name">' + escHtml(label) + '</div>';
                html += '<div><span class="modal-license-price">' + formatUSD(priceNum) + '</span>';
                if (orig) html += '<span class="modal-license-original">' + formatUSD(parseFloat(String(orig).replace(',','.'))) + '</span>';
                html += '</div>';
            }
            html += '</div>';
        });
        html += '</div>';
    } else if (!isFree && licKeys.length === 1) {
        selectedLicenseKey = licKeys[0];
    }

    if (hasCoupon && !isFree) {
        html += '<div class="modal-section-title">Coupon Code</div>';
        html += '<div class="modal-coupon-row"><input class="modal-coupon-input" id="modalCouponInput" type="text" placeholder="Enter coupon code..."><button class="modal-coupon-btn" id="modalCouponApply">Apply</button></div>';
    }

    html += '<div class="modal-actions" id="modalActions">';
    if (isFree) {
        if (p.file_product === false) {
            var ghUrl2 = p.github_url && p.github_url.trim() ? p.github_url : '#';
            html += '<a class="modal-btn modal-btn-download shiny-btn" id="modalDlBtn" href="' + escHtml(ghUrl2) + '" target="_blank" rel="noopener noreferrer"><svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg> Download via GitHub</a>';
        } else {
            html += '<button class="modal-btn modal-btn-download shiny-btn" id="modalDlBtn"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg> Download Free</button>';
        }
    } else {
        html += '<button class="modal-btn modal-btn-buy shiny-btn" id="modalBuyBtn">Buy Now</button>';
        html += '<button class="modal-btn modal-btn-cart shiny-btn" id="modalCartBtn"' + (hasMultiLicense ? ' disabled' : '') + '><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg> Add to Cart</button>';
    }
    html += '<button class="modal-btn modal-btn-wishlist' + (inWL ? ' active' : '') + '" id="modalWishBtn" title="Wishlist"><svg width="16" height="16" viewBox="0 0 24 24" fill="' + (inWL ? '#e74c3c' : 'none') + '" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg></button>';
    if (p.discord_url && p.discord_url.trim()) {
        html += '<a class="modal-btn modal-btn-discord" href="' + p.discord_url + '" target="_blank" rel="noopener noreferrer"><svg width="14" height="14" viewBox="0 0 71 55" fill="currentColor"><path d="M60.1045 4.8978C55.5792 2.8214 50.7265 1.2916 45.6527 0.41542C45.5603 0.39851 45.468 0.440769 45.4204 0.525289C44.7963 1.6353 44.105 3.0834 43.6209 4.2216C38.1637 3.4046 32.7345 3.4046 27.3892 4.2216C26.905 3.0581 26.1886 1.6353 25.5617 0.525289C25.5141 0.443589 25.4218 0.40133 25.3294 0.41542C20.2584 1.2888 15.4057 2.8186 10.8776 4.8978C10.8384 4.9147 10.8048 4.9429 10.7825 4.9795C1.57795 18.7309 -0.943561 32.1443 0.293408 45.3914C0.299005 45.4562 0.335386 45.5182 0.385761 45.5576C6.45866 50.0174 12.3413 52.7249 18.1147 54.5195C18.2071 54.5477 18.305 54.5139 18.3638 54.4378C19.7295 52.5728 20.9469 50.6063 21.9907 48.5383C22.0523 48.4172 21.9935 48.2735 21.8676 48.2256C19.9366 47.4931 18.0979 46.6 16.3292 45.5858C16.1893 45.5041 16.1781 45.304 16.3068 45.2082C16.679 44.9293 17.0513 44.6391 17.4067 44.3461C17.471 44.2926 17.5606 44.2813 17.6362 44.3151C29.2558 49.6202 41.8354 49.6202 53.3179 44.3151C53.3935 44.2785 53.4831 44.2898 53.5502 44.3433C53.9057 44.6363 54.2779 44.9293 54.6529 45.2082C54.7816 45.304 54.7732 45.5041 54.6333 45.5858C52.8646 46.6197 51.0259 47.4931 49.0921 48.2228C48.9662 48.2707 48.9102 48.4172 48.9718 48.5383C50.038 50.6034 51.2554 52.5699 52.5959 54.435C52.6519 54.5139 52.7526 54.5477 52.845 54.5195C58.6464 52.7249 64.529 50.0174 70.6019 45.5576C70.6551 45.5182 70.6887 45.459 70.6943 45.3942C72.1747 30.0791 68.2147 16.7757 60.1968 4.9823C60.1772 4.9429 60.1437 4.9147 60.1045 4.8978ZM23.7259 37.3253C20.2276 37.3253 17.3451 34.1136 17.3451 30.1693C17.3451 26.225 20.1717 23.0133 23.7259 23.0133C27.3087 23.0133 30.1353 26.2532 30.1067 30.1693C30.1067 34.1136 27.2801 37.3253 23.7259 37.3253ZM47.3178 37.3253C43.8196 37.3253 40.9371 34.1136 40.9371 30.1693C40.9371 26.225 43.7636 23.0133 47.3178 23.0133C50.9006 23.0133 53.7272 26.2532 53.6986 30.1693C53.6986 34.1136 50.9006 37.3253 47.3178 37.3253Z"/></svg></a>';
    }
    if (p.github_url && p.github_url.trim()) {
        html += '<a class="modal-btn modal-btn-github" href="' + p.github_url + '" target="_blank" rel="noopener noreferrer" style="background:#24292e;color:#fff;flex:0 0 auto;min-width:unset;padding:12px 14px;"><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg></a>';
    }
    if (p.website_url && p.website_url.trim()) {
        html += '<a class="modal-btn modal-btn-website" href="' + p.website_url + '" target="_blank" rel="noopener noreferrer" style="background:rgba(255,255,255,0.08);color:#fff;border:1px solid rgba(255,255,255,0.15);flex:0 0 auto;min-width:unset;padding:12px 14px;"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg></a>';
    }
    html += '</div>';

    if (p.owner_name) {
        html += '<div class="modal-owner-row"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> by ' + escHtml(p.owner_name) + ' &nbsp; Stock: ' + escHtml(p.Stock || '∞') + '</div>';
    }

    var metaItems = [];
    var publishedKey = p['published:'] || p['published'] || '';
    if (publishedKey && String(publishedKey).trim()) metaItems.push('<div class="modal-meta-item">Published: <span>' + escHtml(String(publishedKey).trim()) + '</span></div>');
    if (p.last_update && String(p.last_update).trim()) metaItems.push('<div class="modal-meta-item">Last Update: <span>' + escHtml(String(p.last_update).trim()) + '</span></div>');
    if (metaItems.length > 0) {
        html += '<div class="modal-meta-row">' + metaItems.join('') + '</div>';
    }

    var changeLogText = p.change_log || '';
    if (changeLogText && String(changeLogText).trim()) {
        html += '<div class="modal-changelog-section">';
        html += '<button class="modal-changelog-toggle" id="modalChangelogToggle"><span>Changelog</span><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg></button>';
        html += '<div class="modal-changelog-content" id="modalChangelogContent">' + escHtml(String(changeLogText).replace(/\\n/g, '\n')) + '</div>';
        html += '</div>';
    }

    if (p.github_url && p.github_url.trim()) {
        var ghRepoMatch = p.github_url.match(/github\.com\/([^\/]+\/[^\/\?#]+)/);
        if (ghRepoMatch) {
            var ghRepo = ghRepoMatch[1].replace(/\.git$/, '');
            html += '<div class="modal-github-dropdown" id="modalGithubDropdown">';
            html += '<button class="modal-github-dropdown-toggle" id="modalGithubDropdownToggle">';
            html += '<span style="display:flex;align-items:center;gap:8px;"><svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg> GitHub Repository Info</span>';
            html += '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>';
            html += '</button>';
            html += '<div class="modal-github-dropdown-content" id="modalGithubDropdownContent" data-repo="' + escHtml(ghRepo) + '">';
            html += '<div id="githubReadmeSection"><div class="github-repo-section-title">README</div><div class="github-readme-content" id="githubReadmeContent">Loading...</div></div>';
            html += '<div id="githubContributorsSection"><div class="github-repo-section-title">Contributors</div><div class="github-contributors-list" id="githubContributorsList">Loading...</div></div>';
            html += '<div id="githubLanguagesSection"><div class="github-repo-section-title">Languages</div><div class="github-languages-list" id="githubLanguagesList">Loading...</div></div>';
            html += '</div>';
            html += '</div>';
        }
    }

    inner.innerHTML = html;
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';

    if (p.full_description && p.full_description.trim()) {
        var descContainer = inner.querySelector('.modal-description');
        if (descContainer) {
            var plainText = (p.full_description || '').replace(/<[^>]+>/g, '').trim();
            startTextTypeAnimation(descContainer, plainText);
        }
    }

    applyShinyTextToEls();

    var changelogToggle = inner.querySelector('#modalChangelogToggle');
    var changelogContent = inner.querySelector('#modalChangelogContent');
    if (changelogToggle && changelogContent) {
        changelogToggle.addEventListener('click', function() {
            var isOpen = changelogContent.classList.contains('open');
            changelogContent.classList.toggle('open', !isOpen);
            changelogToggle.classList.toggle('open', !isOpen);
        });
    }

    if (images.length > 1) {
        var prevBtn = document.getElementById('galleryPrev');
        var nextBtn = document.getElementById('galleryNext');
        var counter = document.getElementById('galleryCounter');
        var imgs = inner.querySelectorAll('.modal-gallery-img');

        function showImg(idx) {
            imgs.forEach(function(im) { im.classList.remove('active'); });
            imgs[idx].classList.add('active');
            if (counter) counter.textContent = (idx+1) + ' / ' + images.length;
            currentImg = idx;
        }

        if (prevBtn) prevBtn.addEventListener('click', function() { showImg((currentImg - 1 + images.length) % images.length); });
        if (nextBtn) nextBtn.addEventListener('click', function() { showImg((currentImg + 1) % images.length); });
    }

    if (hasMultiLicense) {
        var licGrid = inner.querySelector('#modalLicenseGrid');
        if (licGrid) {
            licGrid.querySelectorAll('.modal-license-option').forEach(function(opt) {
                opt.addEventListener('click', function() {
                    licGrid.querySelectorAll('.modal-license-option').forEach(function(o) { o.classList.remove('selected'); });
                    opt.classList.add('selected');
                    selectedLicenseKey = opt.getAttribute('data-key');
                    var cartBtn2 = inner.querySelector('#modalCartBtn');
                    if (cartBtn2) {
                        cartBtn2.disabled = false;
                        if (selectedLicenseKey === 'one_time_trial') {
                            cartBtn2.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 3l14 9-14 9V3z"/></svg> Start One Time Trial Now';
                        } else {
                            cartBtn2.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg> Add to Cart';
                        }
                    }
                });
            });
        }
    }

    var modalCartBtn = inner.querySelector('#modalCartBtn');
    if (modalCartBtn) {
        modalCartBtn.addEventListener('click', function() {
            if (!isFree) {
                if (hasMultiLicense && !selectedLicenseKey) { showBanner('Please select a license first.', 'error'); return; }
                addToCart(p, selectedLicenseKey);
                closeProductModal();
            }
        });
    }

    var modalBuyBtn = inner.querySelector('#modalBuyBtn');
    if (modalBuyBtn) {
        modalBuyBtn.addEventListener('click', function() {
            if (hasMultiLicense && !selectedLicenseKey) { showBanner('Please select a license first.', 'error'); return; }
            addToCart(p, selectedLicenseKey);
            showBanner('Redirecting to checkout...', 'info');
        });
    }

    var modalWishBtn = inner.querySelector('#modalWishBtn');
    if (modalWishBtn) {
        modalWishBtn.addEventListener('click', function() {
            toggleWishlistProduct(p);
            var inWL2 = isInWishlist(p);
            modalWishBtn.classList.toggle('active', inWL2);
            modalWishBtn.querySelector('svg').setAttribute('fill', inWL2 ? '#e74c3c' : 'none');
        });
    }

    var couponApply = inner.querySelector('#modalCouponApply');
    if (couponApply) {
        couponApply.addEventListener('click', function() {
            var val = inner.querySelector('#modalCouponInput').value.trim();
            if (val) showBanner('Coupon "' + val + '" applied (demo).', 'success');
        });
    }

    var githubToggle = inner.querySelector('#modalGithubDropdownToggle');
    var githubContent = inner.querySelector('#modalGithubDropdownContent');
    if (githubToggle && githubContent) {
        var githubLoaded = false;
        githubToggle.addEventListener('click', function() {
            var isOpen = githubContent.classList.contains('open');
            githubContent.classList.toggle('open', !isOpen);
            githubToggle.classList.toggle('open', !isOpen);
            if (!isOpen && !githubLoaded) {
                githubLoaded = true;
                var repo = githubContent.getAttribute('data-repo');
                loadGithubRepoInfo(repo, inner);
            }
        });
    }
}

function closeProductModal() {
    var overlay = document.getElementById('productModalOverlay');
    if (overlay) overlay.classList.remove('open');
    document.body.style.overflow = '';
    selectedLicenseKey = null;
}

var githubLangColors = {
    'JavaScript': '#f1e05a', 'Python': '#3572A5', 'TypeScript': '#2b7489',
    'Java': '#b07219', 'C#': '#178600', 'C++': '#f34b7d', 'C': '#555555',
    'PHP': '#4F5D95', 'Ruby': '#701516', 'Go': '#00ADD8', 'Rust': '#dea584',
    'Swift': '#ffac45', 'Kotlin': '#F18E33', 'HTML': '#e34c26', 'CSS': '#563d7c',
    'Shell': '#89e051', 'PowerShell': '#012456', 'Lua': '#000080', 'R': '#198CE7',
    'Scala': '#c22d40', 'Dart': '#00B4AB', 'Vue': '#2c3e50', 'AutoHotkey': '#6594b9'
};

function loadGithubRepoInfo(repo, container) {
    var readmeEl = container.querySelector('#githubReadmeContent');
    var contributorsList = container.querySelector('#githubContributorsList');
    var languagesList = container.querySelector('#githubLanguagesList');

    var cacheReadme = sessionStorage.getItem('gh_readme_' + repo);
    var cacheContributors = sessionStorage.getItem('gh_contributors_' + repo);
    var cacheLanguages = sessionStorage.getItem('gh_languages_' + repo);

    if (cacheReadme !== null) {
        if (readmeEl) readmeEl.textContent = cacheReadme;
    } else {
        fetch('https://api.github.com/repos/' + repo + '/readme', { headers: { Accept: 'application/vnd.github.v3.raw' } })
            .then(function(r) { return r.ok ? r.text() : Promise.reject(); })
            .then(function(text) {
                sessionStorage.setItem('gh_readme_' + repo, text.slice(0, 3000));
                if (readmeEl) readmeEl.textContent = text.slice(0, 3000);
            }).catch(function() { if (readmeEl) readmeEl.textContent = 'No README available.'; });
    }

    if (cacheContributors !== null) {
        renderContributors(JSON.parse(cacheContributors), contributorsList);
    } else {
        fetch('https://api.github.com/repos/' + repo + '/contributors?per_page=10')
            .then(function(r) { return r.ok ? r.json() : Promise.reject(); })
            .then(function(data) {
                sessionStorage.setItem('gh_contributors_' + repo, JSON.stringify(data.slice(0, 10)));
                renderContributors(data.slice(0, 10), contributorsList);
            }).catch(function() { if (contributorsList) contributorsList.textContent = 'No contributor data available.'; });
    }

    if (cacheLanguages !== null) {
        renderLanguages(JSON.parse(cacheLanguages), languagesList);
    } else {
        fetch('https://api.github.com/repos/' + repo + '/languages')
            .then(function(r) { return r.ok ? r.json() : Promise.reject(); })
            .then(function(data) {
                sessionStorage.setItem('gh_languages_' + repo, JSON.stringify(data));
                renderLanguages(data, languagesList);
            }).catch(function() { if (languagesList) languagesList.textContent = 'No language data available.'; });
    }
}

function renderContributors(contributors, container) {
    if (!container) return;
    if (!contributors || contributors.length === 0) { container.textContent = 'No contributors found.'; return; }
    container.innerHTML = '';
    contributors.forEach(function(c) {
        var a = document.createElement('a');
        a.className = 'github-contributor-item';
        a.href = c.html_url || '#';
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
        var img = document.createElement('img');
        img.className = 'github-contributor-avatar';
        img.src = c.avatar_url || '';
        img.alt = c.login || '';
        img.onerror = function() { img.style.display = 'none'; };
        var name = document.createElement('span');
        name.className = 'github-contributor-name';
        name.textContent = c.login || '';
        a.appendChild(img);
        a.appendChild(name);
        container.appendChild(a);
    });
}

function renderLanguages(data, container) {
    if (!container) return;
    var keys = Object.keys(data);
    if (keys.length === 0) { container.textContent = 'No language data available.'; return; }
    var total = keys.reduce(function(s, k) { return s + data[k]; }, 0);
    container.innerHTML = '';
    keys.forEach(function(lang) {
        var pct = ((data[lang] / total) * 100).toFixed(1);
        var color = githubLangColors[lang] || '#8b8b8b';
        var row = document.createElement('div');
        row.className = 'github-language-bar-row';
        row.innerHTML = '<div class="github-language-dot" style="background:' + color + '"></div>' +
            '<span class="github-language-name">' + escHtml(lang) + '</span>' +
            '<div class="github-language-bar-wrap"><div class="github-language-bar" style="width:' + pct + '%;background:' + color + '"></div></div>' +
            '<span class="github-language-pct">' + pct + '%</span>';
        container.appendChild(row);
    });
}

function escHtml(str) {
    if (!str) return '';
    return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

function applyShinyTextToEls() {
    document.querySelectorAll('.shiny-text-js').forEach(function(el) {
        if (el.dataset.shinyDone) return;
        el.dataset.shinyDone = '1';
        el.style.display = 'inline-block';
        el.style.backgroundSize = '200% auto';
        el.style.webkitBackgroundClip = 'text';
        el.style.backgroundClip = 'text';
        el.style.webkitTextFillColor = 'transparent';
        el.style.animation = 'shinyMove 2.5s linear infinite';
    });
    document.querySelectorAll('.shiny-btn').forEach(function(el) {
        if (el.dataset.shinyDone) return;
        el.dataset.shinyDone = '1';
        el.style.position = 'relative';
        el.style.overflow = 'hidden';
        var shine = document.createElement('span');
        shine.style.cssText = 'position:absolute;inset:0;background:linear-gradient(120deg,transparent 35%,rgba(255,255,255,0.3) 50%,transparent 65%);background-size:200% auto;background-position:150% center;animation:shinyMove 2.5s linear infinite;pointer-events:none;border-radius:inherit;';
        el.appendChild(shine);
    });
}

function startTextTypeAnimation(container, text) {
    if (!container || !text) return;
    container.innerHTML = '<span class="text-type-content"></span><span class="text-type__cursor">_</span>';
    var contentEl = container.querySelector('.text-type-content');
    var cursorEl = container.querySelector('.text-type__cursor');
    var chars = text.split('');
    var idx = 0;
    var intervalId = setInterval(function() {
        if (idx < chars.length) {
            contentEl.textContent += chars[idx];
            idx++;
        } else {
            clearInterval(intervalId);
            setTimeout(function() {
                var delIdx = chars.length;
                var delId = setInterval(function() {
                    if (delIdx > 0) {
                        delIdx--;
                        contentEl.textContent = text.substring(0, delIdx);
                    } else {
                        clearInterval(delId);
                        setTimeout(function() { startTextTypeAnimation(container, text); }, 500);
                    }
                }, 30);
            }, 2500);
        }
    }, 50);
    cursorEl.style.animation = 'cursorBlink 1s ease-in-out infinite';
}

function formatDescription(text) {
    if (!text) return '';
    var lines = String(text).split(/\\n|\n/);
    var html = '';
    lines.forEach(function(line) {
        var trimmed = line;
        if (trimmed.match(/^#.*#\s*$/) || trimmed.match(/^#[^#]/)) {
            var inner = trimmed.replace(/^#+\s*/, '').replace(/\s*#+$/, '');
            inner = applyInlineFormats(inner);
            html += '<div class="fd-highlight">' + inner + '</div>';
        } else if (trimmed.match(/^\*\*/) && !trimmed.match(/^\*\*.*\*\*$/)) {
            var inner2 = trimmed.replace(/^\*\*\s*/, '');
            inner2 = applyInlineFormats(inner2);
            html += '<div class="fd-bold">' + inner2 + '</div>';
        } else if (trimmed.match(/^-\s/)) {
            var inner3 = trimmed.replace(/^-\s+/, '');
            inner3 = applyInlineFormats(inner3);
            html += '<div class="fd-bullet">\u2022 ' + inner3 + '</div>';
        } else if (trimmed.trim() === '') {
            html += '<div class="fd-spacer"></div>';
        } else {
            html += '<div>' + applyInlineFormats(trimmed) + '</div>';
        }
    });
    return html;
}

function applyInlineFormats(text) {
    var t = escHtml(text);
    t = t.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    t = t.replace(/(https?:\/\/[^\s<>"]+)/g, '<a href="$1" target="_blank" rel="noopener noreferrer" class="fd-link">$1</a>');
    return t;
}

function setupDropdowns() {
    var closeBtn = document.getElementById('productModalClose');
    if (closeBtn) closeBtn.addEventListener('click', closeProductModal);
    var modalOverlay = document.getElementById('productModalOverlay');
    if (modalOverlay) {
        modalOverlay.addEventListener('click', function(e) {
            if (e.target === modalOverlay) closeProductModal();
        });
    }

    var wishlistLicOverlay = document.getElementById('wishlistLicenseModalOverlay');
    var wishlistLicCloseBtn = document.getElementById('wishlistLicenseModalClose');
    if (wishlistLicCloseBtn) {
        wishlistLicCloseBtn.addEventListener('click', function() {
            if (wishlistLicOverlay) {
                wishlistLicOverlay.classList.remove('open');
                wishlistLicOverlay.classList.remove('active');
                wishlistLicOverlay.style.display = 'none';
            }
            document.body.style.overflow = '';
        });
    }
    if (wishlistLicOverlay) {
        wishlistLicOverlay.addEventListener('click', function(e) {
            if (e.target === wishlistLicOverlay) {
                wishlistLicOverlay.classList.remove('open');
                wishlistLicOverlay.classList.remove('active');
                wishlistLicOverlay.style.display = 'none';
                document.body.style.overflow = '';
            }
        });
    }

    var wishlistWrapper = document.getElementById('wishlistWrapper');
    var cartWrapper = document.getElementById('cartWrapper');
    var wishlistDropdown = document.getElementById('wishlistDropdown');
    var cartDropdown = document.getElementById('cartDropdown');
    var wishlistBtn = document.getElementById('wishlistBtn');
    var cartBtn = document.getElementById('cartBtn');

    function closeAll() {
        if (wishlistDropdown) wishlistDropdown.classList.remove('open');
        if (cartDropdown) cartDropdown.classList.remove('open');
    }

    if (wishlistBtn && wishlistDropdown) {
        wishlistBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            var isOpen = wishlistDropdown.classList.contains('open');
            closeAll();
            if (!isOpen) {
                renderWishlistDropdown();
                wishlistDropdown.classList.add('open');
            }
        });
    }

    if (cartBtn && cartDropdown) {
        cartBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            var isOpen = cartDropdown.classList.contains('open');
            closeAll();
            if (!isOpen) {
                renderCartDropdown();
                cartDropdown.classList.add('open');
            }
        });
    }

    document.addEventListener('click', function(e) {
        if (wishlistWrapper && !wishlistWrapper.contains(e.target)) {
            if (wishlistDropdown) wishlistDropdown.classList.remove('open');
        }
        if (cartWrapper && !cartWrapper.contains(e.target)) {
            if (cartDropdown) cartDropdown.classList.remove('open');
        }
    });
}

function renderWishlistDropdown() {
    var container = document.getElementById('wishlistItems');
    if (!container) return;
    if (!wishlist || wishlist.length === 0) {
        container.innerHTML = '<div class="dropdown-empty">Your wishlist is empty.</div>';
        return;
    }
    container.innerHTML = '';
    wishlist.forEach(function(item, idx) {
        var info = getProductPriceInfo(item);
        var priceStr = '';
        if (info.type === 'fixed') priceStr = formatUSD(item.price);
        else if (info.type === 'range') priceStr = formatUSD(info.min) + '+';
        else if (info.type === 'single') priceStr = formatUSD(info.price);
        var row = document.createElement('div');
        row.className = 'dropdown-item';
        row.innerHTML = '<span class="dropdown-item-name">' + escHtml(item.name || item.title || 'Item') + '</span>' +
            (priceStr ? '<span class="dropdown-item-price">' + priceStr + '</span>' : '') +
            '<button onclick="wishlistMoveToCart(' + idx + ')" class="dropdown-action-btn" title="Move to Cart"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg></button>' +
            '<button onclick="wishlistOrder(' + idx + ')" class="dropdown-action-btn dropdown-order-btn" title="Order Now"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg></button>' +
            '<button onclick="wishlistRemove(' + idx + ')" class="dropdown-trash-btn" title="Remove"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg></button>';
        container.appendChild(row);
    });
}

function renderCartDropdown() {
    var container = document.getElementById('cartItems');
    var footer = document.getElementById('cartFooter');
    if (!container) return;
    if (!cart || cart.length === 0) {
        container.innerHTML = '<div class="dropdown-empty">Your cart is empty.</div>';
        if (footer) footer.style.display = 'none';
        return;
    }
    if (footer) footer.style.display = '';
    container.innerHTML = '';
    cart.forEach(function(item, idx) {
        var row = document.createElement('div');
        row.className = 'dropdown-item';
        row.style.flexDirection = 'column';
        row.style.alignItems = 'stretch';
        row.style.gap = '4px';
        row.innerHTML = '<div style="display:flex;justify-content:space-between;align-items:center;gap:8px">' +
            '<span class="dropdown-item-name">' + escHtml(item.name) + '</span>' +
            '<span class="dropdown-item-price">' + (item.price ? formatUSD(parseFloat(String(item.price).replace(',','.'))) : 'Free') + '</span>' +
            '</div>' +
            '<div style="display:flex;align-items:center;gap:6px;margin-top:2px">' +
            '<button onclick="cartQty(' + idx + ',-1);event.stopPropagation();" style="background:var(--bg-hover);border:1px solid var(--border-color);color:#fff;width:22px;height:22px;border-radius:4px;cursor:pointer;font-size:14px;display:flex;align-items:center;justify-content:center;">−</button>' +
            '<span style="font-size:12px;color:var(--text-secondary);min-width:20px;text-align:center">' + (item.qty||1) + '</span>' +
            '<button onclick="cartQty(' + idx + ',1);event.stopPropagation();" style="background:var(--bg-hover);border:1px solid var(--border-color);color:#fff;width:22px;height:22px;border-radius:4px;cursor:pointer;font-size:14px;display:flex;align-items:center;justify-content:center;">+</button>' +
            '<button onclick="cartRemove(' + idx + ');event.stopPropagation();" class="dropdown-trash-btn" title="Remove"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg></button>' +
            '</div>';
        container.appendChild(row);
    });
}

function cartQty(idx, delta) {
    if (!cart[idx]) return;
    var newQty = (cart[idx].qty || 1) + delta;
    if (newQty <= 0) {
        cart.splice(idx, 1);
    } else {
        cart[idx].qty = newQty;
    }
    updateCartBadge();
    var cartDropdown = document.getElementById('cartDropdown');
    var wasOpen = cartDropdown && cartDropdown.classList.contains('open');
    renderCartDropdown();
    if (wasOpen && cartDropdown) cartDropdown.classList.add('open');
}

function cartRemove(idx) {
    cart.splice(idx, 1);
    updateCartBadge();
    var cartDropdown = document.getElementById('cartDropdown');
    var wasOpen = cartDropdown && cartDropdown.classList.contains('open');
    renderCartDropdown();
    if (wasOpen && cartDropdown) cartDropdown.classList.add('open');
}

function wishlistRemove(idx) {
    wishlist.splice(idx, 1);
    var badge = document.getElementById('wishlistBadge');
    if (badge) badge.textContent = wishlist.length;
    renderWishlistDropdown();
}

function wishlistMoveToCart(idx) {
    var item = wishlist[idx];
    if (!item) return;
    var uid = item._uid;
    var existing = cart.find(function(c) { return c._uid === uid; });
    if (existing) {
        existing.qty = (existing.qty || 1) + 1;
    } else {
        cart.push(Object.assign({ qty: 1 }, item));
    }
    wishlist.splice(idx, 1);
    var wb = document.getElementById('wishlistBadge');
    if (wb) wb.textContent = wishlist.length;
    updateCartBadge();
    renderWishlistDropdown();
    renderCartDropdown();
}

function wishlistOrder(idx) {
    var item = wishlist[idx];
    if (!item) return;
    openWishlistLicensePicker(item, idx);
}

function openWishlistLicensePicker(item, wishlistIdx) {
    var overlay = document.getElementById('wishlistLicenseModalOverlay');
    var inner = document.getElementById('wishlistLicenseModalInner');
    if (!overlay || !inner) {
        wishlistMoveToCart(wishlistIdx);
        openCheckoutModal();
        return;
    }
    var licCats = item.license_categories && item.license_categories[0] ? item.license_categories[0] : {};
    var licKeys = Object.keys(licCats).filter(function(k) { return k !== 'free'; });
    var licPrices = item.license_categorie_prices && item.license_categorie_prices[0] ? item.license_categorie_prices[0] : {};
    var html = '<div class="coin-checkout-modal">';
    html += '<div class="coin-checkout-header"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#c97eff" stroke-width="1.5"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg><h2>' + escHtml(item.name || item.title || 'Quick Order') + '</h2></div>';
    if (licKeys.length > 0) {
        html += '<div class="modal-section-title" style="margin-top:0;margin-bottom:10px;">Select License</div>';
        html += '<div class="modal-license-grid" id="wishlistLicPickerGrid">';
        licKeys.forEach(function(k) {
            var label = licCats[k] || k;
            var price = licPrices[k];
            var priceNum = parseFloat(String(price).replace(',','.'));
            var isTrialKey = k === 'one_time_trial';
            html += '<div class="modal-license-option" data-key="' + k + '">';
            if (isTrialKey && (price === undefined || price === null || price === '' || isNaN(priceNum))) {
                html += '<div class="modal-license-trial-note">Limited to 5 Minutes</div>';
                html += '<div class="modal-license-name">' + escHtml(label) + '</div>';
                html += '<div><span class="modal-license-trial-free">(Free)</span></div>';
            } else {
                html += '<div class="modal-license-name">' + escHtml(label) + '</div>';
                html += '<div><span class="modal-license-price">' + (isNaN(priceNum) ? '' : formatUSD(priceNum)) + '</span></div>';
            }
            html += '</div>';
        });
        html += '</div>';
    }
    html += '<div class="coin-checkout-summary glass-card" style="flex-direction:row;align-items:center;gap:14px;padding:14px 18px;">';
    html += '<label style="font-size:13px;color:var(--text-secondary);white-space:nowrap;">Quantity:</label>';
    html += '<input type="number" id="wishlistLicPickerQty" min="1" value="1" style="width:70px;background:rgba(20,5,35,0.8);border:1px solid rgba(139,0,160,0.4);border-radius:8px;color:#fff;padding:7px 10px;font-size:14px;outline:none;">';
    html += '</div>';
    html += '<button id="wishlistLicPickerContinue" class="coin-checkout-confirm-btn">Continue to Checkout →</button>';
    html += '</div>';
    inner.innerHTML = html;
    overlay.classList.add('open');
    overlay.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    var selectedPicker = null;
    var pickerGrid = inner.querySelector('#wishlistLicPickerGrid');
    if (pickerGrid) {
        pickerGrid.querySelectorAll('.modal-license-option').forEach(function(opt) {
            opt.addEventListener('click', function() {
                pickerGrid.querySelectorAll('.modal-license-option').forEach(function(o) { o.classList.remove('selected'); });
                opt.classList.add('selected');
                selectedPicker = opt.getAttribute('data-key');
            });
        });
    }
    var continueBtn = inner.querySelector('#wishlistLicPickerContinue');
    if (continueBtn) {
        continueBtn.addEventListener('click', function() {
            if (licKeys.length > 0 && !selectedPicker) { showBanner('Please select a license.', 'error'); return; }
            var qty = parseInt(inner.querySelector('#wishlistLicPickerQty').value) || 1;
            overlay.classList.remove('open');
            overlay.style.display = 'none';
            document.body.style.overflow = '';
            var uid = (item.category || '') + '_' + (item.id || '') + (selectedPicker ? '_' + selectedPicker : '');
            var prices = item.license_categorie_prices && item.license_categorie_prices[0] ? item.license_categorie_prices[0] : {};
            var priceVal = selectedPicker ? prices[selectedPicker] : (item.price || null);
            var existing = cart.find(function(c) { return c._uid === uid; });
            if (existing) {
                existing.qty = (existing.qty || 1) + qty;
            } else {
                cart.push({
                    _uid: uid,
                    name: (item.name || item.title || 'Item') + (selectedPicker ? ' — ' + selectedPicker.replace(/_/g, ' ') : ''),
                    price: priceVal,
                    qty: qty,
                    product: item,
                    licenseKey: selectedPicker
                });
            }
            wishlist.splice(wishlistIdx, 1);
            var wb = document.getElementById('wishlistBadge');
            if (wb) wb.textContent = wishlist.length;
            updateCartBadge();
            renderWishlistDropdown();
            openCheckoutModal();
        });
    }
}
function toggleStatusChangelog(btn) {
    var body = btn.nextElementSibling;
    if (!body) return;
    var isOpen = body.style.display !== 'none';
    body.style.display = isOpen ? 'none' : 'block';
    btn.setAttribute('aria-expanded', String(!isOpen));
    btn.classList.toggle('open', !isOpen);
}