const Router = require('koa-router');
const request = require('request-promise');
const md = require('marked');

const projectsMap = new Map();
projectsMap.set('bluebot', '/thibautbessone/DiscordBlueBot/');
projectsMap.set('selfbot', '/thibautbessone/DiscordSelfBlueBot/');
projectsMap.set('shinrai', '/thibautbessone/shinrai/');
projectsMap.set('randomizeit', '/thibautbessone/randomizeit/');

const projectsRouter = new Router({
    prefix: '/projects'
});

projectsRouter.get('/', async (ctx) => {
    await ctx.render('projects');
});

projectsRouter.get('/:project', async (ctx) => {
    const proj = projectsMap.get(ctx.params.project);
    const repoUrl = 'https://github.com' + proj;
    const readmeUrl = 'https://raw.githubusercontent.com' + proj + 'master/README.md';
    if(readmeUrl === undefined) {
        await ctx.render('notFound');
        return;
    }
    let markdown = await request.get(readmeUrl, function (err, res) {
        if (err) console.log(err);
        return res.body;
    });
    await ctx.render('project', { md: md, readme: markdown, repoUrl: repoUrl});

});

module.exports = projectsRouter;