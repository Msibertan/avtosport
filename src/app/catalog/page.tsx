'use client';

import { useEffect, useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { supabase, Car } from '@/lib/supabase';
import { Settings, Droplet, Cog } from 'lucide-react';
import Link from 'next/link';

export default function CatalogPage() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [budgetFilter, setBudgetFilter] = useState('all');

  useEffect(() => {
    async function fetchCars() {
      try {
        const { data, error } = await supabase
          .from('cars')
          .select('*')
          .eq('status', 'available')
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error fetching cars:', error);
        } else if (data) {
          setCars(data);
        }
      } catch (err) {
        console.error('Unexpected error fetching cars:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchCars();
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className="relative bg-background overflow-hidden border-b border-gray-100">
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.02]" />
        </div>

        <div className="relative z-10 px-8 py-16 pt-32">
          <div className="max-w-screen-2xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">КАТАЛОГ АВТОМОБИЛЕЙ</h1>
            <p className="text-gray-700 max-w-2xl mx-auto text-lg">
              Широкий выбор проверенных автомобилей из Европы по отличным ценам.
            </p>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="bg-card px-8 py-6 border-b border-gray-100 z-20 relative">
        <div className="max-w-screen-2xl mx-auto flex">
          <div className="relative w-full md:w-80">
            <select 
              value={budgetFilter}
              onChange={(e) => setBudgetFilter(e.target.value)}
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all appearance-none shadow-sm cursor-pointer hover:border-gray-300"
            >
              <option value="all">Все бюджеты</option>
              <option value="up_to_500k">До 500 000 ₽</option>
              <option value="500k_1m">500 000 - 1 000 000 ₽</option>
              <option value="1m_2m">1 000 000 - 2 000 000 ₽</option>
              <option value="2m_3m">2 000 000 - 3 000 000 ₽</option>
              <option value="over_3m">Более 3 000 000 ₽</option>
            </select>
            <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Catalog Grid */}
      <section className="py-20 px-8 bg-card relative flex-grow">
        <div className="max-w-screen-2xl mx-auto relative z-10">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : cars.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {cars.filter(car => {
                if (budgetFilter === 'all') return true;
                if (budgetFilter === 'up_to_500k') return car.price <= 500000;
                if (budgetFilter === '500k_1m') return car.price > 500000 && car.price <= 1000000;
                if (budgetFilter === '1m_2m') return car.price > 1000000 && car.price <= 2000000;
                if (budgetFilter === '2m_3m') return car.price > 2000000 && car.price <= 3000000;
                if (budgetFilter === 'over_3m') return car.price > 3000000;
                return true;
              }).map((car) => (
                <div key={car.id} className="flex flex-col glass-panel border border-gray-200 rounded-3xl overflow-hidden hover:border-primary/30 transition-all duration-500 hover:shadow-[0_0_30px_rgba(59,130,246,0.1)] group">
                  {/* Car Image */}
                  <div className="h-56 overflow-hidden relative bg-gray-100">
                    {car.images && car.images.length > 0 ? (
                      <img
                        src={car.images[0]}
                        alt={`${car.brand} ${car.model}`}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        Нет фото
                      </div>
                    )}
                    <div className="absolute top-4 right-4 bg-primary text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                      {car.year} год
                    </div>
                  </div>

                  {/* Car Info */}
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {car.brand} {car.model}
                    </h3>
                    
                    <div className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-500 mb-6">
                      {car.price.toLocaleString('ru-RU')} ₽
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Settings className="w-4 h-4 text-primary" />
                        <span>{car.mileage.toLocaleString('ru-RU')} км</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Droplet className="w-4 h-4 text-primary" />
                        <span>{car.fuel_type}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600 col-span-2">
                        <Cog className="w-4 h-4 text-primary" />
                        <span>{car.transmission}</span>
                      </div>
                    </div>

                    <div className="mt-auto pt-4 border-t border-gray-100">
                      <Link 
                        href="https://t.me/Avtosportprigon" 
                        target="_blank"
                        className="block w-full py-3 text-center bg-gray-100 hover:bg-primary hover:text-white text-gray-900 font-bold rounded-xl transition-all duration-300"
                      >
                        Запросить авто
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <h2 className="text-2xl font-medium text-gray-500 tracking-wide mb-4">
                  Каталог пуст
                </h2>
                <p className="text-gray-400">Машины в наличии скоро появятся здесь.</p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
