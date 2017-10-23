class CreateOrders < ActiveRecord::Migration
  def change
    create_table :orders do |t|
      t.references :user, index: true, foreign_key: true
      t.references :cart, index: true, foreign_key: true
      t.string :order_number, null: false
      t.string :ship_address1, :ship_address2, :ship_city, :ship_state, :ship_zip, :ship_country, null: false
      t.string :bill_address1, :bill_address2, :bill_city, :bill_state, :bill_zip, :bill_country, null: false
      t.string :email, :phone
      t.string :order_status, null: false
      t.string :payment_status, null: false
      t.string :currency
      t.decimal :total_price, precision: 10, scale: 4, null: false
      t.integer :order_items_count, null: false
      t.json :order_data
      t.timestamps null: false
    end
  end
end
