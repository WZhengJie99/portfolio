document.addEventListener('DOMContentLoaded', function () {
    const wheel = document.querySelector('.wheel');
    const wheelSegments = document.querySelectorAll('.wheel-segment');
    const earthEmoji = document.querySelector('.earth-emoji');
    const wheelContainer = document.querySelector('.wheel-container');
    const menuToggle = document.querySelector('.menu-toggle');
    const mainContent = document.querySelector('.main-content');
    const paragraph = document.querySelector('.toggle-paragraph');

    let currentRotation = 0;
    let touchStartY = 0;
    let touchEndY = 0;
    let menuOpen = false;


    let earthExpanded = false;

    let rotationDegree = 0;
    let isExpanded = false;
    let translateXValue = 1850;
    let earthWidth = 2000;
    let earthHeight = 2000;
    let rotationInterval;

    earthEmoji.style.transform = `translateX(${translateXValue}px)`;
    earthEmoji.style.width = `${earthWidth}px`;
    earthEmoji.style.height = `${earthHeight}px`

    window.onload = function () {
        var chswitchOn = true;

        // Brighten the logos
        document.getElementById('logo-wa1').classList.add('brighter');
        document.getElementById('logo-zh1').classList.add('brighter');
        document.getElementById('logo-jie1').classList.add('brighter');
        document.getElementById('logo-switch').classList.add('brighter');

        // Flicker the overlays
        document.querySelectorAll('.wa-overlay, .zh-overlay, .jie-overlay, .switch-overlay').forEach(function (overlay) {
            overlay.classList.add('flicker', 'brighter');
        });

        document.querySelector('.switch').addEventListener('click', function () {
            chswitchOn = !chswitchOn;

            if (chswitchOn) {
                document.getElementById('logo-wa1').classList.add('brighter');
                document.getElementById('logo-zh1').classList.add('brighter');
                document.getElementById('logo-jie1').classList.add('brighter');
                document.getElementById('logo-switch').classList.add('brighter');

                document.getElementById('logo-wa1').classList.remove('dim');
                document.getElementById('logo-zh1').classList.remove('dim');
                document.getElementById('logo-jie1').classList.remove('dim');
                document.getElementById('logo-switch').classList.remove('dim');

                document.querySelectorAll('.wa-overlay, .zh-overlay, .jie-overlay, .switch-overlay').forEach(function (overlay) {
                    overlay.classList.add('flicker', 'brighter');
                    overlay.classList.remove('dim');
                });
            } else {
                document.getElementById('logo-wa1').classList.remove('brighter');
                document.getElementById('logo-zh1').classList.remove('brighter');
                document.getElementById('logo-jie1').classList.remove('brighter');
                document.getElementById('logo-switch').classList.remove('brighter');

                document.getElementById('logo-wa1').classList.add('dim');
                document.getElementById('logo-zh1').classList.add('dim');
                document.getElementById('logo-jie1').classList.add('dim');
                document.getElementById('logo-switch').classList.add('dim');

                document.querySelectorAll('.wa-overlay, .zh-overlay, .jie-overlay, .switch-overlay').forEach(function (overlay) {
                    overlay.classList.remove('flicker', 'brighter');
                    overlay.classList.add('dim');
                });
            }
        });

        var mswitchOn = true;

        document.getElementById('marquee-switch').classList.add('brighter');

        // Flicker the overlays
        document.querySelectorAll('.marquee-s-overlay').forEach(function (overlay) {
            overlay.classList.add('flicker', 'brighter');
        });

        document.querySelector('.marq-switch').addEventListener('click', function () {
            mswitchOn = !mswitchOn;

            if (mswitchOn) {
                document.getElementById('marquee-switch').classList.add('brighter');
                document.getElementById('marquee-switch').classList.remove('dim');

                document.getElementById('marquee-text').classList.add('brighter');
                document.getElementById('marquee-text').classList.remove('marquee-dim');

                document.querySelectorAll('.marquee-s-overlay').forEach(function (overlay) {
                    overlay.classList.add('flicker', 'brighter');
                    overlay.classList.remove('dim');
                });
            } else {
                document.getElementById('marquee-switch').classList.remove('brighter');
                document.getElementById('marquee-switch').classList.add('dim');

                document.getElementById('marquee-text').classList.remove('brighter');
                document.getElementById('marquee-text').classList.add('marquee-dim');

                document.querySelectorAll('.marquee-s-overlay').forEach(function (overlay) {
                    overlay.classList.remove('flicker', 'brighter');
                    overlay.classList.add('dim');
                });
            }
        });
    };

    const projects = [
        { title: 'Project 1' },
        { title: 'Project 2' },
        { title: 'Project 3' },
        { title: 'Project 4' },
        { title: 'Project 5' },
        { title: 'Project 6' }
    ];

    wheel.style.transform = `rotate(${currentRotation}deg)`;

    if (earthExpanded === false) {
        earthEmoji.style.transform = `translateX(${translateXValue}px) rotate(${currentRotation}deg)`;
    }

    function getNextSegmentIndex(currentIndex, direction) {
        const segmentCount = wheelSegments.length;
        if (direction === 'up') {
            return (currentIndex + 1) % segmentCount;
        } else {
            return (currentIndex - 1 + segmentCount) % segmentCount;
        }
    }

    function updateActiveProject(rotation) {
        //const roundedRotation = Math.round(rotation);
        if (rotation === -60 && earthExpanded === false) {
            // Vehfare
            wheelContainer.classList.remove('active-project2', 'active-project4', 'active-project5', 'active-project3');
            wheelContainer.classList.add('active-project6');
        } else if (rotation === -120 && earthExpanded === false) {
            // SHIM
            wheelContainer.classList.remove('active-project2', 'active-project3', 'active-project5', 'active-project6');
            wheelContainer.classList.add('active-project4');
        } else if (rotation === -180 && earthExpanded === false) {
            // Music Box
            wheelContainer.classList.remove('active-project3', 'active-project4', 'active-project5', 'active-project6');
            wheelContainer.classList.add('active-project2');
        } else if (rotation === -240 && earthExpanded === false) {
            // Fishing
            wheelContainer.classList.remove('active-project2', 'active-project4', 'active-project5', 'active-project6');
            wheelContainer.classList.add('active-project3');
        } else if (rotation === -300 && earthExpanded === false) {
            // ex Tile Breaker, XYZ News
            wheelContainer.classList.remove('active-project2', 'active-project3', 'active-project4', 'active-project5', 'active-project6');
        } else {
            // Scroll down for more! / default
            wheelContainer.classList.remove('active-project2', 'active-project3', 'active-project4', 'active-project5', 'active-project6');
        }
    }

    function calculateRotationAngle(index) {
        return -60 * index;
    }

    wheelContainer.addEventListener("wheel", (event) => {
        if (!menuOpen && !event.target.closest(".button-container")) {
            const direction = event.deltaY > 0 ? "up" : "down";
            const currentSegmentIndex = Math.abs(currentRotation / 60) % projects.length;
            const nextSegmentIndex = getNextSegmentIndex(currentSegmentIndex, direction);

            currentRotation = calculateRotationAngle(nextSegmentIndex);
            wheel.style.transform = `rotate(${currentRotation}deg)`;

            if (earthExpanded === false) {
                earthEmoji.style.transform = `translateX(${translateXValue}px) rotate(${currentRotation}deg)`;
            }

            updateActiveProject(currentRotation);
        }
    });

    wheelContainer.addEventListener('touchstart', function (event) {
        if (!menuOpen && !event.target.closest('.button-container')) {
            touchStartY = event.touches[0].clientY;
        }
    });

    wheelContainer.addEventListener('touchend', function (event) {
        if (!menuOpen && !event.target.closest('.button-container')) {
            touchEndY = event.changedTouches[0].clientY;
            handleGesture();
        }
    });

    function handleGesture() {
        const direction = touchEndY > touchStartY ? 'up' : 'down';
        const currentSegmentIndex = Math.abs(currentRotation / 60) % projects.length;
        const nextSegmentIndex = getNextSegmentIndex(currentSegmentIndex, direction);

        currentRotation = calculateRotationAngle(nextSegmentIndex);
        wheel.style.transform = `rotate(${currentRotation}deg)`;

        if (earthExpanded === false) {
            earthEmoji.style.transform = `translateX(${translateXValue}px) rotate(${currentRotation}deg)`;
        }

        updateActiveProject(currentRotation);
    }

    menuToggle.addEventListener('click', function () {
        if (window.innerWidth <= 768) {
            // Mobile behavior
            mainContent.classList.toggle('active');
            paragraph.classList.toggle('active');
        } else {
            // Larger device behavior: simply toggle the 'active' class for sliding effect
            paragraph.classList.toggle('active');
        }
    });

    // Hide paragraph initially on larger devices
    if (window.innerWidth < 768) {
        paragraph.style.display = 'none';
    }

    // Release Balloons!
    function releaseBalloon() {
        const balloonContainer = document.getElementById('balloon-container');

        // balloon element
        const balloon = document.createElement('div');
        balloon.style.position = 'absolute';
        balloon.style.bottom = '-70px'; // Start below the screen
        balloon.style.width = '115px';
        balloon.style.height = '140px';
        balloon.style.borderRadius = '50%';
        balloon.style.backgroundColor = getRandomColor();
        balloon.style.boxShadow = 'inset -5px -10px 0 rgba(0, 0, 0, 0.1)';
        balloon.style.opacity = '0.9';

        balloon.style.left = Math.random() * 100 + 'vw';

        // triangle tail
        const triangle = document.createElement('div');
        triangle.style.position = 'absolute';
        triangle.style.bottom = '-15px';
        triangle.style.left = '50%';
        triangle.style.transform = 'translateX(-50%)';
        triangle.style.width = '0';
        triangle.style.height = '0';
        triangle.style.borderLeft = '10px solid transparent';
        triangle.style.borderRight = '10px solid transparent';
        triangle.style.borderBottom = `15px solid ${balloon.style.backgroundColor}`;

        //curly string
        const stringLength = Math.random() * 80 + 70; // Random length between 30 and 100
        const string = createWavyString(stringLength);

        string.style.bottom = '-15px';
        string.style.left = '50%';
        string.style.transform = 'translateX(-50%)';

        balloonContainer.appendChild(balloon);
        balloon.appendChild(triangle);
        balloon.appendChild(string);

        // Move the balloon up
        let bottomPosition = -70; // Initial position
        function moveBalloon() {
            bottomPosition += 5; // Adjust speed here
            balloon.style.bottom = bottomPosition + 'px';
            if (bottomPosition < window.innerHeight + 70) {
                requestAnimationFrame(moveBalloon);
            } else {
                balloon.remove();
            }
        }
        moveBalloon();
    }

    function createWavyString(length) {
        const stringContainer = document.createElement('div');
        stringContainer.style.position = 'absolute';
        stringContainer.style.bottom = '0';
        stringContainer.style.left = '50%';
        stringContainer.style.transform = 'translateX(-50%)';

        const width = 2;   // Width of each segment
        const numSegments = Math.floor(length / width); // Number of segments

        // Randomize wave parameters
        const amplitude = Math.random() * 5 + 5; // Random amplitude between 5 and 10
        const frequency = Math.random() * 0.2 + 0.05; // Random frequency between 0.05 and 0.25
        const phase = Math.random() * Math.PI * 2;

        // Create each segment
        for (let i = 0; i < numSegments; i++) {
            const segment = document.createElement('div');
            segment.style.position = 'absolute';
            segment.style.width = width + 'px';
            segment.style.height = width + 'px';
            segment.style.backgroundColor = 'black';
            segment.style.transform = `translateY(${i * width}px) translateX(${amplitude * Math.sin(i * frequency + phase)}px)`; // Wavy effect

            stringContainer.appendChild(segment);
        }

        return stringContainer;
    }

    // Random color generator for the balloons
    function getRandomColor() {
        const colors = [
            '#FF6347', '#FFD700', '#ADFF2F', '#00BFFF', '#FF69B4',
            '#FF4500', '#32CD32', '#1E90FF', '#FFD700', '#FF1493',
            '#FF8C00', '#6A5ACD', '#00FF00', '#8A2BE2', '#FF00FF',
            '#FF00FF', '#DAA520', '#808080', '#C71585', '#00FA9A',
            '#00CED1', '#B22222', '#228B22', '#DC143C', '#D2691E',
            '#FF1493', '#CD5C5C', '#FFB6C1', '#FFC0CB', '#FF4500',
            '#FF6347', '#FF7F50', '#FF1493', '#FF69B4', '#DB7093',
            '#C71585', '#DA70D6', '#D8BFD8', '#DDA0DD', '#EE82EE',
            '#9370DB', '#8A2BE2', '#6A5ACD', '#483D8B', '#4169E1',
            '#4682B4', '#B0C4DE', '#ADD8E6', '#87CEEB', '#87CEFA',
            '#00BFFF', '#1E90FF', '#4169E1', '#4682B4', '#5F9EA0',
            '#20B2AA', '#008080', '#008000', '#228B22', '#6B8E23',
            '#9ACD32', '#32CD32', '#2E8B57', '#3CB371', '#F0E68C',
            '#FFD700', '#FFA500', '#FF8C00', '#FF4500', '#FF6347',
            '#FF7F50', '#FF1493', '#FF69B4', '#DB7093', '#C71585',
            '#DDA0DD', '#EE82EE', '#DA70D6', '#D8BFD8', '#DCDCDC',
            '#F5F5F5', '#F0F8FF', '#F5FFFA', '#F0FFF0', '#FFFFF0',
            '#FAEBD7', '#FDF5E6', '#FFFAF0', '#FFFFF0', '#F5F5F5',
            '#DCDCDC', '#F0F0F0', '#BEBEBE', '#A9A9A9', '#808080',
            '#696969', '#585858', '#3F3F3F', '#2F2F2F', '#1F1F1F'
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }


    // Call releaseBalloon when the button is clicked
    document.querySelector('.Mahekjain-btn-2 a').addEventListener('click', function () {
        for (let i = 0; i < 10; i++) {
            setTimeout(releaseBalloon, i * 50); // Release balloons at intervals
        }
    });

    function spawnShootingStars() {
        const starContainer = document.getElementById('star-container');

        // Number of stars to spawn
        const numberOfStars = 5 + Math.floor(Math.random() * 10); // Random between 5 and 15

        // Create shooting stars
        for (let i = 0; i < numberOfStars; i++) {
            const star = document.createElement('div');
            star.classList.add('shooting-star');
            const randomColor = getRandomColorTwo();

            // Randomize starting position and size
            const startTop = -50 + Math.random() * 50 + 'vh';  // Random vertical position (top half of screen)
            const startLeft = 100 + Math.random() * 10 + 'vw'; // Start outside the screen (right side)
            const starWidth = Math.random() * 2 + 1 + 'px'; // Random thin width
            const starHeight = Math.random() * 80 + 50 + 'px'; // Random length for the star
            star.style.background = `linear-gradient(to bottom, rgba(255, 255, 255, 0), ${randomColor})`;

            star.style.top = startTop;
            star.style.left = startLeft;
            star.style.width = starWidth;
            star.style.height = starHeight;

            starContainer.appendChild(star);

            setTimeout(() => {
                star.style.transition = 'transform 1s linear'; // Control the speed
                star.style.transform = `translateX(-110vw)`; // Move across the screen from right to left

                // Remove the star after the animation ends
                setTimeout(() => {
                    star.remove();
                }, 4000); // (matches the animation duration)
            }, 10);
        }
    }

    function getRandomColorTwo() {
        const colors = ['#F0FFFF', '#DC143C'];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    document.querySelector('.Mahekjain-btn-1 a').addEventListener('click', function () {
        spawnShootingStars();
    });

    //fps
    let lastFrameTime = performance.now();
    let frameCount = 0;
    let fpsDisplay = document.getElementById('fps');

    function updateFPS() {
        const now = performance.now();
        frameCount++;

        if (now - lastFrameTime >= 1000) {
            const fps = (frameCount / (now - lastFrameTime)) * 1000;
            fpsDisplay.textContent = `FPS: ${Math.round(fps)}`;
            lastFrameTime = now;
            frameCount = 0;
        }

        requestAnimationFrame(updateFPS);
    }

    requestAnimationFrame(updateFPS);

    let sgtDisplay = document.getElementById('SGT');

    function updateSGT() {
        const singaporeTime = new Date().toLocaleString('en-US', {
            timeZone: 'Asia/Singapore',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        });
        sgtDisplay.textContent = `SGT: ${singaporeTime}`;
    }

    requestAnimationFrame(updateFPS);
    setInterval(updateSGT, 1000);

    document.querySelectorAll('.e-expand-chatbox, .e-expand-chatbox-text, .e-close-chatbox, .toggle-chat').forEach((element) => {
        element.addEventListener('click', toggleChatbox);
    });
    
    function toggleChatbox() {
        const chatbox = document.getElementById('e-chatbox-container');
        const earthExp = document.querySelector('.earth-exp');
    
        chatbox.classList.toggle('expanded');
    
        if (chatbox.classList.contains('expanded')) {
            earthExp.classList.add('fade-out');
        } else {
            earthExp.classList.remove('fade-out');
        }
    }    

    const iframe = document.getElementById('chatbox-iframe');
    const loadingMessage = document.getElementById('loading-message');

    loadingMessage.style.display = 'block';
    iframe.style.display = 'none';

    iframe.onload = function () {
        loadingMessage.style.display = 'none';
        iframe.style.display = 'block';
    };

    const eiframe = document.getElementById('e-chatbox-iframe');
    const eloadingMessage = document.getElementById('e-loading-message');

    eloadingMessage.style.display = 'block';
    eiframe.style.display = 'none';

    eiframe.onload = function () {
        eloadingMessage.style.display = 'none';
        eiframe.style.display = 'block';
    };

    let percentage = 50;

    function updateFooterPercentage() {
        const percentageDisplay = document.getElementById("percentage-display");
        const progressBar = document.getElementById("progress-bar");
        const percentageText = document.getElementById("percentage-text");

        progressBar.textContent = "▌".repeat(Math.floor(percentage / 12.5));

        percentageText.textContent = `🗲${percentage}%`;

        if (percentage == 0) {
            progressBar.style.color = "red";
            percentageText.style.color = "red";
            percentageText.textContent = `🗲${percentage}% NEEDS CHARGING`;
        } else if (percentage <= 49) {
            progressBar.style.color = "red";
            percentageText.style.color = "red";
        } else if (percentage <= 50) {
            progressBar.style.color = "orange";
            percentageText.style.color = "orange";
        } else if (percentage == 100) {
            progressBar.style.color = "black";
            percentageText.style.color = "black";
            percentageText.textContent = `🗲${percentage}% FULLY CHARGED`;
        } else {
            progressBar.style.color = "green";
            percentageText.style.color = "green";
        }
    }

    document.getElementById("minus-e").addEventListener("click", () => {
        if (percentage > 0) {
            percentage -= 1;
            updateFooterPercentage();
        }
    });

    document.getElementById("plus-e").addEventListener("click", () => {
        if (percentage < 100) {
            percentage += 1;
            updateFooterPercentage();
        }
    });

    updateFooterPercentage();

    function rotateEarth() {
        if (isExpanded) {
            wheel.style.opacity = '0';
            translateXValue = -80;
            earthWidth = 700;
            earthHeight = 700;

            if (!earthExpanded) {
                rotationInterval = setInterval(() => {
                    rotationDegree += 1;
                    earthEmoji.style.transform = `translateX(${translateXValue}px) rotate(${rotationDegree}deg)`;
                }, 16);
            }
            earthExpanded = true;

        } else {
            wheel.style.opacity = '1';
            translateXValue = 1850;
            earthWidth = 2000;
            earthHeight = 2000;

            clearInterval(rotationInterval);
            earthExpanded = false;
        }

        // Apply transformations and size changes
        earthEmoji.style.transform = `translateX(${translateXValue}px) rotate(${currentRotation}deg)`;
        earthEmoji.style.width = `${earthWidth}px`;
        earthEmoji.style.height = `${earthHeight}px`;

        isExpanded = !isExpanded;
    }

    document.querySelector(".earth-exp").addEventListener("click", function () {
        rotateEarth();
    });

});
