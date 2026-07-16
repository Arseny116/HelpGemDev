class CreateCorePillars < ActiveRecord::Migration[8.1]
  def change
    create_table :core_pillars do |t|
      t.string :name

      t.json :pillars, default: []

      t.timestamps
    end
  end
end
