FactoryGirl.define do
  factory :request_tier do
    request nil
    quantity 1
    value_reduction "9.99"
    value_type 1
  end
end
