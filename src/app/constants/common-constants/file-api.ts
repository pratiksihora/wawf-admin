import { ApiAction } from "src/app/shared/constants/models/api";
import { HttpMethod, ApiModule } from "../../api/enums/api-module.enum";

import { FILE_API_URL, GALLERY_FILE_API_URL } from "../static-constants/api/common/file";

export const FILE_API_ACTION: ApiAction = {
  module: ApiModule.API,
  httpMethod: HttpMethod.UPLOAD,
  url: FILE_API_URL.FILE,
  response: (response: any) => {
    return {
      file_name: response.data.FileUpload.file_name || response.data.fileName,
      file_path: response.data.FileUpload.path || response.data.fullPath
    }
  }
}