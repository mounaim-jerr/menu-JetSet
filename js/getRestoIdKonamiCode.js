(function() {
    jQuery(function($) {
        try {
            var konamiCallback = function() {
                // Get the resto id (from php?)
                var restoId = window.restaurantId,
                    restoIdCopyClipboard = $("<input type='text'>");

                restoIdCopyClipboard.val(restoId)
                    .appendTo("body")
                    .select();
                try{
                    document.execCommand("copy");
                } catch(e) {
                    console.info("copy to clipboard does not seem to be permitted in your browser");
                }
                restoIdCopyClipboard.remove();
            }
            var kkeys = [], konami = "82,73,68,82,73,68";

            $(document).on("keydown", function(e){
                kkeys.push( e.keyCode );
                if (kkeys.length > 10) {
                    kkeys.shift();
                }
                if ( kkeys.toString().indexOf( konami ) >= 0 ) {
                    konamiCallback();
                    kkeys=[];
                }
            });
        } catch(e) {
          console.log('error loading copy clipboard code');
        }
    });
})();
