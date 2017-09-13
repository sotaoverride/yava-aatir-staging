require 'rails_helper'

RSpec.describe User, type: :model do
  let(:user) { create(:user) }

  describe 'validations' do
    it { should validate_presence_of(:full_name) }
    it { should validate_acceptance_of(:agreement) }
    it { should_not validate_presence_of(:password) }
    it { should_not validate_uniqueness_of(:username) }
    it { should_not validate_length_of(:username).
          is_at_least(4).is_at_most(10) }


    describe 'on edit' do
      subject { user }
      it { should_not validate_acceptance_of(:agreement) }
      it { should_not validate_presence_of(:full_name) }
      it { should validate_length_of(:username).is_at_least(4).is_at_most(10) }

      it 'validate uniqueness' do
        newuser = create(:user, email: 'another@testing.com', username: nil)
        newuser.username = user.username
        expect(newuser.valid?).to be_falsey
      end

      describe 'should validate format' do

        it 'true if not contain space' do
          user.username = 'joko3ono'
          expect(user.valid?).to be_truthy
        end

        it 'true if mix uppercase, downcase and number' do
          user.username = 'Joko3ono'
          expect(user.valid?).to be_truthy
        end

        it 'false if contain space' do
          user.username = 'joko ono'
          expect(user.valid?).to be_falsey
        end

        it 'false if contain underscore char' do
          user.username = 'joko_ono'
          expect(user.valid?).to be_falsey
        end

      end
    end
  end

  describe 'profile creation & wizard process' do

    before do
      @user = create(:user).create_profile
    end

    it 'should create profile and split first name and last name' do
      expect(@user.profile.first_name).to eq(@user.full_name.split(' ')[0])
      expect(@user.profile.last_name).to eq(@user.full_name.split(' ')[1])
      expect(@user.profile.wizard_step.to_sym).to eq(Enum::Profile::WizardStep[:options][0])
    end

    it 'should save profile and continue to next step' do
      @user.process_wizard({username: 'testing123'})
      expect(@user.reload.wizard_step.to_sym).to eq(Enum::Profile::WizardStep[:options][1])
    end

    it 'should save profile and stay at completed step' do
      @user.profile.update_column(:wizard_step, :complete)
      @user.process_wizard({username: 'testing123'})
      expect(@user.reload.wizard_step.to_sym).to eq(Enum::Profile::WizardStep[:options].last)
    end

  end

end
