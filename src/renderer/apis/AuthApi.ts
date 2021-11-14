import { ipcRenderer } from 'electron';
import Request from 'models/request/Request';
import LoginRequest from 'models/request/auth/LoginRequest';
import RegisterRequest from 'models/request/auth/RegisterRequest';
import Response from 'models/response/Response';
import LoginResponse from 'models/response/auth/LoginResponse';
import RegisterResponse from 'models/response/auth/RegisterResponse';
import { IPC_MESSAGES } from '../../constants';
import ApiParams from './ApiParams';

class AuthApi {
  private static _instance?;
  public authrization?: string;

  static get instance(): AuthApi {
    if (!AuthApi._instance) {
      AuthApi._instance = new AuthApi();
    }

    return AuthApi._instance;
  }

  async login(params: ApiParams<LoginRequest>): Promise<LoginResponse> {
    if (this.authrization) {
      return Promise.reject(new Error('이미 로그인되어 있습니다.'));
    }

    const request: LoginRequest = {
      ...params,
      method: 'POST',
      authrization: this.authrization,
    };

    const result: LoginResponse = await ipcRenderer.invoke(
      IPC_MESSAGES.LOGIN,
      request,
    );

    // save auth key
    if (!result.isSuccess || !result.authrization) {
      return Promise.reject(new Error('로그인에 실패했습니다.'));
    }
    this.authrization = result.authrization;

    return result;
  }

  async logout(): Promise<Response> {
    const request: Request = {
      method: 'POST',
      authrization: this.authrization,
    };

    const result: Response = await ipcRenderer.invoke(
      IPC_MESSAGES.LOGOUT,
      request,
    );

    // remove auth key
    // TODO: logout, unregister도 isSuccess 분기가 있어야 할듯? status 가지고 util로 정리하던가
    delete this.authrization;

    return result;
  }

  async register(
    params: ApiParams<RegisterRequest>,
  ): Promise<RegisterResponse> {
    if (this.authrization) {
      return Promise.reject(new Error('이미 로그인되어 있습니다.'));
    }

    const request: RegisterRequest = {
      ...params,
      method: 'POST',
      authrization: this.authrization,
    };

    console.log(request);

    const result: RegisterResponse = await ipcRenderer.invoke(
      IPC_MESSAGES.REGISTER,
      request,
    );

    return result;
  }

  async unregister(): Promise<Response> {
    const request: Request = {
      method: 'POST',
      authrization: this.authrization,
    };

    const result: Response = await ipcRenderer.invoke(
      IPC_MESSAGES.UNREGISTER,
      request,
    );

    // remove auth key
    // TODO: logout, unregister도 isSuccess 분기가 있어야 할듯? status 가지고 util로 정리하던가
    delete this.authrization;

    return result;
  }
}

export default AuthApi;
