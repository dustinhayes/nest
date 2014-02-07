var nest = (function () {
    var deepest = function( element ) {
            var target;

            if ( ! element.children.length ) {
                return element;
            }

            for ( target = element.firstElementChild;
                    target && target.firstElementChild;
                        target = target.firstElementChild ) ;
            
            return target;
        },


        buildNest = function( nestString ) {
            var frag = document.createDocumentFragment(),
                strArray = nestString.split(' '),
                target;
            
            strArray.forEach(function( element, ind, arr ) {
                element = document.createElement( element );
                target = deepest( frag );
                target.appendChild( element );
            });

            return frag;
        },


        appendOriginal = function( element, nestString ) {
            var nest = buildNest( nestString ),
                target = deepest( nest );

            target.appendChild( element.cloneNode(true) );

            return nest;
        },


        replaceOriginal = function( replacement, current ) {
            current.parentElement.replaceChild( replacement, current );
        };
    

    return function( element, nestString, toReplace ) {
        if ( toReplace ) {
            replaceOriginal( appendOriginal( element, nestString ), element );
        }

        return appendOriginal( element, nestString );
    };
}());