//-------------------------------------------
// kafe.ext.googlemaps.styles
//-------------------------------------------
kafe.extend({name:'googlemaps.styles', version:'1.0', obj:(function($,K,undefined){

	var _styles = {
		entrepreneur: {
			name:   'Entrepreneur',
			style: [
				{
					featureType: 'road',
				    elementType: 'all',
					stylers: [
				        { hue: '#a99f96' },
				        { saturation:-100 }
				      ]	
				},
				{
					featureType: 'water',
				    elementType: 'all',
					stylers: [
				        { hue: '#baafa5' },
				        { saturation:-100 }
				      ]
				},
				{
					featureType: 'poi.park',
				    elementType: 'all',
					stylers: [
				        { hue: '#bdb2a8' },
				        { saturation:-100 }
					]
				},
				{
					featureType: 'landscape',
				    elementType: 'all',
					stylers: [
				        { hue: '#f7e8db' },
				        { saturation:100 }
					]
				}
			]
		}
	};
	


	// ------------------------------------------
	// PUBLIC
	// ------------------------------------------
	var STYLES = {};
	
	STYLES.getStyle = function(id, options){
		var 
			options          = options || {}
			style            = _styles[id]
		;
		
		return new google.maps.StyledMapType(style.style, {
			name: (options.name) ? options.name : style.name
		});
	};

	return STYLES;
})(jQuery,kafe)});