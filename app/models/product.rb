class Product < ActiveRecord::Base
  belongs_to :user

  has_many :product_images
  has_many :requests

  def primary_image
    self.product_images.where(primary_picture: true).first.img.url
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
#
