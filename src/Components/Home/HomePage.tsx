// import React from 'react'

// export const HomePage = () => {
//   return (
//     <main>
//         <section>
//             <div className='mt-4'>
//                 <h1>
//                     No Image
//                 </h1>
//             </div>
//         </section>
//     </main>
//   )
// }






import Image from 'next/image';
import React from 'react';

const HomePage: React.FC<{ images: any[] }> = ({ images }) => {
  return (
    <div className="grid grid-cols-4 gap-4 mt-8">
      {images.map((image) => (
        <div key={image.id}>
          <Image src={image.urls.small} alt={image.alt_description} width={700} height={700} />
        </div>
      ))}
    </div>
  );
};

export default HomePage;
