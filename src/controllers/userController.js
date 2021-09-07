const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { User } = require('../models');

module.exports = {
  join: async (req, res, next) => {
    const { phoneNumber, password, nickname, age } = req.body;

    try {
      const exUser = await User.findOne({ where: { phoneNumber } });
      if (exUser) {
        return res.status(409).send("이미 존재하는 이메일입니다.");
      }
      const hash = await bcrypt.hash(password, 12);
  
      const u = await User.create({
        phoneNumber,
        nickname,
        password: hash,
        age
      });

      const payload = {
        id: u.id,
        phoneNumber: u.phoneNumber,
      };

      const token = await jwt.sign(payload, "secret", { expiresIn: 86400 });
      
      return res.json({
        user: u,
        token: `Bearer ${token}`,
      })
    } catch (error) {
      next(error);
    }
  },

  login: async (req, res, next) => {
    const { phoneNumber, password } = req.body;

    try {
      const exUser = await User.findOne({ 
        where: { phoneNumber }, 
      });
      if (exUser) {
        const result = await bcrypt.compare(password, exUser.password);
        if (result) {
          const payload = {
            id: exUser.id,
            phoneNumber: exUser.phoneNumber,
          };

          jwt.sign(payload, "secret", { expiresIn: 86400 }, (err, token) => {
            return res.json({
              success: true,
              user: exUser,
              token: `Bearer ${token}`,
            });
          });
        } else {
          return res.status(400).send("비밀번호가 일치하지 않습니다.");
        }
      } else {
        return res.status(400).send("가입되지 않은 회원입니다.");
      }
    } catch (err) {
      next(err);
    }
  },
  isPhoneNumberExist: async (req, res, next) => {
    const { phoneNumber } = req.query;

    try {
      const exUser = await User.findOne({ where: { phoneNumber } });

      res.json(exUser ? true : false);
    } catch (error) {
      next(error);
    }
  },
  me: async (req, res, next) => {
    const user = req.user;

    try {
      // 임시
      res.json(user);
    } catch (error) {
      next(error);
    }
  }
}