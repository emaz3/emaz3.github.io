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

    const canvas = document.createElement('canvas');
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    const particles = [];
    const particleCount = 50;
    const maxDistance = 100;
    const fenceSize = 200;
    let mouseX = 0;
    let mouseY = 0;

    function Particle(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;

        this.update = () => {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x < -fenceSize || this.x > canvas.width + fenceSize || this.y < -fenceSize || this.y > canvas.height + fenceSize) {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
            }

            this.draw();
        };

        this.draw = () => {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = '#ffffff';
            ctx.fill();
        };
    }

    function connectDots() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < maxDistance) {
                    ctx.beginPath();
                    ctx.strokeStyle = '#ffffff';
                    ctx.lineWidth = (1 - distance / maxDistance) * 2;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                    ctx.closePath();
                }
            }
        }
    }

    function createParticles() {
        for (let i = 0; i < particleCount; i++) {
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;
            particles.push(new Particle(x, y));
        }
    }

    function updateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < particles.length; i++) {
            const particle = particles[i];

            const dx = mouseX - particle.x;
            const dy = mouseY - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const directionX = dx / distance;
            const directionY = dy / distance;

            particle.x += directionX;
            particle.y += directionY;

            particle.update();
        }

        connectDots();

        requestAnimationFrame(updateParticles);
    }

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    function updateMousePosition(event) {
        mouseX = event.clientX;
        mouseY = event.clientY;
    }

    function addEventListeners() {
        window.addEventListener('resize', resizeCanvas);
        window.addEventListener('mousemove', updateMousePosition);
    }

    function initialize() {
        resizeCanvas();
        createParticles();
        addEventListeners();
        updateParticles();
    }

    initialize();

    const tabNameText = 'e`m`a`z`3';
    const typingDelay = 700;
    const pauseDelay = 700;
    let tabNameIndex = 0;
    let tabNameInterval = null;
    let isTyping = true;

    function typeWriterEffect() {
        const currentText = document.title;
        if (isTyping) {
            const newText = currentText + tabNameText.charAt(tabNameIndex);
            document.title = newText;
            tabNameIndex++;

            if (tabNameIndex === tabNameText.length) {
                isTyping = false;
                setTimeout(typeWriterEffect, pauseDelay);
            } else {
                setTimeout(typeWriterEffect, typingDelay);
            }
        } else {
            const newText = currentText.slice(0, currentText.length - 1);
            document.title = newText;
            tabNameIndex--;

            if (tabNameIndex === 0) {
                isTyping = true;
                setTimeout(typeWriterEffect, pauseDelay);
            } else {
                setTimeout(typeWriterEffect, typingDelay);
            }
        }
    }

    tabNameInterval = setTimeout(typeWriterEffect, typingDelay);
});
