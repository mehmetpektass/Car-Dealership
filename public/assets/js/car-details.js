document.addEventListener('DOMContentLoaded', function () {
   
    var smallImages = document.querySelectorAll('.sub-image');

    smallImages.forEach(function (image) {
        image.addEventListener('click', function () {
            document.getElementById('main-image').src = image.src;
        });
    });
});
