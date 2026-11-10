/**
 * Công cụ hiện trên trang chủ Huyền Tâm.
 * `icon` là tên lucide dạng kebab-case.
 */

import type { ToolCard } from "@/types";

export const TOOL_CATALOG: ToolCard[] = [
  {
    title: "Xem tử vi",
    description: "Luận tổng quan theo ngày giờ sinh. Phân biệt rõ tử vi phương Đông và cung hoàng đạo.",
    href: "/tu-vi",
    icon: "sparkles",
    category: "Tử vi",
  },
  {
    title: "Xem bói theo tên",
    description: "Phân tích ý nghĩa tên, thần số học và ngũ hành tên đối chiếu năm sinh.",
    href: "/boi-ten",
    icon: "pencil-line",
    category: "Bói toán",
  },
  {
    title: "Gieo quẻ Kinh Dịch",
    description: "Tung 3 đồng xu 6 lần, xác định quẻ chủ, quẻ biến và hào động theo cấu trúc chuẩn.",
    href: "/gieo-que/kinh-dich",
    icon: "hexagon",
    category: "Gieo quẻ",
  },
  {
    title: "Rút quẻ đầu năm",
    description: "Rút quẻ tham khảo đầu năm theo seed có thể kiểm thử. Quan niệm dân gian.",
    href: "/gieo-que/rut-que?loai=dau-nam",
    icon: "scroll-text",
    category: "Gieo quẻ",
  },
  {
    title: "Lắc quẻ",
    description: "Giao diện ống xăm với animation lắc, chọn ngẫu nhiên một quẻ có seed.",
    href: "/gieo-que/lac-que",
    icon: "dices",
    category: "Gieo quẻ",
  },
  {
    title: "Tung đồng xu",
    description: "Mô phỏng tung đồng xu từng hào với animation lật, tạo đủ 6 hào Kinh Dịch.",
    href: "/gieo-que/tung-dong-xu",
    icon: "coins",
    category: "Gieo quẻ",
  },
  {
    title: "Xem ngày tốt xấu",
    description: "Đánh giá ngày theo mục đích và tuổi người thực hiện, kết hợp thuật toán lịch và quy ước dân gian.",
    href: "/xem-ngay-tot",
    icon: "calendar-check",
    category: "Ngày tốt",
  },
  {
    title: "Xem ngày cưới hỏi",
    description: "Lọc ngày phù hợp cho hôn lễ theo lịch âm dương và trực ngày.",
    href: "/xem-ngay-tot?muc-dich=cuoi-hoi",
    icon: "heart",
    category: "Ngày tốt",
  },
  {
    title: "Xem ngày khai trương",
    description: "Gợi ý ngày khai trương cửa hàng, doanh nghiệp theo quy ước lịch.",
    href: "/xem-ngay-tot?muc-dich=khai-truong",
    icon: "store",
    category: "Ngày tốt",
  },
  {
    title: "Xem ngày động thổ",
    description: "Tham khảo ngày động thổ / khởi công theo trực và hoàng đạo dân gian.",
    href: "/xem-ngay-tot?muc-dich=dong-tho",
    icon: "hammer",
    category: "Ngày tốt",
  },
  {
    title: "Xem ngày xuất hành",
    description: "Xem giờ và hướng xuất hành theo chi ngày.",
    href: "/xem-ngay-tot?muc-dich=xuat-hanh",
    icon: "plane",
    category: "Ngày tốt",
  },
  {
    title: "Xem giờ hoàng đạo",
    description: "Tra giờ hoàng đạo / hắc đạo của một ngày theo quy ước dân gian.",
    href: "/lich-am-duong",
    icon: "clock",
    category: "Lịch",
  },
  {
    title: "Xem tuổi hợp nhau",
    description: "Đối chiếu tam hợp, lục hợp, tứ hành xung giữa hai tuổi.",
    href: "/boi-toan/tuoi-hop",
    icon: "users",
    category: "Bói toán",
  },
  {
    title: "Xem tuổi kết hôn",
    description: "Tham khảo tuổi vợ chồng theo quan niệm dân gian.",
    href: "/boi-toan/tuoi-vo-chong",
    icon: "heart-handshake",
    category: "Bói toán",
  },
  {
    title: "Xem tuổi làm nhà",
    description: "Đối chiếu tuổi gia chủ với năm xây / sửa nhà theo khung dân gian.",
    href: "/phong-thuy/tuoi-lam-nha",
    icon: "home",
    category: "Phong thủy",
  },
  {
    title: "Phong thủy nhà ở",
    description: "Gợi ý màu, hướng, ngũ hành và bố cục theo bản mệnh.",
    href: "/phong-thuy/nha-o",
    icon: "house",
    category: "Phong thủy",
  },
  {
    title: "Tra cứu 12 con giáp",
    description: "Tính cách, tam hợp, xung khắc và vận theo từng con giáp.",
    href: "/12-con-giap",
    icon: "rabbit",
    category: "Tử vi",
  },
  {
    title: "Tra cứu 12 cung hoàng đạo",
    description: "Hệ phương Tây: tính cách, tình yêu, công việc và tương hợp.",
    href: "/cung-hoang-dao",
    icon: "star",
    category: "Hoàng đạo",
  },
  {
    title: "Xem ngũ hành bản mệnh",
    description: "Tra ngũ hành theo năm sinh, tương sinh tương khắc, màu và hướng.",
    href: "/phong-thuy/ngu-hanh",
    icon: "flame",
    category: "Phong thủy",
  },
  {
    title: "Tử vi hôm nay",
    description: "Gợi ý ngắn theo khóa ngày sinh và ngày hiện tại.",
    href: "/tu-vi/hang-ngay",
    icon: "sun",
    category: "Tử vi",
  },
  {
    title: "Ngày tốt trong tháng",
    description: "Lọc các ngày đạt điểm cao theo mục đích trong tháng.",
    href: "/xem-ngay-tot/theo-thang",
    icon: "calendar-range",
    category: "Ngày tốt",
  },
  {
    title: "Quẻ may mắn hôm nay",
    description: "Rút một quẻ Kinh Dịch theo seed ngày hiện tại.",
    href: "/gieo-que/que-hom-nay",
    icon: "clover",
    category: "Gieo quẻ",
  },
  {
    title: "Lịch âm dương",
    description: "Xem lịch tháng, chuyển đổi âm dương, can chi, tiết khí, giờ hoàng đạo.",
    href: "/lich-am-duong",
    icon: "calendar-days",
    category: "Lịch",
  },
  {
    title: "Xin xăm Quan Âm",
    description: "Rút xăm tham khảo văn hóa dân gian (bộ biên soạn).",
    href: "/boi-toan/xin-xam-quan-am",
    icon: "flower-2",
    category: "Bói toán",
  },
];

export const POPULAR_TOOLS = TOOL_CATALOG.slice(0, 8);
