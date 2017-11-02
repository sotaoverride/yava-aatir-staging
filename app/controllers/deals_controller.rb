class DealsController < ApplicationController
  before_action :authenticate_user!

  def index
    @deals = ProductDeal.joins([:deal, :product]).includes([:deal, :product]).order(:created_at)
    @deals = @deals.where(status: Deal.statuses[:active])
    @deals = @deals.where('deals.expired_at >= ?', Date.today)
    @deals = @deals.paginate(page: params[:page], per_page: 12)
    
    respond_to do |format|
      format.html
      format.js
    end
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

    @deal = Deal.new(deal_params)
    @deal.user = current_user
    @deal.status = Deal.statuses[:inactive]
    @deal.promotion_start_at = Date.today
    @deal.save
  end

  def update
    @deal = Deal.find(params[:id])
    promotion_days = params[:deal][:promotion_days]

    if params[:deal][:status].blank? && @deal.inactive?
      @deal.status = Deal.statuses[:active]
    end

    @deal.expired_at = @deal.promotion_start_at + promotion_days.to_i.days if promotion_days.present?
    @deal.update_attributes(deal_params)  
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
