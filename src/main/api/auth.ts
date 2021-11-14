import { ipcMain } from 'electron';
import Request from 'models/request/Request';
import LoginRequest from 'models/request/auth/LoginRequest';
import RegisterRequest from 'models/request/auth/RegisterRequest';
import Response from 'models/response/Response';
import LoginResponse from 'models/response/auth/LoginResponse';
import RegisterResponse from 'models/response/auth/RegisterResponse';
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

const logoutHandler = async (event, request: Request): Promise<Response> => {
  const { method, authrization } = request;
  if (method !== 'POST') {
    return Promise.reject(new Error('잘못된 메소드'));
  }

  if (!authrization) {
    return Promise.reject(new Error('로그인이 되어 있지 않습니다.'));
  }

  return { status: 200 };
};

const registerHandler = async (
  event,
  request: RegisterRequest,
): Promise<RegisterResponse> => {
  const { method, authrization, id, password, name, car_number } = request;
  if (method !== 'POST') {
    return Promise.reject(new Error('잘못된 메소드'));
  }

  if (authrization) {
    return Promise.reject(new Error('이미 로그인되어 있습니다.'));
  }

  // 중복 아이디일 경우
  const users = await DB.getUser(id);
  const user = users[0];

  if (user) {
    return {
      status: 400,
      isSuccess: false,
    };
  }

  // DB에 추가
  await DB.addUser({ id, password, name, car_number });

  return {
    status: 200,
    isSuccess: true,
  };
};

const unregisterHandler = async (
  event,
  request: Request,
): Promise<Response> => {
  const { method, authrization } = request;
  if (method !== 'POST') {
    return Promise.reject(new Error('잘못된 메소드'));
  }

  if (!authrization) {
    return Promise.reject(new Error('로그인이 되어 있지 않습니다.'));
  }

  // TODO: 회원 탈퇴 처리

  return { status: 200 };
};

const runAuthApi = () => {
  ipcMain.handle(IPC_MESSAGES.LOGIN, loginHandler);
  ipcMain.handle(IPC_MESSAGES.LOGOUT, logoutHandler);
  ipcMain.handle(IPC_MESSAGES.REGISTER, registerHandler);
  ipcMain.handle(IPC_MESSAGES.UNREGISTER, unregisterHandler);
};

export default runAuthApi;
