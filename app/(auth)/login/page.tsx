'use client';

import { useState } from 'react';
import { Input, Button } from '@nextui-org/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { API_URL, TOKEN_NAME } from '@/constants';

export default function LoginPage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
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
        const token = (await response.text()).replace(/"/g, '').trim();
        document.cookie = `${TOKEN_NAME}=${token}; path=/; max-age=604800; SameSite=Lax`;
        window.location.href = '/dashboard';
      } else {
        setError('Credenciales incorrectas');
      }
    } catch (err) {
      console.error(err);
      setError('Error al comunicarse con el servidor');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-orange-500 rounded-md px-10 py-2">
      <p className="text-xl my-4 text-white">Iniciar Sesión</p>
      {error && (
        <div className="bg-red-600 text-white text-sm p-2 rounded mb-2 text-center">
          {error}
        </div>
      )}
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
