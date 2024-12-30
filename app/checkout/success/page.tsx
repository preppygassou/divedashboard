"use client"
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';

export default function Success() {
  const searchParams = useSearchParams();
  const order_id = searchParams.get('order_id');
  const [session, setSession] = useState(null);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h1 className="text-2xl font-bold text-center mb-4 text-black">Merci pour votre achat !</h1>
      <p className="text-center text-gray-700 mb-2">Nous avons reçu votre commande et nous la traiterons sous peu.</p>
      <p className="text-center text-gray-700">ID de commande : {order_id}</p>
      <button 
        className="mt-4 px-4 py-2 bg-black text-white rounded hover:bg-black-700"
        onClick={() => window.location.href = '/'}
      >
        Retour à l'accueil
      </button>
      </div>
    </div>
  );
}
