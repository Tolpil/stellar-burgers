import { ProfileUI } from '@ui-pages';
import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { selectError, selectUser, updateUser } from '../../slices/authSlice';
import { TRegisterData } from '@utils-types';

export const Profile: FC = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const [formValue, setFormValue] = useState({
    name: user?.name || '',
    email: user?.email || '',
    password: ''
  });

  useEffect(() => {
    if (user) {
      setFormValue((prev) => ({
        ...prev,
        name: user.name,
        email: user.email
      }));
    }
  }, [user]);

  const updateUserError = useSelector(selectError) || undefined;
  const isFormChanged = Boolean(
    user &&
      (formValue.name !== user.name ||
        formValue.email !== user.email ||
        formValue.password)
  );

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const { name, email, password } = formValue;

    const updatedData: Partial<TRegisterData> = { name, email };
    if (password) {
      updatedData.password = password;
    }

    dispatch(updateUser(updatedData));
    setFormValue((prev) => ({ ...prev, password: '' }));
  };

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    setFormValue({
      name: user?.name || '',
      email: user?.email || '',
      password: ''
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };
  return (
    <ProfileUI
      formValue={formValue}
      isFormChanged={isFormChanged}
      updateUserError={updateUserError}
      handleSubmit={handleSubmit}
      handleCancel={handleCancel}
      handleInputChange={handleInputChange}
    />
  );
};
