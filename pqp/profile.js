
document.querySelector("#form").addEventListener('submit', function (event) {
    event.preventDefault();

    let reader = new FileReader();
    let image = document.querySelector("#image");

    reader.onload = function(event) {
        let face = event.target.result;
        jirungeface.src = face;
    };

    if (image.files[0]) {
        reader.readAsDataURL(image.files[0]);
    }
});
