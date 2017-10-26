# == Schema Information
#
# Table name: deals
#
#  id                 :integer          not null, primary key
#  product_id         :integer
#  promotion_days     :integer          not null
#  number_of_commits  :integer          not null
#  promotion_start_at :date             not null
#  number_of_quantity :integer          not null
#  status             :integer          not null
#  description        :text
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#

class Deal < ActiveRecord::Base
  enum status: [:active, :inactive]
  belongs_to :product, inverse_of: :deals

  validates :product_id, :status, presence: true
  validates :promotion_days, :number_of_commits, :number_of_quantity, presence: true, numericality: true
end
