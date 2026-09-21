# frozen_string_literal: true

module Api
  module V1
    class MeController < AuthenticatedController
      def show
        render json: { user: user_json(current_user) }
      end
    end
  end
end

