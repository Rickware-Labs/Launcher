document.addEventListener('DOMContentLoaded', () => {
    initAuthPage();
    initAuthClock();
    initAuthTabsSlider();
});

function initAuthClock() {
    var el = document.getElementById('authClock');
    if (!el) return;
    function update() {
        var now = new Date();
        var h = String(now.getHours()).padStart(2, '0');
        var m = String(now.getMinutes()).padStart(2, '0');
        var s = String(now.getSeconds()).padStart(2, '0');
        var tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
        el.textContent = h + ':' + m + ':' + s + (tz ? '  ' + tz : '');
    }
    update();
    setInterval(update, 1000);
}

function initAuthTabsSlider() {
    var tabs = document.querySelectorAll('.auth-tab');
    var thumb = document.getElementById('authTabsThumb');
    tabs.forEach(function(tab, i) {
        tab.addEventListener('click', function() {
            tabs.forEach(function(t) { t.classList.remove('active'); });
            tab.classList.add('active');
            if (thumb) {
                if (i === 0) {
                    thumb.classList.remove('right');
                } else {
                    thumb.classList.add('right');
                }
            }
        });
    });
}