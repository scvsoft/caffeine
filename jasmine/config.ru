dir = Dir.pwd
puts ">>> Serving: #{dir}"
run Rack::Directory.new("#{dir}")
