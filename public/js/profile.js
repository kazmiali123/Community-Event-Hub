const newFormHandler = async (event) => {
  event.preventDefault();
  const name = document.querySelector('#event-name').value.trim();
  const description = document.querySelector('#event-desc').value.trim();
  const guidelines = document.querySelector("#event-guidelines").value.trim();
  const time = document.querySelector("#event-time").value.trim();
  const date = document.querySelector("#event-date").value.trim();
  const location_name = document.querySelector("#event-address").value.trim();
  const organizer_id = document.querySelector("#event-organizer").value.trim();
  console.log(name);
  // if (name && description && guidelines && time && date && location_name && organizer_id) {
    if (name && description) {
    const response = await fetch('/api/events', {
      method: 'POST',
      body: JSON.stringify({ name, description}),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to create project');
    }
  }
};
const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');
    const response = await fetch(`/api/events/${id}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to delete project');
    }
  }
};
document
  .querySelector('.new-event-form')
  .addEventListener('submit', newFormHandler);
// document
//   .querySelector('.event-list')
//   .addEventListener('click', delButtonHandler);