# == Schema Information
#
# Table name: cart_items
#
#  id          :integer          not null, primary key
#  cart_id     :integer
#  deal_id     :integer
#  name        :string           not null
#  description :text             not null
#  price       :decimal(10, 4)   not null
#  discount    :decimal(10, 4)   not null
#  tax         :decimal(10, 4)   not null
#  quantity    :integer          not null
#  data        :json
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class CartItem < ActiveRecord::Base
  belongs_to :cart, inverse_of: :cart_items, counter_cache: true
  belongs_to :deal, inverse_of: :cart_items

  validates :cart_id, :deal_id, :name, :price, :quantity, presence: true
  validates :price, presence: true, numericality: { greater_than: 0 }
  validates :discount, presence: true, numericality: { greater_than: 0 }, allow_nil: true
end
