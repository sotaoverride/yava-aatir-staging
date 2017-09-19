class AddAdditionalFieldsToProfile < ActiveRecord::Migration
  def change
    add_column :profiles, :biz_name, :string
    add_column :profiles, :industry, :string
    add_column :profiles, :biz_address, :string
    add_column :profiles, :tax_id, :string
    add_column :profiles, :city, :string
    add_column :profiles, :state, :string
    add_column :profiles, :zipcode, :string
  end
end
