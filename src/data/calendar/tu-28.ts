/**
 * Nhị thập bát tú và 12 trực — cách xếp theo lịch vạn sự truyền thống.
 * Đây là quan niệm dân gian, ghi lại để đối chiếu.
 */

import type { ActivityTag, NguHanh } from "@/types";

export type TuInfo = {
  name: string;
  /** Tên đầy đủ: tú, thất chính, con vật. */
  fullName: string;
  element: NguHanh | "Nhật" | "Nguyệt";
  animal: string;
  type: "cat" | "binh" | "hung";
  good: ActivityTag[];
  bad: ActivityTag[];
};

/** Bắt đầu từ sao Giác, luân phiên mỗi ngày một sao. */
export const TU_28: TuInfo[] = [
  { name: "Giác", fullName: "Giác Mộc Giao", element: "Moc", animal: "Giao long", type: "binh", good: ["cuoi", "xay"], bad: ["an-tang"] },
  { name: "Cang", fullName: "Cang Kim Long", element: "Kim", animal: "Rồng", type: "hung", good: [], bad: ["an-tang", "cuoi", "xay"] },
  { name: "Đê", fullName: "Đê Thổ Lạc", element: "Tho", animal: "Lạc đà", type: "hung", good: [], bad: ["xay", "an-tang", "cuoi", "xuat-hanh"] },
  { name: "Phòng", fullName: "Phòng Nhật Thố", element: "Nhật", animal: "Thỏ", type: "cat", good: ["xay", "an-tang", "cuoi", "xuat-hanh"], bad: [] },
  { name: "Tâm", fullName: "Tâm Nguyệt Hồ", element: "Nguyệt", animal: "Cáo", type: "hung", good: [], bad: ["xay", "cuoi", "an-tang"] },
  { name: "Vĩ", fullName: "Vĩ Hỏa Hổ", element: "Hoa", animal: "Hổ", type: "cat", good: ["an-tang", "cuoi", "xay", "giao-dich"], bad: [] },
  { name: "Cơ", fullName: "Cơ Thủy Báo", element: "Thuy", animal: "Báo", type: "cat", good: ["an-tang", "giao-dich", "xuat-hanh"], bad: [] },
  { name: "Đẩu", fullName: "Đẩu Mộc Giải", element: "Moc", animal: "Cua", type: "cat", good: ["giao-dich", "an-tang"], bad: [] },
  { name: "Ngưu", fullName: "Ngưu Kim Ngưu", element: "Kim", animal: "Trâu", type: "hung", good: [], bad: ["xay", "cuoi", "giao-dich", "xuat-hanh"] },
  { name: "Nữ", fullName: "Nữ Thổ Bức", element: "Tho", animal: "Dơi", type: "hung", good: [], bad: ["an-tang", "xay", "giao-dich"] },
  { name: "Hư", fullName: "Hư Nhật Thử", element: "Nhật", animal: "Chuột", type: "hung", good: [], bad: ["xay", "cuoi", "giao-dich"] },
  { name: "Nguy", fullName: "Nguy Nguyệt Yến", element: "Nguyệt", animal: "Chim én", type: "binh", good: ["an-tang"], bad: ["xay"] },
  { name: "Thất", fullName: "Thất Hỏa Trư", element: "Hoa", animal: "Lợn", type: "cat", good: ["xay", "cuoi", "an-tang"], bad: [] },
  { name: "Bích", fullName: "Bích Thủy Du", element: "Thuy", animal: "Rái cá", type: "cat", good: ["xay", "cuoi", "an-tang", "giao-dich"], bad: [] },
  { name: "Khuê", fullName: "Khuê Mộc Lang", element: "Moc", animal: "Sói", type: "binh", good: ["xay", "xuat-hanh"], bad: ["an-tang", "giao-dich"] },
  { name: "Lâu", fullName: "Lâu Kim Cẩu", element: "Kim", animal: "Chó", type: "cat", good: ["xay", "cuoi"], bad: [] },
  { name: "Vị", fullName: "Vị Thổ Trĩ", element: "Tho", animal: "Chim trĩ", type: "cat", good: ["xay", "cuoi", "an-tang"], bad: [] },
  { name: "Mão", fullName: "Mão Nhật Kê", element: "Nhật", animal: "Gà", type: "hung", good: ["xay"], bad: ["an-tang", "cuoi", "giao-dich", "xuat-hanh"] },
  { name: "Tất", fullName: "Tất Nguyệt Ô", element: "Nguyệt", animal: "Quạ", type: "cat", good: ["an-tang", "cuoi"], bad: [] },
  { name: "Chủy", fullName: "Chủy Hỏa Hầu", element: "Hoa", animal: "Khỉ", type: "hung", good: [], bad: ["an-tang", "xay"] },
  { name: "Sâm", fullName: "Sâm Thủy Viên", element: "Thuy", animal: "Vượn", type: "binh", good: ["xay"], bad: ["cuoi", "an-tang"] },
  { name: "Tỉnh", fullName: "Tỉnh Mộc Hãn", element: "Moc", animal: "Chó sói", type: "binh", good: ["xay"], bad: ["an-tang"] },
  { name: "Quỷ", fullName: "Quỷ Kim Dương", element: "Kim", animal: "Dê", type: "hung", good: ["an-tang"], bad: ["xay", "cuoi"] },
  { name: "Liễu", fullName: "Liễu Thổ Chương", element: "Tho", animal: "Hoẵng", type: "hung", good: [], bad: ["an-tang", "xay"] },
  { name: "Tinh", fullName: "Tinh Nhật Mã", element: "Nhật", animal: "Ngựa", type: "binh", good: ["xay"], bad: ["an-tang", "cuoi"] },
  { name: "Trương", fullName: "Trương Nguyệt Lộc", element: "Nguyệt", animal: "Hươu", type: "cat", good: ["xay", "cuoi", "an-tang"], bad: [] },
  { name: "Dực", fullName: "Dực Hỏa Xà", element: "Hoa", animal: "Rắn", type: "hung", good: [], bad: ["an-tang", "cuoi", "xay"] },
  { name: "Chẩn", fullName: "Chẩn Thủy Dẫn", element: "Thuy", animal: "Giun", type: "cat", good: ["xay", "an-tang", "cuoi", "xuat-hanh"], bad: [] },
];

