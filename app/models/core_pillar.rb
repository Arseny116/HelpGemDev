class CorePillar < ApplicationRecord
  has_one_attached :pdf_file

  validates :name, presence: true
  validates :json_validates, :pillars, presence: true


  def json_validates

  end



end
