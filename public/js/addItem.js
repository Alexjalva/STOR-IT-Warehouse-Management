

const addItemHandler = async (event) => {
    event.preventDefault();
    console.log("tried adding");
    // Collect values from the login form
    const name = document.querySelector('#nameInput').value.trim();
    const dimensions = document.querySelector('#itemDimensions').value.trim();
    const owner = document.querySelector('#itemOwner').value.trim();
    const location = document.querySelector('#itemLocation').value.trim();
    const value = document.querySelector('#itemValue').value.trim();
    const picture = document.querySelector('#itemPicture').value.trim();
    const comments = document.querySelector('#itemComments').value.trim();
    const category = document.querySelector('#category').value.trim();

    // cloudinary.uploader.upload(
    //     picture, 
    //     {public_id: name}, 
    //     function(error, result) { 
    //       console.log(result) 
    //     }
    //   );

    // let category = await Category.findOne({ where: {name: categoryName}});
    // if(category == null){
    //     category = await Category.create({ name: categoryName});
    // }
    // const catID = category.id;
  
    if (name && dimensions && owner && location && value && picture && comments && category) {
      // Send a POST request to the API endpoint
      const response = await fetch('/api/items', {
        method: 'POST',
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
    .querySelector('.addItemForm')
    .addEventListener('submit', addItemHandler);
  
