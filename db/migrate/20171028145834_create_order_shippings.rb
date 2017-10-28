class CreateOrderShippings < ActiveRecord::Migration
  def change
    create_table :order_shippings do |t|
      t.references :order_address, index: true, foreign_key: true
      t.string :shipping_method
      t.string :tracking_number
      t.string :status
      t.string :shipping_type
      t.json :data
      t.timestamps null: false
      t.timestamps null: false
    end
  end
end
