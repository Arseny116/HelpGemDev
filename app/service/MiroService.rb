class MiroService

  BASE_URL = "https://api.miro.com".freeze
  def initialize
    @token  = "eyJtaXJvLm9yaWdpbiI6ImV1MDEifQ_FGEEdrG5PYcUKHb236x3k9KQrTs" #ENV[:bearer_token]
    @client = client_build
  end

  def client_build
    Faraday.new(url: BASE_URL) do |conn|
      conn.request :authorization, 'Bearer', @token
      conn.request  :json
      conn.response :json
      conn.response :logger, Rails.logger, { bodies: true }
      conn.adapter Faraday.default_adapter
    end
  end

  def create(name,description,teamId)
    Rails.logger.info BASE_URL
    @client.post("/v2/boards") do |req|
      req.body = {name: name, description: description, teamId: teamId}
    end

  end

end