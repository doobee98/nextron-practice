import UserProfile from 'models/UserProfile';
import Response from 'models/response/Response';

interface GetUserProfileResponse extends Response {
  // isCurrentUser: boolean;
  user: UserProfile;
}

export default GetUserProfileResponse;
