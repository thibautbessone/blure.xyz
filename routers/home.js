const Router = require('koa-router');

const homeRouter = new Router();

homeRouter.get('/home', async (ctx) => {
    await ctx.render('home');
});

module.exports = homeRouter;