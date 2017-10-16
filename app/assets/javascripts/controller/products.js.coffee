$(document).on 'turbolinks:load', () ->

  $('#product-sidebar').sticky(
    {
      wrapperClassName: 'sticky-wrapper default-height',
      topSpacing: 77, center: true, className: 'hey'
    }
  )

# ADD PRODUCT SCRIPT

  readUrl = (input) ->
    if input.files && input.files[0]
      reader = new FileReader()
      reader.onload = (e) ->
        $(input).prev().attr('src', e.target.result)

      reader.readAsDataURL(input.files[0])
  
  $(document).on 'change', '[data-action=\'select-product-image\']', ->
    readUrl(this)

  # FETCH SUB CATEGORY AND POPULATE SELECT
  fetchSubCategory = (categoryUrl) ->
    $.ajax({
      url: categoryUrl,
      method: 'GET'
    }).done (response) ->
      $('select[data-action=\'select-subcategory\']').html('')
      $('select[data-action=\'select-subcategory\']').html(
        $('<option></option>').text('Choose Sub Category')
      )
      response.forEach (obj) ->
        html = $('<option></option>').attr('value', obj.id).text(obj.name)
        $('select[data-action=\'select-subcategory\']').append(html)

  # PRODUCT CATEGORY SELECTOR
  $(document).on 'change', 'select[data-action=\'select-category\']', () ->
    selectedCategory = this.value
    if selectedCategory == ''
      $('input[data-target=\'product-category\']').val('')
      $('select[data-action=\'select-subcategory\']').html('')
    else
      url = "#{$(this).data('category-url')}?category_id=#{selectedCategory}"
      $('input[data-target=\'product-subcategory\']').val('')
      $('input[data-target=\'product-category\']').val(selectedCategory)
      fetchSubCategory(url)

  $(document).on 'change', 'select[data-action=\'select-subcategory\']', ->
    selectedSub = this.value
    $('input[data-target=\'product-subcategory\']').val(selectedSub)

  $(document).on 'click', '.reveal-open', () ->
    id = $(this).attr('id').split('-')[1]
    if $('[data-target=\'product-category\']').val() == ''
      $('.category-id-errors-wrapper').html(
        "<p class='help-text' style='color: red;'>Need to choose category first</p>"
      )
    else if $('[data-target=\'product-subcategory\']').val() == ''
      $('.category-id-errors-wrapper').html("")
      $('.sub-category-id-errors-wrapper').html(
        "<p class='help-text' style='color: red;'>Need to choose sub category first</p>"
      )
    else
      $("##{id}").foundation('open')
