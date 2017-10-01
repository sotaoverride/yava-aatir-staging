namespace :populate do
  desc "TODO"
  task category: :environment do
    [
      {name: 'Grocery', img: 'c-1.png', childrens: [
        { name: 'Beverages' },
        { name: 'Snack Foods' },
        { name: 'Breakfast Foods' },
        { name: 'Pantry' },
        { name: 'Candy, Gum & Chocolate' },
        { name: 'Canned & Jarred Food' },
        { name: 'Packaged Meals & Side Dishes' },
      ]},
      {name: 'Household Products', img: 'c-2.png', childrens: [
        { name: 'Cleaning Products' },
        { name: 'Cleaning Tools' },
        { name: 'Paper & Plastic Products' },
        { name: 'Laundry' },
        { name: 'Trash Bag' },
        { name: 'Food Storage' },
        { name: 'Home Fragrance' },
        { name: 'Light Bulbs' }
      ]},
      {name: 'Health & Wellness', img: 'c-3.png', childrens: [
        { name: 'Health Care' },
        { name: 'Vitamins & Dietary Supplements' },
        { name: 'Sports Nutrition & Diet' },
        { name: 'Medical Supplies & Equipment' },
        { name: 'Sexual Wellness' }
      ]},
      {name: 'Beauty & Personal Care', img: 'c-4.png', childrens: [
        { name: 'Hair Care Products' },
        { name: 'Skin Care' },
        { name: 'Personal Care' },
        { name: 'Beauty Tools & Accessories' }
      ]},
      {name: 'Baby', img: 'c-5.png', childrens: [
        { name: 'Baby Food & Formula' },
        { name: 'Diapering' }
      ]},
      {name: 'Pet Supplies', img: 'c-6.png', childrens: [
        { name: 'Dog Supplies' },
        { name: 'Cat Supplies' }
      ]},
      {name: 'Electronics', img: 'c-7.png', childrens: [
        { name: 'Television & Video' },
        { name: 'Computers & Accessories' },
        { name: 'Tablets & eReaders' },
        { name: 'Cell Phones & Accessories' },
        { name: 'Office Electronics' },
        { name: 'Home Audio' },
        { name: 'Portable Audio' },
        { name: 'Wearable Technology' },
        { name: 'Adaptors, Cable & Power' },
        { name: 'Security & Surveillance' },
      ]},
      {name: 'Office Products', img: 'c-10.png', childrens: [
        { name: 'Pens, Pencils & Markers' },
        { name: 'Paper' },
        { name: 'Binders & Binding Systems' },
        { name: 'Filling Products' },
        { name: 'Envelopes & Shipping Supplies' },
        { name: 'Label, Indexes & Stamps' },
        { name: 'Workspace Organizers' },
        { name: 'Office Storage Supplies' },
        { name: 'Scissors, Cutters & Measuring Devices' },
        { name: 'Tape, Adhesives & Fasteners' },
        { name: 'Staplers & Punches' },
        { name: 'School Supplies' },
        { name: 'Calendar & Planners' },
        { name: 'Teacher Supplies' }
      ]},
      {name: 'Tools & Hardware', img: 'c-8.png', childrens: [
        { name: 'Power & Hand Tools' },
        { name: 'Hardware' },
        { name: 'Safety & Security Equipment' },
        { name: 'Adhesives & Sealers' },
        { name: 'Painting Supplies & Wall Treatments' },
        { name: 'Tool Storage & Organization' }
      ]},
      {name: 'Business Essentials', img: 'c-9.png', childrens: [
        { name: 'Breakroom Basics' },
        { name: 'Cleaning Products' },
        { name: 'Copy Room Supplies' },
        { name: 'Facilities Maintenance' },
        { name: 'Office Tech' },
        { name: 'Office Furnishings' },
        { name: 'Safety & First Aid' },
        { name: 'Personal Care' },
        { name: 'Animal Care' },
        { name: 'Baby' }
      ]}
    ].each do |cat|
      category = Category.find_or_initialize_by(name: cat[:name], image_name: cat[:img])
      category.save!
      cat[:childrens].each do |child|
        Category.find_or_create_by(name: child[:name], parent_id: category.id)
      end
    end
  end
end
