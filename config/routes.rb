Rails.application.routes.draw do
  devise_for :users

  resource :account,   only: [:show, :update]
  resource :wizards,   only: [:show, :update]

  resources :deals,    only: [:index, :show]
  resources :requests, only: [:index, :new]
  resources :products, only: [:show, :new] do
    get :deal, on: :member
    get :existing, on: :collection
  end

  resources :carts, only: [:index]
  resources :orders, only: [:index, :show]

  # Root to explore page
  root to: 'home#index'
end
