# == Schema Information
#
# Table name: product_deals
#
#  id         :integer          not null, primary key
#  product_id :integer
#  deal_id    :integer
#  status     :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class ProductDeal < ActiveRecord::Base
end
