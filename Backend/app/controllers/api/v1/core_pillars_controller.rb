module Api
  module V1
    class CorePillarsController < AuthenticatedController
      def create
        clean_params = core_pillars_params

        # TODO: убрать обработку в  саму команду  :
        @core_pillar = CorePillars::CreateService.new(
          name: clean_params[:name],
          pillars: if clean_params[:pillars].is_a?(String)
                     clean_params[:pillars].split(',').map(&:strip)
                   end
        ).call
        if @core_pillar
          render json: @core_pillar, status: :created

        else
          render_error("CorePillar not found",  :unprocessable_entity)
        end
      end

      private

      def core_pillars_params
        params.expect(project: [:name, :core_pillars])
      end
    end
  end
end