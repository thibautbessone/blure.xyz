const Router = require('koa-router');

const homeRouter = new Router();

homeRouter.get('/', async (ctx) => {
    await ctx.render('home');
});

module.exports = homeRouter;