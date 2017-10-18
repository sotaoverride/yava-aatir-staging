class AddQuantityAndPriceToRequests < ActiveRecord::Migration
  def change
    add_column :requests, :quantity, :integer
    add_column :requests, :price, :integer
    add_column :requests, :discount_type, :string, default: 'amount'
  end
end
