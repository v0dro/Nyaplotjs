require([
    "underscore",
    "node-uuid",
    "core"
], function(_, node_uuid, core){
    core.register_parser(
        "stage2d",
        ["sheets"],
        {
            margin_x: 10,
            margin_y: 10,
            width: 500,
            height: 500
        },
        /*
         * Construct DOM tree as follows:
         *
         * svg--g (root_g)
         *      |
         *      +-- g0 (root_layer0)
         *      |
         *      +-- g1
         *           +--clipPath--rect
         *           |
         *           +--root_layer0
         *
         * Glyphs (e.g. scatter, rect, box...) are appended to root_layer1.
         * Other components (e.g. axis, background...) are appended to root_layer0.
         */
        function(sheets, options){
            var svg = d3.select(document.createElementNS("http://www.w3.org/2000/svg", "svg"));

            var root = svg.append("g")
                    .attr("transform", "translate(" + options.margin_x  + "," + options.margin_y + ")")
                    .attr("class", "root");

            var sheets_root = root.append("g").attr("class", "sheets_root");
            
            // component: selection of "g" element.
            _.each(sheets, function(uuid){
                var component = core.get(uuid);
                var raw_g = component.node();
                sheets_root.node().appendChild(raw_g);
            });

            return svg;
        }
    );
});
