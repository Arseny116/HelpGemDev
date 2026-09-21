module Api
  module V1
    class BaseController < ActionController::API
      private

      def render_error(messages, status)
        render json: { errors: Array(messages) }, status: status
      end

      def render_unauthorized(message = 'Unauthorized')
        render_error(message, :unauthorized)
      end

      def user_json(user)
        { id: user.id, name: user.name, email: user.email }
      end
    end
  end
end