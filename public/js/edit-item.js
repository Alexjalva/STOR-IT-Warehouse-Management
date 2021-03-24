async function editFormHandler(event) {
    event.preventDefault();
    const item_name = document.querySelector('#item_name').value;
    const description = document.querySelector('#description').value;
    const owner_name = document.querySelector('#owner_name').value;
  
   const id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];

    const response = await fetch(`/api/item/${id}`, {
      method: 'PUT',
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
      document.location.replace(`/item/${id}`);
    } else {
      alert('Failed to edit item');
    }
  }
  
  document.querySelector('.edit-dish-form').addEventListener('submit', editFormHandler);
  