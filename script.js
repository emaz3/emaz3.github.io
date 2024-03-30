window.addEventListener('DOMContentLoaded', (event) => {
    /* const rainContainer = document.getElementById('rain-container');
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

    startRain(); */

   /* const canvas = document.createElement('canvas');
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

    initialize(); */

    const tabNameText = 'e-m-a-z-3';
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

var w = c.width = window.innerWidth,
    h = c.height = window.innerHeight,
    ctx = c.getContext( '2d' ),
    
    opts = {
      
      len: 25,
      count: 50,
      baseTime: 0,
      addedTime: 4,
      dieChance: .005,
      spawnChance: 10,
      sparkChance: 0,
      sparkDist: 0,
      sparkSize: 0,
      
      color: 'hsl(hue,100%,light%)',
      baseLight: 10,
      addedLight: 10,
      shadowToTimePropMult: 6,
      baseLightInputMultiplier: .01,
      addedLightInputMultiplier: .02,
      
      cx: w / 2,
      cy: h / 2,
      repaintAlpha: .01,
      hueChange: 1.1
    },
    
    tick = 0,
    lines = [],
    dieX = w / 2 / opts.len,
    dieY = h / 2 / opts.len,
    
    baseRad = Math.PI * 2 / 6;
    
ctx.fillStyle = 'black';
ctx.fillRect( 0, 0, w, h );

function loop() {
  
  window.requestAnimationFrame( loop );
  
  ++tick;
  
  ctx.globalCompositeOperation = 'source-over';
  ctx.shadowBlur = 0;
  ctx.fillStyle = 'rgba(0,0,0,alp)'.replace( 'alp', opts.repaintAlpha );
  ctx.fillRect( 0, 0, w, h );
  ctx.globalCompositeOperation = 'lighter';
  
  if( lines.length < opts.count && Math.random() < opts.spawnChance )
    lines.push( new Line );
  
  lines.map( function( line ){ line.step(); } );
}
function Line(){
  
  this.reset();
}
Line.prototype.reset = function(){
  
  this.x = 0;
  this.y = 0;
  this.addedX = 0;
  this.addedY = 0;
  
  this.rad = 0;
  
  this.lightInputMultiplier = opts.baseLightInputMultiplier + opts.addedLightInputMultiplier * Math.random();
  
  this.color = opts.color.replace( 'hue', tick * opts.hueChange );
  this.cumulativeTime = 0;
  
  this.beginPhase();
}
Line.prototype.beginPhase = function(){
  
  this.x += this.addedX;
  this.y += this.addedY;
  
  this.time = 0;
  this.targetTime = ( opts.baseTime + opts.addedTime * Math.random() ) |0;
  
  this.rad += baseRad * ( Math.random() < .5 ? 1 : -1 );
  this.addedX = Math.cos( this.rad );
  this.addedY = Math.sin( this.rad );
  
  if( Math.random() < opts.dieChance || this.x > dieX || this.x < -dieX || this.y > dieY || this.y < -dieY )
    this.reset();
}
Line.prototype.step = function(){
  
  ++this.time;
  ++this.cumulativeTime;
  
  if( this.time >= this.targetTime )
    this.beginPhase();
  
  var prop = this.time / this.targetTime,
      wave = Math.sin( prop * Math.PI / 2  ),
      x = this.addedX * wave,
      y = this.addedY * wave;
  
  ctx.shadowBlur = prop * opts.shadowToTimePropMult;
  ctx.fillStyle = ctx.shadowColor = this.color.replace( 'light', opts.baseLight + opts.addedLight * Math.sin( this.cumulativeTime * this.lightInputMultiplier ) );
  ctx.fillRect( opts.cx + ( this.x + x ) * opts.len, opts.cy + ( this.y + y ) * opts.len, 2, 2 );
  
  if( Math.random() < opts.sparkChance )
    ctx.fillRect( opts.cx + ( this.x + x ) * opts.len + Math.random() * opts.sparkDist * ( Math.random() < .5 ? 1 : -1 ) - opts.sparkSize / 2, opts.cy + ( this.y + y ) * opts.len + Math.random() * opts.sparkDist * ( Math.random() < .5 ? 1 : -1 ) - opts.sparkSize / 2, opts.sparkSize, opts.sparkSize )
}
loop();

window.addEventListener( 'resize', function(){
  
  w = c.width = window.innerWidth;
  h = c.height = window.innerHeight;
  ctx.fillStyle = 'black';
  ctx.fillRect( 0, 0, w, h );
  
  opts.cx = w / 2;
  opts.cy = h / 2;
  
  dieX = w / 2 / opts.len;
  dieY = h / 2 / opts.len;
});