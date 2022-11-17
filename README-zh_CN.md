[English](https://github.com/chutao-zhang/cookie-utils-js/blob/master/README.md) | 中文


# cookie-utils-js
一个简单的 js 库，提供几个 api 便可轻松读写 cookies。 

## 安装
```powershell
$ npm i cookie-utils-js
# 或
$ yarn add cookie-utils-js
```

## 使用

```js
import Cookie from 'cookie-utils-js';

Cookie.set('foo', 'bar');
```

## API & 示例
#### 1. 创建 cookies: `Cookie.set(...)`
* 创建单个 `cookie`:
```js
Cookie.set('foo', 'bar');
// 或
Cookie.set({ name: 'foo', value: 'bar', ... });
```

* 批量创建 `cookies`:
```js
Cookie.set([
    { name: 'foo1', value: 'bar1' },
    { name: 'foo2', value: 'bar2' }
]);
```

* 给`cookie` 设置过期时间`expires：Date | number(毫秒)`，你也可以设置其他选项如： `path`, `domain` 等:
```js
Cookie.set('foo', 'bar', { expires: 7 * 1000, path: '/' });
// 或
Cookie.set({ name: 'foo', value: 'bar', expires: 7 * 1000, path: '/' });
```

#### 2. 读取 cookies: `Cookie.get(...)`
* 读取当前 `path` 下所有 `cookies`，并以 `json` 格式返回:
```js
Cookie.get(); // => { foo: 'bar' }
```

* 读取指定 cookie:
```js
Cookie.get('foo'); // => 'bar'
```

* 批量读取 `cookies`，并以 `json` 格式返回:
```js
Cookie.get(['foo1', 'foo2']); // => { foo1: 'bar1', foo2: 'bar2' }
```

* 读取 `cookies` 并以 `json` 格式返回, `alias` 将替换 `name` 作为新属性名:
```js
Cookie.get([
    { name: 'foo1' }, 
    { name: 'foo2', alias: 'FOO2' } // 设置别名
]); // => { foo1: 'bar1', FOO2: 'bar2' }
```

#### 3. 删除 cookies: `Cookie.remove(...)`
* 删除单个 `cookie`:
```js
Cookie.remove('foo');
// 或
Cookie.remove('foo', path: '/'); // 删除指定path下的cookie
```

* 批量删除:
```js
Cookie.remove(['foo1', 'foo2']);
// 或
Cookie.remove([
    { name: 'foo1' },
    { name: 'foo2', path: '/' } // 删除指定path下的cookie
]);
```

#### 4. 清空 cookies: `Cookie.clear()`
清空所有 cookies (注意: 仅支持清空当前`path(default: '/')`下的 cookies).

#### 5. cookie 启用状态: `Cookie.browserEnabled`
浏览器是否禁用了 cookies. `(true/false)`