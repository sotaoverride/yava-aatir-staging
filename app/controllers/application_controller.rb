class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  before_action :setup_account
  layout :determine_layout

  protected

  def setup_account
    if current_user
      if current_user.profile
        redirect_to wizards_path unless !current_user.profile.complete?
      else
        redirect_to wizards_path
      end
    end
  end

  def determine_layout
    if user_signed_in?
      'application'
    else
      'devise'
    end
  end

end
