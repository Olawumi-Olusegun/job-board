import React, { forwardRef, useMemo, useState } from 'react'
import { Input } from './ui/input';

import citiesList from "@/lib/cities-list";

interface LocationInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    onLocationSelected: (location: string) => void;
}

export default forwardRef<HTMLInputElement, LocationInputProps>(function LocationInput({onLocationSelected, ...props}, ref) {
    const [locationSearchInput, setLocationSearchInput]= useState("");
    const [hasFocus, setHasFocus] = useState(false)

    const cities = useMemo(() => {
         if(!locationSearchInput.trim()) return [];

         const searchWords = locationSearchInput.split(" ");
         return citiesList.map((city) => `${city.name}, ${city.subcountry}, ${city.country}`)
         .filter((city) => city.toLowerCase().startsWith(searchWords[0].toLowerCase()) 
         && searchWords.every(word => word.includes(word.toLocaleLowerCase())))
         .slice(0, 5);
        
    }, [locationSearchInput]);

  return (
    <div className='relative'>
        <Input
        placeholder='Search for a city'
        onChange={(event) => setLocationSearchInput(event.target.value)}
        onFocus={() => setHasFocus(true)}
        onBlur={() => setHasFocus(false)}
        {...props} 
        ref={ref}
        />
        {locationSearchInput.trim() && hasFocus && (
            <div className='absolute w-full bg-background shadow-xl border-x border-b rounded-b-lg z-20 divide-y'>
                {!cities.length && <p className='p-3'>No result found</p> }
                {!cities.map((city) => (
                    <button onMouseDown={(event) => {
                        event.preventDefault();
                        onLocationSelected(city);
                        setLocationSearchInput("");
                    }} className="block w-full text-start p-2" key={city}>{city}</button>
                )) }
            </div>
        )}
    </div>
  )
})