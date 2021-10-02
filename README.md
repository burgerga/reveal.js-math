# reveal.js-math
Math plugins (MathJax/KaTeX) for reveal.js.

WORK IN PROGRESS

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
  import RevealMath from "./node_modules/reveal.js-math/dist/bundle.esm.js"
  Reveal.initialize({
    plugins: [ RevealMath.<Variant> ]
  });
</script>
```
where `<Variant>` is one of `MathJax2`, `MathJax3`, `KaTeX`.


## Configuration

You can configure math by providing a reveal.js initialization object for your variant. These object have different names to allow easy switching between variants

**MathJax2**

Adjust options through the `mathjax2` configuration object. Below is an example of how the plugin is configured by default. 
If you don't intend to change these values you do not need to include the `mathjax2` config option at all.

```javascript
  Reveal.initialize({
    mathjax2: {
      mathjax: 'https://cdn.jsdelivr.net/gh/mathjax/mathjax@2.7.9/MathJax.js',
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
Note that a fixed MathJax version is loaded from a remote server. To use the latest MathJax 2 version set `mathjax` to https://cdn.jsdelivr.net/npm/mathjax@2/MathJax.js
If you want to use MathJax offline you'll need to download a copy of the library (e.g. with npm) and adjust the `mathjax` configuration accordingly.


**MathJax3**

