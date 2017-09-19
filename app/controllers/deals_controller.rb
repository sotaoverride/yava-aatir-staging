class DealsController < ApplicationController
  before_action :authenticate_user!
  def index
    @deals = Product.all
  end

  ##
  # deals/active
  def show
    @page = params[:id] || 'active'
  end
end
