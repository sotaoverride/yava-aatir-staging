class ProfileCategory < ActiveRecord::Base
  belongs_to :profile
  belongs_to :category
end

# == Schema Information
#
# Table name: profile_categories
#
#  id          :integer          not null, primary key
#  profile_id  :integer
#  category_id :integer
#