export const ACTIVITY_LABEL: Record<ActivityTag, string> = {
  cuoi: "cưới hỏi",
  xay: "xây dựng, động thổ",
  "an-tang": "an táng",
  "nhap-trach": "nhập trạch",
  "xuat-hanh": "xuất hành",
  "giao-dich": "khai trương, giao dịch",
};

export type TrucEffect = {
  summary: string;
  /** "all": hợp hoặc kỵ với mọi việc lớn. */
  good: ActivityTag[] | "all";
  bad: ActivityTag[] | "all";
};

export const TRUC_EFFECT: Record<string, TrucEffect> = {
  Kiến: { summary: "Thuận cho xuất hành và cưới hỏi, nên tránh động thổ.", good: ["xuat-hanh", "cuoi"], bad: ["xay"] },
  Trừ: { summary: "Ngày trừ bỏ cái cũ, nhìn chung thuận mọi việc.", good: "all", bad: [] },
  Mãn: { summary: "Hợp cầu tài, cầu phúc và lễ bái.", good: ["giao-dich"], bad: [] },
  Bình: { summary: "Ngày bình ổn, nhìn chung thuận mọi việc.", good: "all", bad: [] },
  Định: { summary: "Hợp cầu tài, ký kết, tiệc tùng và ổn định chỗ ở; tránh kiện tụng.", good: ["giao-dich", "nhap-trach"], bad: [] },
  Chấp: { summary: "Hợp khởi công xây dựng; tránh đi xa và khai trương.", good: ["xay"], bad: ["xuat-hanh", "giao-dich"] },
  Phá: { summary: "Chỉ hợp phá dỡ, chữa bệnh; không chọn cho việc lớn.", good: [], bad: "all" },
  Nguy: { summary: "Ngày nguy hiểm, không chọn cho việc lớn.", good: [], bad: "all" },
  Thành: { summary: "Hợp xuất hành, khai trương, cưới hỏi, nhập trạch; tránh kiện tụng.", good: ["xuat-hanh", "giao-dich", "cuoi", "nhap-trach"], bad: [] },
  Thu: { summary: "Hợp thu hoạch, thu nợ; kỵ khởi công, đi xa và an táng.", good: [], bad: ["xay", "xuat-hanh", "an-tang"] },
  Khai: { summary: "Mở mang thuận lợi, trừ động thổ và an táng.", good: ["cuoi", "giao-dich", "nhap-trach", "xuat-hanh"], bad: ["xay", "an-tang"] },
  Bế: { summary: "Ngày đóng kín, chỉ hợp đắp đê, lấp hố; không chọn cho việc lớn.", good: [], bad: "all" },
};
