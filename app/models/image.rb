class Image < ApplicationRecord
	belongs_to :theme

# 	def self.ransackable_attributes(auth_object = nil)
#     ["name", "file", "ave_value", "theme_id"]
#   end
end
