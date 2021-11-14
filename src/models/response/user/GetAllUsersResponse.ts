import UserProfile from 'models/UserProfile';
import Response from 'models/response/Response';

interface GetAllUsersResponse extends Response {
  users: UserProfile[];
  totalCount: number;
}

export default GetAllUsersResponse;
