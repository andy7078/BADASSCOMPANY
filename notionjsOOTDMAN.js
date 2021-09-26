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
  const URL = "https://teachablemachine.withgoogle.com/models/ikKqPHmNb/";

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
    prediction.sort((a, b) => parseFloat(b.probability) - parseFloat(a.probability));
    var resultMessege
    var resultBIG
    switch (prediction[0].className) {
      case "댄디룩":
          resultMessege = "'댄디'란 멋쟁이 신사 라는 뜻으로 깔끔하고 신사적인 느낌으로 옷을 매치하는 스타일링입니다. 주로 남성다움을 어필하거나 격식있게 멋을 낼 수 있는 아주 멋진 스타일링!"
          resultBIG = "Dandy Look"
          

          break;
        case "아메카지룩":
          resultMessege = "아메카지라는 단어는 아메리칸 캐주얼을 일본식으로 줄인 말로, 아메카지는 20세기 중반 미국의 워크웨어 룩이 일본의 복고풍과 결합하면서 캐주얼하게 재해석 된 스타일입니다. 통 넓은 셀비지 진이나 옥스퍼드 셔츠 등의 아이템으로 아메카지룩을 연출 할 수 있다는 점!"
          resultBIG = "American casual look"
          
          break;
        case "남친룩":
          resultMessege = "내 남자친구가 입어줬으면 하는 옷 스타일로써 깔끔하고 보기 좋은 스타일링입니다. 셔츠나 맨투맨 등으로 남자다움과 귀여움을 동시에 연출 할 수 있는 여자들에게 인기만점 스타일링!"
          resultBIG = "Boyfriend look"
          
          break;
        case "미니멀룩":
          resultMessege = "미니멀룩이란 같은 색이나, 같은 색 계열의 색감으로 코디하고 아주 극도로 심플함을 추구하는 패션 스타일이다. 미니멀룩은 톤앤톤 코디를 하기 굉장히 편할 뿐 아니라 굉장히 멋있다."
          resultBIG = "Minimal look"
          
          break;
        case "스트릿룩":
          resultMessege = "스트릿룩: 자기 개성대로 자유롭게 입는 스타일, 스트릿 문화(힙합, 보드)에 기반한 스타일로 젊은층이 입는 현재 유행하는 스타일이다. 슈프림,팔라스,베이프 등 서브컬쳐를 기반으로 한 유명한 브랜드들이 많은 인기를 얻고 있다. 신발을 포인트로 스트릿 느낌을 살리는 것이 중요!"
          resultBIG = "Street look"
          
          break;
        case "그런지룩":
          resultMessege = "그런지 룩이란 과거 1990년대 초에 등장한 의상 스타일로 낡아 보이고 아예 크거나 아주 작은 사이즈의 옷을 매치하는 스타일링입니다. 커트 코베인의 패션이 그런지 룩에 많은 영향을 주었고 한국에서는 키드 밀리와 딘의 옷 스타일이 그런지 스타일이라고 볼 수 있습니다. 찢어 진 청바지나 모헤어 카디건을 매치해 빈티지한 무드를 연출하는 것이 이 룩에 특징이라고 할 수 있음!"
          resultBIG = "Grunge look"
          
          break;
        case "락시크룩":
          resultMessege = "'락(Rock) + 시크(Chic)'의 합성어로 락적이면서 시크한 면을 강조한 룩 입니다. 주로 검정 자켓과 스키니 핏으로 락스타의 느낌을 살려 아주 멋진 느낌을 낼 수 있는 패션스타일!"
          resultBIG = "RockChic look"
          
          break;
        case "캐주얼룩":
          resultMessege = "캐주얼은 '격식을 차리지 않는, 무관심한'이란 뜻으로 캐주얼 스타일은 '경쾌한 옷차림', '평상시 격식에 메이지 않고 가볍게 입을 수 있는 옷차림'을 말합니다. 요즘은 '원마일웨어'라고도 불리며 가볍게 외출할 때 입을 수 있는 실용적이면서도 외출복으로 손색 없는 패션이다."
          resultBIG = "Casual look"
          

          break;

        case "패션테러리스트":
          resultMessege = "당신은 패션 테러리스트입니다. 친구들 사이에서 옷 못 입는다는 소리 들어보신 적 없으신가요? 패션 센스를 더 길러야 할 필요성이 느껴지는 룩입니다."
          resultBIG = "FASHION TERRORIST"
          
          break;

        case "노출":
          resultMessege = "아.. 이러고 밖에 나가시려구요? 무슨말인지는 자신이 제일 잘 알거라 생각이 드네요."
          resultBIG = "진짜 이러고 나가시려구요?"
          
          break;

        case "군인":
          resultMessege = "당신은 대한민국을 지키는 자랑스러운 국군 장병입니다. 사회에서 입은 옷으로 다시 올려주세요."
          resultBIG = "자랑스러운 대한민국 국군 장병"
          
          break;

        case "고양이":
          resultMessege = "고양이 사진을 올리셨군요 고양이가 아니라구요? 고양이상 이신가봐요! 야옹야옹야옹야옹!"
          resultBIG = "고양이"
          
          break;

        case "강아지":
          resultMessege = "강아지 사진을 올리셨군요 강아지가 아니라구요? 강아지상 이신가봐요! 뭉멍멍멍!"
          resultBIG = "강아지"
          
          break;

        default:
          resultMessege = "오류가 발생했습니다"
          
          break;
      }

    firstper = prediction[0].probability;
      secondper = prediction[1].probability;
      thirdper = prediction[2].probability;


      (function ($) {

        $('.first.circle').circleProgress({
          value: firstper
        }).on('circle-animation-progress', function (event, progress) {
          $(this).find('strong').html(Math.round(firstper * 100 * progress) + '<i>%</i>');
        });

      })(jQuery);

      (function ($) {

        $('.second.circle').circleProgress({
          value: secondper
        }).on('circle-animation-progress', function (event, progress) {
          $(this).find('strong').html(Math.round(secondper * 100 * progress) + '<i>%</i>');
        });

      })(jQuery);

      (function ($) {

        $('.third.circle').circleProgress({
          value: thirdper
        }).on('circle-animation-progress', function (event, progress) {
          $(this).find('strong').html(Math.round(thirdper * 100 * progress) + '<i>%</i>');
        });

      })(jQuery);

      console.log(prediction[0].className);
      console.log(prediction[1].className);
      console.log(prediction[2].className);
      console.log(resultBIG);
      console.log(resultMessege);
      $('.first-fashion').html(prediction[0].className);
      $('.second-fashion').html(prediction[1].className);
      $('.third-fashion').html(prediction[2].className);

      $('.first-per').html(Math.floor((prediction[0].probability) * 100));
      $('.second-per').html(Math.floor((prediction[1].probability) * 100));
      $('.third-per').html(Math.floor((prediction[2].probability) * 100));

      $('.result-message').html(resultMessege);
      $('.BIG-result').html(resultBIG);



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
