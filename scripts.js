const imgContainer = document.getElementById('image-container');
const loader = document.getElementById('loader-container');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];


const count = 20;
var key = config.apiKey;
//const apiKey =config.apiKey;

const apiUrl = `https://api.unsplash.com/photos/random?client_id=${key}&count=${count}`;

//check all img are loaded
function imgloaded(){
    console.log('img loaded');
    imagesLoaded++;
    if(imagesLoaded === totalImages)
    {
        ready = true;
        loader.hidden = true;

    }
}

//create elements for links and photos,  add to dom
function displayPhoto() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    //run function for photos array
    photosArray.forEach((photo) => {
        //create <a> link to Unsplash

        const item =document.createElement('a');
        item.setAttribute('href', photo.links.html);
        item.setAttribute('target', '_blank');  

        //create <img> for photo
        const img =  document.createElement('img');
        img.setAttribute('src', photo.urls.regular);
        img.setAttribute('alt', photo.alt_description);
        img.setAttribute('title', photo.alt_description);

        //event listener when each loading is finished
        img.addEventListener('load', imgloaded);
        //put <img> in <a> , and put both in imgContainer
        item.appendChild(img);
        imgContainer.appendChild(item);
    });
}

//get photos from Unsplash api 
async function getPhotos() {
    try
    {
      const response = await fetch(apiUrl);
       photosArray = await response.json();
    
       displayPhoto();

    }
    catch(error)
    {
      console.log(error);
    }
}

//check to see if scrolling is near bottom of, load more images
window.addEventListener('scroll', () => {
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready)
    {
        ready = false;
        getPhotos();
    }
    
});

//on load
getPhotos();