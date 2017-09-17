class OrdersController < ApplicationController
  def show
    @step = params[:id] || 'shipping'
  end
end
