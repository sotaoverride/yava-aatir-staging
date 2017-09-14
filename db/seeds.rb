# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
require 'ffaker'

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

description = "
<h3>The Power of Snail Extract</h3>
<p>From Korean skincare company Mizon, these products are cult favorites for good reason. The All-in-One Snail Repair Cream does it all—from fading hyperpigmentation and acne scarring, to minimizing pores and blackheads, to fighting fine lines and other signs of aging. It’s formulated with 92-percent snail filtrate, different plant extracts, and a number of antioxidant-rich ingredients.</p>
<p>Apply it as the final step of your skincare routine in the morning, at night, or both. Made with 74-percent snail extra, the Snail Recovery Gel Cream’s lightweight formula provides serious hydration without leaving behind a greasy sheen. Apply it over your face and neck as part of your daily routine, double up and use it as a sleeping mask, or dab on a small amount wherever you need to soothe inflammation.</p>
<h3>About Mizon</h3>
<p>At Mizon, Korea’s leading beauty researchers and scientists come together to make incredible products accessible to everyone. Each product features generous portions of the best, most highly regarded active ingredients to make sure your skin gets the maximum benefits.</p>
<h3>Included</h3>
<ul>
  <li>All-in-One Snail Repair Cream (75ml pot)</li>
  <li>All-in-One Mizon Snail Recovery Gel Cream (45ml tube)</li>
</ul>
<h3>Ingredients</h3>
<p>Mizon All-in-One Snail Repair Cream: Snail Secretion Filtrate, Cetearyl Olivate, Sorbitan Olivate, Cetearyl Alcohol, Stearic Acid, Glyceryl Stearate, Hydrogenate Vegetable Oil, Dimethicone, Triethanolamine, Carbomer, Butylene Glycol, PED/PPG-17/6 Copolymer, Polyacrylate-13, Polyisobutene, Polysorbate 20, Sodium Polyacrylate, Caprylyl Glycol, Ethylhexylglycerin, Tropolone, Adenosine, Sodium Hyaluronate, Portulaca Oleracea Extract, Betula Platyphylla Japonica Juice, Amica Montana Flower Extract, Artemisia Absinthium Extract, Achillea Millefolium Extract, Gentiana Lutea Root Extract, Alcohol, Camellia Sinensis Leaf Extract, Centella Asiatica Extract, Copper Tripeptide-1, Human Oligopeptide-1, Propylene Glycol, Rubus Idaeus (Rasberry) Fruit Extract, Beta-Glucan, Palmitoyl Pentapeptide-4, Disodium EDTA</p>
<p>Mizon Snail Recovery Gel Cream: Snail Secretion Filtrate, Butylene Glycol, Cyclopentasiloxane, Glycerin, Bis-Peg-18 Methyl Ether Dimethyl Silane, Polysorbate 20, Sodium Hyaluronate, Carbomer, Glycosyl Trehalose, Hydrogenated Starch Hydrolysate, Triethanolamine, Dimethicone/Vinyl Dimethicone Crosspolymer, Dimethicone, Hydroxyethylcellulose, Caprylyl Glycol, Ethylhexylglycerin, Sodium Polyacrylate, Centella Asiatica Extract, Portulaca Oleracea Extract, Camellias Sinensis Leaf Extract, Nelumbo Nucifera Flower Extract, Betula Platylphylla Japonica Juice, Tropolone, Copper Tripeptide-1, Allantoin, Panthenol, Olea Europaea (Olive) Fruit Oil, Helianthus Annuus (Sunflower) Seed Oil, Palmitoyl Pentapeptide-4, Adenosine, Disodium EDTA</p>
<h3>Shipping</h3>
<p>All orders will be shipped by Massdrop.</p>
<p>Estimated ship date is Aug 7, 2017 PT.</p>
<p>After the drop ends, payment will be collected. To deliver the best value to the group the request will then be submitted to the vendor up front, making all sales final. Be sure to check the discussion page for updates.</p>"

10.times do |i|
  product = Product.create(title: FFaker::Product.product_name, description: description, standard_price: 180)
  3.times do |p|
    file = File.open(Rails.root.join('db', 'seeds', 'images', "#{Random.rand(5) + 1}.jpg"))
    pi = product.product_images.create(primary_picture: p == 0)
    pi.img.store!(file)
    pi.save!
  end
end
