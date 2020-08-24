const Koa = require('koa');
const bodyParser = require('koa-body');
const logger = require('koa-logger');
const serve = require('koa-static');
const Router = require('koa-router');
const Pug = require('koa-pug');
const favicon = require('koa-favicon');

const homeRouter = require('./routers/home')
const projectsRouter = require('./routers/projects')

const app = new Koa();
app.use(serve('./public'));
app.use(favicon('./public/blure.gif'));
const pug = new Pug({
    viewPath: './views',
    basedir: './views',
    app: app
});

app.use(homeRouter.routes());
app.use(homeRouter.allowedMethods());
app.use(projectsRouter.routes());
app.use(projectsRouter.allowedMethods());

app.use(async ctx => {
    if (ctx.status === 404) {
        await ctx.render('notFound');
    }
});

app.listen(1337);