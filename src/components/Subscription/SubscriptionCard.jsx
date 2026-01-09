function SubscriptionCard({ data }) {
  if (!data || typeof data !== "object") return null;

  return (
    <div
      className="flex flex-col items-center justify-center border border-gray-300 rounded-md sm:rounded-lg 
                        h-auto w-full sm:w-72 md:w-80 2md:w-96 lg:w-80 xl:w-96
                        p-4 sm:p-5 md:p-6 2md:p-8 
                        shadow-sm hover:shadow-md transition-all duration-300
                        bg-white"
    >
      {/* Card Header */}
      <div className="text-black flex flex-col items-center justify-center w-full">
        <h2
          className="bg-[#FFD7CF] text-lg sm:text-xl md:text-2xl rounded-lg 
                               w-28 sm:w-32 md:w-36 text-center py-1 sm:py-2 
                               font-normal"
        >
          Premium
        </h2>

        <p
          className="text-center sm:text-justify mt-2 sm:mt-3 mb-4 sm:mb-5 md:mb-6 2md:mb-7
                              text-sm sm:text-base
                              text-gray-700"
        >
          Suitable for entry user who wants to get more news.
        </p>
      </div>

      {/* Pricing Section */}
      <div className="w-full flex flex-col items-center justify-center">
        <p className="text-black font-semibold text-xl sm:text-2xl">
          Rp {data.priceMonth}
          <span className="text-sm sm:text-base text-[#8C8C8C] font-normal">
            /Month*
          </span>
        </p>

        <p className="text-sm sm:text-base text-[#8C8C8C]">
          Billed as Rp {data.priceYear}/Year*
        </p>

        <p className="my-2 sm:my-3 text-[#EB6969] text-lg sm:text-xl font-semibold">
          + 2 Month's Free
        </p>

        <hr className="mt-2 sm:mt-3 mb-4 sm:mb-5 md:mb-6 w-full border-gray-300" />

        <p className="text-center sm:text-justify text-sm sm:text-base text-gray-700">
          {data.description}
        </p>
      </div>

      <a
        href="#"
        className="text-sm sm:text-base border rounded-lg text-white bg-[#FF7C7C] hover:bg-[#FF5A5A]
                          w-full py-2 sm:py-3 text-center 
                          mt-8 sm:mt-10 md:mt-12 2md:mt-16 
                          transition-colors duration-300 
                          hover:shadow-md focus:ring-2 focus:ring-offset-2 focus:ring-[#FF7C7C]"
      >
        Subscribe
      </a>
    </div>
  );
}

export default SubscriptionCard;
