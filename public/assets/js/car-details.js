document.addEventListener('DOMContentLoaded', function () {
    // Küçük resimleri seç
    var smallImages = document.querySelectorAll('.sub-image');

    // Her küçük resme tıklama olayı ekleyin
    smallImages.forEach(function (image) {
        image.addEventListener('click', function () {
            // Küçük resmin kaynak (src) değerini ana resmin kaynakı ile değiştir
            document.getElementById('mainImage').src = image.src;
        });
    });
});
