module Api
  module V1
    class CorePillarsController < AuthenticatedController
      def create
        clean_params = core_pillars_params

        # TODO: убрать обработку в  саму команду  :
        @core_pillar = CorePillars::CreateService.new(
          name: clean_params[:name],
          pillars: normalize_pillars(clean_params[:core_pillars])
        ).call
        if @core_pillar
          render json: @core_pillar, status: :created

        else
          render_error("CorePillar not found",  :unprocessable_entity)
        end
      end

      private

      def core_pillars_params
        params.expect(project: [ :name, :core_pillars ])
      end

      def normalize_pillars(pillars)
        values = pillars.is_a?(String) ? pillars.split(",") : Array(pillars)
        values.map { |pillar| pillar.to_s.strip }.reject(&:blank?)
      end
    end
  end
end
