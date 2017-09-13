class SetDefaultValueForWizardStep < ActiveRecord::Migration
  def up
    change_column :profiles, :wizard_step, :string, default: 'select_profile_type'
  end

  def down
    change_column :profiles, :wizard_step, :string, default: nil
  end  
end
