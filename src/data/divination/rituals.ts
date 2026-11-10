export const RUT_QUE_TYPES = [
  {
    id: "dau-nam",
    title: "Rút quẻ đầu năm",
    eyebrow: "Xuân",
    lede: "Một quẻ để mở năm, viết điều muốn giữ chứ không viết điều muốn lấy cho bằng được.",
    prompt: "Điều muốn giữ trong năm",
    placeholder: "Ví dụ: giữ bữa cơm đều trong nhà",
    closing: "Đọc quẻ như một lời nhắc đầu năm. Việc năm vẫn do lịch và sức mình.",
    focus: "overview",
  },
  {
    id: "tinh-duyen",
    title: "Rút quẻ tình duyên",
    eyebrow: "Duyên",
    lede: "Quẻ này nghiêng về cách ở với nhau. Viết tên hoặc viết câu hỏi, đừng viết lời kết tội.",
    prompt: "Tên hoặc câu hỏi về duyên",
    placeholder: "Ví dụ: tôi và Lan có nên ở riêng không",
    closing: "Phần tình cảm của quẻ được đưa lên trước. Đó là cách đọc của lối rút này.",
    focus: "love",
  },
  {
    id: "cong-danh",
    title: "Rút quẻ công danh",
    eyebrow: "Danh",
    lede: "Dành cho ngả đường đang phân vân. Quẻ nói về nhịp làm việc, không phong chức cho ai.",
    prompt: "Ngả đường đang phân vân",
    placeholder: "Ví dụ: ở lại xưởng hay nhận việc mới ở huyện",
    closing: "Hãy đọc mục công danh trước, rồi mới xem các mục khác như lời kèm.",
    focus: "career",
  },
  {
    id: "tai-loc",
    title: "Rút quẻ tài lộc",
    eyebrow: "Lộc",
    lede: "Ghi việc tiền bạc đang cân nhắc. Đừng ghi số tài khoản, đừng ghi số tiền muốn trúng.",
    prompt: "Việc tiền đang cân nhắc",
    placeholder: "Ví dụ: có nên góp vốn sạp vải với anh họ",
    closing: "Mục tài lộc đứng đầu. Quẻ không hứa lãi.",
    focus: "wealth",
  },
  {
    id: "gia-dao",
    title: "Rút quẻ gia đạo",
    eyebrow: "Nhà",
    lede: "Một quẻ cho việc trong nhà: cơm, giấc, lời qua lại. Viết việc, không viết tên để trách.",
    prompt: "Việc nhà đang cần lời khuyên",
    placeholder: "Ví dụ: bố mẹ muốn sửa bếp trong tháng này",
    closing: "Đọc mục gia đạo trước. Việc lớn của nhà vẫn cần cả nhà cùng nói.",
    focus: "family",
  },
  {
    id: "binh-an",
    title: "Rút quẻ bình an",
    eyebrow: "An",
    lede: "Quẻ cho sự yên. Nếu đang bệnh, hãy đi khám. Quẻ chỉ kèm một lời giữ nhịp.",
    prompt: "Điều mong được yên",
    placeholder: "Ví dụ: mong nhà ngủ được trong tuần này",
    closing: "Mục sức khỏe được xếp lên trước, và chỉ là lời tham khảo sinh hoạt.",
    focus: "health",
  },
] as const;

export type RutQueId = (typeof RUT_QUE_TYPES)[number]["id"];

export type RutFocus = (typeof RUT_QUE_TYPES)[number]["focus"];

export function getRitual(id: string) {
  return RUT_QUE_TYPES.find((item) => item.id === id) ?? null;
}
