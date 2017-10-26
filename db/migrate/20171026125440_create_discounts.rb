class CreateDiscounts < ActiveRecord::Migration
  def change
    create_table :discounts do |t|
      t.references :deal, index: true, foreign_key: true
      t.integer :quantity_from
      t.integer :quantity_to
      t.decimal :discount_amount, precision: 10, scale: 2
      t.decimal :discount_percentage, precision: 10, scale: 2
      t.integer :status, null:false
      t.text :description
      t.timestamps null: false
    end
  end
end
