class CreateOrderAddresses < ActiveRecord::Migration
  def change
    create_table :order_addresses do |t|
      t.references :order, index: true, foreign_key: true 	
      t.string :first_name, null: false
      t.string :last_name, null: false
      t.string :street_address1, null: false
      t.string :street_address2
      t.string :zip_code, null: false
      t.string :phone_number, null: false
      t.integer :address_type, null: false
      t.boolean :is_default, default: false
      t.timestamps null: false
    end
  end
end
