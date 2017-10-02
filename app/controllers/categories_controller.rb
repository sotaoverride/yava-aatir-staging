class CategoriesController < ApplicationController
  respond_to :json

  ##
  # Fetch subcategories for select tag
  # accepted params:
  #   category_id:
  #     type: query param
  def index
    respond_with Category.childs.where(parent_id: params[:category_id])
  end
end
