/**
 * Created by superMoon on 2016-08-17.
 */

exports.render = function (req, res) {
    res.render('index', { title: 'Express' });
}

exports.kakao = function (req, res) {
    res.render('kakao');
}