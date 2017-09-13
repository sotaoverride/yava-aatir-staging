class CreateProfiles < ActiveRecord::Migration
  def change
    create_table :profiles do |t|
      t.string :profile_type
      t.references :category, index: true, foreign_key: true
      t.references :user, index: true, foreign_key: true
      t.string :first_name
      t.string :last_name
      t.string :wizard_step

      t.timestamps null: false
    end
  end
end
