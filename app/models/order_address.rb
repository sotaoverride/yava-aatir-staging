# == Schema Information
#
# Table name: order_addresses
#
#  id              :integer          not null, primary key
#  order_id        :integer
#  first_name      :string           not null
#  last_name       :string           not null
#  street_address1 :string           not null
#  street_address2 :string
#  zip_code        :string           not null
#  phone_number    :string           not null
#  address_type    :integer          not null
#  is_default      :boolean          default(FALSE)
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#

class OrderAddress < ActiveRecord::Base
  enum address_type: [ :billing, :shipping ]

  belongs_to :order, inverse_of: :order_addresses

  validates :order_id, :first_name, :last_name, presence: true
  validates :street_address1, :zip_code, :phone_number, :address_type, presence: true
  
end
