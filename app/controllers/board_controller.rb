class BoardController < ApplicationController

  def create
        miro = MiroService.new
        result = miro.create(
          params[:board][:name],
          params[:board][:description],
          params[:board][:teamId]
        )
        render json: result
  end
end
