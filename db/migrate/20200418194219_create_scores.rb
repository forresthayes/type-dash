class CreateScores < ActiveRecord::Migration[6.0]
  def change
    create_table :scores do |t|
      t.string :name, null: false
      t.integer :wpm, null: false

      t.timestamps
    end
  end
end
