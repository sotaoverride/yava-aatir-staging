class User::OmniauthCallbacksController < Devise::OmniauthCallbacksController
  def facebook
    @user = User.from_omniauth(request.env["omniauth.auth"])
    if @user.persisted?
      sign_in_and_redirect @user, :event => :authentication
    else
      redirect_to root_path, alert: "Failed to authenticate #{@user.errors.full_messages.join(',')}"
    end
  end

  def google_oauth2
    @user = User.from_omniauth(request.env["omniauth.auth"])
    if @user.persisted?
      sign_in_and_redirect @user, :event => :authentication
    else
      redirect_to new_user_session_path, alert: "Failed to authenticate #{@user.errors.full_messages.join(',')}"
    end
  end
end
