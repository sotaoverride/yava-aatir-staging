module ApplicationHelper
  def title(page_title)
    content_for :title, page_title.to_s
  end

  def us_states
    us = Carmen::Country.coded('us')
    us.subregions.select { |u| u.type == 'state' }.map { |state| [state.name, state.code] }
  end

  def breadcrumbs
    paths = ['Home']
    paths << Category.friendly.find(params[:category_id]).name if params.has_key?(:category_id)
    paths << Category.friendly.find(params[:subcategory_id]).name if params.has_key?(:subcategory_id)
    crumbs = content_tag 'p' do
      raw(
        paths.each_with_index.map do |path, index|
          if paths.length == (index + 1)
            raw(path + ' &nbsp; ')
          else
            raw(path + ' &nbsp; ' + content_tag('i', '', class: 'fa fa-angle-right', 'aria-hidden' => 'true') + ' &nbsp; ')
          end
        end.join(' ')
      )
    end
    raw(crumbs + content_tag('h3', paths.last))
  end

  def specific_deals_url
    if params.has_key?(:subcategory_id)
      category_subcategory_deals_path(params[:category_id], params[:subcategory_id])
    elsif params.has_key?(:category_id)
      category_deals_path(params[:category_id])
    else
      deals_path
    end
  end

  def specific_requests_url
    if params.has_key?(:subcategory_id)
      category_subcategory_requests_path(params[:category_id], params[:subcategory_id])
    elsif params.has_key?(:category_id)
      category_requests_path(params[:category_id])
    else
      requests_path
    end
  end

  def specific_explores_url
    if params.has_key?(:subcategory_id)
      category_subcategory_explores_path(params[:category_id], params[:subcategory_id])
    elsif params.has_key?(:category_id)
      category_explores_path(params[:category_id])
    else
      explores_path
    end
  end

  def display_price(price)
    number_to_currency(price, unit: 'USD')
  end

  def display_truncate_content(content, length)
    truncate(content, length: length)
  end  
end
