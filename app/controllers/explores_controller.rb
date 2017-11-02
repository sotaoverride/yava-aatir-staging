class ExploresController < ApplicationController
  protect_from_forgery with: :exception
  before_action :authenticate_user!

  def index
    @products = Product.all
    @deal = Deal.new
  end
end
