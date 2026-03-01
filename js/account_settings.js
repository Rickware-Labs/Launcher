document.addEventListener('DOMContentLoaded', async () => {
    const user = await getCurrentUser();
    if (!user) {
        window.location.href = './login_register.html';
        return;
    }

    await loadAccountSettings(user);
    setupProfileUpload();
    setupSaveCancel();
});

async function loadAccountSettings(user) {
    document.getElementById('username').value = user.username || '';
    document.getElementById('emailAddress').value = user.email_adress || '';
    document.getElementById('phoneNumber').value = user.phone_number || '';
    document.getElementById('emailNewsletter').checked = user.email_newsletter || false;
    document.getElementById('accountType').textContent = user.account_type || 'User';
    document.getElementById('memberSince').textContent = user.user_created_at ? new Date(user.user_created_at).toLocaleDateString() : 'Unknown';
    document.getElementById('lastLogin').textContent = user.user_last_login ? new Date(user.user_last_login).toLocaleString() : 'Unknown';
    document.getElementById('devicesConnected').textContent = user.devices_connected || 1;

    const profileImg = document.getElementById('settingsProfileImage');
    profileImg.src = user.profile_picture || '';
}

function setupProfileUpload() {
    const uploadBtn = document.getElementById('uploadImageBtn');
    const imageInput = document.getElementById('profileImageInput');

    uploadBtn.addEventListener('click', () => {
        imageInput.click();
    });

    imageInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                document.getElementById('settingsProfileImage').src = event.target.result;
            };
            reader.readAsDataURL(file);
        }
    });
}

async function setupSaveCancel() {
    document.getElementById('saveSettingsBtn').addEventListener('click', async () => {
        const user = await getCurrentUser();
        if (!user) return;

        const newUsername = document.getElementById('username').value;
        const newEmail = document.getElementById('emailAddress').value;
        const newPhone = document.getElementById('phoneNumber').value;
        const newsletter = document.getElementById('emailNewsletter').checked;

        if (!validateUsername(newUsername)) {
            alert('Invalid username format!');
            return;
        }

        if (!newEmail || !newEmail.includes('@')) {
            alert('Invalid email address!');
            return;
        }

        const response = await fetch(apiUrl('/api/update_account'), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem('rickware_token')}`
            },
            body: JSON.stringify({
                username: newUsername,
                email: newEmail,
                phone: newPhone,
                email_newsletter: newsletter
            })
        });

        if (response.ok) {
            alert('Settings saved successfully!');
            sessionStorage.setItem('rickware_user', JSON.stringify({...user, username: newUsername, email_adress: newEmail, phone_number: newPhone, email_newsletter: newsletter}));
            window.location.reload();
        } else {
            alert('Failed to save settings');
        }
    });

    document.getElementById('cancelSettingsBtn').addEventListener('click', () => {
        window.location.href = '../index.html';
    });
}

function validateUsername(username) {
    if (username.length < 7 || username.length > 20) return false;
    if (!/^[A-Za-z]/.test(username)) return false;
    if (!/[A-Z]/.test(username)) return false;
    if (!/[0-9]/.test(username)) return false;
    if (/^[._-]/.test(username) || /[._-]$/.test(username)) return false;
    if (!/^[A-Za-z0-9._-]+$/.test(username)) return false;
    return true;
}