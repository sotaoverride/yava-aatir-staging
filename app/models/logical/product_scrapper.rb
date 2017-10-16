# frozen_string_literal: true

module Logical
  ##
  # Scraping meta tags from URL given
  class ProductScrapper
    attr_accessor :page, :product, :errors
    def initialize(product_url, product)
      @product = product
      begin
        @page = MetaInspector.new(product_url)
        process
      rescue
        @errors = 'Given URL is invalid'
        @product.errors.add(:product_url, 'given is invalid')
      end
    end

    protected

    def process
      product.assign_attributes(strips_meta_tags)
      property = page.meta_tags.try(:[], 'property')
      (property.try(:[], 'og:image').presence || []).each do |image|
        product.product_images.build(image_url: image)
      end
      product.product_images.build
    end

    def strips_meta_tags
      property = page.meta_tags.try(:[], 'property')
      {
        title: property.try(:[], 'og:title'),
        description: property.try(:[], 'og:description').try(:join, ','),
        product_url: page.url
      }
    end
  end
end
