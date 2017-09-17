class DealsController < ApplicationController
  def index
    @deals = Product.all
  end

  ##
  # deals/active
  def show; end
end
