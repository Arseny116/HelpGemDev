Rails.application.routes.draw do
  mount Rswag::Ui::Engine => '/api-docs'
  mount Rswag::Api::Engine => '/api-docs'
  post "/boards", to: "board#create"
  get "up" => "rails/health#show", as: :rails_health_check


end
