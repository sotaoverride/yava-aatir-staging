class AddExpiredColumnToDeals < ActiveRecord::Migration
  def change
  	add_column :deals, :expired_at, :date
  	change_column :product_deals, :status, 'integer USING CAST(status AS integer)', default: ProductDeal.statuses[:active] 
  end
end
