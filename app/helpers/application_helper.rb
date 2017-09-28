module ApplicationHelper
  def title(page_title)
    content_for :title, page_title.to_s
  end

  def us_states
    us = Carmen::Country.coded('us')
    us.subregions.select { |u| u.type == 'state' }.map { |state| [state.name, state.code] }
  end
end
