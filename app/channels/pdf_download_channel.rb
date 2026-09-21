class PdfDownloadChannel < ApplicationCable::Channel
  def subscribed
    sticker_id = params[:sticker_id]
    stream_name = "feature_downloads_#{sticker_id}"

    Rails.logger.info "[ActionCable] Стрим подписки: '#{stream_name}'"

    stream_from "feature_downloads_#{sticker_id}"

  end

  def unsubscribed
  end
end