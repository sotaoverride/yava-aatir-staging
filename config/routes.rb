Rails.application.routes.draw do
  devise_for :users, controllers: {
    registrations: 'user/registrations'
  }

  resource :account,   only: [:show, :update]
  resource :wizards,   only: [:show, :update]

  resources :deals,    only: [:index, :show]
  resources :requests, only: [:index, :new]
  resources :products, only: [:show, :new] do
    get :deal, on: :member
    get :existing, on: :collection
  end

  resources :transactions, only: [:index] do
    get :returns, on: :collection
    get :payments, on: :collection
  end
  resources :carts, only: [:index]
  resources :orders, only: [:index, :show]

  get 'explore', to: 'home#index'

  # Root to explore page
  root to: 'deals#index'
end
