require 'rubygems'
require 'bundler'

Bundler.require(:default)

set :public, File.dirname(__FILE__) + '/public'

get '/' do
  erb :index
end

post '/upload' do

	if params[:file]
		save_path = File.join(File.dirname(__FILE__), '/public/uploads/', params[:file][:filename])

		File.open(save_path, 'wb') do |f|
			f.write params[:file][:tempfile].read
		end

    200
  else
    500
	end
end
