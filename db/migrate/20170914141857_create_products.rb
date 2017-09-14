class CreateProducts < ActiveRecord::Migration
  def change
    create_table :products do |t|
      t.references :user, index: true, foreign_key: true
      t.string :title
      t.text :description
      t.decimal :standard_price
      t.integer :quantity

      t.timestamps null: false
    end
  end
end
