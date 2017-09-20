$(document).on 'turbolinks:load', ->
  $('.floating-box .subscription>.row .switch-toggle label[for="monthly"]').on('click', () ->
    $('.floating-box .subscription .sub-box > .sub-coupon').fadeOut(125)
    $('.floating-box .subscription .sub-box > .sub-plan').delay(125).fadeIn(125)
    $('button.upgrade').removeClass('hide')
    $('button.validate, button.upgrade-right-side').addClass('hide')
  )

  $('.floating-box .subscription>.row .switch-toggle label[for="coupon"]').on('click', () ->
    $('.floating-box .subscription .sub-box > .sub-plan').fadeOut(125);
    $('.floating-box .subscription .sub-box > .sub-coupon').delay(125).fadeIn(125);
    $('button.upgrade').addClass('hide')
    $('button.validate').removeClass('hide')
  )

  $('button.validate').on('click', () ->
    coupon = $('input.coupon').val()
    if coupon.toLowerCase() == 'yova'
      $('input.coupon, .sub-coupon .sub-plan').toggle()
      $('input#cost').val('0')
      $('button.validate').addClass('hide')
      $('button.upgrade-right-side').removeClass('hide')
    else
      $('input.coupon').parents('.sub-coupon').addClass('field_with_errors')
  )
  if $('[data-stripe-key]').length > 0
    publishable_key = $('[data-stripe-key]').data('stripe-key')
    stripe = Stripe(publishable_key)
    elements = stripe.elements()
    style = {
      base: {
        fontSize: '13px',
        color: '#adafdf',
        fontWeight: '400',
      }
    }

    card = elements.create('card', { style: style })
    card.mount('#card-element')

    card.addEventListener 'change', (event) ->
      displayError = document.getElementById('card-errors')
      if event.error
        displayError.textContent = event.error.message
      else
        displayError.textContent = ''

    stripeTokenHandler = (token, form) ->
      hiddenInput = document.createElement('input')
      hiddenInput.setAttribute('type', 'hidden')
      hiddenInput.setAttribute('name', 'stripeToken')
      hiddenInput.setAttribute('value', token.id)
      form.appendChild(hiddenInput)

      form.submit()

    form = document.getElementById('subscribe-stripe-form')
    form.addEventListener 'submit', (event) ->
      event.preventDefault()

      ##
      # cc-name handler
      ccOwner = $('input[name="cc-owner"]').val()

      if ccOwner == ''
        $('input[name="cc-owner"]').parents('label').addClass('field_with_errors')
      else
        $('input[name="cc-owner"]').parents('label').removeClass('field_with_errors')
        stripe.createToken(card).then (result) ->
          if result.error
            errorElement = document.getElementById('card-errors')
            errorElement.textContent = result.error.message
          else
            stripeTokenHandler(result.token, form)
