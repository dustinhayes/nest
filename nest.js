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
                target = deepest( nested ),
                elementCopy = element.cloneNode(true);

            target.appendChild( elementCopy );

            return nested;
        },


        replaceOriginal = function( replacement, current ) {
            current.parentElement.replaceChild( replacement, current );
        };
    

    return function nest( element, nestString, toReplace ) {
        var replace = ( toReplace === 'replace' ),
            length = element.length,
            result = [];

            nestElement = function( element ) {
                var nested = appendOriginal( element, nestString );
                
                if ( replace )
                    replaceOriginal( nested, element );

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