class CountdownController < ApplicationController
  def index
  	@title = params[:title].nil? ? '' : params[:title]
  	@timeup = params[:timeup].nil? ? '' : params[:timeup]
  	@dest_time = params[:dest_time].nil? ? '0' : params[:dest_time]
  end
  def new
  	@title = "Countdown Generator"
  end
end
