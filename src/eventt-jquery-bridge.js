(function($, window, undefined) {
    let jQueryBridge = function (event, selector, parse = null) {
        let self = this,
            $el = $(selector),
            on = event,
            use = parse;

        this.click = function (selector) {
            return self.on('click', selector);
        };

        this.pass = function (what) {
            use = what;
            return this;
        };

        this.to = function (event) {
            bind(event);
        };

        this.bind = function (event) {
            $el.on(on, function () {
                window.Eventt.emit(event, getData());
                return false;
            });
        };

        let getData = function () {
            if (use === 'data') {
                return getDataAttributes();
            } else if (use === 'form') {
                return getFormData();
            }
        };

        let getFormData = function () {
            let data = {};
            let formData = $el.serializeArray();

            for (let ii = 0; ii < formData.length; ii++) {
                data[formData[ii].name] = formData[ii].value;
            }

            return data;
        };

        let getDataAttributes = function () {
            return $el.data();
        };
    };

    jQueryBridge.prototype.create = function (event, selector, use) {
        return new jQueryBridge(event, selector, use);
    };

    if (typeof window.Eventt !== "undefined") {
        window.Eventt.$on = jQueryBridge.prototype.create;
        window.Eventt.$click =  function (selector) {
            return jQueryBridge.prototype.create('click', selector);
        };
        window.Eventt.$form = function (selector, event) {
            return jQueryBridge.prototype.create('submit', selector, 'form').bind(event);
        };
    }
} (jQuery, window));
