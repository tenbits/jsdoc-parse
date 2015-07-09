"use strict";

exports.normalizeIIFE = normalizeIIFE;

/**
 * Is a variable declared outside iife scope and then initialized inside,
 * it becomes a static member of itself
 */
function normalizeIIFE(identifier){
	if (identifier.scope !== 'static')
        return identifier;

    var member = /~([^\.]+)/.exec(identifier.memberof);
    if (member == null)
        return identifier;

    var name = member[1];
    var rgx = new RegExp(name + '\\.' + name, 'g');

    if (rgx.test(identifier.longname) === false)
        return identifier;

    var serialized = JSON.stringify(identifier).replace(rgx, name);
    identifier = JSON.parse(serialized);
    identifier.memberof = identifier.memberof.replace('~' + name, '');
    return identifier;
}