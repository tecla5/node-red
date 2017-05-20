# Customizing and Theming the UI


## Theming

Theming can be done in the `red/api/theme.js` file
The `defaultContext` is loaded from `./default-context`. It contains the basic Them "outline", including `header`, `favicon`, `icon` and `title`, logo image and more...
We have currently changed:

- `title` to `'App Orchestrator'`

```js
const title = 'App Orchestrator'

module.exports = {
  page: {
    title: title,
    favicon: "favicon.ico",
    tabicon: "red/images/node-red-icon-black.svg"
  },
  header: {
    title: title,
    image: "red/images/node-red.png"
  },
  asset: {
    red: (process.env.NODE_ENV == "development") ? "red/red.es5.js" : "red/red.min.js",
    main: (process.env.NODE_ENV == "development") ? "red/main.es5.js" : "red/main.min.js",

  }
};
```

See `theme_spec.js` for examples on how to customize theming.

The theme when fully configured is sent to the Mustache template in `editor/templates/index.mst`

```html
<div id="header">
    <span class="logo">{{#header.url}}<a href="{{.}}">{{/header.url}}{{#header.image}}<img src="{{.}}" title="{{version}}">{{/header.image}} <span>{{ header.title }}</span>{{#header.url}}</a>{{/header.url}}</span>
    <ul class="header-toolbar hide">
        <li><a id="btn-sidemenu" class="button" data-toggle="dropdown" href="#"><i class="fa fa-bars"></i></a></li>
    </ul>
    <div id="header-shade" class="hide"></div>
</div>
<div id="main-container" class="sidebar-closed hide">
    <div id="workspace">
    ...
    </div>
</div>
```

Here you can add login/logout buttons and use other custom theming variables as you see fit :)

We should be leveraging [Partials](https://github.com/janl/mustache.js/#partials) for easier re-factoring of the UI.

Partials begin with a greater than sign, like `{{> box}}`. The partial will inherit the  variables from the calling context

`base.mustache` file

```
<h2>Names</h2>
{{#names}}
  {{> user}}
{{/names}}
```

`user.mustache` file

```
<strong>{{name}}</strong>
```

Can be thought of as a single, expanded template:

```
<h2>Names</h2>
{{#names}}
  <strong>{{name}}</strong>
{{/names}}
```
