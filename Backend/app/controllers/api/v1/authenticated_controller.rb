#в concrn
module Api
  module V1
    class AuthenticatedController < BaseController
      before_action :authenticate_request!

      def current_user
        @current_user
      end

      private

      def authenticate_request!
        token = bearer_token
        return render_unauthorized('Missing token') if token.blank?

        payload = JsonWebToken.decode(token)
        return render_unauthorized('Invalid or expired token') if payload.blank?

        user = User.find_by(id: payload[:user_id])
        return render_unauthorized('User not found') if user.nil?

        @current_user = user
      end

      def bearer_token
        request.headers['Authorization']&.split(' ')&.last
      end
    end
  end
end