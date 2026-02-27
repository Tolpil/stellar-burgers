import { FC, useMemo, useEffect } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { useSelector, useDispatch } from '../../services/store';
import { useParams, useLocation } from 'react-router-dom';
import { fetchUserOrders } from '../../slices/profileOrdersSlice';
import { fetchOrderByNumber } from '../../slices/orderInfoSlice';
import { Modal } from '@components';

export const OrderInfo: FC = () => {
  const { number } = useParams<{ number: string }>();
  const parsedNumber = number ? parseInt(number, 10) : null;
  const location = useLocation();
  const background = location.state?.background;

  const isProfilePage = location.pathname.startsWith('/profile/orders');
  const isFeedPage = location.pathname.startsWith('/feed');

  const dispatch = useDispatch();

  const feedOrders = useSelector((state) => state.feed.orders);
  const profileOrdersData = useSelector((state) => state.profileOrders.orders);
  const profileOrdersList = profileOrdersData.orders;
  const profileOrdersLoading = useSelector(
    (state) => state.profileOrders.loading
  );
  const orderByNumber = useSelector((state) => state.orderInfo.order);
  const orderInfoLoading = useSelector((state) => state.orderInfo.loading);
  const orderInfoError = useSelector((state) => state.orderInfo.error);

  const ingredients = useSelector((state) => state.ingredients.ingredients);

  useEffect(() => {
    if (isProfilePage && !profileOrdersList.length && !profileOrdersLoading) {
      dispatch(fetchUserOrders());
    }
  }, [isProfilePage, profileOrdersList.length, profileOrdersLoading, dispatch]);

  const orders = isProfilePage
    ? profileOrdersList
    : isFeedPage
      ? feedOrders
      : [];

  const orderData = parsedNumber
    ? orders.find((order) => order.number === parsedNumber)
    : null;
  const resolvedOrder =
    orderData ||
    (orderByNumber && orderByNumber.number === parsedNumber
      ? orderByNumber
      : null);

  useEffect(() => {
    if (!parsedNumber) return;
    if (orderData) return;
    if (orderByNumber && orderByNumber.number === parsedNumber) return;
    dispatch(fetchOrderByNumber(parsedNumber));
  }, [dispatch, parsedNumber, orderData, orderByNumber]);

  const orderInfo = useMemo(() => {
    if (!resolvedOrder || !ingredients.length) return null;

    const date = new Date(resolvedOrder.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = resolvedOrder.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        const ingredient = ingredients.find((ing) => ing._id === item);
        if (!ingredient) return acc;
        if (!acc[item]) {
          acc[item] = { ...ingredient, count: 1 };
        } else {
          acc[item].count++;
        }
        return acc;
      },
      {} as TIngredientsWithCount
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...resolvedOrder,
      ingredientsInfo,
      date,
      total
    };
  }, [resolvedOrder, ingredients]);

  if (!orderInfo) {
    if (orderInfoError) {
      return (
        <div className='text text_type_main-large p-4'>Заказ не найден</div>
      );
    }
    if (orderInfoLoading) {
      return <Preloader />;
    }
    return <Preloader />;
  }

  if (background) {
    return (
      <Modal title='Детали заказа' onClose={() => window.history.back()}>
        <OrderInfoUI orderInfo={orderInfo} />
      </Modal>
    );
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
