document.addEventListener('DOMContentLoaded', () => {
    const forgiveBtn = document.getElementById('forgiveBtn');
    const notForgiveBtn = document.getElementById('notForgiveBtn');
    const apologyContent = document.querySelector('.apology-content');
    const thankYouMessage = document.getElementById('thankYouMessage');

    forgiveBtn.addEventListener('click', () => {
        apologyContent.classList.add('hidden');
        thankYouMessage.classList.remove('hidden');
    });

    notForgiveBtn.addEventListener('mouseover', () => {
        moveButton(notForgiveBtn);
    });

    notForgiveBtn.addEventListener('click', () => {
        moveButton(notForgiveBtn);
    });

    function moveButton(button) {
        if (!button.classList.contains('moving')) {
            button.classList.add('moving');
        }

        const container = document.querySelector('.container');
        const containerRect = container.getBoundingClientRect();
        const buttonRect = button.getBoundingClientRect();

        const maxX = containerRect.width - buttonRect.width;
        const maxY = containerRect.height - buttonRect.height;

        let randomX = Math.random() * maxX;
        let randomY = Math.random() * maxY;

        // Ensure the button does not overlap with the 'forgive' button area
        const forgiveRect = forgiveBtn.getBoundingClientRect();
        const forgiveArea = {
            top: forgiveRect.top - containerRect.top - 20, // Add some buffer
            bottom: forgiveRect.bottom - containerRect.top + 20,
            left: forgiveRect.left - containerRect.left - 20,
            right: forgiveRect.right - containerRect.left + 20,
        };

        // Simple collision detection and retry
        let attempts = 0;
        while (isOverlapping(randomX, randomY, buttonRect, forgiveArea) && attempts < 100) {
            randomX = Math.random() * maxX;
            randomY = Math.random() * maxY;
            attempts++;
        }

        button.style.left = `${randomX}px`;
        button.style.top = `${randomY}px`;
    }

    function isOverlapping(x, y, buttonRect, otherArea) {
        const buttonRight = x + buttonRect.width;
        const buttonBottom = y + buttonRect.height;

        // Check for no overlap
        if (buttonRight < otherArea.left || x > otherArea.right || buttonBottom < otherArea.top || y > otherArea.bottom) {
            return false;
        }
        // Overlap detected
        return true;
    }
});
