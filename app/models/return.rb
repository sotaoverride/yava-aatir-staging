# == Schema Information
#
# Table name: returns
#
#  id         :integer          not null, primary key
#  order_id   :integer
#  status     :string           not null
#  reason     :text
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  fees       :decimal(10, 4)
#

class Return < ActiveRecord::Base
  STATUS = {
    initiate: 'initiate',
    pickup: 'pickup',
    refund_initiate: 'refund-initiate',
    error: 'error',
    completed: 'completed'
  }.freeze

  belongs_to :order, inverse_of: :returns
end
