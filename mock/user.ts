const tokens = {
  admin: {
    token: 'admin-token',
  },
  editor: {
    token: 'editor-token',
  },
};

const users = {
  'admin-token': {
    roles: ['admin'],
    introduction: 'I am a super administrator',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Super Admin',
  },
  'editor-token': {
    roles: ['editor'],
    introduction: 'I am an editor',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Normal Editor',
  },
};
export default {
  // 支持参数
  'POST /api/user/login': (req, res) => {
    const { name } = req.body;
    const token = tokens[name];
    if (!token) {
      res.send({
        code: 401,
        message: 'Account and password are incorrect.',
      });
      return;
    }
    setTimeout(() => {
      res.send({
        success: true,
        code: 200,
        data: token,
      });
    }, 1000);
  },

  'GET /api/user/info:token': (req, res) => {
    const { token } = req.params;
    const info = users[token];

    // mock error
    if (!info) {
      res.send({
        code: 50008,
        message: 'Login failed, unable to get user details.',
      });
    }
    res.send({
      success: true,
      code: 200,
      data: info,
    });
  },
};