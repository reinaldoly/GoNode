const { Project, Section, User } = require('../models');

module.exports = {
  async index(req, res, next) {
    try {
      const projects = await Project.findAll({
        include: [Section],
        where: {
          UserId: req.session.user.id,
        },
      });

      const user = await User.findOne({ where: { id: req.session.user.id } });

      return res.render('dashboard/index', { projects, user });
    } catch (error) {
      return next(error);
    }
  },
};
