import 'virtual:windi-base.css';
import 'virtual:windi-components.css';
import '/@/design/index.less';
import 'virtual:windi-utilities.css';
import '/node_modules/flag-icons/css/flag-icons.min.css';
import 'virtual:svg-icons-register';
import App from './App.vue';
import { createApp } from 'vue';
import { initAppConfigStore } from '/@/logics/initAppConfig';
import { setupErrorHandle } from '/@/logics/error-handle';
import { router, setupRouter } from '/@/router';
import { setupRouterGuard } from '/@/router/guard';
import { setupStore } from '/@/store';
import { setupGlobDirectives } from '/@/directives';
import { setupI18n } from '/@/locales/setupI18n';
import { registerGlobComp } from '/@/components/registerGlobComp';
import VOtpInput from 'vue3-otp-input';

import { isDevMode } from './utils/env';

if (isDevMode()) {
  import('ant-design-vue/es/style');
}

async function bootstrap() {
  const app = createApp(App);
  setupStore(app);
  initAppConfigStore();
  registerGlobComp(app);
  await setupI18n(app);
  setupRouter(app);
  setupRouterGuard(router);
  setupGlobDirectives(app);
  setupErrorHandle(app);
  app.component('VOtpInput', VOtpInput);
  app.mount('#app');
}

bootstrap();
