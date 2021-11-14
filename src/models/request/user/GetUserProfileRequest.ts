import Request from 'models/request/Request';

interface GetUserProfileRequest extends Request {
  id: string;
}

export default GetUserProfileRequest;
