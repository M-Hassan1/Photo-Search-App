"use client"

import { useState } from 'react';
import Image from 'next/image';
import { searchImages } from '@/app/lib/api';
import { AiOutlineSearch } from 'react-icons/ai';
import { IoMdDownload } from 'react-icons/io';
import LoadingSpinner from '../Header/LoadingSpinner';

const HeaderPage = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hoveredImage, setHoveredImage] = useState(null);

  const handleSearch = async () => {
    try {
      setLoading(true);
      const searchResults = await searchImages(query);
      setImages(searchResults);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching images:', error);
      setLoading(false);
    }
  };

  const handleDownloadImage = (imageUrl : any, imageName : any) => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = imageName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <header className='
    w-full h-full flex flex-col items-center px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32 
    '>
      <div className='w-full max-w-5xl'>
        <h1 className='text-4xl m-4 font-bold text-center'>
          Photo Search App
        </h1>
        <div className='flex'>
          <input
            className='w-full p-2 border border-gray-300 rounded-l-md focus:outline-none'
            type='Search'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder='Search Images'
          />
          <button
            className='p-2 bg-blue-500 text-white rounded-r-md focus:outline-none'
            onClick={handleSearch}
          >
            <AiOutlineSearch />
          </button>
        </div>
        <div className='mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
          {loading ? (
            <div className='w-full col-span-full flex items-center justify-center'>
              <LoadingSpinner />
            </div>
          ) : images.length === 0 ? (
            <div className='w-full col-span-full flex items-center justify-center'>
              <h1 className='text-gray-600 text-2xl font-bold'>
                Not Found
              </h1>
            </div>
          ) : (
            images.map((image: any) => (
              <div
                key={image.id}
                className='relative w-full h-full'
                onMouseEnter={() => setHoveredImage(image)}
                onMouseLeave={() => setHoveredImage(null)}
              >
                <Image src={image.urls.small} alt={image.alt_description} className='h-full w-full ' width={400} height={400}
                />
                {hoveredImage === image && (
                  <div className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-30'>
                    <IoMdDownload
                      className='text-white text-3xl cursor-pointer'
                      onClick={() => handleDownloadImage(image.urls.regular, `${image.id}.jpg`)}
                    />
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </header>
  );
};

export default HeaderPage;
