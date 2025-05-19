
import React from 'react';

type Props = {
  params: {
    id: string;
  };
};

const UserProfile = async ({ params }: Props) => {
  const { id } = await params; // ✅ fix: await params

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="bg-gray-500 p-6 rounded shadow-md w-96 text-center">  
        <p className="text-2xl font-bold mb-4">
          Profile <span className="p-2 ml-2 rounded bg-green-600 text-black"> {id} </span>
        </p>
      </div>
    </div>
  );
};

export default UserProfile;
