import { FC, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { orderBurgerApi } from '../../utils/burger-api';
import {
  clearConstructor,
  setOrderModalData,
  setOrderRequest
} from '../../slices/burgerConstructorSlice';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { constructorItems, orderRequest, orderModalData } = useSelector(
    (state) => state.burgerConstructor
  );
  const { user } = useSelector((state) => state.user);

  const onOrderClick = async () => {
    if (!constructorItems.bun || orderRequest) return;
    if (!user) {
      navigate('/login', { state: { from: location } });
      return;
    }

    dispatch(setOrderRequest(true));
    try {
      const response = await orderBurgerApi([
        constructorItems.bun._id,
        ...constructorItems.ingredients.map((ingredient) => ingredient._id),
        constructorItems.bun._id
      ]);
      dispatch(setOrderModalData(response.order));
      dispatch(clearConstructor());
    } catch (error) {
      console.error('Failed to place order:', error);
    } finally {
      dispatch(setOrderRequest(false));
    }
  };

  const closeOrderModal = () => {
    dispatch(setOrderModalData(null));
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
