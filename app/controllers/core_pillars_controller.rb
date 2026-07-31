class CorePillarsController < ApplicationController
    def create
        clean_params = core_pillars_params

        #убрать обработку в  саму команду  :
        @core_pillar = CorePillars::CreateService.new(
          name: clean_params[:name],
          pillars: if clean_params[:pillars].is_a?(String)
                       clean_params[:pillars].split(',').map(&:strip)
                   end
        ).call
        if @core_pillar
            pp @core_pillar
            render json: @core_pillar, status: :created # Rails автоматом разобьет @core_pillar в json по полям синий трактор....
        else
            render json: {error:"Ошибка создания ядра"}, status: :unprocessable_entity
        end
    end
    private

    def core_pillars_params
        params.require(:core_pillar).permit(:name, :pillars)
    end
end
