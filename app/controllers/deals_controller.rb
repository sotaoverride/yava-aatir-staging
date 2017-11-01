class DealsController < ApplicationController
  before_action :authenticate_user!
  def index
    @deals = Product.all
  end

  def new
  	@product = Product.find_by(slug: params[:product]) if params[:product].present? 
  end

  def create
  	params[:deal] = {} if params[:deal].blank?
    product_ids = params[:product_ids]
  	if product_ids.present?
      params[:deal][:product_deals_attributes] = {}
      product_ids.each_with_index do |product_id, index|
        params[:deal][:product_deals_attributes]["#{index}"] = { product_id: product_id }
      end  
    end
    #raise params.inspect
  	#deal[product_deals_attributes][0][product_id]
    @deal = Deal.new(deal_params)
    @deal.user = current_user
    @deal.status = Deal.statuses[:inactive]
    @deal.promotion_start_at = Date.today
    @deal.save
  end

  ##
  # deals/active
  def show
    @page = params[:id] || 'active'
  end

  private

  def deal_params
    params.require(:deal).permit(
      :promotion_days, :number_of_commits, :number_of_quantity,
      product_deals_attributes: %i[product_id]
    )
  end
end
