const uploadedImage = document.getElementById('uploaded-image');
const uploadBox = document.getElementById('upload-box');
const submitBtn = document.getElementById('submit-btn');
const eventForm = document.getElementById('create-event-form');

uploadedImage.setAttribute("style", "display:none;");
uploadBox.setAttribute("style", "display:none;");


let location_name;
let location_lat;
let location_long;
let imageURL;
let event_id;


const options = {
    apiKey: "public_kW15brd5HaXPzB3i1HpXV6akzVQ4",
    editor: {
        images: {
            crop: false
        }
    },
    maxFileCount: 1,
    maxFileSizeBytes: 3000000,
    // Dropzone configuration:
    layout: "inline",
    container: "#upload-box",
    showFinishButton: true,


};

Bytescale.UploadWidget.open(options).then(
    files => {
        const fileUrls = files.map(x => x.fileUrl).join("\n");
        const success = fileUrls.length === 0
            ? "No file selected."
            : `File uploaded:\n\n${fileUrls}`;
        imageURL = fileUrls;
        alert(success);
    },
    error => {
        alert(error);
    }
).then(() => {
    uploadedImage.setAttribute("src", `${imageURL}`);
    uploadedImage.style.display = "block";
    uploadedImage.style.width = "200px";
    uploadedImage.style.height = "150px";

    if (imageURL && event_id) {
        let url = imageURL;
        const response = fetch(`/api/images`, {
            method: 'POST',
            body: JSON.stringify({ url, event_id }),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((data) => {
                document.location.replace('/event/' + event_id);
            });
    }
});



const newFormHandler = async (event) => {
    event.preventDefault();

    const name = document.querySelector('#event-name').value.trim();
    const description = document.querySelector('#event-desc').value.trim();
    const guidelines = document.querySelector('#event-guidelines').value.trim();
    const time = document.querySelector('#event-time').value.trim();
    const date = document.querySelector('#event-date').value.trim();

    if (name && description && guidelines && time && date && location_name && location_lat && location_long) {
        const response = await fetch(`/api/events`, {
            method: 'POST',
            body: JSON.stringify({ name, description, guidelines, time, date, location_name, location_lat, location_long }),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((data) => {
                event_id = data.id;
                eventForm.setAttribute("style", "display:none;");
                uploadBox.style.display = "block";
                uploadBox.style.width = "500px";
                uploadBox.style.height = "400px";
            })
            .catch((err) => console.log(err));
    }
};

const handleAddressSearch = (event) => {
    event.preventDefault();
    const addressLookUp = document.querySelector('#event-address').value.trim();

    let url = "https://nominatim.openstreetmap.org/search?format=json&limit=3&q=" + addressLookUp;

    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            if (data.length === 0) {
                alert('invalid address, please retry');
            } else {
                location_name = data[0].display_name;
                location_lat = data[0].lat;
                location_long = data[0].lon;
                document.querySelector('#search-btn')
                    .setAttribute("style", "display:none;");
                document.querySelector('#event-address')
                    .setAttribute("readonly", "");
            }
        })
        .catch((err) => {
            console.log(err);
        });
};


submitBtn.addEventListener('click', newFormHandler);

document
    .querySelector('#search-btn')
    .addEventListener('click', handleAddressSearch);