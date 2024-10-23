import { CiBarcode } from 'react-icons/ci';
import { BsBlockquoteLeft } from 'react-icons/bs';
import { IoSearchOutline } from 'react-icons/io5';
export var FIELD_GROUPS;
(function (FIELD_GROUPS) {
    FIELD_GROUPS["META"] = "meta";
    FIELD_GROUPS["CONTENT"] = "content";
    FIELD_GROUPS["SEO"] = "seo";
})(FIELD_GROUPS || (FIELD_GROUPS = {}));
export const GROUP_META = { title: 'Meta', name: FIELD_GROUPS.META, icon: CiBarcode };
export const GROUP_CONTENT = {
    title: 'Content',
    name: FIELD_GROUPS.CONTENT,
    icon: BsBlockquoteLeft,
};
export const GROUP_SEO = {
    title: 'SEO',
    name: FIELD_GROUPS.SEO,
    icon: IoSearchOutline,
};
