class Score < ApplicationRecord
  validates :name, presence: true
  validates :word_count, numericality: {
    only_integer: true, greater_than_or_equal_to: 0
  }

  scope :high_scores, -> { all.order(word_count: :desc).limit(10) }
end
