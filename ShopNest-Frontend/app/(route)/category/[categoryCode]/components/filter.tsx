'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import { useSearchParams } from 'next/navigation'
import qs from  'query-string'
import { Size, Color } from '@/lib/StoreTypes'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface FilterProps {
  data: (Size | Color | string |  { id: string; name: string })[] ; // Handle both object types and strings
  name: string;
  valueKey: string;
  
}

const Filter: React.FC<FilterProps> = ({ data, name, valueKey }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const selectedValue = searchParams.get(valueKey);

  const onClick = (id: string) => {
    const currentParams = qs.parse(searchParams.toString());
    const query = {
      ...currentParams,
      [valueKey]: id,
    };
    if (currentParams[valueKey] === id) {
      delete query[valueKey];
    }

    const url = qs.stringifyUrl({
      url: window.location.pathname,
      query,
    });
    router.push(url);
  };

  return (
    <div>
      <div className="mb-8">
        <h3 className="font-bold text-lg text-primary">{name}</h3>
        <hr className="my-4" />
        <div className="flex flex-wrap gap-2">
          {data.map((filter) => {
            const filterId = typeof filter === 'string' ? filter : filter.id;
            const filterName = typeof filter === 'string' ? filter : filter.name;
            return (
              <div key={filterId} className="flex items-center">
                <Button
                  className={cn(
                    'border-primary p-2 px-4 border bg-white text-black capitalize rounded-2xl hover:text-white hover:primary-foreground',
                    selectedValue === filterId && 'bg-primary text-white'
                  )}
                  onClick={() => onClick(filterId)}
                >
                  {filterName}
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Filter;
