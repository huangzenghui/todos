import path from 'path';

// 后端基本配置
const CONFIG = new Map();
CONFIG.set('port', `${process.env.NODE_ENV==='tests' ? 3001 : 3000}`);
CONFIG.set('viewsDir', path.join(__dirname, '..', 'views'));
CONFIG.set('staticDir', path.join(__dirname, '..'));
CONFIG.set('dbName', `${process.env.NODE_ENV==='tests' ? 'tests' : 'todos'}`)

export default CONFIG;
