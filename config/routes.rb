Rails.application.routes.draw do
  devise_for :users, controllers: {
    registrations: 'user/registrations',
    omniauth_callbacks: 'user/omniauth_callbacks'
  }

  resource :account,   only: [:show, :update]
  resource :wizards,   only: [:show, :update]

  resources :deals,    only: [:index, :show]
  resources :requests, only: [:index, :new]
  resources :products, only: [:show, :new, :create] do
    get :deal, on: :member
    get :existing, on: :collection
  end

  resources :transactions, only: [:index] do
    get :returns, on: :collection
    get :payments, on: :collection
  end
  resources :carts, only: [:index]
  resources :orders, only: [:index, :show]

  resources :categories, only: [:index]

  get 'explore', to: 'home#index'

  get 'terms', to: 'static#terms'
  get 'privacy', to: 'static#privacy'

  # Root to deals page
  root to: 'deals#index'
end
