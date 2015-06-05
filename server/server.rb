require 'rubygems'
require 'bundler'

Bundler.require(:default)

set :public, File.dirname(__FILE__) + '/public'

get '/' do
  erb :index
end
