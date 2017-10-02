$(document).on 'turbolinks:load', () ->
  $('#product-sidebar').sticky({ wrapperClassName: 'sticky-wrapper default-height', topSpacing: 77, center: true, className: 'hey' })

# ADD PRODUCT SCRIPT
  $('select#category_id').on 'change', () ->
    selectedCategory = this.value
    if selectedCategory == ''
      $('select#sub_category_id').html('')
    else
      categoryUrl      = "#{$(this).data('category-url')}?category_id=#{selectedCategory}"
      $.ajax({
        url: categoryUrl,
        method: 'GET'
      }).done (response) ->
        response.forEach (obj) ->
          html = $('<option></option>').attr('value', obj.id).text(obj.name)
          $('select#sub_category_id').append(html)
