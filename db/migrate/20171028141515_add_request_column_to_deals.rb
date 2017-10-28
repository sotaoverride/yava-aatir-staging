class AddRequestColumnToDeals < ActiveRecord::Migration
  def change
  	add_column :deals, :request_id, :integer 
  end
end
