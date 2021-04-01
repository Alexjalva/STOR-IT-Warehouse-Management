const editItemHandler = async (event) => {
    event.preventDefault();
    // Collect values from the login form
    const name = document.querySelector('#nameInput').value.trim();
    const dimensions = document.querySelector('#itemDimensions').value.trim();
    const owner = document.querySelector('#itemOwner').value.trim();
    const location = document.querySelector('#itemLocation').value.trim();
    const value = document.querySelector('#itemValue').value.trim();
    const picture = document.querySelector('#itemPicture').value.trim();
    const comments = document.querySelector('#itemComments').value.trim();
    const category = document.querySelector('#category').value.trim();


  
    if (name && dimensions && owner && location && value && picture && comments && category) {
      // Send a PUT request to the API endpoint
      const response = await fetch('/api/items', {
        method: 'PUT',
        body: JSON.stringify({ name, dimensions, owner, location, value, picture, comments, category }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        // If successful, redirect the browser to the profile page
        document.location.replace('/')
      } else {
        alert(response.statusText);
      }
    }
  };
  
  document
    .querySelector('.editItemForm')
    .addEventListener('submit', editItemHandler);