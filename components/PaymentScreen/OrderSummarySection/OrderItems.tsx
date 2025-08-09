import Image from "next/image";

interface OrderItem {
  price: number;
  fileNumber: number;
}

export default function OrderItems() {
  const orderItems: OrderItem[] = [
    { price: 122.5, fileNumber: 1 },
    { price: 320, fileNumber: 2 },
    { price: 256, fileNumber: 3 },
  ];

  return (
    <div className="space-y-4">
      {orderItems.map((item, i) => (
        <div key={i} className="flex gap-4 items-start bg-[#F4F7FA] p-2 rounded-xl">
          {/* File Preview Image */}
          <div className="w-16 h-20 bg-gray-100 rounded border flex-shrink-0">
            <Image
              src={`/file-preview-${item.fileNumber}.png`} // You'll need to add these images
              alt={`File ${item.fileNumber} preview`}
              width={64}
              height={80}
              className="w-full h-full object-cover rounded"
            />
          </div>

          {/* File Details */}
          <div className="flex-1 min-w-0">
            <h5 className="font-medium text-sm text-black mb-1">
              File {item.fileNumber} - Jay Vasani UX nhj& Pro
            </h5>
            <p className="text-xs text-gray-600 leading-relaxed">
              1 page, Black & White, Portrait
              <br />
              15 Copies
            </p>
          </div>

          {/* Price */}
          <div className="text-right flex-shrink-0">
            <p className="text-green-600 font-semibold text-sm">
              ₹{item.price}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
