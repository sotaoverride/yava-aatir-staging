# frozen_string_literal: true

#
class Request < ActiveRecord::Base
  belongs_to :product
  belongs_to :user

  validates :product_id, presence: true
  validates :quantity, presence: true
  validates :discount_type, inclusion: { in: Enum::Request::DISCOUNT_TYPE }
  validate :price_must_be_positive_value

  def amount=(new_price = 0)
    self.price = new_price.to_f * 100
  end

  def amount
    if price
      price / 100.0
    else
      0
    end
  end

  def asked_price
    asked_price = product.standard_price - price
    asked_price.to_f / 100.0
  end

  protected

  def price_must_be_positive_value
    errors.add(:price, 'must be positive value') if price < 1
  end
end

# == Schema Information
#
# Table name: requests
#
#  id            :integer          not null, primary key
#  product_id    :integer
#  user_id       :integer
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  quantity      :integer
#  price         :integer
#  discount_type :string           default("amount")
#
