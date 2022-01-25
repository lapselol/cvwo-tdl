class ApplicationController < ActionController::API
  #skip_before_action :verify_authenticity_token

  def secret_key
      "ridingonrails"
  end

  def encode_token(payload)
      JWT.encode(payload, secret_key, 'HS256')
  end

  def decode(token)
    JWT.decode(token, secret_key, true, {algorithm: 'HS256'})[0]
  end

  def token_authenticate
      
    token = request.headers["Authenticate"]
    user = User.find(decode(token)["user_id"])

    render json: user

  end


end