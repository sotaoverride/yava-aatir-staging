class AddImageUrlToProductImages < ActiveRecord::Migration
  def change
    add_column :product_images, :image_url, :string
  end
end
