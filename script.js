window.addEventListener('DOMContentLoaded', (event) => {
    const logo = document.getElementById('logo');
    const logoUrls = [
        'logo1.png'
    ];

    const randomIndex = Math.floor(Math.random() * logoUrls.length);

    logo.src = logoUrls[randomIndex];

    // Redirect button click event
    const redirectButton = document.getElementById('redirect-button');
    redirectButton.addEventListener('click', () => {
        window.location.href = 'https://workupload.com/file/YknTkCR2nQA';
    });
});
