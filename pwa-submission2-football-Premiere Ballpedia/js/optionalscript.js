document.addEventListener("DOMContentLoaded", function () {
    //slider
    $('.slider').slider({
       full_width: true,
       height: 800, // defaultnya - height : 400
       interval: 8000 // defaultnya - interval: 6000
    });
    //scrolling otomatis
    $('.scrollspy').scrollSpy(); 
})