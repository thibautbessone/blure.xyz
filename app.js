const Koa = require('koa');
const bodyParser = require('koa-body');
const logger = require('koa-logger');
const serve = require('koa-static');
const Router = require('koa-router');
const Pug = require('koa-pug');

const homeRouter = require('./routers/home')

const app = new Koa();
app.use(serve('./public'));
const pug = new Pug({
    viewPath: './views',
    basedir: './views',
    app: app
});

app.use(homeRouter.routes());
app.use(homeRouter.allowedMethods());

app.use(async ctx => {
    pug.render('home');
});

app.listen(3000);