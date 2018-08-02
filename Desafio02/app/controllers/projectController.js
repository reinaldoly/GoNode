const { Project, Section } = require('../models');

module.exports = {
  async store(req, res, next) {
    try {
      await Project.create({
        ...req.body,
        UserId: req.session.user.id,
      });

      req.flash('success', 'Projeto criada com sucesso');

      return res.redirect('/');
    } catch (error) {
      return next(error);
    }
  },

  async show(req, res, next) {
    try {
      const projects = await Project.findAll({
        include: [Section],
        where: {
          UserId: req.session.user.id,
        },
      });

      const sections = await Section.findAll({
        where: { ProjectId: req.params.id },
      });

      return res.render('projects/show', {
        projects,
        sections,
        activeProject: req.params.id,
      });
    } catch (error) {
      return next(error);
    }
  },
  async destroy(req, res, next) {
    try {
      await Project.destroy({ where: { id: req.params.id } });

      req.flash('success', 'Projeto deletado com sucesso');
      return res.redirect('/app/dashboard');
    } catch (error) {
      return next(error);
    }
  },
};
