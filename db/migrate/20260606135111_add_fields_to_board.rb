class AddFieldsToBoard < ActiveRecord::Migration[8.1]
  def change
    add_column :boards, :name, :string
    add_column :boards, :description, :string
    add_column :boards, :teamId, :string

  end
end
