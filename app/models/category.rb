# frozen_string_literal: true

#
class Category < ActiveRecord::Base
  extend FriendlyId

  has_many :profile_categories
  has_many :profiles, through: :profile_categories
  friendly_id :name, use: :slugged

  # Self relationships
  has_many :childrens, foreign_key: :parent_id, class_name: 'Category'
  belongs_to :parent, foreign_key: :parent_id, class_name: 'Category'

  scope :parents_only, -> { where(parent_id: nil) }
  scope :childs, -> { where("parent_id IS NOT NULL") }
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
#  parent_id  :integer
#  slug       :string
#
