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
  const URL = "https://teachablemachine.withgoogle.com/models/Wpx9tzm7e/";

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
      case "꾸안꾸룩":
        resultMessege = "꾸안꾸룩은 꾸민 듯 안 꾸민듯한 룩의 줄임말로, 내추럴한 멋이 살아있는 스타일을 말한다. 가벼운듯하면서도 약간의 포인트 들로 꾸안꾸 느낌이 나는 이쁜 룩! 절대로 대충 입은 거 같지는 않다는 사실!"
        resultBIG = "꾸안꾸룩"

        break;
      case "러블리룩":
        resultMessege = "러블리란 '사랑스러운'이라는 뜻으로 누가 봐도 사랑스럽고 이쁜 느낌의 스타일이다. 화사하고 귀여운 느낌까지! 남자들이 좋아할 만한 이쁜 룩!"
        resultBIG = "러블리룩"
        
        break;
      case "미니멀룩":
        resultMessege = "미니멀룩이란 같은 색이나, 같은 색 계열의 색감으로 코디하고 아주 극도로 심플함을 추구하는 패션 스타일이다. 미니멀룩은 톤앤톤 코디를 하기 굉장히 편할 뿐 아니라 굉장히 멋있는 스타일을 연출할 수 있다. 깔끔하지만 엄청난 매력을 가진 룩!"
        resultBIG = "미니멀룩"
        
        break;
      case "시크룩":
        resultMessege = "시크하다'는 말은 패션 분야에서 주로 쓰이는 용어로, '세련된, 맵시 나는' 등의 뜻을 가진 독일어 쉬크(Schick)에서 유래됐다. 검정 계열의 원피스나 자켓 등 과 함께 매치하면 시크한 여자의 느낌이 물씬!"
        resultBIG = "시크룩"
        
        break;
      case "아메카지룩":
        resultMessege = "아메카지라는 단어는 아메리칸 캐주얼을 일본식으로 줄인 말로, 아메카지는 20세기 중반 미국의 워크웨어 룩이 일본의 복고풍과 결합하면서 캐주얼하게 재해석 된 스타일입니다. 통 넓은 셀비지 진이나 옥스퍼드 셔츠 등의 아이템으로 아메카지룩을 연출 할 수 있다는 점!"
        resultBIG = "아메카지룩"
        
        break;
      case "스포티룩":
        resultMessege = "스포티룩은 일상복으로도 손색이 없으며 운동복을 입었을 때의 편안함과 활동성까지 가져가는 스타일을 뜻한다. 주로 레깅스나 가벼운 바람막이와 매치해 조깅이나 등산에 갈 때 입으면 센스쟁이!"
        resultBIG = "스포티룩"
        
        break;
      case "오피스룩":
        resultMessege = "오피스룩이란 'Office' 즉 사무실에서 입는 스타일이다. 회사에서 주로 입으며 흰색 셔츠와 타이트스커트를 매치해 깔끔하고 격식 있는 느낌을 준다. 요즘에는 회사뿐 아니라 평소에도 오피스 스타일로 입는 사람들이 많아져 흔히 볼 수 있는 스타일 중 하나이다."
        resultBIG = "오피스룩"
        
        break;
      case "모던캐주얼룩":
        resultMessege = "캐주얼은 '격식을 차리지 않는, 무관심한'이란 뜻으로 캐주얼 스타일은 '경쾌한 옷차림', '평상시 격식에 메이지 않고 가볍게 입을 수 있는 옷차림'을 말합니다. 요즘은 '원마일웨어'라고도 불리며 가볍게 외출할 때 입을 수 있는 실용적이면서도 외출복으로 손색 없는 패션이다."
        resultBIG = "모던캐주얼룩"
        

        break;

      case "스트릿룩":
        resultMessege = "자기 개성대로 자유롭게 입는 스타일, 스트릿 문화(힙합, 보드)에 기반한 스타일로 젊은층이 입는 현재 유행하는 스타일이다. 슈프림,팔라스,베이프 등 서브컬쳐를 기반으로 한 유명한 브랜드들이 많은 인기를 얻고 있다.  힙한 느낌이 물씬 풍기는 스타일이 이군요! *_*신발을 포인트로 스트릿 느낌을 살리는 것이 중요!"
        resultBIG = "스트릿룩"
        

        break;
      case "패션테러리스트":
        resultMessege = "당신은 패션 테러리스트입니다. 친구들 사이에서 옷 못 입는다는 소리 들어보신 적 없으신가요? 패션 센스를 더 길러야 할 필요성이 느껴지는 룩입니다."
        resultBIG = "FASHION TERRORIST"
        
        break;

      case "페미닌룩":
        resultMessege = "'feminine' 여성스러운이라는 뜻으로 우아하고 세련된 분위기의 스타일이다. 여성스러운 블라우스나 원피스 등으로 고급스러운 분위기를 표현할 수 있는 룩이다."
        resultBIG = "페미닌룩"
        
        break;

      case "바닷가룩":
        resultMessege = "시원한 바람이 부는 바닷가에서 입으면 좋을 스타일이군요! 근처 바닷가 해변으로 떠나 보는 건 어떨까요? 해변가에서 모두의 관심과 이목을 집중 시킬 룩!"
        resultBIG = "바닷가룩"
        
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
