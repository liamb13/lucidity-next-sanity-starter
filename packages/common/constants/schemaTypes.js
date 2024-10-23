/**
 * List of all the schema types we use in Sanity, as constants.
 * This allows us to refer to them by their constant symbol, rather than a magic string, in both
 * the Sanity Studio app, and the web app.
 *
 * See: @/docs/repo-architecture/about-constants.md
 *
 * !!!!!!                         !!!!!!!!                              !!!!!! //
 * DO NOT CHANGE THE VALUES OF THESE CONSTANTS WITHOUT CAREFUL CONSIDERATION.  //
 *     CHANGING THE VALUES WILL CAUSE CONTENT TO DISAPPEAR FROM THE CMS        //
 * !!!!!!                         !!!!!!!!                              !!!!!! //
 *
 * This is because these constants are the Sanity `_type` values. If they change, you must also migrate
 * your content to change its `_type` to the new value. If you have no content yet, change them all you like.
 */
export var DOCUMENT;
(function (DOCUMENT) {
    DOCUMENT["PAGE"] = "page";
    DOCUMENT["MEDIA_TAG"] = "media.tag";
})(DOCUMENT || (DOCUMENT = {}));
export var OBJECT;
(function (OBJECT) {
    OBJECT["MODULAR_OUTER_BLOCKS"] = "modularContentBlocks.outer";
    OBJECT["MODULAR_INNER_BLOCKS"] = "modularContentBlocks.inner";
    OBJECT["MODULAR_OUTER_BLOCK_SECTION"] = "modularContentBlocks.outer.section";
    OBJECT["MODULAR_INNER_BLOCK_RAW_HTML"] = "modularContentBlocks.inner.rawHtml";
})(OBJECT || (OBJECT = {}));
export var SINGLETON;
(function (SINGLETON) {
})(SINGLETON || (SINGLETON = {}));
