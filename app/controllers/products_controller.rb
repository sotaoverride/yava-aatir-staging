class ProductsController < ApplicationController
  def show; end

  def new
    @product = Product.new
  end

  def create
  end

  def existing; end
end
