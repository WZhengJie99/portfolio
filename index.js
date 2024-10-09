document.addEventListener('DOMContentLoaded', function () {
    const wheel = document.querySelector('.wheel');
    const wheelSegments = document.querySelectorAll('.wheel-segment');
    const wheelContainer = document.querySelector('.wheel-container');

    const projects = [
        { title: 'Project 1' },
        { title: 'Project 2' },
        { title: 'Project 3' },
        { title: 'Project 4' },
        { title: 'Project 5' },
        { title: 'Project 6' }
    ];

    let currentRotation = 0;
    wheel.style.transform = `rotate(${currentRotation}deg)`;

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
        if (rotation === -60) {
            // Vehfare
            wheelContainer.classList.remove('active-project2');
            wheelContainer.classList.remove('active-project4');
            wheelContainer.classList.remove('active-project5')
            wheelContainer.classList.add('active-project3');
        } else if (rotation === -120) {
            // SHIM
            wheelContainer.classList.remove('active-project2');
            wheelContainer.classList.remove('active-project3');
            wheelContainer.classList.remove('active-project5');
            wheelContainer.classList.add('active-project4');
        } else if (rotation === -180) {
            // Music Box
            wheelContainer.classList.remove('active-project3');
            wheelContainer.classList.remove('active-project4');
            wheelContainer.classList.remove('active-project5')
            wheelContainer.classList.add('active-project2');
        } else if (rotation === -240) {
            // Fishing
            wheelContainer.classList.remove('active-project2');
            wheelContainer.classList.remove('active-project4');
            wheelContainer.classList.remove('active-project5')
            wheelContainer.classList.add('active-project3');
        } else if (rotation === -300) {
            // Tile Breaker
            wheelContainer.classList.remove('active-project2');
            wheelContainer.classList.remove('active-project4');
            wheelContainer.classList.remove('active-project3');
            wheelContainer.classList.add('active-project5');
        } else {
            // Scroll down for more! / default
            wheelContainer.classList.remove('active-project2');
            wheelContainer.classList.remove('active-project3');
            wheelContainer.classList.remove('active-project4');
            wheelContainer.classList.remove('active-project5')
        }
    }

    document.addEventListener('wheel', (event) => {
        const direction = event.deltaY > 0 ? 'up' : 'down';
        const currentSegmentIndex = Math.abs(currentRotation / 60) % projects.length;
        const nextSegmentIndex = getNextSegmentIndex(currentSegmentIndex, direction);

        currentRotation = calculateRotationAngle(nextSegmentIndex);
        wheel.style.transform = `rotate(${currentRotation}deg)`;

        updateActiveProject(currentRotation);
    });

    function calculateRotationAngle(index) {
        return -60 * index;
    }

    const menuToggle = document.querySelector('.menu-toggle');
    const mainContent = document.querySelector('.main-content');
    const paragraph = document.querySelector('.toggle-paragraph');

    menuToggle.addEventListener('click', function() {
        if (window.innerWidth <= 768) {
            // Mobile behavior
            mainContent.classList.toggle('active');
        } else {
            // Larger device behavior
            if (paragraph.style.display === 'none') {
                paragraph.style.display = 'block';
            } else {
                paragraph.style.display = 'none';
            }
        }
    });

    // Hide paragraph initially on larger devices
    if (window.innerWidth > 768) {
        paragraph.style.display = 'none';
    }

    // "Release the Balloons!", Hades said calmly.
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
    document.querySelector('.Mahekjain-btn-2 a').addEventListener('click', function() {
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
            const startTop = -50+Math.random() * 50 + 'vh';  // Random vertical position (top half of screen)
            const startLeft = 100 + Math.random() * 10 + 'vw'; // Start outside the screen (right side)
            const starWidth = Math.random() * 2 + 1 + 'px'; // Random thin width
            const starHeight = Math.random() * 80 + 50 + 'px'; // Random length for the star
            star.style.background = `linear-gradient(to bottom, rgba(255, 255, 255, 0), ${randomColor})`;
            
            // Set initial styles for the star
            star.style.top = startTop;
            star.style.left = startLeft;
            star.style.width = starWidth;
            star.style.height = starHeight;
        
            // Add star to container
            starContainer.appendChild(star);
    
            // Animate the star's movement across the screen
            setTimeout(() => {
                star.style.transition = 'transform 1s linear'; // Control the speed
                star.style.transform = `translateX(-110vw)`; // Move across the screen from right to left
    
                // Remove the star after the animation ends (1s)
                setTimeout(() => {
                    star.remove();
                }, 4000); // 1 second (matches the animation duration)
            }, 10);
        }
    }    

    function getRandomColorTwo() {
        const colors = ['#F0FFFF', '#DC143C'];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    document.querySelector('.Mahekjain-btn-1 a').addEventListener('click', function() {
        spawnShootingStars();
    });
    
});