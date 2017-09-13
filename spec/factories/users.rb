FactoryGirl.define do
  factory :user do
    sequence(:email) { |n| "test#{n}@mail.com" }
    password "password"
    password_confirmation "password"
    username "test_user"
    full_name "Test User"
  end
end
