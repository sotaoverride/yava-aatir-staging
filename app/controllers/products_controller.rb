# frozen_string_literal: true

#
class ProductsController < ApplicationController
  def show
    @product = Product.friendly.find(params[:id])
  end

  def new
    @product = Product.new
  end

  # scraping the meta tag
  def fetch
    @product = Product.new(
      params
        .require(:product)
        .permit(:category_id, :sub_category_id, :product_url)
    ).fetch_from_url
  end

  def create
    @product = Product.new(product_params)
    if @product.save
      redirect_to existing_products_path(product: @product.slug)
    else
      render :new
    end
  end

  def search
    keyword = params[:keyword].strip
    @products = Product.where('title LIKE :keyword OR description LIKE :keyword', keyword: "%#{keyword}%")
    @products = @products.where(sub_category_id: params[:sub_category_id]) if params[:sub_category_id].present?
  end

  def existing
    @product = Product.friendly.find(params[:product])
    if @product.present?
      @products = Product.where(sub_category_id: @product.sub_category_id).order('created_at DESC');
      @deal = Deal.new
      @deal.product_deals.build
    end
  end

  private

  def product_params
    params.require(:product).permit(
      :product_url, :title, :category_id, :sub_category_id,
      :price_amount, :unit, :description,
      product_images_attributes: %i[img image_url]
    )
  end
end
