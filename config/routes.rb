Rails.application.routes.draw do
  devise_for :users, controllers: {
    registrations: 'user/registrations',
    omniauth_callbacks: 'user/omniauth_callbacks'
  }

  resource :account,   only: %i[show update]
  resource :wizards,   only: %i[show update]

  resources :deals,    only: %i[index show]
  resources :requests, only: %i[index new create edit update] do
    get :add
  end
  resources :explores, only: %i[index]

  resources :categories, only: %i[index] do
    resources :deals, only: %i[index]
    resources :requests, only: %i[index]
    resources :explores, only: %i[index]

    resources :subcategories, only: [] do
      resources :deals, only: %i[index]
      resources :requests, only: %i[index]
      resources :explores, only: %i[index]
    end
  end

  resources :products, path: 'p', only: %i[show new create] do
    get :deal, on: :member
    collection do
      post :fetch
      get :existing
    end
  end

  resources :transactions, only: %i[index] do
    get :returns, on: :collection
    get :payments, on: :collection
  end
  resources :carts, only: %i[index]
  resources :orders, only: %i[index show]

  get 'terms', to: 'static#terms'
  get 'privacy', to: 'static#privacy'

  # Root to deals page
  root to: 'deals#index'
end
