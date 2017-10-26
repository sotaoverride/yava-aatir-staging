class CreateDeals < ActiveRecord::Migration
  def change
    create_table :deals do |t|
      t.references :product, index: true, foreign_key: true
      t.integer :promotion_days, null: false
      t.integer :number_of_commits, null: false
      t.date :promotion_start_at, null: false
      t.integer :number_of_quantity, null: false
      t.integer :status, null: false
      t.text :description
      t.timestamps null: false
    end
  end
end
