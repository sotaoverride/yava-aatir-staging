# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20171025054018) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "cart_items", force: :cascade do |t|
    t.integer  "cart_id"
    t.integer  "deal_id"
    t.string   "name",                                              null: false
    t.text     "description",                                       null: false
    t.decimal  "price",       precision: 10, scale: 4,              null: false
    t.decimal  "discount",    precision: 10, scale: 4,              null: false
    t.decimal  "tax",         precision: 10, scale: 4,              null: false
    t.integer  "quantity",                                          null: false
    t.json     "data",                                 default: {}
    t.datetime "created_at",                                        null: false
    t.datetime "updated_at",                                        null: false
  end

  add_index "cart_items", ["cart_id"], name: "index_cart_items_on_cart_id", using: :btree
  add_index "cart_items", ["deal_id"], name: "index_cart_items_on_deal_id", using: :btree

  create_table "carts", force: :cascade do |t|
    t.integer  "user_id"
    t.string   "status",           null: false
    t.integer  "cart_items_count", null: false
    t.datetime "created_at",       null: false
    t.datetime "updated_at",       null: false
  end

  add_index "carts", ["user_id"], name: "index_carts_on_user_id", using: :btree

  create_table "categories", force: :cascade do |t|
    t.string   "name"
    t.string   "image_name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer  "parent_id"
    t.string   "slug"
  end

  add_index "categories", ["slug"], name: "index_categories_on_slug", unique: true, using: :btree

  create_table "friendly_id_slugs", force: :cascade do |t|
    t.string   "slug",                      null: false
    t.integer  "sluggable_id",              null: false
    t.string   "sluggable_type", limit: 50
    t.string   "scope"
    t.datetime "created_at"
  end

  add_index "friendly_id_slugs", ["slug", "sluggable_type", "scope"], name: "index_friendly_id_slugs_on_slug_and_sluggable_type_and_scope", unique: true, using: :btree
  add_index "friendly_id_slugs", ["slug", "sluggable_type"], name: "index_friendly_id_slugs_on_slug_and_sluggable_type", using: :btree
  add_index "friendly_id_slugs", ["sluggable_id"], name: "index_friendly_id_slugs_on_sluggable_id", using: :btree
  add_index "friendly_id_slugs", ["sluggable_type"], name: "index_friendly_id_slugs_on_sluggable_type", using: :btree

  create_table "order_addresses", force: :cascade do |t|
    t.integer  "order_id"
    t.string   "first_name",                      null: false
    t.string   "last_name",                       null: false
    t.string   "street_address1",                 null: false
    t.string   "street_address2"
    t.string   "zip_code",                        null: false
    t.string   "phone_number",                    null: false
    t.integer  "address_type",                    null: false
    t.boolean  "is_default",      default: false
    t.datetime "created_at",                      null: false
    t.datetime "updated_at",                      null: false
  end

  add_index "order_addresses", ["order_id"], name: "index_order_addresses_on_order_id", using: :btree

  create_table "order_items", force: :cascade do |t|
    t.integer  "order_id"
    t.datetime "created_at",                                            null: false
    t.datetime "updated_at",                                            null: false
    t.integer  "deal_id"
    t.string   "name",                                                  null: false
    t.text     "description",                                           null: false
    t.decimal  "price",           precision: 10, scale: 4,              null: false
    t.decimal  "discount",        precision: 10, scale: 4,              null: false
    t.decimal  "tax",             precision: 10, scale: 4,              null: false
    t.integer  "quantity",                                              null: false
    t.json     "order_item_data",                          default: {}
  end

  add_index "order_items", ["deal_id"], name: "index_order_items_on_deal_id", using: :btree
  add_index "order_items", ["order_id"], name: "index_order_items_on_order_id", using: :btree

  create_table "order_payment_informations", force: :cascade do |t|
    t.integer  "order_id"
    t.string   "payment_method",            null: false
    t.string   "status",                    null: false
    t.string   "encrypted_cc_number"
    t.string   "encrypted_ccv_code"
    t.string   "encrypted_cc_exp_month"
    t.string   "encrypted_cc_exp_year"
    t.string   "encrypted_cc_number_iv"
    t.string   "encrypted_ccv_code_iv"
    t.string   "encrypted_cc_exp_month_iv"
    t.string   "encrypted_cc_exp_year_iv"
    t.datetime "created_at",                null: false
    t.datetime "updated_at",                null: false
  end

  add_index "order_payment_informations", ["order_id"], name: "index_order_payment_informations_on_order_id", using: :btree

  create_table "order_payments", force: :cascade do |t|
    t.integer  "order_id"
    t.string   "payment_method",            null: false
    t.string   "status",                    null: false
    t.string   "encrypted_cc_number"
    t.string   "encrypted_ccv_code"
    t.string   "encrypted_cc_exp_month"
    t.string   "encrypted_cc_exp_year"
    t.string   "encrypted_cc_number_iv"
    t.string   "encrypted_ccv_code_iv"
    t.string   "encrypted_cc_exp_month_iv"
    t.string   "encrypted_cc_exp_year_iv"
    t.datetime "created_at",                null: false
    t.datetime "updated_at",                null: false
  end

  add_index "order_payments", ["order_id"], name: "index_order_payments_on_order_id", using: :btree

  create_table "orders", force: :cascade do |t|
    t.integer  "user_id"
    t.integer  "cart_id"
    t.string   "order_number",                               null: false
    t.string   "order_status",                               null: false
    t.string   "payment_status",                             null: false
    t.string   "currency"
    t.decimal  "total_price",       precision: 10, scale: 4, null: false
    t.integer  "order_items_count",                          null: false
    t.json     "order_data"
    t.datetime "created_at",                                 null: false
    t.datetime "updated_at",                                 null: false
    t.string   "step",                                       null: false
  end

  add_index "orders", ["cart_id"], name: "index_orders_on_cart_id", using: :btree
  add_index "orders", ["user_id"], name: "index_orders_on_user_id", using: :btree

  create_table "product_images", force: :cascade do |t|
    t.string   "img"
    t.boolean  "primary_picture"
    t.integer  "product_id"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
    t.string   "image_url"
  end

  add_index "product_images", ["product_id"], name: "index_product_images_on_product_id", using: :btree

  create_table "products", force: :cascade do |t|
    t.integer  "user_id"
    t.string   "title"
    t.text     "description"
    t.integer  "standard_price"
    t.integer  "quantity"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
    t.integer  "category_id"
    t.integer  "sub_category_id"
    t.string   "product_url"
    t.string   "unit"
    t.string   "slug"
  end

  add_index "products", ["slug"], name: "index_products_on_slug", unique: true, using: :btree
  add_index "products", ["user_id"], name: "index_products_on_user_id", using: :btree

  create_table "profile_categories", force: :cascade do |t|
    t.integer "profile_id"
    t.integer "category_id"
  end

  add_index "profile_categories", ["category_id"], name: "index_profile_categories_on_category_id", using: :btree
  add_index "profile_categories", ["profile_id"], name: "index_profile_categories_on_profile_id", using: :btree

  create_table "profiles", force: :cascade do |t|
    t.string   "profile_type"
    t.integer  "user_id"
    t.string   "first_name"
    t.string   "last_name"
    t.string   "wizard_step",          default: "select_profile_type"
    t.datetime "created_at",                                           null: false
    t.datetime "updated_at",                                           null: false
    t.string   "authorized_product"
    t.string   "anual_online_revenue"
    t.string   "sku_in_catalog"
    t.string   "top_selling_brand"
    t.string   "sell_used_product"
    t.string   "map_rpm_policies"
    t.string   "walmart_supplier"
    t.string   "ecommerce_url"
    t.string   "marketplace_provider"
    t.string   "marketplace_url"
    t.string   "integration"
    t.string   "inventory_update"
    t.string   "average_ships"
    t.boolean  "own_inventory"
    t.string   "fulfillment"
    t.integer  "dropshipper"
    t.string   "order_to_shiptime"
    t.string   "shiptime_guarantee"
    t.string   "freight_carrier"
    t.string   "return_policy"
    t.string   "carriers"
    t.boolean  "physical_store"
    t.boolean  "fulfill_from_store"
    t.boolean  "store_pickup"
    t.string   "avatar"
    t.string   "biz_name"
    t.string   "industry"
    t.string   "biz_address"
    t.string   "tax_id"
    t.string   "city"
    t.string   "state"
    t.string   "zipcode"
  end

  add_index "profiles", ["user_id"], name: "index_profiles_on_user_id", using: :btree

  create_table "request_tiers", force: :cascade do |t|
    t.integer  "request_id"
    t.integer  "quantity"
    t.decimal  "value_reduction"
    t.integer  "value_type"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
  end

  add_index "request_tiers", ["request_id"], name: "index_request_tiers_on_request_id", using: :btree

  create_table "requests", force: :cascade do |t|
    t.integer  "product_id"
    t.integer  "user_id"
    t.datetime "created_at",                       null: false
    t.datetime "updated_at",                       null: false
    t.integer  "quantity"
    t.integer  "price"
    t.string   "discount_type", default: "amount"
  end

  add_index "requests", ["product_id"], name: "index_requests_on_product_id", using: :btree
  add_index "requests", ["user_id"], name: "index_requests_on_user_id", using: :btree

  create_table "returns", force: :cascade do |t|
    t.integer  "order_id"
    t.string   "status",     null: false
    t.text     "reason"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "returns", ["order_id"], name: "index_returns_on_order_id", using: :btree

  create_table "transactions", force: :cascade do |t|
    t.integer  "order_id"
    t.decimal  "amount",     precision: 10, scale: 4, null: false
    t.integer  "txn_type",                            null: false
    t.datetime "created_at",                          null: false
    t.datetime "updated_at",                          null: false
  end

  add_index "transactions", ["order_id"], name: "index_transactions_on_order_id", using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "email",                  default: "",    null: false
    t.string   "encrypted_password",     default: "",    null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,     null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.datetime "created_at",                             null: false
    t.datetime "updated_at",                             null: false
    t.string   "full_name"
    t.string   "username"
    t.string   "stripe_id"
    t.string   "provider"
    t.string   "uid"
    t.string   "provider_image"
    t.boolean  "approved",               default: false
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree

  add_foreign_key "cart_items", "carts"
  add_foreign_key "carts", "users"
  add_foreign_key "order_addresses", "orders"
  add_foreign_key "order_items", "orders"
  add_foreign_key "order_payment_informations", "orders"
  add_foreign_key "order_payments", "orders"
  add_foreign_key "orders", "carts"
  add_foreign_key "orders", "users"
  add_foreign_key "product_images", "products"
  add_foreign_key "products", "users"
  add_foreign_key "profile_categories", "categories"
  add_foreign_key "profile_categories", "profiles"
  add_foreign_key "profiles", "users"
  add_foreign_key "request_tiers", "requests"
  add_foreign_key "requests", "products"
  add_foreign_key "requests", "users"
  add_foreign_key "returns", "orders"
  add_foreign_key "transactions", "orders"
end
