var register = function(Handlebars) {
    var helpers = {
    if_equal: function(a, b, opts) {
        if (a == b) {
            return opts.fn(this)
        } else {
            return opts.inverse(this)
        } 
    }
};

if (Handlebars && typeof Handlebars.registerHelper === "function") {
    for (var prop in helpers) {
        Handlebars.registerHelper(prop, helpers[prop]);
    }
} else {
    return helpers;
}

};

module.exports.register = register;
module.exports.helpers = register(null); 