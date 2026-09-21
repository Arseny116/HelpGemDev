Rails.application.routes.draw do


  root "miro_app#index"

  resources :core_pillars , only: [:create]
  resources :pdf_generator, only: [:create]
end