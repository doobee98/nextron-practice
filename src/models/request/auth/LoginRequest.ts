import Request from '../Request';

interface LoginRequest extends Request {
  id: string;
  password: string;
}

export default LoginRequest;
