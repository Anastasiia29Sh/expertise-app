Rails.application.routes.draw do
  resources :values
  resources :themes
  resources :images
  resources :users

  get 'main/index'
  post '/auth/login' => "auth#login"
  get '/auth/current' => "auth#current"
  get '/auth/logout' => "auth#logout"
  post 'auth/registr' => "auth#registr"
  get '/about' => "main#about"

  root 'main#index'
end
