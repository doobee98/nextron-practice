import { useRouter } from 'next/router';
import AuthApi from 'renderer/apis/AuthApi';
import Button from './base/Button';

const Logout: React.FC = () => {
  const router = useRouter();

  const handleLogout = async () => {
    if (!AuthApi.instance.authrization) {
      window.alert('로그인이 되어 있지 않습니다.');
      return;
    }

    await AuthApi.instance.logout();
    router.push('/home');
  };

  return <Button onClick={handleLogout}>Logout</Button>;
};

export default Logout;
