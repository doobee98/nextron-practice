import { ipcMain } from 'electron';
import Request from 'models/request/Request';
import GetUserProfileRequest from 'models/request/user/GetUserProfileRequest';
import EditUserProfileRequest from 'models/request/user/EditUserProfileRequest';
import Response from 'models/response/Response';
import GetAllUsersResponse from 'models/response/user/GetAllUsersResponse';
import GetUserProfileResponse from 'models/response/user/GetUserProfileResponse';
import DB from '../db';
import { IPC_MESSAGES } from '../../constants';

const allUsersHandler = async (
  event,
  request: Request,
): Promise<GetAllUsersResponse> => {
  const { method } = request;
  if (method !== 'GET') {
    return Promise.reject(new Error('잘못된 메소드'));
  }

  const users = await DB.getAllUsers();

  return {
    status: 200,
    users,
    totalCount: users.length,
  };
};

const getUserProfileHandler = async (
  event,
  request: GetUserProfileRequest,
): Promise<GetUserProfileResponse> => {
  const { method, id } = request;
  if (method !== 'GET') {
    return Promise.reject(new Error('잘못된 메소드'));
  }

  const users = await DB.getUser(id);
  const user = users[0];

  return { status: 200, user };
};

const editUserProfileHandler = async (
  event,
  request: EditUserProfileRequest,
): Promise<Response> => {
  const { method, authrization, name, password, car_number } = request;
  if (method !== 'POST') {
    return Promise.reject(new Error('잘못된 메소드'));
  }

  if (authrization) {
    return Promise.reject(new Error('이미 로그인되어 있습니다.'));
  }

  const id = authrization; // TODO: fix it
  const user = await DB.getUser(id);
  await DB.updateUser({
    id,
    name: name || user.name,
    password: password || user.password,
    car_number: car_number || user.car_number;
  });

  return { status: 200 };
};

const runUserApi = () => {
  ipcMain.handle(IPC_MESSAGES.USER_ALL, allUsersHandler);
  ipcMain.handle(IPC_MESSAGES.USER_PROFILE, (event, request: Request) => 
    request.method === 'GET' ? getUserProfileHandler(event, request as GetUserProfileRequest) : editUserProfileHandler(event, request)
  );
};

export default runUserApi;
