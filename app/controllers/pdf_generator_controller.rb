class PdfGeneratorController < ApplicationController
  def create
    core_pillar_id = params[:sticker_id].to_s.strip

    if core_pillar_id.blank?
      render json: { error: "sticker_id parameter is required." }, status: :unprocessable_entity
      return
    end

    core_pillar = CorePillar.find_by(id: core_pillar_id)
    unless core_pillar
      render json: { error: "CorePillar with ID #{core_pillar_id} not found." }, status: :not_found
      return
    end

    MiroPdfJob.perform_later(core_pillar.id)
    render json: { message: "PDF generation job has been queued." }, status: :accepted
  end
end
