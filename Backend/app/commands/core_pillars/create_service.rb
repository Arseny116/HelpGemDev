# frozen_string_literal: true
module CorePillars
    class CreateService
      def initialize(name:,pillars:)
        @name = name
        @pillars = pillars
      end

      def call
        @core_pillars = CorePillar.new(name: @name, pillars: @pillars)

        if @core_pillars.save
          @core_pillars
        else
          nil
        end
      end
    end
end