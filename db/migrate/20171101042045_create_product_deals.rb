class CreateProductDeals < ActiveRecord::Migration
  def change
    create_table :product_deals do |t|
      t.references :product, index: true, foreign_key: true
      t.references :deal, index: true, foreign_key: true
      t.string :status
      t.timestamps null: false
    end
  end
end
