class DealsController < ApplicationController
  def index
    @deals = Product.all
  end
end
