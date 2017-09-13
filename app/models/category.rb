class Category < ActiveRecord::Base
  has_many :profile_categories
  has_many :profiles, through: :profile_categories
end

# == Schema Information
#
# Table name: categories
#
#  id         :integer          not null, primary key
#  name       :string
#  image_name :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
