# Node-RED

http://nodered.org

[![Build Status](https://travis-ci.org/node-red/node-red.svg)](https://travis-ci.org/node-red/node-red)
[![Coverage Status](https://coveralls.io/repos/node-red/node-red/badge.svg?branch=master)](https://coveralls.io/r/node-red/node-red?branch=master)

A visual tool for wiring the Internet of Things.

![Node-RED: A visual tool for wiring the Internet of Things](http://nodered.org/images/node-red-screenshot.png)

## Quick Start

Check out http://nodered.org/docs/getting-started/ for full instructions on getting
started.

1. `sudo npm install -g node-red`
2. `node-red`
3. Open <http://localhost:1880>

## Getting Help

More documentation can be found [here](http://nodered.org/docs).

For further help, or general discussion, please use the
[mailing list](https://groups.google.com/forum/#!forum/node-red).

## Babel ES6

Now uses `grunt-babel` to compile to ES5.
The babel grunt step compiles using babel config in `.babelrc`, for now just using basic `preset-2015`
The compiled files are saved as `.es5.js`

## Adding libs

Currently it should be able to use ES5 modules, as it compiles via Babel.
You can also manually add libs, either by adding files to `editor/vendor` and then adding to grunt task:

```
vendor: {
files: {
  "public/vendor/vendor.js": [
    "node_modules/yaml/yamljs.min.js",
    ...
```


## SenecaJS or Hemera services

Added subscribe match node `sub-match`
Can be used to pattern match on SenecaJS based messages.

The `red/runtime/settings` includes configuration functions:

- `seneca`
- `hemera`
- `nats`

A `sub-match` node will act on a message by sending it to the next node(s) with `$cb` and `$payload`.
The node should be linked to a `function` node. When the service completes, the `$cb` and `$payload` should be used to publish the service result on the message queue for other services to act on the result.

## Developers

If you want to run the latest code from git, here's how to get started:

### For using NATS

Start Aither (or NATS directly)

```
git clone https://github.com/hemerajs/aither.git
docker-compose up
```

### Clone and run

To force development mode use `grunt dev` task or explicitly set `export NODE_ENV=development`

1. Clone the code:

        git clone https://github.com/node-red/node-red.git
        cd node-red

2. Install the node-red dependencies

        npm install

3. Build the code

Development:

        npm run dev

Production (uglified & minified):

        npm run build

4. Run

        npm start
   or

        node red.js

## Quick reload

`npm run dev && npm start`

## Contributing

Before raising a pull-request, please read our
[contributing guide](https://github.com/node-red/node-red/blob/master/CONTRIBUTING.md).

This project adheres to the [Contributor Covenant 1.4](http://contributor-covenant.org/version/1/4/).
 By participating, you are expected to uphold this code. Please report unacceptable
 behavior to any of the [project's core team](https://github.com/orgs/node-red/teams/core).

## Authors

Node-RED is a project of the [JS Foundation](http://js.foundation).

It was created by [IBM Emerging Technology](https://www.ibm.com/blogs/emerging-technology/).

* Nick O'Leary [@knolleary](http://twitter.com/knolleary)
* Dave Conway-Jones [@ceejay](http://twitter.com/ceejay)



## Copyright and license

Copyright JS Foundation and other contributors, http://js.foundation under [the Apache 2.0 license](LICENSE).
