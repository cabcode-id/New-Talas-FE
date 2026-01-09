import SubscriptionCard from "../components/Subscription/SubscriptionCard";
import { Check, X } from "lucide-react";

function SubscriptionPage() {
  const headers = ["Premium", "Premium", "Premium"];

  const features = [
    { name: "Something Something", availability: [true, true, true] },
    { name: "Something Something", availability: [true, true, true] },
    { name: "Something Something", availability: [false, false, false] },
    { name: "Something Something", availability: [false, false, false] },
  ];

  return (
    <div className="flex flex-col items-center justify-center text-black mb-10 sm:mb-16 2md:mb-20 mt-5 sm:mt-8 px-4 sm:px-6 md:px-8 mx-auto max-w-7xl">
      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 sm:mb-8 md:mb-10 text-center">
        Choose Your Subscription Plan
      </h1>

      {/* Subscription Cards - Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 2md:grid-cols-3 gap-8 sm:gap-10 md:gap-12 2md:gap-16 lg:gap-20 w-full max-w-6xl">
        {/* Card 1 */}
        <div className="flex justify-center">
          <SubscriptionCard
            data={{
              priceMonth: 20000,
              priceYear: 250000,
              description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            }}
          />
        </div>

        {/* Card 2 */}
        <div className="flex justify-center">
          <SubscriptionCard
            data={{
              priceMonth: 30000,
              priceYear: 350000,
              description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            }}
          />
        </div>

        {/* Card 3 */}
        <div className="flex justify-center sm:col-span-2 2md:col-span-1">
          <SubscriptionCard
            data={{
              priceMonth: 40000,
              priceYear: 450000,
              description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            }}
          />
        </div>
      </div>

      <div className="w-full overflow-x-auto mt-10 sm:mt-12 md:mt-16 max-w-6xl">
        <table className="min-w-full border-collapse border border-gray-300 rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 sm:px-6 py-3 text-left font-semibold border-b border-gray-300">
                Features
              </th>
              {headers.map((title, index) => (
                <th
                  key={index}
                  className="px-4 sm:px-6 py-3 text-center font-semibold border-b border-gray-300"
                >
                  {title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {features.map((feature, rowIndex) => (
              <tr
                key={rowIndex}
                className={rowIndex % 2 === 1 ? "bg-gray-50" : "bg-white"}
              >
                <td className="px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-300 text-sm sm:text-base">
                  {feature.name}
                </td>
                {feature.availability.map((available, colIndex) => (
                  <td
                    key={colIndex}
                    className="px-4 sm:px-6 py-3 sm:py-4 text-center border-b border-gray-300"
                  >
                    {available ? (
                      <Check className="mx-auto w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
                    ) : (
                      <X className="mx-auto w-4 h-4 sm:w-5 sm:h-5 text-red-400" />
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SubscriptionPage;
