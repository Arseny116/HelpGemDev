# config/initializers/grover.rb
Grover.configure do |config|
  config.options = {
    launch_args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage'
    ],
    executable_path: '/usr/bin/chromium'
  }
end