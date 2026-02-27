import { TConstructorState, TOrder } from '@utils-types';

export type BurgerConstructorUIProps = {
  constructorItems: TConstructorState['constructorItems'];
  orderRequest: boolean;
  price: number;
  orderModalData: TOrder | null;
  onOrderClick: () => void;
  closeOrderModal: () => void;
};
