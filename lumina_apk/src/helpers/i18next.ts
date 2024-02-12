import storage from 'src/helpers/storage';
import i18next, {ModuleType} from 'i18next';
import {initReactI18next} from 'react-i18next';
import { updateRequestLanuage } from 'src/constants/lanaguses';

export const lngKey = '@lng';

const languageDetector = {
  type: 'languageDetector' as ModuleType,
  async: true,
  detect: function (callback: Function) {
    //获取上次储存的语言结果
    storage
      .load({key: 'language'})
      .then(lng => {
        updateRequestLanuage(lng)
        callback(lng);
      })
      .catch(err => {
        storage
          .save({
            key: 'language',
            data: 'en',
          })
          .then(res => {
            callback('en');
        updateRequestLanuage('en')

          });
      });
  },
};

// 初始化i18next配置
i18next.use(languageDetector).use(initReactI18next).init({
  compatibilityJSON: 'v3',
  fallbackLng: 'zh', // 切换语言失败时的使用的语言
  debug: __DEV__, // 开发环境开启调试
  // 资源文件
  resources: {
    en: {
      translation: require('../../locales/en-us.json'),
    },
    zh: {
      translation: require('../../locales/zh-cn.json'),
    },
  },
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false,
  },
});

export default i18next;
