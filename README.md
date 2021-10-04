# reveal.js-math
Math plugins (MathJax/KaTeX) for reveal.js.

## Installation

### npm

Download and install the package in your project:

`npm install --save reveal.js-math`

## Usage

Add the plugin to your presentation as below:

```javascript
<script src="node_modules/reveal.js-math/dist/math.umd.js"></script>
<script>
  Reveal.initialize({
    plugins: [ RevealMath.<Variant> ]
  });
</script>
```

or if you're using ES modules:

```javascript
<script type="module">
  import RevealMath from "./node_modules/reveal.js-math/dist/math.esm.js";
  Reveal.initialize({
    plugins: [ RevealMath.<Variant> ]
  });
</script>
```
where `<Variant>` is one of `MathJax2`, `MathJax3`, `KaTeX`.


## Configuration

You can configure math by providing a reveal.js initialization object for your variant. These object have different names to allow easy switching between variants

### MathJax2

Adjust options through the `mathjax2` configuration object. Below is how the plugin is configured by default. 
If you don't intend to change these values you do not need to include the `mathjax2` config option at all.

```javascript
Reveal.initialize({
  mathjax2: {
    mathjax: 'https://cdn.jsdelivr.net/npm/mathjax@2/MathJax.js',
    config: 'TeX-AMS_HTML-full',
    // pass other options into `MathJax.Hub.Config()`
    tex2jax: {
      inlineMath: [ [ '$', '$' ], [ '\\(', '\\)' ] ],
      skipTags: [ 'script', 'noscript', 'style', 'textarea', 'pre' ]
    }
  },
  plugins: [ RevealMath.MathJax2 ]
});
```
Note that the latest MathJax 2 is loaded from a remote server. To use a fixed version set `mathjax` to, for example, https://cdn.jsdelivr.net/npm/mathjax@2.7.8/MathJax.js.

If you want to use MathJax offline you'll need to download a copy of the library (e.g. with npm) and adjust `mathjax` accordingly.


### MathJax3

Adjust options through the `mathjax3` configuration object. Below is how the plugin is configured by default.
If you don't intend to change these values you do not need to include the `mathjax3` config option at all.

```javascript
Reveal.initialize({
  mathjax3: {
    mathjax: 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js',
    tex: {
      inlineMath: [ [ '$', '$' ], [ '\\(', '\\)' ]  ]
    },
    options: {
      skipHtmlTags: [ 'script', 'noscript', 'style', 'textarea', 'pre' ]
    },
  },
  plugins: [ RevealMath.MathJax3 ]
});
```

Note that the latest MathJax 3 is loaded from a remote server. To use a fixed version set `mathjax` to, for example, https://cdn.jsdelivr.net/npm/mathjax@3.2.0/tex-mml-chtml.js. Additionally, the config is now part of of the url, by default `tex-mml-chtml` is loaded which recognizes mathematics in both TeX and MathML notation, and generates output using HTML with CSS (the CommonHTML output format). This is one of the most general configs, but it is also one of the largest, so you might want to consider a smaller one that is more tailored to your needs, e.g. `tex-svg`.

If you want to use MathJax offline you'll need to download a copy of the library (e.g. with npm) and adjust `mathjax` accordingly.

### KaTeX

Adjust options through the `katex` configuration object. Below is how the plugin is configured by default.
If you don't intend to change these values you do not need to include the `katex` config option at all.

```javascript
Reveal.initialize({
  katex: {
    version: 'latest',
    delimiters: [
      {left: '$', right: '$', display: false},
      {left: '$$', right: '$$', display: true},
      {left: '\\(', right: '\\)', display: false},
      {left: '\\[', right: '\\]', display: true}
   ],
   ignoredTags: ['script', 'noscript', 'style', 'textarea', 'pre']
 },
 plugins: [ RevealMath.KaTeX ]
});
```
Note that by default the latest KaTeX is loaded from a remote server (https://cdn.jsdelivr.net/npm/katex). To use a fixed version set `version` to, for example, `0.13.18`. 

If you want to use KaTeX offline you'll need to download a copy of the library (e.g. with npm) and use the `local` configuration option (the `version` option will then be ignored), for example:

```javascript
Reveal.initialize({
  katex: {
    local: 'node_modules/katex',
  },
  plugins: [ RevealMath.KaTeX]
});
```
