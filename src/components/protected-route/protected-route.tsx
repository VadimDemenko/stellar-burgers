import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from '../../services/store';
import {
  checkUserAuth,
  getUserLoadingStatus
} from '../../services/slices/user/user';
import { Preloader } from '@ui';

type TProtectedRouteProps = {
  onlyAuthUser?: boolean;
  children: React.ReactElement;
};

export const ProtectedRoute = ({
  children,
  onlyAuthUser = false
}: TProtectedRouteProps) => {
  const location = useLocation();
  const isAithChecked = useSelector(checkUserAuth);
  const loadingStatus = useSelector(getUserLoadingStatus);

  const isLoading = loadingStatus.getUser === 'pending';

  if (isLoading) {
    return <Preloader />;
  }

  if (!onlyAuthUser && !isAithChecked) {
    return <Navigate replace to='/login' state={{ from: location }} />;
  }

  if (onlyAuthUser && isAithChecked) {
    const from = location.state?.from || { pathname: '/' };
    return <Navigate replace to={from} />;
  }

  return children;
};
