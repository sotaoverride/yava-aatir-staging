class DealsController < ApplicationController
  def index
    @deals = Product.all
  end

  ##
  # deals/active
  def show
    @page = params[:id] || 'active'
  end
end
