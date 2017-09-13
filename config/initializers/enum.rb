module Enum
  module Profile
    ProfileTypes = {
      options: [:retailer, :wholesaler, :distributor, :manufacturer],
      classname: {
        retailer: 'icon-shoper shoper',
        wholesaler: 'icon-seller seller',
        distributor: 'icon-seller-shoper seller-shoper',
        manufacturer: 'icon-manufacturer'
      }
    }

    WizardStep = {
      options: [:select_profile_type, :select_category,
                :profile_info, :business_info,
                :stripe_form, :welcome, :complete]
    }

    SomeProduct = {
      options: ['Yes, for all products', 'Yes, for some products', 'No']
    }

    Revenue = {
      options: ['<$1M', '$1M - $5M', '$5M - $10M', '$10M - $50M', '$50M - $200M', '>$200M']
    }

    SKU = {
      options: ['0-499', '500-4,999', '5000-19,999', '20,000-49,999', '>50,000']
    }

    MapPolicies = {
      options: ['Yes, all products', 'Yes, for some products', 'No', "Don't Know"]
    }

    SellOnWallmart = {
      options: ['Yes, I sell wholesale to Walmart.com', "Yes, I sell on Walmart.com's marketplace", 'No, but I have partnership with Walmart stores', 'No, I do not have an existing partnership with Walmart']
    }

    OnlineStores = {
      options: ['Amazon', 'eBay', 'Rakuten', 'Sears', 'Newegg', 'Overstock', 'Etsy', 'Other']
    }

    OrderFrequency = {
      options: ['<100', '100-499', '500-999', '1,000-4,999', '5,000-19,999', '>20,000']
    }

    Integration = {
      options: ['API integration', 'ChannelAdvisor', 'CommerceHub', 'EDI', 'Manually (e.g. CSV file upload)', 'Other']
    }

    UpdateFrequency = {
      options: ['Real-time', 'Multiple times per day', 'Once per day', 'Less than once per day']
    }

    ShipTime = {
      options: ['Same business day', '1 business day', '2 business days', '3 business days', '4 business days', '5 business days', '6+ business days']
    }

    ShipTimeGuarantee = {
      options: ['No', '1 business day', '2 business days', '3 business days', '4 business days', '5 business days', '6+ business days']
    }

    Sometimes = {
      options: ['Yes, always', 'Yes, sometimes', 'No']
    }

    ReturnPolicy = {
      options: ['Free returns shipping', 'Customer pays for returns shipping', 'Other / not applicable']
    }

    Carriers = {
      options: ['FedEx', 'UPS', 'USPS', 'DHL', 'Freight', 'FBA']
    }
  end
end
