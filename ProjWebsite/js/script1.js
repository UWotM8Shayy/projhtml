

// Wait for the page to load
document.addEventListener("DOMContentLoaded", function() {
    // Select the loader container element
    const loaderContainer = document.querySelector('.loading-wave-container');

    // Set a timeout to hide the loader container after 1 second
    setTimeout(function() {
        loaderContainer.style.opacity = 0;
        setTimeout(function() {
            loaderContainer.style.display = 'none';
        }, 500); // Wait for the fade-out transition to complete before hiding the loader
    }, 500); // 1 second delay before hiding the loader
});



let menuOpen = false;

function toggleMenu() {
    var sideMenu = document.getElementById('side-menu');
    var bars = document.querySelectorAll('.bar');

    if (!menuOpen) {
        sideMenu.style.left = '0';
        bars.forEach(bar => {
            bar.style.backgroundColor = '#fff'; // Change the color to white
        });
    } else {
        sideMenu.style.left = '-250px';
        bars.forEach(bar => {
            bar.style.backgroundColor = '#333'; // Change the color back to the original
        });
    }

    menuOpen = !menuOpen;
}



