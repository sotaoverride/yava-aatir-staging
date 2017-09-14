class WizardsController < ApplicationController
  layout 'wizard'
  skip_before_action :setup_account
  before_action :authenticate_user!

  def show
    current_user.create_profile unless current_user.profile
    @step = params[:step] ? current_user.profile.index_to_step(params[:step]) : current_user.reload.wizard_step
  end

  def update
    if params.has_key?(:user) && current_user.process_wizard(user_params)
      sign_in(current_user, bypass: true) if params[:user][:password]

      redirect_to wizards_path
    elsif current_user.profile.stripe_form?
      customer = Stripe::Customer.create(email: current_user.email, source: params[:stripeToken])
      Stripe::Subscription.create(customer: customer.id, items: [{ plan: ENV['PLAN'] }])

      current_user.update_column(:stripe_id, customer.id)
      current_user.profile.update_column(:wizard_step, current_user.profile.next_step)
      redirect_to wizards_path
    else
      if params.has_key?(:user)
        @step = params[:step] ? current_user.profile.index_to_step(params[:step]) : current_user.reload.wizard_step
        render :show
      else
        current_user.profile.update_column(:wizard_step, current_user.profile.next_step)
        redirect_to root_path
      end
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
