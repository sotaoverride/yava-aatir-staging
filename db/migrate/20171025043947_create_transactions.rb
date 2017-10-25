class CreateTransactions < ActiveRecord::Migration
  def change
    create_table :transactions do |t|
      t.references :order, index: true, foreign_key: true
      t.decimal :amount, precision: 10, scale: 4, null: false
      t.integer :txn_type, null: false
      t.timestamps null: false
    end
  end
end
