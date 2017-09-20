$(document).on 'turbolinks:load', () ->
  $('.search_area_cate input[name="search"]').on 'keyup', () ->
    value = $(this).val().toLowerCase()
    if value == ''
      $('.category-name').show()
    else
      $('.category-name').hide()
      $('[data-category]').data('category').forEach (a) ->
        a = a.toLowerCase()
        if a.indexOf(value)>-1
          a = a.replace(/&/g, 'and')
          a = a.split(' ').join('-')
          console.log(a)
          $(".#{a}").toggle()

  $('.wizard-link.disabled').on 'click', (e) ->
    e.preventDefault()

  $('button.prev').on 'click', (e) ->
    window.location = $(this).data('link')
# FINAL STEP
  $finalQuestionWrapper = $('.final-question, .account-edit-wrapper')

  ##
  # Toggle related physical store
  $finalQuestionWrapper.on 'change', "[name='user[profile_attributes][physical_store]']", =>
    value = $("[name='user[profile_attributes][physical_store]']:checked").val()
    if value == 'true'
      $('.physical-store-related').removeClass('hide')
    else
      $('.physical-store-related').addClass('hide')

  readUrl = (input) ->
    if input.files && input.files[0]
      reader = new FileReader()

      reader.onload = (e) ->
        $('#avatar-image').attr('src', e.target.result)

      reader.readAsDataURL(input.files[0])

  $finalQuestionWrapper.on 'change', '#user_profile_attributes_avatar', (e) ->
    readUrl(this)

# SELECT CATEGORY SCRIPT
  $selectCategoryWrapper = $('.select-category')
  $selectCategoryWrapper.find('.next-arrow').addClass('hide')

  ##
  # Event on click next
  #
  $selectCategoryWrapper.on 'click', '.next-arrow', ->
    $('form.edit_user').submit()

  ##
  # Event when selecting category id
  #
  $selectCategoryWrapper.on 'click', 'button[data-category-id]', ->
    if $(this).hasClass('active')
      $(this).removeClass('active')
    else
      $(this).addClass('active')
    selectedType = $.map $selectCategoryWrapper.find('button.active'), (val) =>
      $(val).data('category-id')

    if selectedType.length > 0
      $selectCategoryWrapper.find('.next-arrow').removeClass('hide')
    else
      $selectCategoryWrapper.find('.next-arrow').addClass('hide')

    $('#user_profile_attributes_category_ids').val(selectedType)

# END OF SELECT CATEGORY SCRIPT


# SELECT PROFILE TYPE SCRIPT
  $profileTypeWrapper = $('.select-profile-type')
  $profileTypeWrapper.find('.next-arrow').addClass('hide')

  ##
  # Event on click next
  #
  $profileTypeWrapper.on 'click', '.next-arrow', ->
    $('form.edit_user').submit()

  ##
  # Event when selecting profile type
  #
  $profileTypeWrapper.on 'click', 'button[data-profile-type]', ->
    if $(this).hasClass('active')
      $(this).removeClass('active')
    else
      $(this).addClass('active')
    selectedType = $.map($profileTypeWrapper.find('button.active'), (val) =>
      $(val).data('profile-type')
    )

    if selectedType.length > 0
      $profileTypeWrapper.find('.next-arrow').removeClass('hide')
    else
      $profileTypeWrapper.find('.next-arrow').addClass('hide')

    $('#user_profile_attributes_profile_type').val(selectedType)
# END OF SELECT PROFILE TYPE SCRIPT
