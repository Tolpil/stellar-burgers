import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useSelector } from '../../services/store';
import {
  selectIngredients,
  selectLoading as selectIngredientsLoading
} from '../../slices/ingredientsSlice';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { TIngredient } from '@utils-types';
import styles from './ingredient-details.module.css';
import { Modal } from '../modal';

export const IngredientDetails: FC = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();

  const ingredients = useSelector(selectIngredients);
  const isLoading = useSelector(selectIngredientsLoading);

  const ingredientData = ingredients.find((item) => item._id === id);

  const backgroundLocation = location.state?.background;

<<<<<<< HEAD
=======
  useEffect(() => {
    if (!ingredients.length && !isLoading) {
      dispatch(fetchIngredients());
    }
  }, [dispatch, ingredients.length, isLoading]);

>>>>>>> e805f61991f0739a7c523c1d33d43efff505c115
  if (isLoading || (!ingredientData && ingredients.length > 0)) {
    return <Preloader />;
  }

  if (!ingredientData) {
    return (
      <div className='text text_type_main-large p-4'>Ингредиент не найден</div>
    );
  }

  const handleClose = () => {
    navigate(backgroundLocation || '/', { replace: true });
  };

  if (backgroundLocation) {
    return (
      <Modal title='Детали ингредиента' onClose={handleClose}>
        <IngredientDetailsUI ingredientData={ingredientData} />
      </Modal>
    );
  }

  return (
    <div className={styles.pageContainer}>
      <h2 className='text text_type_main-large mb-6'>Детали ингредиента</h2>
      <IngredientDetailsUI ingredientData={ingredientData} />
    </div>
  );
};
