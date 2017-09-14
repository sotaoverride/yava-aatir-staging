Rails.application.routes.draw do
  devise_for :users

  resource :account, only: [:show, :update]
  resource :wizards, only: [:show, :update]

  root to: 'home#index'
end
