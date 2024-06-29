'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import qs from 'query-string';
import { Size, Color } from '@/lib/StoreTypes';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface FilterProps {
  data: (Size | Color)[];
  name: string;
  valueKey: string;
}

const Filter: React.FC<FilterProps> = ({ data, name, valueKey }) => {
  const route = useRouter();
  const searchParams = useSearchParams();
  
  const selectedValue = searchParams.get(valueKey);
  const onClick = (id: string) => {
    const currentParams = qs.parse(searchParams.toString());
    const query = {
      ...currentParams,
      [valueKey]: id
    };
  
    if (currentParams[valueKey] === id) {
      delete query[valueKey];
    }

    const url = qs.stringifyUrl({
      url: window.location.pathname,
      query
    });
    route.push(url);
  };

  return (
    <div>
      <div className="mb-8">
        <h3 className="font-bold text-lg">{name}</h3>
        <hr className="my-4" />
        <div className="flex flex-wrap gap-2">
          {data.map((filter) => (
            <div key={filter.id} className="flex items-center">
              <Button
                className={cn(
                  'border-primary p-2 px-4 border  bg-white text-black capitalize rounded-2xl hover:text-white hover:primary-foreground',
                  selectedValue === filter.id &&
                    'bg-primary text-white'
                )}
                onClick={() => onClick(filter.id)}
              >
                {filter.name}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Filter;
