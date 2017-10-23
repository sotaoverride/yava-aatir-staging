class CreateOrderPayments < ActiveRecord::Migration
  def change
    create_table :order_payments do |t|
      t.references :order, index: true, foreign_key: true
      t.string :payment_method, :status, null: false
      t.string :encrypted_cc_number, :encrypted_ccv_code, :encrypted_cc_exp_month, :encrypted_cc_exp_year
      t.string :encrypted_cc_number_iv, :encrypted_ccv_code_iv, :encrypted_cc_exp_month_iv, :encrypted_cc_exp_year_iv
      t.timestamps null: false 
    end
  end
end
