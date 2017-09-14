$(document).on 'turbolinks:load', () ->
  if $('.account-edit-wrapper').length > 0
    lastActive = $('[data-last-active]').data('last-active')
    $("[href='##{lastActive}']").click()
