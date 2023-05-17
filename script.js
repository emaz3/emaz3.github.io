window.addEventListener('DOMContentLoaded', (event) => {
    const rainContainer = document.getElementById('rain-container');
    const numDroplets = 100;

    function createRaindrop() {
        const raindrop = document.createElement('div');
        raindrop.classList.add('raindrop');
        raindrop.style.left = `${Math.random() * 100}%`;
        raindrop.style.animationDuration = `${Math.random() * 2 + 1}s`;
        return raindrop;
    }

    function startRain() {
        for (let i = 0; i < numDroplets; i++) {
            const raindrop = createRaindrop();
            rainContainer.appendChild(raindrop);
        }
    }

    startRain();
});

window.addEventListener('DOMContentLoaded', (event) => {
    const tabTitle = document.title;
    const text = " [ e m a z 3 ] ";
    const typingSpeed = 150;
    const pauseDuration = 0;

    function typeEffect() {
        let i = 0;
        let isDeleting = false;

        function typeLoop() {
            setTimeout(() => {
                if (isDeleting) {
                    document.title = tabTitle.substring(0, i - 1) + text;
                    i--;
                } else {
                    document.title = tabTitle + text.substring(0, i + 1);
                    i++;
                }

                if (isDeleting && i === 0) {
                    isDeleting = false;
                }

                if (!isDeleting && i === text.length) {
                    isDeleting = true;
                }

                if (isDeleting) {
                    typeLoop();
                } else {
                    setTimeout(typeLoop, typingSpeed);
                }
            }, typingSpeed);
        }

        setTimeout(() => {
            typeLoop();
        }, pauseDuration);
    }

    typeEffect();
});
