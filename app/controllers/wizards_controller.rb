class WizardsController < ApplicationController
  layout 'wizard'
  skip_before_action :setup_account
  before_action :authenticate_user!

  def show
    current_user.create_profile unless current_user.profile
  end

  def update
    if current_user.process_wizard(user_params)
      sign_in(current_user, bypass: true) if params[:user][:password]

      redirect_to wizards_path
    else
      render :show
    end
  end

  private

  def user_params
    params.require(:user).permit(
      :username, :email, :password, :password_confirmation,
      profile_attributes: [
        :profile_type, :category_ids, :first_name, :last_name, :id,
        :avatar, :authorized_product, :anual_online_revenue, :sku_in_catalog,
        :top_selling_brand, :sell_used_product, :map_rpm_policies, :walmart_supplier, :ecommerce_url,
        :marketplace_provider, :marketplace_url, :integration, :inventory_update,
        :average_ships, :own_inventory, :fulfillment, :dropshipper, :order_to_shiptime,
        :shiptime_guarantee, :freight_carrier, :return_policy, :physical_store,
        :fulfill_from_store, :store_pickup, carriers_name: []
      ])
  end
end
