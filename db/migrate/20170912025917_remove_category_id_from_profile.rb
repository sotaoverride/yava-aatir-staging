class RemoveCategoryIdFromProfile < ActiveRecord::Migration
  def change
    remove_reference :profiles, :category, index: true, foreign_key: true
  end
end
