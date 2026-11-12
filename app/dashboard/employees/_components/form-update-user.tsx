'use client';

import { useState } from 'react';
import { Input, Button } from '@nextui-org/react';
import { LuEye, LuEyeOff } from 'react-icons/lu';
import { generate } from 'generate-password';
import { User } from '@/entities';
import updateUser from '@/actions/users/update';

interface FormUpdateUserProps {
  user: User;
}

export default function FormUpdateUser({ user }: FormUpdateUserProps) {
  const [password, setPassword] = useState<string>('');
  const [visible, setVisible] = useState<boolean>(false);

  const updateUserById = updateUser.bind(null, user.userId);

  const handleGeneratePassword = () => {
    const generated = generate({ length: 10 });
    setPassword(generated);
  };

  return (
    <form action={updateUserById} className="flex flex-col gap-4 py-2">
      <h1 className="text-xl font-bold text-gray-800">Actualizar usuario</h1>

      <Input
        label="Correo de cuenta"
        name="userEmail"
        type="email"
        defaultValue={user.userEmail}
        isRequired
      />

      <Input
        label="Nueva contraseña (opcional)"
        name="userPassword"
        type={visible ? 'text' : 'password'}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Dejar vacío para no cambiar"
        endContent={
          <button
            type="button"
            onMouseDown={() => setVisible(true)}
            onMouseUp={() => setVisible(false)}
            onTouchStart={() => setVisible(true)}
            onTouchEnd={() => setVisible(false)}
            onClick={() => setVisible(!visible)}
            className="focus:outline-none text-gray-500 hover:text-gray-700"
          >
            {visible ? <LuEyeOff size={22} /> : <LuEye size={22} />}
          </button>
        }
      />

      <Button
        type="button"
        color="danger"
        variant="flat"
        onPress={handleGeneratePassword}
        className="font-medium"
      >
        Generar contraseña
      </Button>

      <Button type="submit" color="primary" className="font-semibold text-white mt-2">
        Actualizar usuario
      </Button>
    </form>
  );
}
