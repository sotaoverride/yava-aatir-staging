def get_zip_data
    # => {:state_code=>"GA", :state_name=>"Georgia", :city=>"Atlanta", :time_zone=>"America/New_York"}
    @locale=ZipCodes.identify(params[:code])
  #@zipcode = Zipcode.find_by_code(params[:code], :include => [:county, :state])
  if @locale
   # @counties = County.find(:all, :conditions => [ "state_id = ?", @zipcode.county.state_id ])
    data = {
      'state' => @locale.state_name,
      #'county' => @locale.county.name,
      'city' => @locale.city
    }
    render :text => data.to_json
  else
    if params[:code].blank?
      return true
    else
      if @locale == nil
        data = {
          'err' => "Could not find Zipcode [#{params[:code]}].  If this is a valid zipcode please notify support <support@mydomain.com>, so we can update our database."
        }
      else
        data = {
          'err' => "[#{params[:code]}] is not a valid Zipcode."
        }
      end
      render :text => data.to_json
    end
  end
end