class ApplicationController < ActionController::API
  #skip_before_action :verify_authenticity_token

  def secret_key
      "ridingonrails"
  end

  def encode_token(payload)
      JWT.encode(payload, secret_key, 'HS256')
  end

  def decoded_token
      if auth_header
          token = auth_header.split(' ')[1]
          begin
              JWT.decode(token, secret_key, true, algorithm: 'HS256')
          rescue JWT::DecodeError
              []
          end
      end
  end


end