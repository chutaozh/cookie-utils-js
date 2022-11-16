# cookie-utils-js
A simple js util for handling cookies.

## Install
```js
$ npm i cookie-utils-js
# or
$ yarn add cookie-utils-js
```

## Usage

```js
import Cookie from 'cookie-utils-js';

Cookie.set('foo', 'bar');
```

## API & Example
#### 1. Create cookies: `Cookie.set(...)`
* Create a `cookie`:
```js
Cookie.set('foo', 'bar');
// or
Cookie.set({ name: 'foo', value: 'bar', ... });
```

* Batch creation:
```js
Cookie.set([
    { name: 'foo1', value: 'bar1' },
    { name: 'foo2', value: 'bar2' }
]);
```

* Set `expires` for cookie: `Date | number(ms)`, you can also set other options like: `path`, `domain` ... :
```js
Cookie.set('foo', 'bar', { expires: 7 * 1000, path: '/' });
// or
Cookie.set({ name: 'foo', value: 'bar', expires: 7 * 1000, path: '/' });
```

#### 2. Get cookies: `Cookie.get(...)`
* Get all `cookies` under the current `path` and return them as `json`:
```js
Cookie.get(); // => { foo: 'bar' }
```

* Get value by name:
```js
Cookie.get('foo'); // => 'bar'
```

* Get values by names and return them as `json`:
```js
Cookie.get(['foo1', 'foo2']); // => { foo1: 'bar1', foo2: 'bar2' }
```

* Get `cookies` and return a `json`, `alias` will replace `name` as new key:
```js
Cookie.get([
    { name: 'foo1' }, 
    { name: 'foo2', alias: 'FOO2' } // set alias
]); // => { foo1: 'bar1', FOO2: 'bar2' }
```

#### 3. Remove cookies: `Cookie.remove(...)`
* Remove a `cookie`:
```js
Cookie.remove('foo');
// or
Cookie.remove('foo', path: '/'); // remove with path
```

* Batch remove:
```js
Cookie.remove(['foo1', 'foo2']);
// or
Cookie.remove([
    { name: 'foo1' },
    { name: 'foo2', path: '/' } // remove with path
]);
```

#### 4. Clear cookies: `Cookie.clear()`
Clear all cookies (attn: only cookies under the current `path(default: '/')` are supported).

#### 5. Browser settings: `Cookie.browserEnabled`
Whether the browser has enabled cookies. `(true/false)`