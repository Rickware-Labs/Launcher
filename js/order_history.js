document.addEventListener('DOMContentLoaded', async () => {
    const user = await getCurrentUser();
    if (!user) {
        window.location.href = './login_register.html';
        return;
    }

    await loadOrderHistory(user);
});

async function loadOrderHistory(user) {
    const totalPurchasesElem = document.getElementById('totalPurchases');
    const activeSubscriptionsElem = document.getElementById('activeSubscriptions');
    const totalSpentElem = document.getElementById('totalSpent');
    const ordersList = document.getElementById('ordersList');
    const licenseKeysContainer = document.getElementById('licenseKeysContainer');
    const productTypesContainer = document.getElementById('productTypesContainer');
    const pausedLicensesContainer = document.getElementById('pausedLicensesContainer');
    const bannedProductsContainer = document.getElementById('bannedProductsContainer');

    const purchasedProducts = user.purchased_products || [];
    const licenseKeys = user.license_keys || [];
    const productTypes = user.product_types || [];
    const pausedLicenses = user.paused_licenses || [];
    const bannedProducts = user.banned_products || [];

    totalPurchasesElem.textContent = purchasedProducts.length;
    activeSubscriptionsElem.textContent = purchasedProducts.filter(p => p.status === 'active').length;
    totalSpentElem.textContent = `$${purchasedProducts.reduce((sum, p) => sum + p.amount, 0).toFixed(2)}`;

    if (purchasedProducts.length === 0) {
        ordersList.innerHTML = '<div class="empty-state"><p>No orders yet</p></div>';
    } else {
        ordersList.innerHTML = purchasedProducts.map(p => `
            <div class="table-row">
                <span>${p.date}</span>
                <span>${p.product}</span>
                <span>$${p.amount.toFixed(2)}</span>
                <span class="status-badge ${p.status}">${p.status}</span>
            </div>
        `).join('');
    }

    if (licenseKeys.length === 0) {
        licenseKeysContainer.innerHTML = '<div class="empty-state-small"><p>No active license keys</p></div>';
    } else {
        licenseKeysContainer.innerHTML = licenseKeys.map(key => {
            const keyDisplay = key === 'UNLOCK-ALL-KEY' ? key : `${key.substring(0, 20)}...`;
            return `
                <div class="license-key-item">
                    <div class="license-key-icon">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 11-7.778 7.778 5.5 5.5 0 017.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"></path>
                        </svg>
                    </div>
                    <div class="license-key-info">
                        <span class="license-key-text">${keyDisplay}</span>
                        <button class="btn-copy-key" onclick="copyToClipboard('${key}')">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                                <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"></path>
                            </svg>
                            Copy
                        </button>
                    </div>
                </div>
            `;
        }).join('');
    }

    if (productTypes.length === 0) {
        productTypesContainer.innerHTML = '<div class="empty-state-small"><p>No product types recorded</p></div>';
    } else {
        productTypesContainer.innerHTML = `<div class="tags-container">${productTypes.map(type => `<span class="tag">${type === 'ALL' ? 'All Types' : type}</span>`).join('')}</div>`;
    }

    if (pausedLicenses.length === 0) {
        pausedLicensesContainer.innerHTML = '<div class="empty-state-small"><p>No paused licenses</p></div>';
    } else {
        pausedLicensesContainer.innerHTML = `<div class="list-items">${pausedLicenses.map(lic => `<div class="list-item paused">${lic}</div>`).join('')}</div>`;
    }

    if (bannedProducts.length === 0) {
        bannedProductsContainer.innerHTML = '<div class="empty-state-small success"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg><p>No banned products</p></div>';
    } else {
        bannedProductsContainer.innerHTML = `<div class="list-items">${bannedProducts.map(prod => `<div class="list-item banned">${prod}</div>`).join('')}</div>`;
    }
}

function copyToClipboard(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    document.body.appendChild(textArea);
    textArea.select();
    try {
        document.execCommand('copy');
        alert('License key copied to clipboard!');
    } catch (err) {
        console.error('Failed to copy:', err);
    }
    document.body.removeChild(textArea);
}