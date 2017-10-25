# == Schema Information
#
# Table name: transactions
#
#  id         :integer          not null, primary key
#  order_id   :integer
#  amount     :decimal(10, 4)   not null
#  txn_type   :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Transaction < ActiveRecord::Base
  belongs_to :order, inverse_of: :transactions

  enum txn_type: [:credit, :debit]

  validates :order_id, presence: true
  validates :amount, presence: true, numericality: { greater_than: 0 }
end
