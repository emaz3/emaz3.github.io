window.addEventListener('DOMContentLoaded', (event) => {
    const tabTitle = document.title;
    const text = " [ e m a z 3 ] ";
    const typingSpeed = 150;
    const pauseDuration = 50;

    function typeEffect() {
        document.title = "";

        let i = 0;
        let isDeleting = false;

        function typeLoop() {
            setTimeout(() => {
                if (isDeleting) {
                    document.title = tabTitle.substring(0, i - 1);
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
