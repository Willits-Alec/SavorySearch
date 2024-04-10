// Function to insert the header and footer content into their respective placeholders
export function insertHeaderAndFooter() {
  // Insert header content
  fetch('../partials/header.html')
    .then(response => response.text())
    .then(html => {
      document.getElementById('header-placeholder').innerHTML = html;
    })
    .catch(error => {
      console.error('Error fetching header:', error);
    });

  // Insert footer content
  fetch('../partials/footer.html')
    .then(response => response.text())
    .then(html => {
      document.getElementById('footer-placeholder').innerHTML = html;
    })
    .catch(error => {
      console.error('Error fetching footer:', error);
    });
}

// Function to handle login
export function login(username, password) {
  // Simulate authentication
  if (username === 'user' && password === 'password') {
      handleLogin(username, password);
      alert('Login successful!');
      // Redirect to another page or perform further actions
  } else {
      alert('Invalid username or password.');
  }
}

// Function to handle login
function handleLogin(username, password) {
  // Simulate authentication
  if (username === 'admin@savorysearch.com' && password === 'admin') {
      // Store username and password in local storage
      localStorage.setItem('username', username);
      localStorage.setItem('password', password);
      alert('Login successful!');
      // Redirect to index.html
      window.location.href = '../index.html';
  } else {
      alert('Invalid username or password.');
  }
}

// Function to check if the user is logged in
export function isLoggedIn() {
  const username = localStorage.getItem('username');
  const password = localStorage.getItem('password');
  // Check if both username and password are present in the local storage
  return username && password;
}
