class CreateTableUserCategories < ActiveRecord::Migration
  def change
    create_table :profile_categories do |t|
      t.references :profile, index: true, foreign_key: true
      t.references :category, index: true, foreign_key: true
    end
  end
end
