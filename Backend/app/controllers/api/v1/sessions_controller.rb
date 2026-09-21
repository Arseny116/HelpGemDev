module Api
  module V1
    class SessionsController < BaseController
      def create
        user = User.find_by(email: params[:email].to_s.strip.downcase)

        if user&.authenticate(params[:password])
          token = JsonWebToken.encode(user_id: user.id)
          render json: { token: token, user: user_json(user) }, status: :ok
        else
          render_error("Неверный пароль или email", :unauthorized)
        end
      end


      def destroy
        head :no_content
      end
    end
  end
end