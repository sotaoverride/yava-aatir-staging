class WizardsController < ApplicationController
  layout 'wizard'
  skip_before_action :setup_account
  before_action :authenticate_user!, :uncomplete_account_only

  def show
    current_user.create_profile unless current_user.reload.profile
    @step = if params[:step] && params[:step].to_i <= current_user.reload.profile.current_step_index
              current_user.profile.index_to_step(params[:step])
            else
              current_user.reload.wizard_step
            end
  end

  def update
    if params.has_key?(:user) && current_user.process_wizard(user_params, params[:step])
      sign_in(current_user, bypass: true) if params[:user][:password]

      if params[:step]
        redirect_to wizards_path(step: params[:step])
      else
        redirect_to wizards_path
      end
    elsif (params[:step].to_i - 1) == current_user.profile.current_step_index && current_user.profile.stripe_form?
      customer = Stripe::Customer.create(email: current_user.email, source: params[:stripeToken])
      if params[:cost].to_i > 0
        Stripe::Subscription.create(customer: customer.id, items: [{ plan: ENV['PLAN'] }])
      end

      current_user.update_column(:stripe_id, customer.id)
      current_user.profile.update_column(:wizard_step, current_user.profile.next_step)
      redirect_to wizards_path
    else
      if params.has_key?(:user)
        @step = params[:step] ? current_user.profile.index_to_step(params[:step].to_i - 1) : current_user.reload.wizard_step
        render :show
      else
        current_user.profile.update_column(:wizard_step, current_user.profile.next_step) if current_user.profile.is_next_step_processable?
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
        :biz_name, :industry, :biz_address, :tax_id, :city, :state, :zipcode,
        :fulfill_from_store, :store_pickup, carriers_name: []
      ])
  end

  def uncomplete_account_only
    redirect_to root_path if current_user.approved? && current_user.profile.complete?
  end
end
