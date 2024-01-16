
const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');

        const response = await fetch(`/api/events/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            document.location.replace('/myevents');
        } else {
            alert('Failed to delete project');
        }
    }
};

document
    .querySelector('.event-list')
    .addEventListener('click', delButtonHandler);