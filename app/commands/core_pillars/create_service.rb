# frozen_string_literal: true
module CorePillars
  class CreateService
    def initialize(name:,pillars:)
      @name = name
      @pillars = pillars
    end

    def call
      CorePillar.create!(
        name: @name,
        pillars: @pillars
      )
    end
  end
end