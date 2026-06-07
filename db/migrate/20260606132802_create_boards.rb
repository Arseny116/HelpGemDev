class CreateBoards < ActiveRecord::Migration[8.1]
  def change
    create_table :boards do |t|
      t.timestamps
    end
  end
end
