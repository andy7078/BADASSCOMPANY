function readURL(input) {
  if (input.files && input.files[0]) {

    var reader = new FileReader();

    reader.onload = function (e) {
      $('.image-upload-wrap').hide();

      $('.file-upload-image').attr('src', e.target.result);
      $('.file-upload-content').show();

      $('.image-title').html(input.files[0].name);
    };

    reader.readAsDataURL(input.files[0]);
    init().then(() => {
      predict();
    });
  } else {
    removeUpload();
  }
}

function removeUpload() {
  $('.file-upload-input').replaceWith($('.file-upload-input').clone());
  $('.file-upload-content').hide();
  $('.image-upload-wrap').show();
}
$('.image-upload-wrap').bind('dragover', function () {
  $('.image-upload-wrap').addClass('image-dropping');
});
$('.image-upload-wrap').bind('dragleave', function () {
  $('.image-upload-wrap').removeClass('image-dropping');
});
$("#loading").show();


// More API functions here:
// https://github.com/googlecreativelab/teachablemachine-community/tree/master/libraries/image

// the link to your model provided by Teachable Machine export panel
const URL = "https://teachablemachine.withgoogle.com/models/VqOEU2xlH/";

let model, webcam, labelContainer, maxPredictions;

// Load the image model and setup the webcam
async function init() {
  const modelURL = URL + "model.json";
  const metadataURL = URL + "metadata.json";

  // load the model and metadata
  // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
  // or files from your local hard drive
  // Note: the pose library adds "tmImage" object to your window (window.tmImage)
  model = await tmImage.load(modelURL, metadataURL);
  maxPredictions = model.getTotalClasses();
  labelContainer = document.getElementById("label-container");
  for (let i = 0; i < maxPredictions; i++) { // and class labels
    labelContainer.appendChild(document.createElement("div"));
  }
}
// run the webcam image through the image model
async function predict() {
  // predict can take in an image, video or canvas html element
  var image = document.getElementById("fashion-image");
  const prediction = await model.predict(image, false);
  $("#loading").hide();
  var facegrade = Math.floor((prediction[0].probability)*100);



  //var x = document.getElementById("resultbar");
  //x.style.width = facegrade + '<i>%</i>';
  console.log(facegrade);

  


$('.permsg').html("상위" + Math.floor((prediction[1].probability) * 100) + '<i>%</i>');
$('.progress').html('<span class="progress-bar" style="width:'+ facegrade + '%'+ '"></span>');
$('.persco').html(Math.floor((prediction[0].probability) * 2356)/2 + "점");
}


  function showPopup(multipleFilter) {
  const popup = document.querySelector('#popup');

if (multipleFilter) {
    popup.classList.add('multiple-filter');
} else {
    popup.classList.remove('multiple-filter');
}

popup.classList.remove('hide');
}

function closePopup() {
  const popup = document.querySelector('#popup');
popup.classList.add('hide');
}
