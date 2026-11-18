/**
 * Ý nghĩa của mỗi cung khi đại hạn hoặc lưu niên đi qua, theo từng giai đoạn tuổi.
 * Cùng một cung Quan Lộc nhưng tuổi 10 là học hành, tuổi 35 là sự nghiệp, tuổi 85 là danh tiếng để lại.
 */

import type { PalaceName } from "@/lib/algorithms/astrology/la-so";
import type { Tone } from "@/lib/algorithms/astrology/la-so-reading";

export type LifeStage = "nho" | "tre" | "lap" | "trung" | "lao" | "tho";

export function lifeStage(age: number): LifeStage {
  if (age < 16) return "nho";
  if (age < 30) return "tre";
  if (age < 50) return "lap";
  if (age < 65) return "trung";
  if (age < 80) return "lao";
  return "tho";
}

export const STAGE_LABEL: Record<LifeStage, string> = {
  nho: "Tuổi nhỏ",
  tre: "Tuổi trẻ",
  lap: "Lập nghiệp",
  trung: "Trung niên",
  lao: "Tuổi già",
  tho: "Tuổi thọ",
};

export const PALACE_BY_STAGE: Record<PalaceName, Record<LifeStage, string>> = {
  Mệnh: {
    nho: "Những năm hình thành tính cách, bạn được nuôi dưỡng tốt và sớm bộc lộ năng khiếu riêng.",
    tre: "Giai đoạn tìm ra chính mình, chọn con đường học hành và nghề nghiệp phù hợp.",
    lap: "Bạn khẳng định bản lĩnh, các quyết định lớn đều do chính mình cầm lái.",
    trung: "Bản lĩnh đã chín, bạn được nể trọng và trở thành chỗ dựa cho người khác.",
    lao: "Những năm sống đúng với mình, thong thả và giữ được phong độ.",
    tho: "Tuổi cao mà tinh thần minh mẫn, sống an nhiên giữa con cháu.",
  },
  "Phụ Mẫu": {
    nho: "Được cha mẹ chăm lo chu đáo, nền nếp gia đình ảnh hưởng sâu đậm đến bạn.",
    tre: "Cha mẹ và thầy cô là người định hướng; nghe lời khuyên của người đi trước rất có lợi.",
    lap: "Có người trên nâng đỡ trong công việc, đồng thời là lúc bạn báo hiếu cha mẹ.",
    trung: "Chăm lo cha mẹ già và làm việc thuận lợi với cấp trên, đối tác lớn.",
    lao: "Được người trẻ kính trọng; bạn giữ gìn nếp nhà để truyền lại cho con cháu.",
    tho: "Được con cháu phụng dưỡng chu đáo, sống yên vui trong vòng tay gia đình.",
  },
  "Phúc Đức": {
    nho: "Hưởng phúc ông bà, tuổi thơ êm ấm và được nhiều người thương.",
    tre: "Tâm hồn rộng mở, dễ gặp may và gặp người tốt giúp đỡ.",
    lap: "Đời sống tinh thần cân bằng giữa lúc bận rộn; phúc đức giúp bạn qua những khúc khó.",
    trung: "Hợp làm việc thiện, chăm lo họ hàng và mồ mả tổ tiên.",
    lao: "Những năm an nhàn, tinh thần thanh thản, hưởng phúc đã vun cả đời.",
    tho: "Phúc thọ song toàn, con cháu đông đủ, sống vui và nhẹ lòng.",
  },
  "Điền Trạch": {
    nho: "Gia đình có thể đổi chỗ ở; ngôi nhà là nơi bạn được che chở và lớn lên.",
    tre: "Bắt đầu tích lũy, có thể dọn ra ở riêng hoặc có tài sản đầu tiên.",
    lap: "Giai đoạn an cư lạc nghiệp, thuận mua nhà hoặc tăng thêm tài sản.",
    trung: "Tài sản ổn định, hợp sửa sang nhà cửa hoặc chuẩn bị của để dành cho con.",
    lao: "Sống trong ngôi nhà ấm cúng, sắp xếp tài sản cho thế hệ sau.",
    tho: "Nhà cửa yên ổn, con cháu sum vầy quanh mình.",
  },
  "Quan Lộc": {
    nho: "Học hành là sự nghiệp của tuổi này; bạn học tốt và được thầy cô chú ý.",
    tre: "Học nghề, lập nghiệp; những bước đầu tiên trong công việc đem lại kinh nghiệm quý.",
    lap: "Giai đoạn dồn sức cho sự nghiệp, dễ có bước tiến rõ rệt.",
    trung: "Sự nghiệp ở độ chín, giữ vị trí vững và truyền kinh nghiệm cho người trẻ.",
    lao: "Hợp làm cố vấn hoặc theo đuổi việc mình yêu thích, không vì áp lực.",
    tho: "Danh tiếng và việc tốt cả đời được ghi nhận, con cháu nối nghiệp.",
  },
  "Nô Bộc": {
    nho: "Có nhiều bạn chơi, học được cách hòa đồng và chia sẻ.",
    tre: "Mở rộng quan hệ, gặp những người bạn tâm giao đồng hành lâu dài.",
    lap: "Xây dựng đội ngũ và mạng lưới quan hệ cho công việc.",
    trung: "Có cộng sự tin cậy, cấp dưới trung thành.",
    lao: "Bạn bè tuổi già quây quần, hay gặp gỡ trò chuyện.",
    tho: "Được những người quanh mình chăm sóc và kính trọng.",
  },
  "Thiên Di": {
    nho: "Có thể theo gia đình chuyển nơi ở, sớm được mở mang tầm mắt.",
    tre: "Hợp đi học xa, đi làm xa; ra ngoài gặp nhiều cơ hội.",
    lap: "Hay di chuyển, công tác xa, có cơ hội làm ăn ở nơi khác.",
    trung: "Đi xa để mở rộng việc làm ăn, hoặc du lịch thăm thú cho thỏa.",
    lao: "Hợp những chuyến đi nhẹ nhàng, thăm con cháu ở xa.",
    tho: "Nên ở gần nhà; những chuyến đi ngắn cùng con cháu là niềm vui.",
  },
  "Tật Ách": {
    nho: "Cần cha mẹ chăm sóc sức khỏe kỹ để tạo nền thể chất tốt.",
    tre: "Rèn luyện thân thể, giữ thói quen tốt từ sớm.",
    lap: "Cân bằng công việc và sức khỏe, nên khám định kỳ.",
    trung: "Chú trọng sức khỏe, điều chỉnh nhịp sống và tập luyện vừa sức.",
    lao: "Sức khỏe là ưu tiên số một; ăn uống điều độ, vận động nhẹ nhàng.",
    tho: "Giữ sức, sống chậm, có người thân chăm sóc chu đáo.",
  },
  "Tài Bạch": {
    nho: "Gia đình lo đầy đủ; bạn sớm được dạy giá trị của đồng tiền.",
    tre: "Bắt đầu tự kiếm tiền và học cách quản lý chi tiêu.",
    lap: "Kiếm tiền và làm chủ tài chính, tích lũy được đáng kể.",
    trung: "Tài chính vững; nên đầu tư an toàn và lo cho tương lai.",
    lao: "Có của để dành, chi tiêu thong thả cho bản thân và con cháu.",
    tho: "Tài lộc đủ đầy, có thể chia cho con cháu và làm việc thiện.",
  },
  "Tử Tức": {
    nho: "Gắn bó với các em nhỏ trong nhà, vui chơi bên nhau.",
    tre: "Có thể lập gia đình, đón con đầu lòng hoặc chăm chút một dự án tâm huyết.",
    lap: "Lo cho con cái học hành; gia đình là động lực lớn nhất.",
    trung: "Con cái trưởng thành, bạn bắt đầu thấy thành quả của sự nuôi dạy.",
    lao: "Vui cùng con cháu, có thể có cháu chắt.",
    tho: "Con cháu đông đúc, hiếu thảo, là niềm vui lớn nhất.",
  },
  "Phu Thê": {
    nho: "Học được tình thương từ cha mẹ, làm nền cho tình cảm sau này.",
    tre: "Thời gian của tình yêu và hôn nhân, dễ gặp người hợp ý.",
    lap: "Vun đắp hôn nhân, vợ chồng cùng xây dựng gia đình.",
    trung: "Vợ chồng gắn bó, cùng nhau lo cho con cái và tuổi già.",
    lao: "Bạn đời là người đồng hành, cùng nhau tận hưởng tuổi già.",
    tho: "Tình nghĩa vợ chồng sâu nặng, nương tựa nhau những năm cuối đời.",
  },
  "Huynh Đệ": {
    nho: "Tuổi thơ gắn bó với anh chị em, học cách nhường nhịn.",
    tre: "Anh chị em là bạn đồng hành, giúp nhau những bước đầu đời.",
    lap: "Anh em hỗ trợ nhau trong công việc và cuộc sống.",
    trung: "Quan hệ anh chị em thêm khăng khít, cùng lo việc họ hàng.",
    lao: "Anh chị em thường xuyên thăm hỏi, nương tựa nhau về tinh thần.",
    tho: "Tình anh em là chỗ dựa tinh thần quý giá.",
  },
};

