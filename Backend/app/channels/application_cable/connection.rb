# frozen_string_literal: true

module ApplicationCable
  class Connection < ActionCable::Connection::Base
    identified_by :current_user

    def connect
      self.current_user = find_verified_user
    end

    private

    def find_verified_user
      token = request.params[:token].presence || request.headers["Authorization"]&.split(" ")&.last
      payload = JsonWebToken.decode(token) if token.present?
      user = User.find_by(id: payload[:user_id]) if payload.present?

      user || reject_unauthorized_connection
    end
  end
end
