class AddProjectOwnershipAndVersions < ActiveRecord::Migration[8.1]
  def change
    add_reference :core_pillars, :user, foreign_key: true

    create_table :project_versions do |t|
      t.references :core_pillar, null: false, foreign_key: true
      t.references :user, null: false, foreign_key: true
      t.integer :version_number, null: false
      t.string :name, null: false
      t.json :pillars, default: []
      t.timestamps
    end

    add_index :project_versions, [ :core_pillar_id, :version_number ], unique: true
  end
end
