Rails.application.routes.draw do

  namespace :api do
    namespace :v1 do
      resources :core_pillars, only: [:create]
      resources :pdf_generator, only: [:create]
      resources :users, only: [:create]
      post "login", to: "sessions#create"
      delete "logout", to: "sessions#destroy"
      get "me", to: "me#show"
    end
  end

end