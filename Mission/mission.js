const themeSelector = document.querySelector('#theme-select');

function changeTheme() {
    const body = document.body;
    const logo = document.querySelector('#logo');
    if (themeSelector.value === 'dark') {
        body.classList.add('dark');
        logo.src = 'images/byui_logo_white.png';
    } else {
        body.classList.remove('dark');
        logo.src = 'images/byui_logo_blue.webp';
    }
}

themeSelector.addEventListener('change', changeTheme);