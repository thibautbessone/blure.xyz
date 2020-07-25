const Router = require('koa-router');
const request = require('request-promise');
const md = require('marked');

const projectsMap = new Map();
projectsMap.set('bluebot', 'https://raw.githubusercontent.com/thibautbessone/DiscordBlueBot/master/README.md');
projectsMap.set('selfbot', 'https://raw.githubusercontent.com/thibautbessone/DiscordSelfBlueBot/master/README.md');
projectsMap.set('shinrai', 'https://raw.githubusercontent.com/thibautbessone/shinrai/master/README.md');
projectsMap.set('randomizeit', 'https://raw.githubusercontent.com/thibautbessone/randomizeit/master/README.md');

const projectsRouter = new Router({
    prefix: '/projects'
});

projectsRouter.get('/', async (ctx) => {
    await ctx.render('projects');
});

projectsRouter.get('/:project', async (ctx) => {
    const url = projectsMap.get(ctx.params.project);
    if(url === undefined) {
        await ctx.render('notFound');
        return;
    }
    let markdown = await request.get(url, function (err, res) {
        if (err) console.log(err);
        return res.body;
    });
    await ctx.render('project', { md: md, readme: markdown});

});

module.exports = projectsRouter;