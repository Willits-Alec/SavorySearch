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

  