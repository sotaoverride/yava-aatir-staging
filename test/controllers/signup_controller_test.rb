require 'test_helper'

class SignupControllerTest < ActionController::TestCase
  test "should get chooseProf" do
    get :chooseProf
    assert_response :success
  end

end
