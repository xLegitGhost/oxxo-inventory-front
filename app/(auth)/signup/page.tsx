'use client'

import { Input, Button } from '@nextui-org/react'
import Link from 'next/link'

export default function SignupPage() {
  return (
    <div className="bg-orange-500 rounded-md px-10 py-2">
      <p className="text-xl my-4 text-white">Registrarse</p>
      <div className="flex flex-col gap-2">
        <Input label="Email" type="email" isRequired size="sm" />
        <Input label="Contraseña" type="password" isRequired size="sm" />
        <Input label="Repetir Contraseña" type="password" isRequired size="sm" />
      </div>
      <div className="flex flex-col items-center gap-2 mt-4">
        <Button color="primary">Registrarse</Button>
        <p className="text-white">
          ¿Ya tienes una cuenta?{' '}
          <Link href="/login" className="text-red-600 underline">
            Inicia Sesión
          </Link>
        </p>
      </div>
    </div>
  )
}
