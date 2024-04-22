# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

User.delete_all
ActiveRecord::Base.connection.reset_pk_sequence!('users')
User.create([
{name: "Анастасия", email: "nastya@yandex.ru", password: "aaa555*"},
])


Image.delete_all
ActiveRecord::Base.connection.reset_pk_sequence!('images')
Image.create([
{name: 'Круассан', file: 'dessert_1_1.jpg', theme_id: 1},
{name: 'Макарон', file: 'dessert_1_2.jpg', theme_id: 1},
{name: 'Профитроли', file: 'dessert_1_3.jpg', theme_id: 1},
{name: 'Эклер', file: 'dessert_1_4.jpg', theme_id: 1},

{name: 'Тайяки', file: 'dessert_2_1.jpg', theme_id: 2},
{name: 'Моти', file: 'dessert_2_2.jpg', theme_id: 2},
{name: 'Дораяки', file: 'dessert_2_3.jpg', theme_id: 2},

{name: 'Кексы', file: 'dessert_3_1.jpg', theme_id: 3},
{name: 'Брауни', file: 'dessert_3_2.jpg', theme_id: 3},
{name: 'Чизкейк', file: 'dessert_3_3.jpg', theme_id: 3},

{name: 'Тирамису', file: 'dessert_4_1.jpg', theme_id: 4},
{name: 'Паннакотта', file: 'dessert_4_2.jpg', theme_id: 4},
{name: 'Канноли', file: 'dessert_4_3.jpg', theme_id: 4},

{name: 'Блины', file: 'dessert_5_1.jpg', theme_id: 5},
{name: 'Медовик', file: 'dessert_5_2.jpg', theme_id: 5},
{name: 'Птичье молоко', file: 'dessert_5_3.jpg', theme_id: 5},
{name: 'Ватрушка', file: 'dessert_5_4.jpg', theme_id: 5},
])


Theme.delete_all
ActiveRecord::Base.connection.reset_pk_sequence!('themes')
Theme.create([
{name: "Какой десерт, по вашему мнению, наилучшим образом воплощает вкус и изысканность французской кухни?"},     
{name: "Какой десерт лучше всего олицетворяет изысканность и традиции японской кулинарии?"},      
{name: "Какой десерт наиболее показателен для американского образа жизни и культурных ценностей?"},   
{name: "Какой десерт наилучшим образом представляет итальянскую кухню?"},      
{name: "Какой десерт символизирует гостеприимство и теплоту русской кухни?"},    
])

