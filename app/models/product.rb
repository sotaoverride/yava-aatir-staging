# frozen_string_literal: true

#
class Product < ActiveRecord::Base
  extend FriendlyId

  belongs_to :user
  belongs_to :category
  belongs_to :sub_category, class_name: 'Category'

  has_many :product_images
  has_many :requests

  friendly_id :title, use: :slugged

  accepts_nested_attributes_for :product_images, allow_destroy: true

  validates :unit, presence: true
  validates :title, presence: true
  validates :standard_price, presence: true

  ##
  # this writer and reader method are for converting standard price to cents
  def price_amount=(new_price = 0)
    self.standard_price = new_price.to_f * 100
  end

  def price_amount
    if standard_price
      standard_price / 100.0
    else
      0
    end
  end

  ##
  # TODO: needed to be redeveloped to select many products
  def self.most_used(current_user, priority_product_id)
    limit(5).order("position(id::text in '#{priority_product_id}') DESC")
  end

  def primary_image
    product_images.first.image
  end

  def fetch_from_url
    Logical::ProductScrapper.new(product_url, self).product
  end
end

# == Schema Information
#
# Table name: products
#
#  id              :integer          not null, primary key
#  user_id         :integer
#  title           :string
#  description     :text
#  standard_price  :integer
#  quantity        :integer
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  category_id     :integer
#  sub_category_id :integer
#  product_url     :string
#  unit            :string
#  slug            :string
#
