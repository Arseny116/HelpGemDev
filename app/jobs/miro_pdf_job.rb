class MiroPdfJob < ApplicationJob
  queue_as :default
  include Rails.application.routes.url_helpers


  def perform(core_pillar_id)
    ActiveStorage::Current.url_options = Rails.application.config.action_mailer.default_url_options

    feature = CorePillar.find_by(id: core_pillar_id)
    return unless feature

    Rails.logger.info "[MiroPdfJob] Генерация PDF для фичи: #{feature.name}"



    html_content = ApplicationController.render(
      template: "miro_app/pdfg",
      layout: "pdf",
      locals: { feature: feature }
    )


    pdf_data = Grover.new(html_content).to_pdf


    feature.pdf_file.attach(
      io: StringIO.new(pdf_data),
      filename: "#{feature.name.parameterize}.pdf",
      content_type: "application/pdf"
    )


    download_url = feature.pdf_file.url(
      disposition: "attachment"
    )


    ActionCable.server.broadcast(
      "feature_downloads_#{feature.id}",
      { pdf_url: download_url }
    )
  end
end