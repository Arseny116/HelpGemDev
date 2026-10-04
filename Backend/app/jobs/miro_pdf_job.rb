class MiroPdfJob < ApplicationJob
  queue_as :default
  include Rails.application.routes.url_helpers


  def perform(core_pillar_id, user_id)
    ActiveStorage::Current.url_options = Rails.application.config.action_mailer.default_url_options

    feature = CorePillar.find_by(id: core_pillar_id)
    return unless feature

    user = User.find_by(id: user_id)
    return unless user

    Rails.logger.info "[MiroPdfJob] Генерация PDF для фичи: #{feature.name}"



    version_number = feature.project_versions.maximum(:version_number).to_i + 1
    project_version = feature.project_versions.create!(
      user: user,
      version_number: version_number,
      name: feature.name,
      pillars: feature.pillars
    )

    html_content = ApplicationController.render(
      template: "miro_app/pdfg",
      layout: "pdf",
      locals: { feature: project_version }
    )


    pdf_data = Grover.new(html_content).to_pdf


    project_version.pdf_file.attach(
      io: StringIO.new(pdf_data),
      filename: "#{feature.name.parameterize}.pdf",
      content_type: "application/pdf"
    )


    download_url = project_version.pdf_file.url(
      disposition: "attachment"
    )


    ActionCable.server.broadcast(
      "feature_downloads_#{feature.id}",
      { pdf_url: download_url }
    )
  end
end
