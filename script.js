window.addEventListener('DOMContentLoaded', (event) => {
    const logo = document.getElementById('logo');
    const logoUrls = [
        'logo1.png'
    ];

    const randomIndex = Math.floor(Math.random() * logoUrls.length);

    logo.src = logoUrls[randomIndex];
});
