require 'jekyll'

task default: %w[build]

desc "Generate the config and build the site"
task :build do
  # Pull in the config from the _config file
  config = YAML.load_file "_config.yml"

  abort("Please supply your Google API key and Sheet ID and try again") unless ENV['SHEET_ID'] && ENV['GOOGLE_API_KEY']

  # Construct the Google Sheets URL from ENV variables
  # Use the Google Sheets source file(s) that contains the details about your reopening phases.
  # Supply SHEET_ID and GOOGLE_API_KEY with the values from your environment.
  sheets_url = "https://sheets.googleapis.com/v4/spreadsheets/#{ENV['SHEET_ID']}/values:batchGet?ranges='Return+Phases'&ranges='Current+Phases'&key=#{ENV['GOOGLE_API_KEY']}&majorDimension=ROWS"

  # Add in the options that are stored in ENV variables
  config.merge!({

    # Google Analytics ID, if you want to track site traffic
    "analytics" => { "google" => ENV['GOOGLE_ANALYTICS_ID'] },

    # Google Sheets data, from url constructed above
    "jekyll_get_json" => [
      { "data" => "phases", "json" => sheets_url }
    ]

  })

  puts "Using config:"
  pp config

  # Build the site
  jekyll_config = Jekyll.configuration(config)
  site = Jekyll::Site.new(jekyll_config)
  Jekyll::Commands::Build.build(site, jekyll_config)
end
