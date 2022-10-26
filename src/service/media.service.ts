import { absApiService } from './abs-api.service';
import { MediaDto } from './rest-api';
import { DefaultApi } from './rest-api/api';

class MediaService extends DefaultApi {
  async getPicture(id: number): Promise<MediaDto> {
    const response = await absApiService.getMedia(id);
    return response.data;
  }

  // async uploadPicture(file: File[]) {
  //   const response = await absApiService.uploadMedia(file);
  //   if (response.status === 201) {
  //     return response.data;
  //   } else {
  //     [];
  //   }
  // }
}

const mediaService = new MediaService();
export default mediaService;
