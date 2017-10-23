# == Schema Information
#
# Table name: carts
#
#  id               :integer          not null, primary key
#  user_id          :integer
#  status           :string           not null
#  cart_items_count :integer          not null
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#
class Cart < ActiveRecord::Base
  STATUS = { in_progress: 'in-progress', commit: 'commit' }.freeze

  belongs_to :user, inverse_of: :carts
  has_one :order, inverse_of: :cart
  has_many :cart_items, inverse_of: :created_at

  validates :user_id, presence: true
  validates :status, presence: true, inclusion: {
    in: STATUS.values,
    message: '%<value> is not a valid cart status'
  }
end
