import { ipcMain } from 'electron';
import LoginRequest from 'models/request/auth/LoginRequest';
import LoginResponse from 'models/response/auth/LoginResponse';
import DB from '../db';
import { IPC_MESSAGES } from '../../constants';

const loginHandler = async (
  event,
  request: LoginRequest,
): Promise<LoginResponse> => {
  const { method, authrization, id, password } = request;
  if (method !== 'POST') {
    return Promise.reject(new Error('잘못된 메소드'));
  }

  if (authrization) {
    return Promise.reject(new Error('이미 로그인되어 있습니다.'));
  }

  const users = await DB.getUser(id);
  const user = users[0];

  if (!user || password !== user.password) {
    // return Promise.reject(new Error('잘못된 아이디 또는 비밀번호 입니다.'));
    console.log('incorrect id or password');
    return {
      status: 400,
      isSuccess: false,
    };
  }

  return {
    status: 200,
    isSuccess: true,
    authrization: user.id, // TODO: 임시
  };
};

const runAuthApi = () => {
  ipcMain.handle(IPC_MESSAGES.LOGIN, loginHandler);
};

export default runAuthApi;
