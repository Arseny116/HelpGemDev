class JsonWebToken
  SECRET = Rails.application.credentials.jwt_secret
  ALGORITHM = 'HS256'

  class << self

    def encode(payload, exp = 24.hours.from_now)
      payload = payload.dup
      payload[:exp] = exp.to_i
      JWT.encode(payload, SECRET, ALGORITHM)
    end

    def decode(token)
      decoded = JWT.decode(token, SECRET, true, algorithm: ALGORITHM).first
      HashWithIndifferentAccess.new(decoded)
    rescue JWT::DecodeError
      nil
    end

  end
end