var iPhone = /iPhone/.test(navigator.userAgent) && !window.MSStream;
var iPad = /iPad/.test(navigator.userAgent) && !window.MSStream;
var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
if(iPhone){
    $('body').addClass('iphone');
}
if(iPad){
    $('body').addClass('ipad');
}
var ua = navigator.userAgent.toLowerCase();
if (ua.indexOf('safari') != -1) {
  if (ua.indexOf('chrome') > -1) {
    // alert("1") // Chrome
  } else {
    // alert("2") // Safari
    $('body').addClass('safari');
  }
}

if(window.navigator.userAgent.indexOf("Edge") > -1) {
  $('body').addClass('edge');
}

var UAString = navigator.userAgent;
if (UAString.indexOf("Trident") !== -1 && UAString.indexOf("rv:11") !== -1)
{
  $('body').addClass('ie');
}
if (UAString.indexOf("Trident") !== -1 && UAString.indexOf("rv:10") !== -1)
{
  $('body').addClass('ie');
}

$(document).ready(function () {

  $('.chat-btn').click(function () {
    $('.chat').addClass('open');
    $('body').addClass('modal-open');
  });

  $('.chat .close').click(function () {
    $('.chat').removeClass('open');
    $('body').removeClass('modal-open');
  });

  $('.phone-field').inputmask({"mask": "+38 (099) 99-99-999"});

  $('.phone-field').keyup(function () {
    console.log($(this).val());
    if($(this).val().indexOf('_') === -1 && $(this).val().length > 0) {
      $(this).parent().addClass('valid');
    } else {
      $(this).parent().removeClass('valid');
    }
  });

  $('.mail-field').keyup(function () {
    var reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    console.log(reg.test($(this).val()) !== false);
    if(reg.test($(this).val()) !== false) {
      $(this).parent().addClass('valid');
    } else {
      $(this).parent().removeClass('valid');
    }
  });


  // checking browser for WEBP
  // hasWebP().then(function () {
  //
  //   if($(window).width() > 768) {
  //     $('.webp-img').each(function () {
  //       var webp = $(this).data('webp');
  //       $(this).attr('data-blazy', webp);
  //     });
  //   } else {
  //     $('.webp-img').each(function () {
  //       var webp;
  //       if($(this).data('webp-mobile') !== undefined)
  //         webp = $(this).data('webp-mobile'); else webp = $(this).data('webp');
  //       console.log($(this).data('webp-mobile'));
  //       $(this).attr('data-blazy', webp);
  //     });
  //   }
  //
  //   bLazy.revalidate();
  //
  // }, function () {
  //   if($(window).width() > 768) {
  //     $('.webp-img').each(function () {
  //       var img = $(this).data('img');
  //       $(this).attr('data-blazy', img);
  //     });
  //   } else {
  //     $('.webp-img').each(function () {
  //       var img;
  //       if($(this).data('img-mobile') !== undefined)
  //         img = $(this).data('img-mobile'); else webp = $(this).data('img');
  //       $(this).attr('data-blazy', img);
  //     });
  //   }
  //
  //   bLazy.revalidate();
  // });

  var stockSlider = new Swiper('.stock-slider-js', {
    // Optional parameters
    slidesPerView: 1.1,
    centeredSlides: true,
    loop: true,
    breakpoints: {
      550: {
        slidesPerView: 2.1,
      },
      800: {
        slidesPerView: 2.1,
      },
      1024: {
        slidesPerView: 4.1,
      },
    }
  })

  var faqTabSlider = new Swiper('.faq-tab-slider-js', {
    // Optional parameters
    slidesPerView: 'auto',
    spaceBetween: 10,
    centeredSlides: true,
    loop: true,
  });

  var ordersTab = new Swiper('.orders-tab-js', {
    slidesPerView: 'auto',
    spaceBetween: 10,
    // slidesPerView: 3,
    freeMode: true,
    touchRatio: 0,
    watchSlidesVisibility: true,
    watchSlidesProgress: true,
  });
  var ordersContent = new Swiper('.orders-content-js', {
    spaceBetween: 10,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    autoHeight: true,
    thumbs: {
      swiper: ordersTab
    },
    on: {
      init: function () {
        ordersButtonChange();
      },
    },
  });

  ordersContent.on('transitionEnd', function(){
    ordersButtonChange();
  });

  function ordersButtonChange(){
    var windowHeight = $(window).height();
    // var windowHeight = $('.page-flow-wrap').height();
    var documentHeight = $(document).height();
    var orderBtnOffsetTop = $('.orders__btn').offset().top;

    if(orderBtnOffsetTop > windowHeight - 100){
      $('.orders__btn-i').addClass('fixed');
    } else {
      $('.orders__btn-i').removeClass('fixed');
    }
    // alert(windowHeight +' - высота окна \n ' + documentHeight + ' - высота документа\n ' + orderBtnOffsetTop + '- высота кнопки');
    // alert($('.content-block').height());
  }



  $('.login-page__show-pass').click(function (e) {
    e.preventDefault();
    var type = $(this).siblings('input').attr('type');
    if(type == 'password'){
      $(this).siblings().attr('type', 'text');
    } else {
      $(this).siblings().attr('type', 'password');
    }
  });

  $(document).on('click', '.project__tabs-i', function (e) {
    var actualTab = $(this).attr('data-tab');
    $('.project__tabs-i').removeClass('active');
    $(this).addClass('active');

    $('.project__files-section').removeClass('active');
    $('.project__files-section.' + actualTab).addClass('active');
  });

  var limitSlider = $('.slider');

  limitSlider.each(function () {
    noUiSlider.create($(this)[0], {
      start: [60],
      behaviour: 'drag',
      connect: 'lower',
      range: {
        'min': 0,
        'max': 100
      }
    });

    var that = $(this);

    $(this)[0].noUiSlider.on('update', function (values, handle) {
      that.parent().find('.slider-count').val(parseInt(values[handle]));
    });
  });

  $('.site-form .site-form__file input[type="file"]').change(function () {
    if($(this).val() == ''){
      return;
    }
    readURL(this);
  });

  function readURL(input) {
    if (input.files.length > 0) {
      var container = $(document).find(input).closest('.form-group').find('.site-form__file-load')
      var files = $(input).prop("files");
      $(files).each(function () {
        container.append('<div>' + $(this).prop("name") + '</div>');
      });
    }
  }

  $(document).on('click', '.site-form__file-load > div', function (e) {
    $(this).remove();
  });

  $('button[data-dismiss-modal="i-btn-js"], .i-btn-js').click(function(e){
    $(this).closest('.i-btn-js').modal('hide');
    setTimeout(function () {
      $('body').addClass('modal-open');
    }, 400);
  });

  $(document).on('click', '.site-btn-form-valid-js', function (e) {
    e.preventDefault();
    var form = $(this).closest('form.site-form-need-valid-js');
    var formInput = form.find('input.required');

    formInput.each(function () {
      if($(this).val().length != 0){
        $(this).parent().addClass('valid');
        $(this).parent().removeClass('novalid');
      } else {
        $(this).parent().addClass('novalid');
        $(this).parent().removeClass('valid');
      }
    });

    if(form.find('.novalid').length == 0 && form.find('.valid').length > 0){
      /*valid susses ajax*/
      $('.create-order-js').modal('show');
    }
  });



  $('a.chat__add-file').click(function (e) {
    e.preventDefault();
    $('input[type="file"].chat__input-file').click();
  });

  $('input[type="file"].chat__input-file').change(function (e) {
    if($(this).val() == ''){
      return;
    }
    readURLchat(this);
  });

  function readURLchat(input) {
    if (input.files.length > 0) {
      var container = $(document).find('.chat__files-block .site-form__file-load');
      console.log(container);
      var files = $(input).prop("files");
        $(files).each(function () {
        container.append('<div>' + $(this).prop("name") + '</div>');
      });

      console.log($(input).prop('files'));

      var chatCount = $('.site-form__file-load > div').length;
      console.log(chatCount);
      $('.chat__add-file').addClass('count-file');
      $('.chat__add-file').attr('data-count', chatCount);
    }
  }

  $(document).on('click', '.chat__files-block .site-form__file-load div', function (e) {
    $(this).remove();
    var chatCount = $('.site-form__file-load > div').length;
    if(chatCount == 0){
      $('.chat__add-file').removeClass('count-file');
      $('.chat__add-file').attr('data-count', '');
    } else {
      $('.chat__add-file').addClass('count-file');
      $('.chat__add-file').attr('data-count', chatCount);
    }
  });

  var ecranHeight = $(window).height();
  $('.login-page__inner').css({ 'min-height': ecranHeight });
  $( window ).resize(function() {
    $('.login-page__inner').css({ 'min-height': ecranHeight });
  });

});


//script fro webp img and background
// var hasWebP = (function () {
//   // some small (2x1 px) test images for each feature
//   var images = {
//     basic: "data:image/webp;base64,UklGRjIAAABXRUJQVlA4ICYAAACyAgCdASoCAAEALmk0mk0iIiIiIgBoSygABc6zbAAA/v56QAAAAA==",
//     lossless: "data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAQAAAAfQ//73v/+BiOh/AAA="
//   };
//
//   return function (feature) {
//     var deferred = $.Deferred();
//
//     $("<img>").on("load", function () {
//       // the images should have these dimensions
//       if (this.width === 2 && this.height === 1) {
//         deferred.resolve();
//       } else {
//         deferred.reject();
//       }
//     }).on("error", function () {
//       deferred.reject();
//     }).attr("src", images[feature || "basic"]);
//
//     return deferred.promise();
//   }
// })();

