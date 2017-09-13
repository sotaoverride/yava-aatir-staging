require 'rails_helper'

RSpec.describe Profile, type: :model do
  let(:profile) { create(:profile) }

  describe 'validations' do
    it { should validate_inclusion_of(:wizard_step).
         in_array(Enum::Profile::WizardStep[:options].map(&:to_s)) }

    it 'should not valid if given list of profile type is not in constant' do
      profile.profile_type = 'testing, distributor'
      expect(profile.valid?).to be_falsey
    end

    it 'should valid if given list of profile type in constant' do
      profile.profile_type = 'retailer, wholesaler'
      expect(profile.valid?).to be_truthy
    end
  end

  describe 'wizard step' do
    it 'should return next step' do
      expect(profile.next_step).to eq(Enum::Profile::WizardStep[:options][1])
    end

    it 'should return nil if already on the last step' do
      profile.wizard_step = Enum::Profile::WizardStep[:options].last
      expect(profile.next_step).to eq(nil)
    end
  end

  describe 'assigne category' do
    before do
      5.times { create(:category) }
    end

    it 'should not saved before .save called' do
      profile.category_ids = Category.limit(2).map(&:id).join(',')
      expect(profile.category_ids).to be_blank
      profile.save
      expect(profile.reload.category_ids).not_to be_blank
    end

    it 'should not create duplicate' do
      profile.category_ids = Category.limit(2).map(&:id).join(',')
      profile.save
      expect(profile.reload.categories.length).to eq(2)

      profile.category_ids = Category.limit(3).map(&:id).join(',')
      profile.save
      expect(profile.reload.categories.length).to eq(3)
    end

    it 'should remove unused category' do
      profile.category_ids = Category.limit(2).map(&:id).join(',')
      profile.save
      expect(profile.reload.categories.length).to eq(2)

      profile.category_ids = Category.all[2].id
      profile.save
      expect(profile.reload.categories.length).to eq(1)
    end
  end

end
