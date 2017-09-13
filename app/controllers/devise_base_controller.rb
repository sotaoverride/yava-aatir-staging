class DeviseBaseController < ActionController::Base
  layout 'devise'
  before_filter :configure_permitted_parameters, :only => [:create]

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up) { |u| u.permit(:full_name, :email, :password, :agreement) }
  end
end
