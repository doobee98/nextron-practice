import Response from '../Response';

interface LoginResponse extends Response {
  isSuccess: boolean;
  authrization?: string;
}

export default LoginResponse;
