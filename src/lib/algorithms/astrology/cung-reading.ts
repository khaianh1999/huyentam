import { WESTERN_SIGNS } from "@/data/zodiac";
import { createRng, hashSeed } from "@/lib/algorithms/kinh-dich/hexagram";
import type { WesternSign } from "@/types";

const DAY_LINES = [
  "Giữ một việc đã hẹn và nói ngắn hơn hôm qua.",
  "Hợp để trả lời thư tồn, chưa hợp để mở cuộc cãi.",
  "Nên ăn đúng bữa. Câu này là lời khuyên sinh hoạt, không phải dự báo.",
  "Một cuộc gặp ngắn, có giờ kết thúc, được kể là đủ cho hôm nay.",
  "Nếu đang chờ tin, hãy hỏi một lần cho rõ rồi làm việc khác.",
  "Dân gian khuyên chi một khoản đã nằm trong dự tính, chưa thêm khoản mới.",
] as const;

const WEEK_LINES = [
  "Tuần này hợp để kết một việc đang mở và ghi lại phần còn dở.",
  "Nên chọn hai buổi để làm việc khó, các buổi còn lại giữ nhịp.",
  "Chuyện tình cảm trong tuần được khuyên nói bằng một ví dụ cụ thể.",
  "Tiền bạc trong tuần: đối chiếu sao kê, đừng quyết theo một lời rủ.",
  "Có thể nhận một việc mới nếu còn chỗ để ngủ đủ.",
  "Cuối tuần hợp để dọn một góc nhà hơn là để đi cho bằng được.",
] as const;

const MONTH_LINES = [
  "Tháng này được kể là tháng của sự đều. Một thói quen nhỏ bền hơn một đợt bùng.",
  "Công việc trong tháng hợp khi có mốc giữa tháng, không chỉ có hạn cuối.",
  "Tiền trong tháng nên chia làm phần ăn chắc và phần được phép chờ.",
  "Chuyện nhà trong tháng dễ êm nếu lịch được treo chỗ cả nhà nhìn thấy.",
  "Nếu muốn học một kỹ năng, hãy khóa bốn buổi trong tháng này.",
  "Dân gian không hứa tháng này đổi đời. Hứa một bản ghi việc làm được.",
] as const;

function pickLine(seed: string, items: readonly string[]): string {
  const rng = createRng(`${seed}#${hashSeed(seed).toString(16)}`);
  return items[Math.floor(rng() * items.length)] ?? items[0];
}

export function signFromMonthDay(month: number, day: number): WesternSign | null {
  return (
    WESTERN_SIGNS.find((sign) => {
      const afterStart =
        month > sign.startMonth || (month === sign.startMonth && day >= sign.startDay);
      const beforeEnd = month < sign.endMonth || (month === sign.endMonth && day <= sign.endDay);
      if (sign.startMonth <= sign.endMonth) return afterStart && beforeEnd;
      return afterStart || beforeEnd;
    }) ?? null
  );
}

export function periodReading(
  sign: WesternSign,
  period: "ngay" | "tuan" | "thang",
  dateKey: string,
) {
  const pool = period === "ngay" ? DAY_LINES : period === "tuan" ? WEEK_LINES : MONTH_LINES;
  const seed = `hoang-dao|${sign.id}|${period}|${dateKey}`;
  const focusPool = ["việc đã nhận", "một cuộc nói chuyện", "sổ chi tiêu", "giấc ngủ", "góc nhà"] as const;
  return {
    period,
    dateKey,
    focus: pickLine(`${seed}|trong-tam`, focusPool),
    text: `${sign.name}: ${pickLine(seed, pool)}`,
    disclaimer:
      "Đoạn ngắn này là quan niệm dân gian, khóa theo cung và mốc ngày. Không phải lời tiên đoán và không mô tả một cá nhân.",
  };
}
