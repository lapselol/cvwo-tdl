class RegistrationsController < ApplicationController
  def create
    user = User.create!(
      email: params['user']['email'],
      password: params['user']['password'],
      password_confirmation: params['user']['password_confirmation']
    )

    if user
      session[:user_id] = user.id
      payload = {user_id: user.id}
      token = encode_token(payload)
      render json: {
        status: :created,
        user: user,
        jwt: token
      }
    else
      render json: { status: 500 }
    end
  end
end