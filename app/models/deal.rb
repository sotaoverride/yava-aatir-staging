# == Schema Information
#
# Table name: deals
#
#  id                 :integer          not null, primary key
#  promotion_days     :integer          not null
#  number_of_commits  :integer          not null
#  promotion_start_at :date             not null
#  number_of_quantity :integer          not null
#  status             :integer          not null
#  description        :text
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#  request_id         :integer
#  user_id            :integer
#

class Deal < ActiveRecord::Base
  enum status: [:active, :inactive]

  belongs_to :user, inverse_of: :deals
  has_many :product_deals, dependent: :destroy
  has_many :products, through: :product_deals
  
  accepts_nested_attributes_for :product_deals, allow_destroy: true

  validates :user_id, :status, presence: true
  # validates :promotion_days, :number_of_commits, :number_of_quantity, presence: true, numericality: true
end
