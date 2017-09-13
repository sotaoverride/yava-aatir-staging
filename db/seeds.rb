# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

[
  {name: 'Grocery', img: 'c-1.png'},
  {name: 'Household Products', img: 'c-2.png'},
  {name: 'Health & Wellness', img: 'c-3.png'},
  {name: 'Beauty & Personal Care', img: 'c-4.png'},
  {name: 'Baby', img: 'c-5.png'},
  {name: 'Pet Supplies', img: 'c-6.png'},
  {name: 'Electronics', img: 'c-7.png'},
  {name: 'Office Products', img: 'c-10.png'},
  {name: 'Tools & Hardware', img: 'c-8.png'},
  {name: 'Business Essentials', img: 'c-9.png'}
].each do |category|
  category = Category.find_or_initialize_by(name: category[:name], image_name: category[:img])
  category.save!
end

