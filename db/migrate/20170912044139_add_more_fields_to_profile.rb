class AddMoreFieldsToProfile < ActiveRecord::Migration
  def change
    add_column :profiles, :authorized_product, :string
    add_column :profiles, :anual_online_revenue, :string
    add_column :profiles, :sku_in_catalog, :string
    add_column :profiles, :top_selling_brand, :string
    add_column :profiles, :sell_used_product, :string
    add_column :profiles, :map_rpm_policies, :string
    add_column :profiles, :walmart_supplier, :string
    add_column :profiles, :ecommerce_url, :string
    add_column :profiles, :marketplace_provider, :string
    add_column :profiles, :marketplace_url, :string
    add_column :profiles, :integration, :string
    add_column :profiles, :inventory_update, :string
    add_column :profiles, :average_ships, :string
    add_column :profiles, :own_inventory, :boolean
    add_column :profiles, :fulfillment, :string
    add_column :profiles, :dropshipper, :integer
    add_column :profiles, :order_to_shiptime, :string
    add_column :profiles, :shiptime_guarantee, :string
    add_column :profiles, :freight_carrier, :string
    add_column :profiles, :return_policy, :string
    add_column :profiles, :carriers, :string
    add_column :profiles, :physical_store, :boolean
    add_column :profiles, :fulfill_from_store, :boolean
    add_column :profiles, :store_pickup, :boolean
    add_column :profiles, :avatar, :string
  end
end
