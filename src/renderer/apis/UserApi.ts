import { ipcRenderer } from 'electron';
import Request from 'models/request/Request';
import EditUserProfileRequest from 'models/request/user/EditUserProfileRequest';
import GetUserProfileRequest from 'models/request/user/GetUserProfileRequest';
import Response from 'models/response/Response';
import GetAllUsersResponse from 'models/response/user/GetAllUsersResponse';
import GetUserProfileResponse from 'models/response/user/GetUserProfileResponse';
import { IPC_MESSAGES } from '../../constants';
import ApiParams from './ApiParams';
import AuthApi from './AuthApi';

class UserApi {
  async getAllUsers(): Promise<GetAllUsersResponse> {
    const request: Request = {
      method: 'GET',
      authrization: AuthApi.instance.authrization,
    };

    const result: GetAllUsersResponse = await ipcRenderer.invoke(
      IPC_MESSAGES.USER_ALL,
      request,
    );

    return result;
  }

  async getUserProfile(
    params: ApiParams<GetUserProfileRequest>,
  ): Promise<GetUserProfileResponse> {
    const request: GetUserProfileRequest = {
      ...params,
      method: 'GET',
      authrization: AuthApi.instance.authrization,
    };

    const result: GetUserProfileResponse = await ipcRenderer.invoke(
      IPC_MESSAGES.USER_PROFILE,
      request,
    );

    return result;
  }

  async editUserProfile(
    params: ApiParams<EditUserProfileRequest>,
  ): Promise<Response> {
    const request: EditUserProfileRequest = {
      ...params,
      method: 'POST',
      authrization: AuthApi.instance.authrization,
    };

    const result: Response = await ipcRenderer.invoke(
      IPC_MESSAGES.USER_PROFILE,
      request,
    );

    return result;
  }
}

export default UserApi;
