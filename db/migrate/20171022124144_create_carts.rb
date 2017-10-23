class CreateCarts < ActiveRecord::Migration
  def change
    create_table :carts do |t|
      t.references :user, index: true, foreign_key: true
      t.string :status, null: false
      t.integer :cart_items_count, null: false
      t.string :step
      t.timestamps null: false
    end
  end
end
