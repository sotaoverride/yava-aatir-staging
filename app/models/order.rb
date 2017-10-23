# == Schema Information
#
# Table name: orders
#
#  id                :integer          not null, primary key
#  user_id           :integer
#  cart_id           :integer
#  order_number      :string           not null
#  ship_address1     :string           not null
#  ship_address2     :string           not null
#  ship_city         :string           not null
#  ship_state        :string           not null
#  ship_zip          :string           not null
#  ship_country      :string           not null
#  bill_address1     :string           not null
#  bill_address2     :string           not null
#  bill_city         :string           not null
#  bill_state        :string           not null
#  bill_zip          :string           not null
#  bill_country      :string           not null
#  email             :string
#  phone             :string
#  order_status      :string           not null
#  payment_status    :string           not null
#  currency          :string
#  total_price       :decimal(10, 4)   not null
#  order_items_count :integer          not null
#  order_data        :json
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#

class Order < ActiveRecord::Base
  PAYMENT_STATUS = { paid: 'paid', unpaid: 'unpaid' }.freeze
  ORDER_STATUS = {
    open: 'open',
    in_process: 'in_process',
    on_hold: 'on-hold',
    shipped: 'shipped',
    error: 'error',
    canceled: 'cancelled'
  }.freeze

  belongs_to :cart, inverse_of: :order
  belongs_to :user, inverse_of: :orders
  has_many :order_items, inverse_of: :order

  validates :user_id, :cart_id, :phone, presence: true
  validates :email, presence: true, format: /\A[^@\s]+@([^@\s]+\.)+[^@\s]+\z/
  validates :order_number, presence: true, uniqueness: true
  validates :ship_address1, :ship_city, :ship_state, :ship_zip, :ship_country, presence: true
  validates :bill_address1, :bill_city, :bill_state, :bill_zip, :bill_country, presence: true
  validates :order_status, presence: true, inclusion: {
    in: ORDER_STATUS.values,
    message: '%<value> is not a valid order status'
  }
  validates :payment_status, presence: true, inclusion: {
    in: PAYMENT_STATUS.values,
    message: '%<value> is not a valid order status'
  }
  validates :total_price, presence: true, numericality: { greater_than: 0 }
end
