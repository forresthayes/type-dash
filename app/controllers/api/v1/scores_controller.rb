class Api::V1::ScoresController < ApplicationController
  protect_from_forgery with: :null_session

  def index
    render json: Score.high_scores
  end

  def create
    if Score.create!(score_params)
      render json: Score.high_scores
    else
      # ToDo: handle error
      render json: ''
    end
  end

  private

  def score_params
    params.require(:score).permit(:name, :wpm)
  end
end
