const merge = require('lodash/merge');

module.exports = ({ context, onGetWebpackConfig }) => {
  onGetWebpackConfig((config) => {
    // 这里配置需要开启代理的mode，何为mode？see：https://ice.work/docs/guide/basic/config
    // 根据配置的不同启动mode，自动使用不同的代理
    const proxyModes = {
      // 所有支持的参数，详细配置教程 https://github.com/chimurai/http-proxy-middleware
      pre: {
        '/api': {
          target: 'http://www.preServer.org',
        },
        '/preOnly': {
          target: 'http://www.preOnlyServer.org',
        },
      },
      daily: {
        '/api': {
          target: 'http://www.dailyServer.org',
        },
      },
    };
    const { mode } = context.commandArgs;
    if (!proxyModes[mode]) {
      return;
    }
    const proxyRules = Object.entries(proxyModes[mode]);
    const originalDevServeProxy = config.devServer.get('proxy') || [];
    if (proxyRules.length) {
      const proxy = proxyRules
        .map(([match, opts]) => {
          const { target, ...proxyRule } = opts;
          return merge(
            {
              target,
              changeOrigin: true,
              logLevel: 'warn',
              onProxyRes: function onProxyReq(proxyRes, req) {
                proxyRes.headers['x-proxy-by'] = 'ice-proxy';
                proxyRes.headers['x-proxy-match'] = match;
                proxyRes.headers['x-proxy-target'] = target;

                let distTarget = target;
                if (target && target.endsWith('/')) {
                  distTarget = target.replace(/\/$/, '');
                }
                proxyRes.headers['x-proxy-target-path'] = distTarget + req.url;
              },
              onError: function onError(err, req, res) {
                // proxy server error can't trigger onProxyRes
                res.writeHead(500, {
                  'x-proxy-by': 'ice-proxy',
                  'x-proxy-match': match,
                  'x-proxy-target': target,
                });
                res.end(`proxy server error: ${err.message}`);
              },
            },
            proxyRule,
            { context: match },
          );
        })
        .filter((v) => v);
      config.devServer.proxy([...originalDevServeProxy, ...proxy]);
    }
    // http://localhost:3000/api/foo/bar -> http://www.example.org/api/foo/bar
  });
};
