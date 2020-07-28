/* API of Unsplash */
const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false; 
let imagesLoaded = 0; 
let totalImages = 0; 

let photosArray = [];
let count = 5; 
const ApiKey = 'cH4DzUBcs0QGWZoNsU-Vzjipxf1XdCUkNyZ4hZNmEnw'; 
const ApiUrl = `https://api.unsplash.com/photos/random/?client_id=${ApiKey}&count=${count}`;


//Check if all images are loaded: 
function imageLoaded() {

    imagesLoaded++; 
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
        count = 30;
        ApiUrl = `https://api.unsplash.com/photos/random/?client_id=${ApiKey}&count=${count}`;

    }
}

//Helper elements 

function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key,attributes[key]);
    }
}

//Create for Links, photos, and details in the DOM 
function displayPhotos () {
    imagesLoaded = 0; 
    totalImages = photosArray.length;


    //Run function to get the photos
    photosArray.forEach((photo) => {
        const item = document.createElement('a');
        //Create image for photo
        const img = document.createElement('img');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank'
        });
        
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        });

        //When app is finished loading 
img.addEventListener('load', imageLoaded);

        //Put image inside <a> 
        item.appendChild(img);
        imageContainer.appendChild(item);

    });
}


/* Get Photos Using Unsplash API */
async function getPhotos () {

    try {
        const response = await fetch(ApiUrl);
        photosArray = await response.json(); 
        displayPhotos(); 

    } catch (error) {
            //Catch Error

    }

}

//Event listener to check how often it is clicked

window.addEventListener('scroll', () => {
    
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000
        &&ready) {
            ready = false;
        getPhotos();
    }

});

//On Load
getPhotos(); 