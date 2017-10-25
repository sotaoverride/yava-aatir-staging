class CreateReturns < ActiveRecord::Migration
  def change
    create_table :returns do |t|
      t.references :order, index: true, foreign_key: true
      t.string :status, null:false
      t.text :reason
      t.timestamps null: false
    end
  end
end
