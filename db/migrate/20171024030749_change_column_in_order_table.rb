class ChangeColumnInOrderTable < ActiveRecord::Migration
  def change
  	add_column :orders, :step, :string, null: false
  	[:ship_address1, 
  	 :ship_address2,
  	 :ship_city,
  	 :ship_state,
  	 :ship_zip,
  	 :ship_country,
  	 :bill_address1,
  	 :bill_address2,
  	 :bill_city,
  	 :bill_state,
  	 :bill_zip,
  	 :bill_country,
  	 :email,
  	 :phone].each { |column| remove_column :orders, column }
  end
end
