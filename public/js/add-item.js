async function newFormHandler(event) {
    event.preventDefault();
    const item_name = document.querySelector('#item_name').value;
    const description = document.querySelector('#description').value;
    const owner_name = document.querySelector('#owner_name').value;
  
    const response = await fetch(`/api/item`, {
      method: 'POST',
      body: JSON.stringify({
        item_name,
        description,
        owner_name,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  
    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to add dish');
    }
  }
  
  document.querySelector('.new-item-form').addEventListener('submit', newFormHandler);la
  