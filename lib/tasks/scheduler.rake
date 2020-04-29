desc "This task is called by the Heroku scheduler add-on"
task :replant_db_seed => :environment do
  puts "Replanting db..."
  Rake::Task["db:seed:replant"].invoke
  puts "done."
end