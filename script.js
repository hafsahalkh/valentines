document.addEventListener('DOMContentLoaded', () => {
    let clickCount = 0;
    const noButton = document.querySelector('.no');
    const yesButton = document.querySelector('.yes');

    // Set initial positioning
    noButton.style.position = "relative"; 
    noButton.style.left = "0px"; 
    noButton.style.top = "0px";

    noButton.addEventListener('click', (event) => {
        const buttonRect = noButton.getBoundingClientRect();
        const yesRect = yesButton.getBoundingClientRect();
        const mouseX = event.clientX;
        const mouseY = event.clientY;

        const buttonCenterX = buttonRect.left + buttonRect.width / 2;
        const buttonCenterY = buttonRect.top + buttonRect.height / 2;

        const deltaX = buttonCenterX - mouseX;
        const deltaY = buttonCenterY - mouseY;

        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        const moveDistance = 150; // Distance the button "runs"

        let moveX = (deltaX / distance) * moveDistance;
        let moveY = (deltaY / distance) * moveDistance;

        // Get window and button dimensions
        const buttonWidth = noButton.offsetWidth;
        const buttonHeight = noButton.offsetHeight;
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;

        // Get current position and prevent going off-screen
        let newLeft = Math.min(Math.max(noButton.offsetLeft + moveX, 10), windowWidth - buttonWidth - 10);
        let newTop = Math.min(Math.max(noButton.offsetTop + moveY, 10), windowHeight - buttonHeight - 10);

        // Ensure "No" button does not overlap "Yes" button
        function isOverlapping() {
            const newNoRect = {
                left: newLeft,
                right: newLeft + buttonWidth,
                top: newTop,
                bottom: newTop + buttonHeight
            };

            return !(
                newNoRect.right < yesRect.left ||
                newNoRect.left > yesRect.right ||
                newNoRect.bottom < yesRect.top ||
                newNoRect.top > yesRect.bottom
            );
        }

        // Keep adjusting position if it overlaps "Yes" or is off-screen
        let attempts = 0;
        while ((isOverlapping() || newLeft < 10 || newTop < 10 || newLeft + buttonWidth > windowWidth - 10 || newTop + buttonHeight > windowHeight - 10) && attempts < 10) {
            newLeft = Math.random() * (windowWidth - buttonWidth - 20);
            newTop = Math.random() * (windowHeight - buttonHeight - 20);
            attempts++;
        }

        // Apply the new position
        noButton.style.position = 'absolute';
        noButton.style.left = `${newLeft}px`;
        noButton.style.top = `${newTop}px`;

        // Make "Yes" button bigger each time
        let currentSize = parseFloat(window.getComputedStyle(yesButton).fontSize);
        yesButton.style.fontSize = `${currentSize + 5}px`;

        // Show message every 3 clicks
        clickCount++;
        if (clickCount % 3 === 0) {
            alert("Are you serious?!");
        }
    });

    // Floating heart animation
    setInterval(() => {
        const heart = document.createElement('div');
        heart.innerText = '❤️';
        heart.classList.add('heart');
        heart.style.left = Math.random() * 100 + 'vw';
        document.body.appendChild(heart);
        setTimeout(() => heart.remove(), 5000);
    }, 500);

    const noBtn = document.getElementById('noBtn');
    const yesBtn = document.querySelector('.yes');
    let scale = 1;
    
    noBtn.addEventListener('mouseover', function() {
        // Increase size of Yes button
        scale += 0.2;
        yesBtn.style.transform = `scale(${scale})`;
        
        // Get button dimensions
        const btnWidth = noBtn.offsetWidth;
        const btnHeight = noBtn.offsetHeight;
        
        // Get window dimensions
        const maxX = window.innerWidth - btnWidth;
        const maxY = window.innerHeight - btnHeight;
        
        // Get yes button position and dimensions
        const yesBtnRect = yesBtn.getBoundingClientRect();
        
        // Generate random position
        let newX, newY;
        let overlap;
        
        do {
            newX = Math.floor(Math.random() * maxX);
            newY = Math.floor(Math.random() * maxY);
            
            // Check if new position overlaps with yes button
            overlap = (newX < yesBtnRect.right && 
                      newX + btnWidth > yesBtnRect.left && 
                      newY < yesBtnRect.bottom && 
                      newY + btnHeight > yesBtnRect.top);
        } while (overlap);
        
        // Apply new position
        noBtn.style.position = 'fixed';
        noBtn.style.left = newX + 'px';
        noBtn.style.top = newY + 'px';
    });
});

// Function to show love message when clicking "Yes"
function showLoveMessage() {
    document.body.innerHTML = `
        <div style='text-align: center;'>
            <img src="snoopy.gif" alt='love love love..blah...' style='max-width: 100%; height: auto; border-radius: 20px;'>
            <h1 style='color: red; margin-top: 20px; font-size: 40px;'> I knew it! I love you! ❤️ </h1>
        </div>
    `;
}

// Add this new function at the top
function showValentinePage() {
    document.querySelector('.envelope-container').style.display = 'none';
    document.querySelector('.valentine-page').style.display = 'flex';
}
