import { FC, useCallback, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  resetConstructor,
  setOrderModalData,
  setOrderRequest
} from '../../slices/burgerConstructorSlice';
import { selectIsAuthenticated } from '../../slices/authSlice';
import { orderBurgerApi } from '@api';

export const BurgerConstructor: FC = () => {
  const constructorItems = useSelector(
    (state) => state.burgerConstructor.constructorItems
  );
  const orderRequest = useSelector(
    (state) => state.burgerConstructor.orderRequest
  );
  const orderModalData = useSelector(
    (state) => state.burgerConstructor.orderModalData
  );
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (sum: number, ingredient: TConstructorIngredient) =>
          sum + ingredient.price,
        0
      ),
    [constructorItems]
  );

  const onOrderClick = useCallback(() => {
    if (!constructorItems.bun) return;

    if (!isAuthenticated) {
      navigate('/login', { state: { from: location }, replace: true });
      return;
    }

    if (orderRequest || orderModalData) return;

    dispatch(setOrderRequest(true));

    const ingredientIds = [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map((ing) => ing._id),
      constructorItems.bun._id
    ];

    orderBurgerApi(ingredientIds)
      .then((response) => {
        dispatch(resetConstructor());
        dispatch(setOrderModalData(response.order));
      })
      .catch((error) => {
        console.error('Failed to place order:', error);
      })
      .finally(() => {
        dispatch(setOrderRequest(false));
      });
  }, [
    constructorItems,
    isAuthenticated,
    location,
    orderRequest,
    orderModalData,
    dispatch,
    navigate
  ]);

  const closeOrderModal = useCallback(() => {
    dispatch(setOrderModalData(null));
  }, [dispatch]);

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
