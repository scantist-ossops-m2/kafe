/* @echo header */

	var

		// Process data
		_processEventData = function(data, options) {
			data = _.clone(data);
			options = options || {};
			options.uri = options.uri || global.location.pathname;

			_.forEach(data, function(value, key) {
				var tmpl = _.template(value, {interpolate:/{{([\s\S]+?)}}/g});
				data[key] = tmpl(options);
			});

			return data;
		},

		// Push event
		_pushEvent = function(data) {
			global.dataLayer.push({
				event:         'ga_event',
				eventCategory: data.category,
				eventAction:   data.action,
				eventLabel:    data.label
			});
		},

		_gtmEvents = {}
	;


	/**
	* ### Version <!-- @echo VERSION -->
	* Extra methods for the Google Tag Manager.
	* Requires GTM to be included
	*
	* @module <!-- @echo MODULE -->
	* @class <!-- @echo NAME_FULL -->
	*/
	var googletagmanager = {};

	/**
	* Add named events to the list of possible event to be triggered, with the possibility of replacement tokens.
	* Default tokens provided:
	*	- {{uri}}: Current pathname
	*
	* @method addEvents
	* @param {Object} events List of possible events and their config
	*	@param {String} events.category The `eventCategory` value.
	*	@param {String} events.action The `eventAction` value.
	*	@param {String} events.label The `eventLabel` value.
	*
	* @example
	*	// Create named events
	*	<!-- @echo NAME_FULL -->.addEvents({
	*		'newsletter-subscribed': {
	*			category: 'Subscription',
	*			action:   'Newsletter',
	*			label:    '{{uri}}'
	*		},
	*		'product-addedtocart': {
	*			category: 'Cart',
	*			action:   'Product added - {{uri}}',
	*			label:    '{{productname}}'
	*		}
	*	});
	*/
	googletagmanager.addEvents = function(events) {
		_.merge(_gtmEvents, events);
	};


	/**
	* Push a `ga_event` into the `dataLayer`.
	*
	* @method triggerEvent
	*	@param {String} event Event name
	*	@param {Object} [options] List of replacement tokens
	*
	* @example
	*	<!-- @echo NAME_FULL -->.triggerEvent('product-addedtocart', { productname: 'Sexy rainbow pants' });
	*/
	googletagmanager.triggerEvent = function(event, options) {
		var data = _gtmEvents[event];
		if (data) {
			_pushEvent( _processEventData(data, options) );
		}
	};


	return googletagmanager;

/* @echo footer */