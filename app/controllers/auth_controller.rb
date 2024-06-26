class AuthController < ApplicationController
  def login
    unless params[:session].blank?
      user = User.find_by(email: params[:session][:email].downcase)
      if user && user.authenticate(params[:session][:password])
        # пользователь успешно аутентифицирован
        sign_in user
        render json: { user: user }
      else
        # неудачная аутентификация
        render json: { error: { 'ru': 'Неправильный email или пароль', 'en': 'Incorrect email or password' } }, status: :unauthorized
      end
    end
  end

  def current
    render json: { user: current_user }
  end

  def registr
  end

  def logout
    sign_out
  end

end
