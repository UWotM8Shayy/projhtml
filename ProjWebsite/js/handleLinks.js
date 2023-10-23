

// Get the username from the URL parameter
const queryParams = new URLSearchParams(window.location.search);
const username = queryParams.get('username');


// Update the href attributes of the links to include the username parameter
document.getElementById('home-link').href = '/html/home.html?username=' + encodeURIComponent(username);
document.getElementById('about-link').href = '/html/about.html?username=' + encodeURIComponent(username);
document.getElementById('contact-link').href = '/html/contact.html?username=' + encodeURIComponent(username);
document.getElementById('myprofile-link').href = '/html/myprofile.html?username=' + encodeURIComponent(username);
document.getElementById('pfpIcon').href = '/html/myprofile.html?username=' + encodeURIComponent(username);

