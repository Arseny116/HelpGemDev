class Board < ApplicationRecord
  validates :id, presence: true, uniqueness: true
  validates :teamId, presence: true, uniqueness: true
  validates :name, presence: true , length: {minimum: 1 , maximum: 60}
  validates :description, presence: true, length: {minimum: 0 , maximum: 300}
end
