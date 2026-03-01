let userPreferences = {};

document.addEventListener('DOMContentLoaded', async () => {
    const user = await getCurrentUser();
    if (!user) {
        window.location.href = './login_register.html';
        return;
    }

    loadPreferences(user);
    setupSaveCancel();
});

async function getCurrentUser() {
    const cookie = document.cookie.split('; ').find(row => row.startsWith('rickware_session='));
    if (cookie) {
        try {
            const data = JSON.parse(atob(cookie.split('=')[1]));
            const fileData = await getGitHubFileContent();
            if (fileData) {
                return fileData.content.accounts.find(acc => acc.account_id === data.account_id);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const sessionData = sessionStorage.getItem('rickware_user');
    if (sessionData) {
        return JSON.parse(sessionData);
    }

    return null;
}

function loadPreferences(user) {
    userPreferences = JSON.parse(localStorage.getItem('user_preferences') || '{}');

    document.getElementById('preferredLanguage').value = userPreferences.language || 'en';
    document.getElementById('timeZone').value = user.user_time_zone || Intl.DateTimeFormat().resolvedOptions().timeZone;

    document.getElementById('emailNotifications').checked = userPreferences.emailNotifications !== false;
    document.getElementById('productUpdates').checked = userPreferences.productUpdates !== false;
    document.getElementById('promotionalEmails').checked = user.email_newsletter || false;
    document.getElementById('discordNotifications').checked = userPreferences.discordNotifications || false;

    document.getElementById('showOnlineStatus').checked = userPreferences.showOnlineStatus !== false;
    document.getElementById('allowDataCollection').checked = userPreferences.allowDataCollection !== false;

    document.getElementById('themeSelect').value = userPreferences.theme || 'dark';
    document.getElementById('compactMode').checked = userPreferences.compactMode || false;
    document.getElementById('animationsEnabled').checked = userPreferences.animationsEnabled !== false;

    document.getElementById('autoInstall').checked = userPreferences.autoInstall || false;
    document.getElementById('pauseDownloads').checked = userPreferences.pauseDownloads || false;

    document.getElementById('currentAccountType').textContent = user.account_type || 'User';
    document.getElementById('memberSince').textContent = user.user_last_login ? new Date(user.user_last_login).toLocaleDateString() : 'Unknown';

    let totalPurchases = 0;
    if (user.purchased_products) totalPurchases = user.purchased_products.length;
    document.getElementById('totalPurchases').textContent = totalPurchases;
}

async function setupSaveCancel() {
    document.getElementById('savePreferencesBtn').addEventListener('click', async () => {
        const user = await getCurrentUser();
        if (!user) return;

        const preferences = {
            language: document.getElementById('preferredLanguage').value,
            emailNotifications: document.getElementById('emailNotifications').checked,
            productUpdates: document.getElementById('productUpdates').checked,
            promotionalEmails: document.getElementById('promotionalEmails').checked,
            discordNotifications: document.getElementById('discordNotifications').checked,
            showOnlineStatus: document.getElementById('showOnlineStatus').checked,
            allowDataCollection: document.getElementById('allowDataCollection').checked,
            theme: document.getElementById('themeSelect').value,
            compactMode: document.getElementById('compactMode').checked,
            animationsEnabled: document.getElementById('animationsEnabled').checked,
            autoInstall: document.getElementById('autoInstall').checked,
            pauseDownloads: document.getElementById('pauseDownloads').checked
        };

        localStorage.setItem('user_preferences', JSON.stringify(preferences));

        if (preferences.promotionalEmails !== user.email_newsletter) {
            const fileData = await getGitHubFileContent();
            if (fileData) {
                const accounts = fileData.content.accounts;
                const accountIndex = accounts.findIndex(acc => acc.account_id === user.account_id);

                if (accountIndex !== -1) {
                    accounts[accountIndex].email_newsletter = preferences.promotionalEmails;
                    fileData.content.accounts = accounts;
                    await updateGitHubFile(fileData.content, fileData.sha, `Preferences updated: ${user.username}`);
                }
            }
        }

        alert('Preferences saved successfully!');

        if (preferences.language !== userPreferences.language) {
            window.location.reload();
        }
    });

    document.getElementById('cancelPreferencesBtn').addEventListener('click', () => {
        window.location.href = '../index.html';
    });
}