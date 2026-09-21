class ApplicationController <  ActionController::API # не тянет все из вьюхи
  protect_from_forgery with: :null_session, if: -> { request.format.json? } # проверка только если json.
  after_action :remove_x_frame_options


  def remove_x_frame_options
    response.headers.delete('X-Frame-Options')
  end
end
