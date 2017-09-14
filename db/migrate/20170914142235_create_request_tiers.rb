class CreateRequestTiers < ActiveRecord::Migration
  def change
    create_table :request_tiers do |t|
      t.references :request, index: true, foreign_key: true
      t.integer :quantity
      t.decimal :value_reduction
      t.integer :value_type

      t.timestamps null: false
    end
  end
end
