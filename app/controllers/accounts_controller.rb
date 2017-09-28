class AccountsController < ApplicationController
  def show
    @active_tab = params[:active_tab]
  end

  def update
    @active_tab = params[:current_tab]
    updated = if user_params.has_key?(:current_password)
                current_user.update_with_password(user_params)
              else
                current_user.update_attributes(user_params)
              end

    if updated
      sign_in(current_user, bypass: true) if params[:user][:password]
      redirect_to account_path(active_tab: @active_tab)
    else
      render :show
    end
  end

  private

  def user_params
    params.require(:user).permit(
      :username, :email, :password, :password_confirmation, :current_password,
      profile_attributes: [
        :profile_type, :category_ids, :first_name, :last_name, :id,
        :avatar, :authorized_product, :anual_online_revenue, :sku_in_catalog,
        :top_selling_brand, :sell_used_product, :map_rpm_policies, :walmart_supplier, :ecommerce_url,
        :marketplace_provider, :marketplace_url, :integration, :inventory_update,
        :average_ships, :own_inventory, :fulfillment, :dropshipper, :order_to_shiptime,
        :shiptime_guarantee, :freight_carrier, :return_policy, :physical_store,
        :biz_name, :industry, :biz_address, :tax_id, :city, :state, :zipcode,
        :fulfill_from_store, :store_pickup, carriers_name: []
      ])
  end
end
