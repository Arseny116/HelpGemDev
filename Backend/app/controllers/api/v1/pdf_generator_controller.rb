module Api
  module V1
    class PdfGeneratorController < AuthenticatedController
      def create
        core_pillar_id = params[:sticker_id].to_s.strip

        return render_error('sticker_id parameter is required.', :unprocessable_entity) if core_pillar_id.blank?

        core_pillar = CorePillar.find_by(id: core_pillar_id)
        return render_error("CorePillar with ID #{core_pillar_id} not found.", :not_found) if core_pillar.nil?

        MiroPdfJob.perform_later(core_pillar.id)
        render json: { message: 'PDF generation job has been queued.' }, status: :accepted
      end
    end
  end
end
