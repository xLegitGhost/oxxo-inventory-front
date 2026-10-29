'use client';

import { useState } from 'react';
import { Input, Button } from '@nextui-org/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { API_URL } from '@/constants';

export default function LoginPage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    const formData = new FormData(e.currentTarget);
    const authData = {
      userEmail: formData.get('userEmail'),
      userPassword: formData.get('userPassword'),
    };
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(authData),
        credentials: 'include',
      });
      if (response.status === 201) {
        router.push('/dashboard');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
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
        <Button color="primary" type="submit" disabled={submitting}>
          {submitting ? 'Enviando...' : 'Iniciar Sesión'}
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
