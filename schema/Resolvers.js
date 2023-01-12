const { ApolloError } = require("apollo-server-express");
const { genSaltSync, hashSync, compareSync } = require("bcryptjs");

const User = require("../models").User;
const Notice = require("../models").Notice;

const resolvers = {
  Query: {
    getAllUsers: async () => {
      const users = await User.findAll({
        order: [["id", "DESC"]],
        raw: true,
      });
      return users;
    },

    getAllNotices: async () => {
      const notices = await Notice.findAll({
        order: [["createdAt", "DESC"]],
        raw: true,
      });
      return notices;
    },

    getNotice: async (parent, { id }, context, info) => {
      try {
        const notice = await Notice.findByPk(id);
        return notice;
      } catch (error) {
        throw new ApolloError(error.message, 400);
      }
    },

    authenticateUser: async (parent, { email, password }, context, info) => {
      try {
        let user = await User.findOne({
          where: { email },
        });
        if (!user) {
          throw new Error("Email not found");
        } else {
          let isMatch = compareSync(password, user.password);
          if (!isMatch) {
            throw new Error("Invalid password");
          } else {
            const token = user.issueToken();
            user = user.get({ plain: true });
            return { user, token };
          }
        }
      } catch (error) {
        throw new ApolloError(error.message, 403);
      }
    },
  },

  Mutation: {
    createNotice: async (parent, args, context, info) => {
      const notice = await Notice.create(args["notice"]);
      return notice;
    },

    deleteNotice: async (parent, args, context, info) => {
      try {
        console.log(args);
        const notice = await Notice.findByPk(args["id"]);
        await notice.destroy();

        return 1;
      } catch (error) {
        return error;
      }
    },

    updateNotice: async (parent, args, context, info) => {
      const params = args["notice"];
      console.log(params);
      const update = await Notice.update(
        { title: params.title, content: params.content },
        { where: { id: params.id } }
      );
      const notice = await Notice.findByPk(params.id);
      return notice;
    },

    registerUser: async (parent, args, context, info) => {
      try {
        const { name, email, password } = args["newUser"];
        let user = await User.findOne({
          where: { email },
        });
        if (user) {
          throw new Error("Email is already registered");
        } else {
          const hash = hashSync(password, genSaltSync(10));
          user = await User.create({ name, email, password: hash });
          const token = user.issueToken();
          user = user.get({ plain: true });
          return { user, token };
        }
      } catch (error) {
        throw new ApolloError(error.message, 400);
      }
    },
  },
};

module.exports = { resolvers };
