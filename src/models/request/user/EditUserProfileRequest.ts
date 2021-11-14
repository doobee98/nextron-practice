import Request from 'models/request/Request';

interface EditUserProfileRequest extends Request {
  car_number?: string;
}

export default EditUserProfileRequest;
