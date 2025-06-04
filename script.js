// Floating hearts animation
        function createFloatingHeart() {
            const heart = document.createElement('div');
            heart.className = 'heart';
            heart.innerHTML = ['💕', '💖', '💗', '💝', '💞'][Math.floor(Math.random() * 5)];
            heart.style.left = Math.random() * 100 + 'vw';
            heart.style.animationDuration = (Math.random() * 3 + 4) + 's';
            heart.style.fontSize = (Math.random() * 20 + 15) + 'px';
            
            document.getElementById('floatingHearts').appendChild(heart);
            
            setTimeout(() => {
                heart.remove();
            }, 6000);
        }

        // Create hearts continuously
        setInterval(createFloatingHeart, 800);

        // Sparkle effect on mouse move
        document.addEventListener('mousemove', function(e) {
            if (Math.random() > 0.8) {
                createSparkle(e.clientX, e.clientY);
            }
        });

        function createSparkle(x, y) {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle';
            sparkle.innerHTML = '✨';
            sparkle.style.left = x + 'px';
            sparkle.style.top = y + 'px';
            
            document.getElementById('sparkles').appendChild(sparkle);
            
            setTimeout(() => {
                sparkle.remove();
            }, 2000);
        }

        // Love quotes array
        const loveQuotes = [
            "You are my today and all of my tomorrows.",
            "In your smile, I see something more beautiful than the stars.",
            "You are my favorite notification.",
            "Every love story is beautiful, but ours is my favorite.",
            "You're the peanut butter to my jelly.",
            "I fall in love with you every single day.",
            "You are my sunshine on a cloudy day.",
            "With you, I am home."
        ];

        // Button functionality
        const yesBtn = document.getElementById('yesBtn');
        const noBtn = document.getElementById('noBtn');
        const buttonContainer = document.getElementById('buttonContainer');
        const initialScreen = document.getElementById('initialScreen');
        const loveMessage = document.getElementById('loveMessage');
        const loveQuoteElement = document.getElementById('loveQuote');

        let noBtnClicks = 0;

        // Yes button click
        yesBtn.addEventListener('click', function() {
            // Hide initial screen
            initialScreen.classList.add('hidden');
            
            // Show love message
            loveMessage.classList.add('show');
            
            // Random love quote
            const randomQuote = loveQuotes[Math.floor(Math.random() * loveQuotes.length)];
            loveQuoteElement.textContent = randomQuote;
            
            // Create celebration effect
            createCelebration();
            
            // Play celebration sound (visual feedback)
            document.body.style.animation = 'none';
            document.body.style.background = 'linear-gradient(-45deg, #ff6b9d, #c44569, #f8b500, #feca57, #00b894, #00cec9)';
            document.body.style.backgroundSize = '600% 600%';
            document.body.style.animation = 'gradientShift 8s ease infinite';
        });

        // No button click - make it run away!
        noBtn.addEventListener('click', function(e) {
            e.preventDefault();
            noBtnClicks++;
            
            const containerRect = buttonContainer.getBoundingClientRect();
            const btnRect = noBtn.getBoundingClientRect();
            
            // Calculate random position within the container
            const maxX = window.innerWidth - btnRect.width - 20;
            const maxY = window.innerHeight - btnRect.height - 20;
            
            const randomX = Math.random() * maxX;
            const randomY = Math.random() * maxY;
            
            // Apply random position
            noBtn.style.position = 'fixed';
            noBtn.style.left = randomX + 'px';
            noBtn.style.top = randomY + 'px';
            noBtn.style.zIndex = '1000';
            
            // Add some playful animations
            noBtn.style.transform = 'rotate(' + (Math.random() * 360) + 'deg) scale(' + (0.8 + Math.random() * 0.4) + ')';
            
            // Change button text based on clicks
            const noTexts = [
                '<i class="fas fa-running"></i> Nope!',
                '<i class="fas fa-laugh"></i> Try Again!',
                '<i class="fas fa-wink"></i> Still No!',
                '<i class="fas fa-heart"></i> You Sure?',
                '<i class="fas fa-thinking"></i> Really?'
            ];
            
            if (noBtnClicks < noTexts.length) {
                noBtn.innerHTML = noTexts[noBtnClicks - 1];
            }
            
            // Make sparkles at old position
            const rect = e.target.getBoundingClientRect();
            for (let i = 0; i < 5; i++) {
                setTimeout(() => {
                    createSparkle(
                        rect.left + Math.random() * rect.width,
                        rect.top + Math.random() * rect.height
                    );
                }, i * 100);
            }
        });

        // Celebration confetti
        function createCelebration() {
            const celebration = document.getElementById('celebration');
            const colors = ['#ff6b9d', '#feca57', '#48dbfb', '#ff9ff3', '#54a0ff', '#5f27cd'];
            
            for (let i = 0; i < 50; i++) {
                setTimeout(() => {
                    const confetti = document.createElement('div');
                    confetti.className = 'confetti';
                    confetti.style.left = Math.random() * 100 + 'vw';
                    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                    confetti.style.animationDelay = Math.random() * 2 + 's';
                    confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0%';
                    
                    celebration.appendChild(confetti);
                    
                    setTimeout(() => {
                        confetti.remove();
                    }, 3000);
                }, i * 50);
            }
        }

        // Touch events for mobile
        noBtn.addEventListener('touchstart', function(e) {
            e.preventDefault();
            noBtn.click();
        });

        // Prevent context menu on no button
        noBtn.addEventListener('contextmenu', function(e) {
            e.preventDefault();
            noBtn.click();
        });

        // Add some initial sparkles
        setTimeout(() => {
            for (let i = 0; i < 10; i++) {
                setTimeout(() => {
                    createSparkle(
                        Math.random() * window.innerWidth,
                        Math.random() * window.innerHeight
                    );
                }, i * 200);
            }
        }, 2000);

        // Resize handler to keep no button in bounds
        window.addEventListener('resize', function() {
            if (noBtn.style.position === 'fixed') {
                const btnRect = noBtn.getBoundingClientRect();
                if (btnRect.right > window.innerWidth || btnRect.bottom > window.innerHeight) {
                    noBtn.style.left = Math.random() * (window.innerWidth - btnRect.width) + 'px';
                    noBtn.style.top = Math.random() * (window.innerHeight - btnRect.height) + 'px';
                }
            }
        });