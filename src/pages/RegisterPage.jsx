import { FcGoogle } from "react-icons/fc";

function RegisterPage() {
  return (
    <div className="flex flex-col items-center justify-center text-black px-4 sm:px-6 md:px-8 py-6 sm:py-8 md:py-10 mx-auto max-w-7xl">
      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mt-3 sm:mt-4 md:mt-5 text-center">
        Create your free account now
      </h1>

      <div className="w-full sm:w-4/5 md:w-3/4 2md:w-2/3 lg:w-1/2 xl:w-2/5 max-w-md mt-6 sm:mt-8">
        {/* Email Field */}
        <div className="flex flex-col justify-start mb-4 sm:mb-5">
          <label
            htmlFor="Email"
            className="text-base sm:text-lg md:text-xl mb-1 sm:mb-2"
          >
            Email
          </label>
          <input
            type="text"
            className="outline-1 outline-gray-400 rounded-lg px-3 py-2 sm:py-2.5 focus:outline-[#FF8585] focus:ring-2 focus:ring-[#FF8585] transition-all"
            id="Email"
            placeholder="Enter your email"
          />
        </div>

        {/* Password Field */}
        <div className="flex flex-col justify-start mb-2 sm:mb-3">
          <label
            htmlFor="Password"
            className="text-base sm:text-lg md:text-xl mb-1 sm:mb-2"
          >
            Password
          </label>
          <input
            type="password"
            className="outline-1 outline-gray-400 rounded-lg px-3 py-2 sm:py-2.5 focus:outline-[#FF8585] focus:ring-2 focus:ring-[#FF8585] transition-all"
            id="Password"
            placeholder="Enter your password"
          />
          <p className="text-red-500 text-xs sm:text-sm mt-1">
            *Password must be at least 8 characters long
          </p>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between mt-3 sm:mt-4 flex-wrap gap-2">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                name="remember"
                value="remember"
                className="mr-2 h-4 w-4 accent-[#FF8585]"
              />
              <label htmlFor="remember" className="text-sm sm:text-base">
                Remember me
              </label>
            </div>
            <div>
              <a
                href="#"
                className="text-sm sm:text-base text-gray-500 hover:text-gray-700 hover:underline"
              >
                Forgot your password?
              </a>
            </div>
          </div>
        </div>

        {/* Sign Up Button */}
        <button className="bg-[#FF8585] text-white w-full py-2.5 sm:py-3 rounded-lg mt-5 sm:mt-6 hover:bg-[#FF6B6B] active:bg-[#5a4141] transition-colors font-medium text-sm sm:text-base">
          Sign up
        </button>

        {/* Additional Options */}
        <div className="flex flex-col w-full text-center mt-4 sm:mt-5">
          <div className="flex flex-col">
            <span className="text-gray-500 text-xs sm:text-sm">
              Already have an account?{" "}
              <a
                href="/login"
                className="text-blue-500 hover:text-blue-700 hover:underline"
              >
                Log in
              </a>
            </span>

            {/* Log in Button */}
            <a
              href="/login"
              className="bg-white text-[#FF8585] border border-gray-300 py-2.5 sm:py-3 rounded-lg mt-4 sm:mt-5 hover:bg-gray-100 active:bg-[#5a4141] active:text-white transition-colors font-medium text-sm sm:text-base"
            >
              Log in
            </a>

            {/* Divider */}
            <div className="flex items-center text-center mt-4 sm:mt-6">
              <hr className="flex-1 border-none h-[1px] bg-[#ccc]" />
              <span className="mx-3 text-gray-500 text-sm">Or</span>
              <hr className="flex-1 border-none h-[1px] bg-[#ccc]" />
            </div>

            {/* Google Sign Up */}
            <a
              href="#"
              className="flex items-center justify-center gap-2 sm:gap-3 border border-gray-300 py-2.5 sm:py-3 rounded-lg mt-4 sm:mt-5 hover:bg-gray-100 active:bg-[#5a4141] active:text-white transition-colors font-medium text-sm sm:text-base"
            >
              <FcGoogle className="w-4 h-4 sm:w-5 sm:h-5" />
              Continue with Google
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
