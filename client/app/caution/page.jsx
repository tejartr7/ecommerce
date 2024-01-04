
const Page = () => {
  return (
    <div className="h-screen flex items-center justify-center bg-red-500">
      <div className="text-center bg-white p-8" style={{borderRadius:'10px'}}>
        <h1 className="text-4xl font-bold mb-4">Warning</h1>
        <p className="text-lg mb-4 font-bold">You are not an admin! You are not allowed to access this website.</p>
        <a href='/api/auth/logout' className="text-2xl text-blue-500 hover:underline">
          Logout
        </a>
      </div>
    </div>
  );
}

export default Page;
