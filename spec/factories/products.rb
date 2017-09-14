FactoryGirl.define do
  factory :product do
    user nil
    description "MyText"
    standard_price "9.99"
    quantity 1
  end
end
