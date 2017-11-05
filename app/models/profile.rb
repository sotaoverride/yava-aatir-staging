class Profile < ActiveRecord::Base
  has_many :profile_categories, dependent: :destroy
  has_many :categories, through: :profile_categories
  belongs_to :user

  mount_uploader :avatar, AvatarUploader

  validates :wizard_step, inclusion: Enum::Profile::WizardStep[:options].map(&:to_s)
  validate :profile_type_included_in_constant, unless: Proc.new { |p| p.profile_type.blank? }

  validates :last_name, presence: true, on: [:update], if: Proc.new { |p| p.last_name_changed? }
  validates :first_name, presence: true, on: [:update], if: Proc.new { |p| p.first_name_changed? }

  validates :top_selling_brand, presence: { message: "top selling brand can't be blank" }, on: [:update], if: Proc.new { |p| p.top_selling_brand_changed? }
  validates :ecommerce_url, presence: { message: "ecommerce url can't be blank" }, on: [:update], if: Proc.new { |p| p.ecommerce_url_changed? }
  validates :marketplace_url, presence: { message: "marketplace url can't be blank" }, on: [:update], if: Proc.new { |p| p.marketplace_url_changed? }
  validates :fulfillment, presence: true, on: [:update], if: Proc.new { |p| p.fulfillment_changed? }
  validates :dropshipper, presence: true, on: [:update], if: Proc.new { |p| p.dropshipper_changed? }
  validates :dropshipper, numericality: { greater_than: 0 }, on: [:update], if: Proc.new { |p| p.dropshipper_changed? }
  validates :carriers, presence: true, on: [:update], if: Proc.new { |p| p.carriers_changed? }
  validates :biz_name, presence: { message: "business name can't be blank" }, if: Proc.new { |p| p.biz_name_changed? }
  validates :biz_address, presence: { message: "business address can't be blank" }, if: Proc.new { |p| p.biz_address_changed? }
  validates :tax_id, presence: true, on: [:update], if: Proc.new { |p| p.tax_id_changed? }
  validates :tax_id, format: { with: /\d{2}-\d{8}/, message: "incorect format" }, on: [:update], if: Proc.new { |p| p.tax_id_changed? }
  validates :city, presence: true, on: [:update], if: Proc.new { |p| p.city_changed? }
  validates :state, presence: true, on: [:update], if: Proc.new { |p| p.state_changed? }
  validates :zipcode, presence: true, on: [:update], if: Proc.new { |p| p.zipcode_changed? }

  accepts_nested_attributes_for :profile_categories, allow_destroy: true

  attr_accessor :category_ids, :carriers_names

  ##
  # Registration wizard step
  Enum::Profile::WizardStep[:options].each do |step|
    define_method "#{step}?" do
      self.wizard_step.to_sym == step
    end
  end

  def full_name
    "#{first_name} #{last_name}"
  end

  def next_step
    Enum::Profile::WizardStep[:options][current_step_index + 1]
  end

  def prev_step
    Enum::Profile::WizardStep[:options][current_step_index - 1]
  end

  def current_step_index
    Enum::Profile::WizardStep[:options].index(wizard_step.to_sym)
  end

  def is_next_step_processable?(step=self.current_step_index + 1)
    (self.next_step && self.current_step_index.to_i == (step - 1) && !self.welcome?) || (self.welcome? && self.user.approved == true)
  end

  def index_to_step(index)
    Enum::Profile::WizardStep[:options][index.to_i].to_s
  end

  # Setter and getter for category_ids
  def category_ids=(new_ids)
    new_ids_array = new_ids.to_s.split(',').map(&:to_i)
    delete_ids    = self.category_ids - new_ids_array
    add_ids       = new_ids_array - self.category_ids

    # Mark for delete
    self.profile_categories_attributes = delete_ids.map do |idx|
      pc_id = self.profile_categories.find_by(category_id: idx).id
      if pc_id
        { id: pc_id, _destroy: true }
      else
        nil
      end
    end.compact

    # Build for add
    add_ids.each do |id|
      self.profile_categories.build(category_id: id)
    end
  end

  def category_ids
    self.categories.map(&:id)
  end

  def carriers_name=(new_carriers)
    selected_carriers = new_carriers.select { |a| a != '0' }
    self.carriers = selected_carriers.join(',')
  end

  def carriers_name
    self.carriers.to_s.split(',')
  end

  private

  def profile_type_included_in_constant
    if profile_type
      ##
      # all profile type should matched with our constant
      # bellow operation will return these results
      # [1,2,3] - [1,2,3,4] = []  # match all
      # [1,5] - [1,2,3,4]   = [5] # some record did not match
      matched_results = self.profile_type.split(',').map(&:strip) - Enum::Profile::ProfileTypes[:options].map(&:to_s)

      unless matched_results.blank?
        errors.add :profile_type, "some of record is invalid"
      end
    end
  end
end

# == Schema Information
#
# Table name: profiles
#
#  id                   :integer          not null, primary key
#  profile_type         :string
#  user_id              :integer
#  first_name           :string
#  last_name            :string
#  wizard_step          :string           default("select_profile_type")
#  created_at           :datetime         not null
#  updated_at           :datetime         not null
#  authorized_product   :string
#  anual_online_revenue :string
#  sku_in_catalog       :string
#  top_selling_brand    :string
#  sell_used_product    :string
#  map_rpm_policies     :string
#  walmart_supplier     :string
#  ecommerce_url        :string
#  marketplace_provider :string
#  marketplace_url      :string
#  integration          :string
#  inventory_update     :string
#  average_ships        :string
#  own_inventory        :boolean
#  fulfillment          :string
#  dropshipper          :integer
#  order_to_shiptime    :string
#  shiptime_guarantee   :string
#  freight_carrier      :string
#  return_policy        :string
#  carriers             :string
#  physical_store       :boolean
#  fulfill_from_store   :boolean
#  store_pickup         :boolean
#  avatar               :string
#  biz_name             :string
#  industry             :string
#  biz_address          :string
#  tax_id               :string
#  city                 :string
#  state                :string
#  zipcode              :string
#
