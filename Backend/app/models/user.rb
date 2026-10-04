class User < ApplicationRecord
  has_secure_password

  has_many :core_pillars, dependent: :destroy
  has_many :project_versions, dependent: :destroy


  validates :email,
            presence: true,
            uniqueness: { case_sensitive: false },
            format: { with: URI::MailTo::EMAIL_REGEXP }
end
