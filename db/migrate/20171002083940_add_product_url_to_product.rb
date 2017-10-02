class AddProductUrlToProduct < ActiveRecord::Migration
  def change
    add_column :products, :product_url, :string
    change_column :products, :standard_price, :integer
    add_column :products, :unit, :string
  end
end
