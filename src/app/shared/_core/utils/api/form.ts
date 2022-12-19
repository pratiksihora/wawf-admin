// Enums and Interfaces

import { FormApiAction } from 'src/app/shared/constants/models/api/form';
import { ApiUtil } from './index';

export class FormApiUtil {
  static formApi(form: FormApiAction) {
    let api: any = {};

    api.get = ApiUtil.configureGet({ url: form.getUrl || ApiUtil.makeAPiUrl({ module: form.module, method: `{{${form.idKey}}}` }), title: form.title });

    if (!form.skipAddCall)
      api.skipAddCall = ApiUtil.configurePost({ url: form.addUrl || ApiUtil.makeAPiUrl({ module: form.module, method: `` }), title: form.title, success: 'COMMON.TOASTER.ADD' });

    if (!form.skipEditCall)
      api.edit = ApiUtil.configurePatch({ url: form.editUrl || ApiUtil.makeAPiUrl({ module: form.module, method: `{{${form.idKey}}}` }), title: form.title, success: 'COMMON.TOASTER.UPDATE' });

    if (!form.skipDeleteCall)
      api.delete = ApiUtil.configureDelete({ url: form.deleteUrl || ApiUtil.makeAPiUrl({ module: form.module, method: `{{${form.idKey}}}` }), title: form.title, success: 'COMMON.TOASTER.DELETE' });

    return api;
  }
}