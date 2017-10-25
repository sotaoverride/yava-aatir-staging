# == Schema Information
#
# Table name: order_payments
#
#  id                        :integer          not null, primary key
#  order_id                  :integer
#  payment_method            :string           not null
#  status                    :string           not null
#  encrypted_cc_number       :string
#  encrypted_ccv_code        :string
#  encrypted_cc_exp_month    :string
#  encrypted_cc_exp_year     :string
#  encrypted_cc_number_iv    :string
#  encrypted_ccv_code_iv     :string
#  encrypted_cc_exp_month_iv :string
#  encrypted_cc_exp_year_iv  :string
#  created_at                :datetime         not null
#  updated_at                :datetime         not null
#

class OrderPayment < ActiveRecord::Base
  STATUS = { pending: 'pending', in_process: 'in-process', success: 'success', failed: 'failed' }.freeze
  PAYMENT_METHOD = { stripe: 'stripe' }.freeze

  %i[
    cc_number
    ccv_code
    cc_exp_month
    cc_exp_year
  ].each { |column| attr_encrypted column, key: ENV.fetch('ATTR_ENCRYPTED_KEY') }

  validates :order_id, presence: true, uniqueness: true
  validates :status, presence: true, inclusion: {
    in: STATUS.values,
    message: '%<value> is not a valid payment status'
  }
  validates :payment_method, presence: true, inclusion: {
    in: PAYMENT_METHOD.values,
    message: '%<value> is not a valid payment method'
  }
end
