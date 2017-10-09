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

ActiveRecord::Schema.define(version: 20171009011127) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

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

  create_table "product_images", force: :cascade do |t|
    t.string   "img"
    t.boolean  "primary_picture"
    t.integer  "product_id"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
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
  end

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
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "requests", ["product_id"], name: "index_requests_on_product_id", using: :btree
  add_index "requests", ["user_id"], name: "index_requests_on_user_id", using: :btree

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

  add_foreign_key "product_images", "products"
  add_foreign_key "products", "users"
  add_foreign_key "profile_categories", "categories"
  add_foreign_key "profile_categories", "profiles"
  add_foreign_key "profiles", "users"
  add_foreign_key "request_tiers", "requests"
  add_foreign_key "requests", "products"
  add_foreign_key "requests", "users"
end
