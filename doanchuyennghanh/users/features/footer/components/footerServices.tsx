"use client";

export default function FooterServices() {
  const services = [
    "Tiệc trong nhà",
    "Tiệc ngoài trời",
    "Trang trí",
    "Âm thanh, ánh sáng",
    "Chụp ảnh, quay phim",
  ];

  return (
    <div>
      <h3 className="font-semibold text-lg mb-4 ">Dịch vụ</h3>
      <ul className="space-y-2 text-gray-300">
        {services.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
