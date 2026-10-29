import Link from 'next/link';
import { API_URL } from '@/constants';
import { Provider } from '@/entities';
import { authHeaders } from '@/helpers/authHeaders';
import ProviderCard from './_components/provider-card';
import CreateProvider from './_components/create-provider';

export default async function ProvidersPage() {
  let providers: Provider[] = [];
  try {
    const response = await fetch(`${API_URL}/providers`, {
      headers: authHeaders(),
      next: { tags: ['dashboard:providers'] },
    });
    if (response.ok) {
      providers = await response.json();
    }
  } catch (error: any) {
    if (error?.digest === 'DYNAMIC_SERVER_USAGE') throw error;
    console.error('Error fetching providers:', error);
  }

  return (
    <div className="flex flex-col h-[90vh] p-8 gap-6 w-full overflow-y-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-neutral-800">Proveedores</h1>
        <CreateProvider />
      </div>
      <div className="flex flex-row flex-wrap gap-6">
        {providers.map((provider) => (
          <Link
            key={provider.providerId}
            href={`/dashboard/providers/${provider.providerId}`}
            className="hover:scale-105 transition-transform"
          >
            <ProviderCard provider={provider} />
          </Link>
        ))}
      </div>
    </div>
  );
}
