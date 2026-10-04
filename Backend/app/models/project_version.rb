class ProjectVersion < ApplicationRecord
  belongs_to :core_pillar
  belongs_to :user

  has_one_attached :pdf_file

  validates :version_number, presence: true, uniqueness: { scope: :core_pillar_id }
  validates :name, presence: true
end
