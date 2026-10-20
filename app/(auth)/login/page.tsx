'use client';

import { Input, Button } from '@nextui-org/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { API_URL } from '@/constants';

export default function LoginPage() {
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const authData = {
      userEmail: formData.get('userEmail'),
      userPassword: formData.get('userPassword'),
    };
    try {
      const { data } = await axios.post(`${API_URL}/auth/login`, authData, {
        withCredentials: true,
      });
      console.log(data);
      router.push('/dashboard');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-orange-500 rounded-md px-10 py-2">
      <p className="text-xl my-4 text-white">Iniciar Sesión</p>
      <div className="flex flex-col gap-2">
        <Input label="Email" type="email" name="userEmail" isRequired size="sm" />
        <Input label="Contraseña" type="password" name="userPassword" isRequired size="sm" />
      </div>
      <div className="flex flex-col items-center gap-2 mt-4">
        <Button color="primary" type="submit">
          Iniciar Sesión
        </Button>
        <p className="text-white">
          ¿No tienes cuenta?{' '}
          <Link href="/signup" className="text-red-600 underline">
            Regístrate
          </Link>
        </p>
      </div>
    </form>
  );
}
