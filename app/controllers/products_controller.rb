class ProductsController < ApplicationController
  def show; end

  def new
    @product = Product.new
  end

  # scraping the meta tag
  def fetch
    @product = Product.new(params.require(:product).permit(:category_id, :sub_category_id, :product_url)).fetch_from_url
  end

  def create
    @product = Product.new(product_params)
    if @product.save
      redirect_to new_product_path, notice: 'Product Added'
    else
      render :new
    end
  end

  def existing; end

  private

  def product_params
    params.require(:product).permit(
      :product_url, :title, :category_id, :sub_category_id,
      :price_amount, :unit, :description,
      product_images_attributes: %i[img image_url]
    )
  end
end
