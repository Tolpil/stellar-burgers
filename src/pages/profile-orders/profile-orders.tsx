import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { fetchProfileOrders } from '../../slices/feedSlice';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const { profileOrders: orders } = useSelector((state) => state.feed);

  useEffect(() => {
    dispatch(fetchProfileOrders());
  }, [dispatch]);

  return <ProfileOrdersUI orders={orders} />;
};
