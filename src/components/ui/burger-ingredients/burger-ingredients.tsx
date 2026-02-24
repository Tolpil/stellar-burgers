import { FC, memo } from 'react';
import { Tab } from '@zlden/react-developer-burger-ui-components';
import styles from './burger-ingredients.module.css';

import { BurgerIngredientsUIProps } from './type';
import { IngredientsCategory } from '@components';

export const BurgerIngredientsUI: FC<BurgerIngredientsUIProps> = memo(
  ({
    currentTab,
    buns,
    mains,
    sauces,
    titleBunRef,
    titleMainRef,
    titleSaucesRef,
    bunsRef,
    mainsRef,
    saucesRef,
    onTabClick
  }) => (
    <section className={styles.burger_ingredients}>
      <ul className={styles.menu}>
        <li className={styles.tab}>
          <Tab value='bun' active={currentTab === 'bun'} onClick={onTabClick}>
            Булки
          </Tab>
        </li>
        <li className={styles.tab}>
          <Tab
            value='sauce'
            active={currentTab === 'sauce'}
            onClick={onTabClick}
          >
            Соусы
          </Tab>
        </li>
        <li className={styles.tab}>
          <Tab value='main' active={currentTab === 'main'} onClick={onTabClick}>
            Начинки
          </Tab>
        </li>
      </ul>
      <div className={`${styles.content} custom-scroll`}>
        <IngredientsCategory
          title='Булки'
          titleRef={titleBunRef}
          ingredients={buns}
          ref={bunsRef}
        />
        <IngredientsCategory
          title='Соусы'
          titleRef={titleSaucesRef}
          ingredients={sauces}
          ref={saucesRef}
        />
        <IngredientsCategory
          title='Начинки'
          titleRef={titleMainRef}
          ingredients={mains}
          ref={mainsRef}
        />
      </div>
    </section>
  )
);
