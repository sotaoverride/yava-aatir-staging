class AddFeeColumnToReturns < ActiveRecord::Migration
  def change
  	add_column :returns, :fees, :decimal, precision: 10, scale: 4
  end
end
