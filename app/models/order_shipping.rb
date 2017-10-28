# == Schema Information
#
# Table name: order_shippings
#
#  id               :integer          not null, primary key
#  order_address_id :integer
#  shipping_method  :string
#  tracking_number  :string
#  status           :string
#  shipping_type    :string
#  data             :json
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#

class OrderShipping < ActiveRecord::Base
  enum shipping_type: [:delivery, :pickup]

  belongs_to :order_address, inverse_of: :order_shippings

  validates :order_address_id, :shipping_method, :tracking_number, :shipping_type, :status, presence: true 
end
