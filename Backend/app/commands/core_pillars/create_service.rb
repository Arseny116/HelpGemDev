# frozen_string_literal: true

module CorePillars
    class CreateService
      def initialize(name:, pillars:, user:)
        @name = name
        @pillars = pillars
        @user = user
      end

      def call
        @core_pillars = CorePillar.new(name: @name, pillars: @pillars, user: @user)

        if @core_pillars.save
          @core_pillars
        else
          nil
        end
      end
    end
end
