# frozen_string_literal: true

#
class RequestsController < ApplicationController
  def index
    @requests = current_user.requests
  end

  def new; end

  def add
    @request  = current_user.requests.new(product_id: params[:request_id])
    @products = Product.most_used(current_user, params[:request_id])
  end

  def create
    @request = current_user.requests.new(request_params)
    @request.save
  end

  def edit
    @request  = current_user.requests.where(id: params[:id]).first
    @products = Product.most_used(current_user, @request.product_id)
  end

  def update
    @request  = current_user.requests.where(id: params[:id]).first
    @request.update_attributes(request_params)
  end

  private

  def request_params
    params.require(:request).permit(
      :product_id, :discount_type, :quantity, :amount
    )
  end
end
