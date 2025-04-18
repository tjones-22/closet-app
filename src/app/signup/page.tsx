const Home = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-blue-50">
  <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md border border-blue-200">
    <h2 className="text-3xl font-bold text-blue-950 mb-6 text-center">Sign Up</h2>
    
    <form className="flex flex-col space-y-4">
      <input
        type="text"
        name="username"
        placeholder="Username"
        required
        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      
      <input
        type="password"
        name="password"
        placeholder="Password"
        required
        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      
      <button
        type="submit"
        className="bg-yellow-400 text-blue-950 font-semibold rounded-md py-2 mt-2 hover:bg-yellow-300 transition"
      >
        Submit
      </button>
    </form>

    <div className="text-center mt-4">
      <p className="text-sm">
        Already have an account?
        <a href="/" className="text-blue-600 hover:underline">
          Log in
        </a>
      </p>
    </div>
  </div>
</div>
      );
}
 
export default Home;