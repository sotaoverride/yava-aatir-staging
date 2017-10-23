class CreateOrderItems < ActiveRecord::Migration
  def change
    create_table :order_items do |t|
      t.references :order, index: true, foreign_key: true
      t.timestamps null: false
      t.integer :deal_id, index: true
      t.string :name, null: false
      t.text :description, null: false
      t.decimal :price, precision: 10, scale: 4, null: false
      t.decimal :discount, precision: 10, scale: 4
      t.decimal :tax, precision: 10, scale: 4
      t.integer :quantity, null: false
      t.json :order_item_data, default: {}
      t.timestamps null: false
    end
  end
end
