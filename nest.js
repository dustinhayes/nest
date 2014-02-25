var nest = (function () {
    
    var deepest = function( element ) {
            var target;

            if ( ! element.children.length )
                return element;

            for ( target = element.firstElementChild;
                    target && target.firstElementChild;
                        target = target.firstElementChild ) ;
            
            return target;
        },


        buildNest = function( nestString ) {
            var fragment = document.createDocumentFragment(),
                strArray = nestString.split(' '),

                build = function( element ) {
                    var target = deepest( fragment );
                    
                    element = document.createElement( element );
                    target.appendChild( element );
                };
            
            strArray.forEach( build );

            return fragment.children[0];
        },


        appendOriginal = function( element, nestString ) {
            var nested = buildNest( nestString ),
                target = deepest( nested );

            target.appendChild( element );

            return nested;
        };
    

    return function nest( element, nestString ) {
        var length = element.length,
            result = [];

            nestElement = function( element ) {
                var nested = appendOriginal( element, nestString );

                if ( length )
                    result.push( nested );

                return nested;
            };

        if ( length ) {
            [].forEach.call( element, nestElement );
            return result;
        } else {
            return nestElement( element );
        }
    };

}());