var HtmlWebpackPlugin = require('html-webpack-plugin'); // require - способ подключения модулей
var path = require('path'); //для определения пути к css

module.exports = { // всё что нужно экспортировать из файла
    // параметры дев-сервера
    devServer: {
        host: 'localhost', // можно написать ip для достпа извне
        port: 8080
    },
    devtool: 'inline-source-map',
    entry: "main.js", //вебпаку нужно собирать приложение из main.js. Относительный путь с ./ Абсолютный с __dirname ниже. Без него пытается искать модуль 'src'
    resolve: {
        root: path.join(__dirname, "src") // добавляет перед путём entry. Нужен абсолютный путь!!
    },

    module: { // это объект. css, js - это модули. Модули матчатся по регулярке. Проверяем то, что в require в main.js
        loaders: [
            { // проверяем, что файл заканчивается на .css
                test: /\.css$/,
                loaders: ['style-loader', 'css-loader'] // важен порядок перечисления этих модулей, справа-нлево
            },
            { // проверяем, что файл заканчивается на .css
                test: /\.scss$/,
                loaders: ['style-loader', 'css-loader', 'sass-loader'] // важен порядок перечисления этих модулей, справа-нлево
            },
            { // проверяем, что это файлы картинок
                test: /\.(gif|jpg|png|svg|woff2|woff|ttf|eot)$/,
                loaders: ['file-loader']
            },
            { // проверяем, что это файлы картинок
                test: /\.js$/,
                loaders: ['babel']
            }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html' // с помощью плагина юзать эту html
        })
    ]
};