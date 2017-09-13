$(document).ready ->
  if $('[data-stripe-key]').length > 0
    publishable_key = $('[data-stripe-key]').data('stripe-key')
    stripe = Stripe(publishable_key)
    elements = stripe.elements()
    style = {
      base: {
        fontSize: '18px',
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

      stripe.createToken(card).then (result) ->
        if result.error
          errorElement = document.getElementById('card-errors')
          errorElement.textContent = result.error.message
        else
          stripeTokenHandler(result.token, form)
