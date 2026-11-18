/**
 * Mục đích xem ngày — quan niệm dân gian.
 * Phần mô tả nói việc người ta thường cân nhắc trên lịch vạn niên.
 * Không có ngày nào bảo đảm việc thành hay việc dữ.
 */

import type { DayPurpose } from "@/types";

export const DAY_PURPOSES_LABEL = "quan niệm dân gian" as const;

export const DAY_PURPOSES_NOTE =
  "Các mục đích xem ngày theo quan niệm dân gian: trang đối chiếu 12 thần, 12 trực, nhị thập bát tú, hơn 100 sao tốt xấu, các ngày đại kỵ và tuổi xung khắc. Kết quả chỉ để tham khảo văn hóa, không thay phong tục địa phương, giấy tờ pháp lý hay quyết định của gia đình.";

export const DAY_PURPOSES: DayPurpose[] = [
  {
    id: "cuoi-hoi",
    name: "Cưới hỏi",
    description:
      "Chọn ngày lễ cưới theo quan niệm dân gian. Lịch vạn sự ưu tiên trực Thành, Khai, Kiến và tránh trực Phá, Nguy, Bế, cùng các ngày tam nương, nguyệt kỵ. Ngày chỉ là một lớp tham khảo bên cạnh thuận tiện của hai họ.",
  },
  {
    id: "an-hoi",
    name: "Ăn hỏi",
    description:
      "Xem ngày lễ ăn hỏi, dạm ngõ theo quan niệm dân gian. Trực Thành, Khai và Kiến được xem là thuận; trực Phá, Nguy và Bế nên tránh. Hai gia đình vẫn nên chốt theo lịch thật của khách và nơi tổ chức.",
  },
  {
    id: "khai-truong",
    name: "Khai trương",
    description:
      "Xem ngày khai trương cơ sở, văn phòng hoặc cơ nghiệp mới. Quan niệm dân gian hay nghiêng về trực Khai, Thành, Định và dè trực Bế, Phá. Ngày đẹp trên lịch không thay giấy phép, an toàn và sự chuẩn bị của việc kinh doanh.",
  },
  {
    id: "dong-tho",
    name: "Động thổ",
    description:
      "Xem ngày động thổ, xúc đất lần đầu khi xây sửa. Lịch vạn sự thuận ở trực Chấp, Trừ, Bình và kỵ trực Kiến, Thu, Khai cùng các trực Phá, Nguy, Bế. Việc thi công vẫn phải theo giấy phép, kết cấu và an toàn công trường.",
  },
  {
    id: "nhap-trach",
    name: "Nhập trạch",
    description:
      "Xem ngày về nhà mới, chuyển đồ và thắp hương nhập trạch theo quan niệm dân gian. Trực Thành, Định, Khai thường được ưu tiên; trực Phá và Nguy thường bị tránh. Nên chọn giờ gia đình di chuyển an toàn, không chỉ theo chi ngày.",
  },
  {
    id: "mua-nha",
    name: "Mua nhà",
    description:
      "Tham khảo ngày đặt cọc hoặc ký mua nhà theo lịch dân gian. Trực Thành và Định được kể là thuận hơn; trực Phá và Bế thường được khuyên dè. Hợp đồng, pháp lý và khả năng tài chính quan trọng hơn một nhãn ngày tốt.",
  },
  {
    id: "mua-xe",
    name: "Mua xe",
    description:
      "Xem ngày nhận xe, bốc biển hoặc ký mua theo quan niệm dân gian. Lịch thường nghiêng về trực Khai, Thành và tránh trực Phá, Nguy. Kiểm tra giấy tờ, kỹ thuật và khả năng chi trả vẫn là phần việc chính.",
  },
  {
    id: "ky-hop-dong",
    name: "Ký hợp đồng",
    description:
      "Tham khảo ngày ký kết theo quan niệm dân gian. Trực Định, Thành và Mãn hợp việc chốt; trực Chấp, Phá, Nguy, Bế nên tránh. Nội dung hợp đồng và tư vấn pháp lý không thể thay bằng lịch.",
  },
  {
    id: "xuat-hanh",
    name: "Xuất hành",
    description:
      "Xem ngày đi xa, xuất hành theo quan niệm dân gian. Trực Kiến, Khai và Thành thuận đường đi; trực Chấp, Thu, Phá, Nguy, Bế nên tránh. An toàn đường, thời tiết và sức khỏe quyết định chuyến đi hơn chi của ngày.",
  },
  {
    id: "khoi-cong",
    name: "Khởi công",
    description:
      "Xem ngày khởi công công trình theo quan niệm dân gian. Lịch vạn sự thuận ở trực Chấp, Trừ, Bình và kỵ trực Kiến, Thu, Khai cùng các trực Phá, Nguy, Bế. Tiến độ thi công phải theo hồ sơ kỹ thuật và điều kiện hiện trường.",
  },
  {
    id: "an-tang",
    name: "An táng",
    description:
      "Tham khảo ngày an táng theo phong tục và quan niệm dân gian. Lịch vạn sự kỵ trực Thu, Khai và các trực Phá, Nguy, Bế. Gia đình nên theo lệ địa phương, quy định nghĩa trang và điều kiện thực tế, không xem điểm số là bắt buộc.",
  },
  {
    id: "khai-truong-cua-hang",
    name: "Khai trương cửa hàng",
    description:
      "Xem ngày mở cửa hàng, đón khách đầu tiên theo quan niệm dân gian. Trực Khai, Thành và Định thường được chọn; trực Bế và Phá thường bị tránh. Ngày trên lịch không thay mặt bằng, hàng hóa và việc phục vụ khách.",
  },
];
