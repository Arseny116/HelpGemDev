class MiroAppController < ApplicationController
  skip_before_action :verify_authenticity_token
  def index
    @core_pillar = CorePillar.new
    render :index
  end

end