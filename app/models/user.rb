class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable,
         :omniauthable, omniauth_providers: [:facebook, :google_oauth2]

  attr_accessor :agreement

  delegate :wizard_step, to: :profile, allow_nil: true

  validates :agreement, acceptance: true, on: [:create]
  validates :full_name, presence: true, on: [:create]

  validates :username,
    presence: true,
    uniqueness: { case_sensitive: false },
    format: { with: /\A[a-zA-Z0-9]+\z/ },
    length: { in: 4..10 }, on: [:update], if: Proc.new { |u| u.username_changed? }

  has_one :profile, dependent: :destroy
  accepts_nested_attributes_for :profile

  ##
  # omniauth callback
  def self.from_omniauth(auth)
    where(provider: auth.provider, uid: auth.uid).first_or_initialize do |user|
      user.email = auth.info.email
      user.full_name = auth.info.name
      user.provider_image = auth.info.image
      user.save
    end
  end

  ##
  # create profile if no profile found linked
  def create_profile
    name = self.full_name.split(' ')
    Profile.create(first_name: name[0], last_name: name[1], user_id: self.id)
    self
  end

  ##
  # Processing wizard form
  def process_wizard(params, step)
    if self.update_attributes(params)
      self.profile.update_column(:wizard_step, profile.next_step) if profile.next_step && profile.current_step_index.to_i == (step.to_i - 1)
      return true
    else
      return false
    end
  end

  ##
  # Bellow code override devise required password for signup
  def password_required?
    super if persisted?
  end

  def password_match?
    self.errors[:password] << "can't be blank" if password.blank?
    self.errors[:password_confirmation] << "can't be blank" if password_confirmation.blank?
    self.errors[:password_confirmation] << "does not match password" if password != password_confirmation
    password == password_confirmation && !password.blank?
  end
end

# == Schema Information
#
# Table name: users
#
#  id                     :integer          not null, primary key
#  email                  :string           default(""), not null
#  encrypted_password     :string           default(""), not null
#  reset_password_token   :string
#  reset_password_sent_at :datetime
#  remember_created_at    :datetime
#  sign_in_count          :integer          default(0), not null
#  current_sign_in_at     :datetime
#  last_sign_in_at        :datetime
#  current_sign_in_ip     :string
#  last_sign_in_ip        :string
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#  full_name              :string
#  username               :string
#  stripe_id              :string
#  provider               :string
#  uid                    :string
#
