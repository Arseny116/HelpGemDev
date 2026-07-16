class CorePillarsController < ApplicationController
    def create
        clean_params = core_pillars_params
        @core_pillar = CorePillars::CreateService.new(
          name: clean_params[:name],
          pillars: if clean_params[:pillars].is_a?(String)
                       clean_params[:pillars].split(',').map(&:strip)
                   end
        ).call
        render json: @core_pillar, status: :created
    end
    private

    def core_pillars_params
        params.require(:core_pillar).permit(:name, :pillars)
    end
end
