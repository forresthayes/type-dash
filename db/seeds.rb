# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
names = %w(Amir Betty Cindy)

names.each do |name|
  Score.create!(
    name: name,
    wpm: rand(1..100)
    )
end