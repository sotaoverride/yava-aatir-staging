# == Schema Information
#
# Table name: discounts
#
#  id                  :integer          not null, primary key
#  deal_id             :integer
#  quantity_from       :integer
#  quantity_to         :integer
#  discount_amount     :decimal(10, 2)
#  discount_percentage :decimal(10, 2)
#  status              :integer          not null
#  description         :text
#  created_at          :datetime         not null
#  updated_at          :datetime         not null
#

class Discount < ActiveRecord::Base
  enum status: [:active, :inactive]

  belongs_to :deal, inverse_of: :discounts


  validates :deal_id, :status, presence: true
  validates :quantity_from, :quantity_to, presence: true, numericality: true
end
