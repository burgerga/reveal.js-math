/**
 * A plugin which enables rendering of math equations inside
 * of reveal.js slides. Essentially a thin wrapper for KaTeX.
 *
 * @author Hakim El Hattab
 * @author Gerhard Burger
 */
const KaTeX = () => {
	let deck;

	let defaultOptions = {
		version: '0.13.18',
		delimiters: [
			{left: '$', right: '$', display: false},
			{left: '$$', right: '$$', display: true},
			{left: '\\(', right: '\\)', display: false},
			{left: '\\[', right: '\\]', display: true}
		],
		ignoredTags: ['script', 'noscript', 'style', 'textarea', 'pre']
	};

	const loadCss = src => {
		let link = document.createElement('link');
		link.rel = 'stylesheet';
		link.href = src;
		document.head.appendChild(link);
	};

	/**
	 * Loads a JavaScript file and returns a Promise for when it is loaded
	 * Credits: https://aaronsmith.online/easily-load-an-external-script-using-javascript/
	 */
	const loadScript = src => {
		return new Promise((resolve, reject) => {
			const script = document.createElement('script');
			script.type = 'text/javascript';
			script.onload = resolve;
			script.onerror = reject;
			script.src = src;
			document.head.append(script);
		})
	};

	async function loadScripts(urls) {
		for(const url of urls) {
			await loadScript(url);
		}
	}

	return {
		id: 'katex',

		init: function (reveal) {

			deck = reveal;

			let revealOptions = deck.getConfig().katex || {};

			let options = {...defaultOptions, ...revealOptions};
			const {local, version, extensions, ...katexOptions} = options;

			let baseUrl = options.local || 'https://cdn.jsdelivr.net/npm/katex';
			let versionString = options.local ? '' : '@' + options.version;

			let cssUrl = baseUrl + versionString + '/dist/katex.min.css';
			let katexUrl = baseUrl + versionString + '/dist/katex.min.js';
			let mhchemUrl = baseUrl + versionString + '/dist/contrib/mhchem.min.js';
			let karUrl = baseUrl + versionString + '/dist/contrib/auto-render.min.js';

			let katexScripts = [katexUrl];
			if(options.extensions && options.extensions.includes("mhchem")) {
				katexScripts.push(mhchemUrl);
			}
			katexScripts.push(karUrl);

			loadCss(cssUrl);

			// For some reason dynamically loading with defer attribute doesn't result in the expected behavior, the below code does
			loadScripts(katexScripts).then(() => {
				renderMathInElement(document.body, katexOptions);
				deck.layout();
			});

		}
	}

};

/**
 * A plugin which enables rendering of math equations inside
 * of reveal.js slides. Essentially a thin wrapper for MathJax.
 *
 * @author Hakim El Hattab
 */
const MathJax2 = () => {

	// The reveal.js instance this plugin is attached to
	let deck;

	let defaultOptions = {
		messageStyle: 'none',
		tex2jax: {
			inlineMath: [ [ '$', '$' ], [ '\\(', '\\)' ] ],
			skipTags: [ 'script', 'noscript', 'style', 'textarea', 'pre' ]
		},
		skipStartupTypeset: true
	};

	function loadScript( url, callback ) {

		let head = document.querySelector( 'head' );
		let script = document.createElement( 'script' );
		script.type = 'text/javascript';
		script.src = url;

		// Wrapper for callback to make sure it only fires once
		let finish = () => {
			if( typeof callback === 'function' ) {
				callback.call();
				callback = null;
			}
		};

		script.onload = finish;

		// IE
		script.onreadystatechange = () => {
			if ( this.readyState === 'loaded' ) {
				finish();
			}
		};

		// Normal browsers
		head.appendChild( script );

	}

	return {
		id: 'mathjax2',

		init: function( reveal ) {

			deck = reveal;

			let revealOptions = deck.getConfig().mathjax2 || {};

			let options = { ...defaultOptions, ...revealOptions };
			let mathjax = options.mathjax || 'https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.0/MathJax.js';
			let config = options.config || 'TeX-AMS_HTML-full';
			let url = mathjax + '?config=' + config;

			options.tex2jax = { ...defaultOptions.tex2jax, ...revealOptions.tex2jax };

			options.mathjax = options.config = null;

			loadScript( url, function() {

				MathJax.Hub.Config( options );

				// Typeset followed by an immediate reveal.js layout since
				// the typesetting process could affect slide height
				MathJax.Hub.Queue( [ 'Typeset', MathJax.Hub, deck.getRevealElement() ] );
				MathJax.Hub.Queue( deck.layout );

				// Reprocess equations in slides when they turn visible
				deck.on( 'slidechanged', function( event ) {

					MathJax.Hub.Queue( [ 'Typeset', MathJax.Hub, event.currentSlide ] );

				} );

			} );

		}
	}

};

/**
 * A plugin which enables rendering of math equations inside
 * of reveal.js slides. Essentially a thin wrapper for MathJax 3
 *
 * @author Hakim El Hattab
 * @author Gerhard Burger
 */
const MathJax3 = () => {

    // The reveal.js instance this plugin is attached to
    let deck;

    let defaultOptions = {
        tex: {
            inlineMath: [ [ '$', '$' ], [ '\\(', '\\)' ]  ]
        },
        options: {
            skipHtmlTags: [ 'script', 'noscript', 'style', 'textarea', 'pre' ]
        },
        startup: {
            ready: () => {
                MathJax.startup.defaultReady();
                MathJax.startup.promise.then(() => {
                    Reveal.layout();
                });
            }
        }
    };

    function loadScript( url, callback ) {

        let script = document.createElement( 'script' );
        script.type = "text/javascript";
        script.id = "MathJax-script";
        script.src = url;
        script.async = true;

        // Wrapper for callback to make sure it only fires once
        script.onload = () => {
            if (typeof callback === 'function') {
                callback.call();
                callback = null;
            }
        };

        document.head.appendChild( script );

    }

    return {
        id: 'mathjax3',
        init: function(reveal) {

            deck = reveal;

            let revealOptions = deck.getConfig().mathjax3 || {};
            let options = {...defaultOptions, ...revealOptions};
            options.tex = {...defaultOptions.tex, ...revealOptions.tex};
            options.options = {...options.options, ...defaultOptions.options};
            options.startup = {...defaultOptions.startup, ...revealOptions.startup};

            let url = options.mathjax || 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js';
            options.mathjax = null;

            window.MathJax = options;

            loadScript( url, function() {
                // Reprocess equations in slides when they turn visible
                Reveal.addEventListener( 'slidechanged', function( event ) {
                    MathJax.typeset();
                } );
            } );

        }
    }

};

var main = {KaTeX, MathJax2, MathJax3};

export { main as default };
