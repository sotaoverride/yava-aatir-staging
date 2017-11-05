// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require jquery.remotipart
//= require turbolinks
//= require libs.min
//= require foundation-sites/dist/js/foundation.min
//= require what-input/dist/what-input
//= require ajaxScripts
//= require foundation-datepicker/js/foundation-datepicker
//= require foundation-datepicker.vi
//= require jquery-ui
//= require simpleLightbox.min
//= require owl.carousel/dist/owl.carousel
//= require jquery.sticky
//= require ./vendor/app
//= require ./vendor/main
//= require jquery-throttle-debounce
//
//= require_tree ./controller

$( document ).ready(function() {
  $(document).on('keyup', '#product_search_keyword', $.debounce( 500, performProductSearchForDiscount ));

  $('#create_new_deal').on('submit', function() {
    var selected_product = $('.product_for_discounts input:checked').length
    if($('.product_for_discounts input:checked').length < 1) {
  	  alert('Please make sure to select at least one product');
  	  return false;
  	}
  })

  function performProductSearchForDiscount() {
  	var keyword = $('#product_search_keyword').val();
    var searchQuery = { keyword: keyword };
    $.ajax({
      method: "GET",
      url: '/p/search',
      data: searchQuery,
      dataType: "script",
    })
  };
  
  $(document).ready(function() {
  // Interactive Zipcodes
  $('input.zipcode_interactive').blur(function(data) {
    var elem_id = $(this).attr("id");
    var base_id = elem_id.substring(0, elem_id.lastIndexOf("_"));
    $.get("/localedata/get_zip_data/" + this.value, {},
    function(data) {
      var zipcode = $.parseJSON(data);
      var city = $('#' + base_id + '_city');
      var state = $('#' + base_id + '_state');
      var county = $('#' + base_id + '_county');
      if (zipcode.err) {
        alert(zipcode.err);
      } else {
        city.val(zipcode.city);
        state.val(zipcode.state)
        county.val(zipcode.county)
      }
    })
  });
});
});  
