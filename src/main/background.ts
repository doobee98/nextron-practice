import { app, ipcMain } from 'electron';
import serve from 'electron-serve';
import DB from './db';
import { createWindow } from './helpers';
import { IPC_MESSAGES } from '../constants';
import LoginRequest from 'models/request/auth/LoginRequest';
import LoginResponse from 'models/response/auth/LoginResponse';

const isProd: boolean = process.env.NODE_ENV === 'production';

if (isProd) {
  serve({ directory: 'app' });
} else {
  app.setPath('userData', `${app.getPath('userData')} (development)`);
}

(async () => {
  await app.whenReady();

  const mainWindow = createWindow('main', {
    width: 1000,
    height: 600,
  });

  if (isProd) {
    await mainWindow.loadURL('app://./home.html');
  } else {
    const port = process.argv[2];
    await mainWindow.loadURL(`http://localhost:${port}/home`);
    mainWindow.webContents.openDevTools();
  }
})();

app.on('window-all-closed', () => {
  app.quit();
});

ipcMain.handle(
  IPC_MESSAGES.LOGIN,
  async (event, request: LoginRequest): Promise<LoginResponse> => {
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
  },
);
