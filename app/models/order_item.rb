# == Schema Information
#
# Table name: order_items
#
#  id              :integer          not null, primary key
#  order_id        :integer
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  deal_id         :integer
#  name            :string           not null
#  description     :text             not null
#  price           :decimal(10, 4)   not null
#  discount        :decimal(10, 4)
#  tax             :decimal(10, 4)
#  quantity        :integer          not null
#  order_item_data :json
#

class OrderItem < ActiveRecord::Base
  belongs_to :order, inverse_of: :order_items, counter_cache: true
  belongs_to :deal, inverse_of: :order_items

  validates :order_id, :deal_id, :name, presence: true
  validates :quantity, presence: true, numericality: true
  validates :price, presence: true, numericality: { greater_than: 0 }
  validates :discount, numericality: true, allow_nil: true
end
