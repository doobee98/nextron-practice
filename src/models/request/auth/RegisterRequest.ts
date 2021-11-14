import Request from '../Request';

interface RegisterRequest extends Request {
  id: string;
  password: string;
  name: string;
  car_number?: string;
}

export default RegisterRequest;
