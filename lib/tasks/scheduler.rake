desc "This task is called by the Heroku scheduler add-on"
task :replant_db => :environment do
  puts "Replanting db..."
  Rake::Task["db:seed:replant"].invoke([DISABLE_DATABASE_ENVIRONMENT_CHECK=1])
  puts "done."
end