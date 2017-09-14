class RequestTier < ActiveRecord::Base
  belongs_to :request
end

# == Schema Information
#
# Table name: request_tiers
#
#  id              :integer          not null, primary key
#  request_id      :integer
#  quantity        :integer
#  value_reduction :decimal(, )
#  value_type      :integer
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
