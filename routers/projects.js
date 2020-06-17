const Router = require('koa-router');

const projectsRouter = new Router({
    prefix: '/projects'
});

projectsRouter.get('/', async (ctx) => {
    await ctx.render('projects');
});

module.exports = projectsRouter;