/** Câu khép lại theo độ sáng của cung và giai đoạn tuổi. */
export const STAGE_CLOSING: Record<"nhoTre" | "lapTrung" | "laoTho", Record<Tone, string>> = {
  nhoTre: {
    sang: "Một giai đoạn rất may mắn, nền móng tốt cho cả đời.",
    kha: "Giai đoạn thuận, chịu học hỏi là có kết quả.",
    vun: "Giai đoạn cần rèn luyện, những gì học được bây giờ sẽ có ích về sau.",
  },
  lapTrung: {
    sang: "Đây là một trong những giai đoạn đẹp nhất đời bạn.",
    kha: "Giai đoạn thuận, chỉ cần đi đều là có kết quả.",
    vun: "Giai đoạn cần đầu tư công sức, thành quả sẽ đến ở chặng sau.",
  },
  laoTho: {
    sang: "Những năm rất an vui và nhiều phúc.",
    kha: "Những năm bình yên, đều đặn.",
    vun: "Nên giữ sức và sống chậm, mọi việc sẽ nhẹ nhàng hơn.",
  },
};

export function closingGroup(stage: LifeStage): keyof typeof STAGE_CLOSING {
  return stage === "nho" || stage === "tre" ? "nhoTre" : stage === "lap" || stage === "trung" ? "lapTrung" : "laoTho";
}
