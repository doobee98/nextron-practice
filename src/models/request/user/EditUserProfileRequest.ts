import Request from 'models/request/Request';

interface EditUserProfileRequest extends Request {
  name?: string;
  password?: string;
  car_number?: string;
}

export default EditUserProfileRequest;
