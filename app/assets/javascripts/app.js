$(document).on('turbolinks:load', function () {
  $(document).foundation();
  //$('select[data-prompt]').foundationSelect();
  $('#upload-csv .dropify').dropify({
    messages: {
      'default': 'Drag your product template here or <span>browse</span> to upload'
      , 'replace': 'Drag your File Template here or browse to replace it'
      , 'remove': 'Remove'
      , 'error': 'Ooops, something wrong appended.'
    }
    , tpl: {
      wrap: '<div class="dropify-wrapper"></div>'
      , loader: '<div class="dropify-loader"></div>'
      , message: '<div class="dropify-message"><span class="icon-drag-drop" /> <p>{{ default }}</p></div>'
      , preview: '<div class="dropify-preview"><span class="dropify-render"></span><div class="dropify-infos"><div class="dropify-infos-inner"><p class="dropify-infos-message">{{ replace }}</p></div></div></div>'
      , filename: '<p class="dropify-filename"><span class="file-icon"></span> <span class="dropify-filename-inner"></span></p>'
      , clearButton: '<button type="button" class="dropify-clear">{{ remove }}</button>'
      , errorLine: '<p class="dropify-error">{{ error }}</p>'
      , errorsContainer: '<div class="dropify-errors-container"><ul></ul></div>'
    }
  });
  $('.dropify-po, #upload-po .dropify').dropify({
    messages: {
      'default': 'Drag your purchase order here<br/> or <span>Browse</span> to upload'
      , 'replace': 'Drag your PO file here<br/> or browse to replace it'
      , 'remove': 'Remove'
      , 'error': 'Ooops, something wrong appended.'
    }
    , tpl: {
      wrap: '<div class="dropify-wrapper"></div>'
      , loader: '<div class="dropify-loader"></div>'
      , message: '<div class="dropify-message"><span class="icon-upload-bill" /> <h4>{{ default }}</h4></div>'
      , preview: '<div class="dropify-preview"><span class="dropify-render"></span><div class="dropify-infos"><div class="dropify-infos-inner"><p class="dropify-infos-message">{{ replace }}</p></div></div></div>'
      , filename: '<p class="dropify-filename"><span class="file-icon"></span> <span class="dropify-filename-inner"></span></p>'
      , clearButton: '<button type="button" class="dropify-clear">{{ remove }}</button>'
      , errorLine: '<p class="dropify-error">{{ error }}</p>'
      , errorsContainer: '<div class="dropify-errors-container"><ul></ul></div>'
    }
  });
  $('.item-table table tbody tr').hover(function () {
    $(this).children().last().append('<button data-toggle="edit-item" class="edit" type="button" data-open="product_pop_dic_sell"><i class="fa fa-pencil" aria-hidden="true"></i></button>');
  }, function () {
    $(this).children().last().find('button:last').remove();
  });
  $('.category-table table tbody tr').hover(function () {
    $(this).children().last().append('<button data-toggle="edit-category" class="edit" type="button"><i class="fa fa-pencil" aria-hidden="true"></i></button>');
  }, function () {
    $(this).children().last().find('button:last').remove();
  });
  $('.quantity-table table tbody tr').hover(function () {
    $(this).children().last().append('<button class="close" type="button"><i class="fa fa-close" aria-hidden="true"></i></button>');
    $(this).children().last().find('.close').click(function () {
      $(this).closest('tr').remove();
    });
  }, function () {
    $(this).children().last().find('button:last').remove();
  });
  $('.reveal#edit-item .discounts .tier li input[type="checkbox"]').iCheck({
    checkboxClass: 'icheckbox_minimal'
  });

  $('.items input').on('ifToggled', function () {
    $(this).closest('li').toggleClass('selected');
  });
  $('.items input').iCheck({
    radioClass: 'iradio_minimal'
  });
  $('.refund-request table tbody tr td.option .approve').click(function () {
    $('.refund-request table tbody tr td.option > .button').fadeOut(function () {
      $('.refund-request table tbody tr td.option .input-group, .refund-request table tbody tr td.option .cancel').fadeIn().css('display', 'table');
    });
  });
  $('.refund-request table tbody tr td.option .cancel').click(function () {
    $('.refund-request table tbody tr td.option .input-group, .refund-request table tbody tr td.option .cancel').fadeOut(function () {
      $('.refund-request table tbody tr td.option > .button').fadeIn();
    });
  });
  $('.refund-request table tbody tr td.option .input-group .input-group-button .button').click(function () {
    $('.refund-request table tbody tr td.option .input-group, .refund-request table tbody tr td.option .cancel').fadeOut(function () {
      $('.refund-request table tbody tr td.option').replaceWith('<td><span class="approved">Approved</span>Refund Amount: US$ 165,000</td>');
    });
  });
  $('.refund-request table tbody tr td .reject').click(function () {
    $('.refund-request table tbody tr td.option > .button').fadeOut();
    $('.refund-request table tbody tr td.option').replaceWith('<td><span class="rejected">Rejected</span></td>');
  });
  $('.top-bar .top-bar-right .customer, .main-section .add-cvs, .side-menu aside .add-po, .deal-table .category-active .deal .cancel-promo, .main-section.full-height .tile-grid .tile-box .cancel-button').click(function (e) {
    $('.dropdown', this).toggleClass('active');
  });
  $('.reveal#invite-friends .add button').click(function () {
    $('#invite').append('<div class="row new_row_close"><div class="small-6 columns"><label>Email Address<input type="text"></label></div><div class="small-6 columns"><label>Phone Number<input type="text"></label></div></div>');
  });
  $('.reveal#invite-friends .next').click(function () {
    $('#step-one').fadeOut(function () {
      $('#step-two').fadeIn();
    });
  });

  //TIME BOX
  $('.deal-table .deal-box.category-active .offer .time .time-box, .main-section.full-height .tile-grid .tile-box .bottom-box .time-box, .main-section.full-height .tile-grid .info .completion .time-box').countdown('2018/06/30 23:17:50')
    .on('update.countdown', function (event) {
      var format = '<span><em>%d</em>days</span> <span><em>%H</em>hours</span> <span><em>%M</em>min</span> <span><em>%S</em>sec</span>';
      $(this).html(event.strftime(format));
    })
    .on('finish.countdown', function (event) {
      $(this).html('This offer has expired!')
    });
  // $('.main-section.full-height .tile-grid .info .completion .time-box').countdown('2017/11/27 23:17:50')
  // .on('update.countdown', function(event) {
  //     var format = '<span><em>%H</em>hours</span> <span><em>%M</em>min</span> <span><em>%S</em>sec</span>';
  //     $(this).html(event.strftime(format));
  // })
  // .on('finish.countdown', function(event) {
  //     $(this).html('This offer has expired!')
  // });
  $('.main-section.full-height .tile-grid .tile-box .trash-button').mouseleave(function () {
    $('.tooltip').removeAttr('style');
  });
  $('.form-box .form').mCustomScrollbar({
    theme: "minimal-dark"
  });
  $('.tile-grid .tile-box .add').click(function () {
    if ($('.top-bar .top-bar-right .cart-item').hasClass('has-item')) {
      $('.top-bar .top-bar-right .cart-item').addClass('add');
      setTimeout(function () {
        $('.top-bar .top-bar-right .cart-item').removeClass('add');
      }, 350);
    }
    $('.top-bar .top-bar-right .cart-item').addClass('has-item').text(function (i, t) {
      return Number(t) + 1;
    });
  });



  $('.navTrigger').click(function(){
    $(this).toggleClass('active');
    $(".sidenav").toggleClass("sidenav_w");
  });

  $('.cart_icon').click(function(){

    $(".cart_side_right").toggleClass("cart_side_right_w");
  });

  $(function(){
    $('#dp1').fdatepicker({
      format: 'mm-dd-yyyy',
      disableDblClickSelection: true,
      leftArrow:'<<',
      rightArrow:'>>',
      closeIcon:'X',
      closeButton: true
    });
  });

  $(function() {
    $( "#slider-range" ).slider({
      range: true,
      min: 0,
      max: 500,
      values: [ 75, 300 ],
      slide: function( event, ui ) {
        $( "#amount" ).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
      }
    });
    $( "#amount" ).val( "$" + $( "#slider-range" ).slider( "values", 0 ) +
      " - $" + $( "#slider-range" ).slider( "values", 1 ) );
  });

  $('.imageGallery1 a').simpleLightbox();

  function t(t) {
    $(t).bind("click", function (t) {
      t.preventDefault();
      $(this).parent().fadeOut()
    })
  }

  $(".dropdown-toggle").click(function () {
    var t = $(this).parents(".button-dropdown").children(".dropdown-menu").is(":hidden");
    $(".button-dropdown .dropdown-menu").hide();
    $(".button-dropdown .dropdown-toggle").removeClass("active");
    if (t) {
      $(this).parents(".button-dropdown").children(".dropdown-menu").toggle().parents(".button-dropdown").children(".dropdown-toggle").addClass("active")
    }
  });

  $(document).bind("click", function (t) {
    var n = $(t.target);
    if (!n.parents().hasClass("button-dropdown")) $(".button-dropdown .dropdown-menu").hide();
  });
  $(document).bind("click", function (t) {
    var n = $(t.target);
    if (!n.parents().hasClass("button-dropdown")) $(".button-dropdown .dropdown-toggle").removeClass("active");
  })

  $('#buyer_table').owlCarousel({
    loop:true,
    margin:10,
    responsiveClass:true,
    dots:false,
    autoplay: false,
    nav: true,
    mouseDrag: false,
    navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
    responsive:{
      0:{
        items:1,
        nav:true
      },
      600:{
        items:3,
        nav:false
      },
      1000:{
        items:5,
        nav:true,
        loop:false
      }
    }
  });

  $('#buyer_table_pop').owlCarousel({
    loop:true,
    margin:10,
    responsiveClass:true,
    dots:false,
    autoplay: false,
    nav: true,
    mouseDrag: false,
    navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
    responsive:{
      0:{
        items:1,
        nav:true
      },
      600:{
        items:3,
        nav:false
      },
      1000:{
        items:4,
        nav:true,
        loop:false
      }
    }
  });

  $("#sticker").sticky({ wrapperClassName: 'sticky-wrapper default-height', topSpacing: 115, center:true, className:"hey" });
  $("#sticker-2").sticky({ wrapperClassName: 'sticky-wrapper default-height', topSpacing: 70, center:true, className:"hey" });
  $("#sticker-3").sticky({ wrapperClassName: 'sticky-wrapper default-height', topSpacing: 110, center:true, className:"hey" });

  $('#sticker, #sticker-2, #sticker-3').on('sticky-start', function(){
    $(this).parents('.sticky-wrapper').removeClass('default-height');
  });

  $('#sticker, #sticker-2, #sticker-3').on('sticky-end', function(){
    $(this).parents('.sticky-wrapper').addClass('default-height');
  });

  $(document).on('click', '#add_tier', function () {
    $table = $(this).parents('.Modal_footer').prev().find('#mytable');
    var tds = '<tr>';
    jQuery.each($('tr:last td', $table), function () {
      tds += '<td>' + $(this).html() + '</td>';
    });
    tds += '</tr>';
    $('tbody', $table).append(tds);
  });


  $("#add_tier-2").click(function () {
    $("#mytable-2").each(function () {
      var tds = '<tr>';
      jQuery.each($('tr:last td', this), function () {
        tds += '<td>' + $(this).html() + '</td>';
      });
      tds += '</tr>';
      if ($('tbody', this).length > 0) {
        $('tbody', this).append(tds);
      } else {
        $(this).append(tds);
      }
    });
  });
  /*--
    Product Quantity
    -----------------------------------*/
  $('.product-quantity').append('<span class="dec qtybtn"><i class="fa fa-minus"></i></span><span class="inc qtybtn"><i class="fa fa-plus"></i></span>');
  $('.qtybtn').on('click', function() {
    var $button = $(this);
    var oldValue = $button.parent().find('input').val();
    if ($button.hasClass('inc')) {
      var newVal = parseFloat(oldValue) + 1;
    } else {
      // Don't allow decrementing below zero
      if (oldValue > 0) {
        var newVal = parseFloat(oldValue) - 1;
      } else {
        newVal = 0;
      }
    }
    $button.parent().find('input').val(newVal);
  });



  /*shipping addredd Toggle*/
  $(".toggle_btn").click(function(){
    $(".shipping_addresss").toggle();
  });
  $(".toggle_btn").click(function(){
    $(".toggle_btn").toggleClass("button_style");
  });

  $(".hide_hi").click(function(){
    $(".show_hide_d").toggle();
  });

  $(".hide_list_price").click(function(){
    $(".show_price_de").toggle();
  });

  $(".hide_hi_c").click(function(){
    $(".show_hide_d_c").toggle();
  });

  $(".hide_list_price_c").click(function(){
    $(".show_price_de_c").toggle();
  });




});

