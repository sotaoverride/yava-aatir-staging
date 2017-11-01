class UpdateUserColumnToDeal < ActiveRecord::Migration
  def change
  	remove_column :deals, :product_id, :integer
  	add_column :deals, :user_id, :integer, index: true
  	change_column :deals, :promotion_days, :integer, null: true
  	change_column :deals, :number_of_commits, :integer, null: true
  	change_column :deals, :number_of_quantity, :integer, null: true
  end
end
