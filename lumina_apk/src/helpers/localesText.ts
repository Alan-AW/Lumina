//引入国际化key
import zhKeys from '../../locales/zh-cn.json';
import enKeys from '../../locales/en-us.json';

const _zhKeys = Object.keys(zhKeys);
const _enKeys = Object.keys(zhKeys);

const keys = Object.keys(zhKeys) as Array<keyof typeof zhKeys>;

const locales = {} as { [key in typeof keys[number]]: typeof zhKeys[key] };

keys.forEach((key) => {
    locales[key] = key;
});

export {
    locales
}
