class CreateCartItems < ActiveRecord::Migration
  def change
    create_table :cart_items do |t|
      t.references :cart, index: true, foreign_key: true
      t.integer :deal_id, index: true
      t.string :name, null: false
      t.text :description, null: false
      t.decimal :price, precision: 10, scale: 4, null: false
      t.decimal :discount, precision: 10, scale: 4, null: false
      t.decimal :tax, precision: 10, scale: 4, null: false
      t.integer :quantity, null: false
      t.json :data, default: {}
      t.timestamps null: false
    end
  end
end
