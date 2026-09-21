module Api
  module V1
    # Тут только CRUD, открытый
    class UsersController < BaseController
      def create
        user = User.new(user_params)

        if user.save #тут валидация
          token = JsonWebToken.encode(user_id: user.id)
          render json: { token: token, user: user_json(user) }, status: :created
        else
            render_error(user.errors.full_messages, :unprocessable_entity)
        end
      end

      private

      def user_params
        params.expect(user: [:name, :email, :password, :password_confirmation])
      end
    end
  end
end