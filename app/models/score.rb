class Score < ApplicationRecord
  validates :name, presence: true
  validates :wpm, numericality: {
    only_integer: true, greater_than_or_equal_to: 0
  }

  scope :high_scores, -> { order(wpm: :desc, created_at: :asc).limit(10) }
end
