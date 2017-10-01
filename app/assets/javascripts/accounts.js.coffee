$(document).on 'turbolinks:load', () ->
  # OMNIAUTH LOGIN - WE NEED THIS SINCE 3rd PARTY LOGIN BUTTON USE DIV -
  $('[data-omniauth-href]').on 'click', ->
    window.location = $(this).data('omniauth-href')
  # SET ACTIVE TAB ON ACCOUNT SETTING PAGE
  if $('.account-edit-wrapper').length > 0
    lastActive = $('[data-last-active]').data('last-active')
    $("[href='##{lastActive}']").click()