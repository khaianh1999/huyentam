/**
 * 12 con giáp — quan niệm dân gian.
 *
 * Ngũ hành ghi ở `element` là ngũ hành của địa chi (Tý Thủy, Sửu Thổ…),
 * không phải nạp âm của từng năm. Nạp âm đổi theo cặp can–chi.
 *
 * `years` là các năm dương lịch có Tết Nguyên đán mở tuổi đó
 * (1924 = Giáp Tý). Người sinh trước Tết thuộc tuổi của năm âm trước.
 *
 * Quan hệ dùng đúng tên trong trường `name`:
 * - tamHop: hai tuổi còn lại trong bộ tam hợp
 * - tuHanhXung: ba tuổi còn lại trong bộ tứ hành xung
 * - hop: tuổi lục hợp (nhị hợp)
 * - khac: tuổi lục xung (xung chiếu)
 *
 * Bốn bộ tam hợp: Thân–Tý–Thìn, Dần–Ngọ–Tuất, Hợi–Mão–Mùi, Tỵ–Dậu–Sửu.
 * Ba bộ tứ hành xung: Tý–Ngọ–Mão–Dậu, Dần–Thân–Tỵ–Hợi, Thìn–Tuất–Sửu–Mùi.
 */

import type { Chi, NguHanh, ZodiacAnimal } from "@/types";

export const ZODIAC_LABEL = "quan niệm dân gian" as const;

export const ZODIAC_NOTE =
  "Mô tả 12 con giáp, tam hợp, tứ hành xung, lục hợp và lục xung là quan niệm dân gian được lưu truyền trong đời sống Việt. Đây là tư liệu văn hóa để tham khảo, không phải lời tiên đoán và không mô tả tính cách của từng người.";

function marks(firstGregorianYear: number): number[] {
  const years: number[] = [];
  for (let year = firstGregorianYear; year <= 2043; year += 12) {
    years.push(year);
  }
  return years;
}

function animal(entry: {
  id: string;
  name: string;
  chi: Chi;
  element: NguHanh;
  years: number[];
  overview: string;
  personality: string;
  career: string;
  love: string;
  wealth: string;
  tamHop: string[];
  tuHanhXung: string[];
  hop: string[];
  khac: string[];
}): ZodiacAnimal {
  return entry;
}

export const ZODIAC_ANIMALS: ZodiacAnimal[] = [
  animal({
    id: "ty",
    name: "Chuột",
    chi: "Ty",
    element: "Thuy",
    years: marks(1924),
    overview:
      "Tý mở vòng địa chi, ngũ hành của chi là Thủy. Theo quan niệm dân gian, chuột gắn với sự nhanh, tháo vát và biết tìm lối trong chỗ hẹp. Bộ tam hợp Thân–Tý–Thìn được gọi là thủy cục; lớp này khác với nạp âm từng năm.",
    personality:
      "Chuyện dân gian thường gán cho tuổi Tý óc ứng biến, tò mò và để ý việc nhỏ. Khuôn mẫu ấy nói về sự linh hoạt, đồng thời nhắc thói tính toán chi ly. Không phải ai sinh năm Tý cũng giống khuôn đó.",
    career:
      "Người ta hay kể tuổi Tý hợp việc cần mắt tinh và tay nhanh: sổ sách, giao dịch, thủ công, môi giới. Lời khuyên dân gian là lấy sự bền làm gốc, không có nghề nào được xem là định sẵn.",
    love:
      "Tuổi Tý được kể là dễ gắn khi được tôn trọng khoảng riêng. Tam hợp với Rồng và Khỉ, lục hợp với Trâu chỉ là quy ước xem tuổi, một lớp tham khảo sau khi hai người đã hiểu nhau.",
    wealth:
      "Quan niệm dân gian cho rằng tuổi Tý biết giữ của và xoay từng khoản nhỏ. Giữ sổ chi, tránh vay nóng được nhắc như thói quen khôn, không phải lời hứa về tài lộc.",
    tamHop: ["Rồng", "Khỉ"],
    tuHanhXung: ["Ngựa", "Mèo", "Gà"],
    hop: ["Trâu"],
    khac: ["Ngựa"],
  }),
  animal({
    id: "suu",
    name: "Trâu",
    chi: "Suu",
    element: "Tho",
    years: marks(1925),
    overview:
      "Sửu là chi Thổ, đứng sau Tý. Theo quan niệm dân gian, trâu tượng trưng cho sức bền, sự chịu khó và nhịp làm việc đều. Tuổi Sửu nằm trong tam hợp Tỵ–Dậu–Sửu, bộ được gọi là kim cục, khác với ngũ hành Thổ của chính chi.",
    personality:
      "Cách nói đời thường gán cho tuổi Sửu tính chậm mà chắc, ít đổi ý và coi trọng lời đã hứa. Khuôn mẫu ấy cũng nhắc sự cứng khi bị giục. Đây là hình ảnh văn hóa, không phải bản mô tả từng người.",
    career:
      "Chuyện dân gian thường đặt tuổi Sửu vào việc cần sức bền: nghề tay, ruộng vườn, quản kho, công việc lặp lại có kỷ luật. Kết quả được kể là đến từ việc làm lâu, không từ một phen may.",
    love:
      "Tuổi Sửu được kể là gắn bó kiểu ở lâu, nói ít. Lục hợp với Chuột, tam hợp với Rắn và Gà là quy ước xem tuổi trong quan niệm dân gian, không thay cho sự hợp tính của hai người.",
    wealth:
      "Dân gian hay nói tuổi Sửu tích lũy chậm và ngại rủi ro lớn. Giữ phần dự phòng, tránh mua vì sĩ diện là lời răn trong chuyện kể, không phải dự báo giàu nghèo.",
    tamHop: ["Rắn", "Gà"],
    tuHanhXung: ["Dê", "Rồng", "Chó"],
    hop: ["Chuột"],
    khac: ["Dê"],
  }),
  animal({
    id: "dan",
    name: "Hổ",
    chi: "Dan",
    element: "Moc",
    years: marks(1926),
    overview:
      "Dần thuộc Mộc trong ngũ hành địa chi. Theo quan niệm dân gian, hổ là hình ảnh của khí thế, lòng dũng và sự đứng ra gánh việc. Tam hợp Dần–Ngọ–Tuất được gọi là hỏa cục; đó là tên của cả bộ, không đổi ngũ hành Mộc của chi Dần.",
    personality:
      "Người ta thường kể tuổi Dần thẳng, quyết và khó chịu khi bị xem thường. Khuôn mẫu dân gian cũng nhắc tính nóng và thói muốn làm chủ câu chuyện. Không nên lấy đó làm kết luận về một cá nhân.",
    career:
      "Trong cách luận tuổi, Dần được gắn với việc cần người đứng mũi: điều phối, bảo vệ, mở việc mới. Lời khuyên đi kèm là giữ lễ với người cộng sự, vì một mình xông không bền.",
    love:
      "Tuổi Dần được kể là cần không gian để tự quyết, và dịu lại khi được tin. Lục hợp với Lợn, tam hợp với Ngựa và Chó thuộc quy ước dân gian về tuổi, chỉ là một lát khi xem duyên.",
    wealth:
      "Quan niệm dân gian không hứa tuổi Dần giàu nhanh. Chuyện kể thường khuyên giữ phần chắc trước khi bung, và tránh quyết định tiền bạc lúc đang nóng.",
    tamHop: ["Ngựa", "Chó"],
    tuHanhXung: ["Khỉ", "Rắn", "Lợn"],
    hop: ["Lợn"],
    khac: ["Khỉ"],
  }),
  animal({
    id: "mao",
    name: "Mèo",
    chi: "Mao",
    element: "Moc",
    years: marks(1927),
    overview:
      "Ở Việt Nam, chi Mão được gọi là Mèo, khác cách gọi Thỏ ở một số nước Đông Á. Ngũ hành của chi là Mộc. Theo quan niệm dân gian, mèo gắn với sự khéo, nhẹ nhàng và biết giữ nhà. Tam hợp Hợi–Mão–Mùi được gọi là mộc cục.",
    personality:
      "Cách nói dân gian gán cho tuổi Mão sự tinh ý, ưa đẹp và ngại va chạm. Khuôn mẫu ấy có mặt dịu, cũng có mặt để bụng. Đây là chuyện kể về một tuổi, không phải chân dung mỗi người sinh năm Mão.",
    career:
      "Người ta hay nhắc tuổi Mão hợp việc cần tay khéo và mắt thẩm mỹ: chăm sóc, thủ công tinh, giao tiếp nhỏ, sắp đặt. Nghề vẫn do học và làm mà thành, không do chi năm ấn định.",
    love:
      "Tuổi Mão được kể là cần lời dịu và sự tử tế đều đặn. Lục hợp với Chó, tam hợp với Lợn và Dê là quy ước xem tuổi trong quan niệm dân gian.",
    wealth:
      "Dân gian thường khuyên tuổi Mão chi tiêu có chừng, vì dễ mua thứ đẹp hơn thứ cần. Giữ một quỹ riêng được kể như cách đứng vững, không phải mẹo làm giàu.",
    tamHop: ["Lợn", "Dê"],
    tuHanhXung: ["Gà", "Chuột", "Ngựa"],
    hop: ["Chó"],
    khac: ["Gà"],
  }),
  animal({
    id: "thin",
    name: "Rồng",
    chi: "Thin",
    element: "Tho",
    years: marks(1928),
    overview:
      "Thìn là chi Thổ. Theo quan niệm dân gian, rồng là hình ảnh của khí lớn, sự khởi đầu và ước vọng vượt lên. Tuổi Thìn thuộc tam hợp Thân–Tý–Thìn, gọi là thủy cục — tên của bộ ba, trong khi ngũ hành của riêng chi Thìn vẫn là Thổ.",
    personality:
      "Chuyện dân gian thường gán cho tuổi Thìn chí lớn, lòng tự trọng và sự ghét bị coi thường. Khuôn mẫu ấy cũng nhắc thói giữ thể diện. Không phải mọi người tuổi Rồng đều sống theo hình ảnh đó.",
    career:
      "Cách luận tuổi hay đặt Thìn vào việc có tầm nhìn và cần uy tín: tổ chức, giảng dạy, điều hành. Lời răn đi kèm là làm cho xong việc nhỏ trước khi nhận việc lớn.",
    love:
      "Tuổi Thìn được kể là ấm khi được nể, và dễ xa khi bị so sánh. Lục hợp với Gà, tam hợp với Chuột và Khỉ thuộc quy ước dân gian, không thay cho sự lựa chọn của hai người.",
    wealth:
      "Quan niệm dân gian nói tuổi Thìn có lúc muốn chi cho danh. Giữ sổ, chia việc tiền bạc với người cùng làm được nhắc như cách bền của, không phải dấu hiệu sắp phát.",
    tamHop: ["Chuột", "Khỉ"],
    tuHanhXung: ["Chó", "Trâu", "Dê"],
    hop: ["Gà"],
    khac: ["Chó"],
  }),
  animal({
    id: "ti",
    name: "Rắn",
    chi: "Ti",
    element: "Hoa",
    years: marks(1929),
    overview:
      "Tỵ thuộc Hỏa trong ngũ hành địa chi. Theo quan niệm dân gian, rắn gắn với sự trầm, biết nhìn và ít phô. Bộ tam hợp Tỵ–Dậu–Sửu được gọi là kim cục; đó là tên cục của cả nhóm, khác với hành Hỏa của chi Tỵ.",
    personality:
      "Người ta thường kể tuổi Tỵ sâu, kín và khó đoán ở lần gặp đầu. Khuôn mẫu dân gian khen sự điềm tĩnh, cũng nhắc thói để bụng quá lâu. Đây là hình ảnh lưu truyền, không phải kết luận tâm lý.",
    career:
      "Trong chuyện xem tuổi, Tỵ được gắn với việc cần quan sát và giữ bí mật nghề: nghiên cứu, cố vấn, thủ quỹ, nghề đòi sự chính xác. Con đường vẫn mở bằng học, không bằng chi năm.",
    love:
      "Tuổi Tỵ được kể là chậm tin và bền khi đã tin. Lục hợp với Khỉ, tam hợp với Gà và Trâu là quy ước dân gian về hợp tuổi.",
    wealth:
      "Dân gian hay nói tuổi Tỵ không khoe của. Giữ khoản dự phòng và tránh góp vốn khi chưa rõ giấy tờ là lời khuyên trong chuyện kể, không phải cam kết tài chính.",
    tamHop: ["Gà", "Trâu"],
    tuHanhXung: ["Lợn", "Hổ", "Khỉ"],
    hop: ["Khỉ"],
    khac: ["Lợn"],
  }),
  animal({
    id: "ngo",
    name: "Ngựa",
    chi: "Ngo",
    element: "Hoa",
    years: marks(1930),
    overview:
      "Ngọ là chi Hỏa, giữa vòng địa chi. Theo quan niệm dân gian, ngựa tượng trưng cho sự đi, lòng nhiệt và nhịp nhanh. Tam hợp Dần–Ngọ–Tuất cũng được gọi là hỏa cục, cùng hướng với hành của chi Ngọ.",
    personality:
      "Cách nói đời thường gán cho tuổi Ngọ sự thẳng, hoạt và chóng chán sự tù túng. Khuôn mẫu ấy nhắc cả tính nóng và nỗi sợ bị buộc. Không dùng khuôn này để đánh giá một người.",
    career:
      "Người ta hay kể tuổi Ngọ hợp việc được đi, được nói và thấy kết quả sớm: giao tiếp, vận chuyển, mở mối. Lời khuyên dân gian là chọn một hướng đủ lâu để tay nghề kịp dày.",
    love:
      "Tuổi Ngọ được kể là cần sự thoải mái và lời thật. Lục hợp với Dê, tam hợp với Hổ và Chó thuộc quan niệm dân gian về tuổi, một lớp tham khảo chứ không phải điều kiện của tình cảm.",
    wealth:
      "Quan niệm dân gian không gắn tuổi Ngọ với của để dành sẵn. Chuyện kể khuyên chia tiền ăn chắc và tiền được phép thử, rồi dừng khi thử quá sức.",
    tamHop: ["Hổ", "Chó"],
    tuHanhXung: ["Chuột", "Mèo", "Gà"],
    hop: ["Dê"],
    khac: ["Chuột"],
  }),
  animal({
    id: "mui",
    name: "Dê",
    chi: "Mui",
    element: "Tho",
    years: marks(1931),
    overview:
      "Mùi là chi Thổ. Theo quan niệm dân gian, dê gắn với sự hiền, biết nhường và đời sống bầy. Tuổi Mùi nằm trong tam hợp Hợi–Mão–Mùi, gọi là mộc cục, trong khi ngũ hành của riêng chi Mùi là Thổ.",
    personality:
      "Chuyện dân gian thường gán cho tuổi Mùi tính hòa nhã, giàu cảm xúc và ngại xung đột. Khuôn mẫu ấy cũng nhắc thói chiều lòng đến mức mất phần mình. Đây là cách nói văn hóa.",
    career:
      "Cách luận tuổi hay đặt Mùi vào việc nuôi dưỡng và gắn kết: chăm sóc, giáo dục, nghề dịch vụ, việc nhà có nhịp đều. Nghề phù hợp vẫn phải xét sức học và hoàn cảnh.",
    love:
      "Tuổi Mùi được kể là dịu và cần được đáp lại bằng sự tử tế. Lục hợp với Ngựa, tam hợp với Lợn và Mèo là quy ước xem tuổi trong quan niệm dân gian.",
    wealth:
      "Dân gian thường khuyên tuổi Mùi đừng chi vì nể. Một khoản để riêng, nói rõ với người thân, được kể như cách giữ hòa khí mà không hao của.",
    tamHop: ["Lợn", "Mèo"],
    tuHanhXung: ["Trâu", "Rồng", "Chó"],
    hop: ["Ngựa"],
    khac: ["Trâu"],
  }),
  animal({
    id: "than",
    name: "Khỉ",
    chi: "Than",
    element: "Kim",
    years: marks(1932),
    overview:
      "Thân thuộc Kim. Theo quan niệm dân gian, khỉ là hình ảnh của sự lanh, biết xoay và hay nghĩ mẹo. Tuổi Thân đứng trong tam hợp Thân–Tý–Thìn, bộ thủy cục; ngũ hành của chi Thân vẫn là Kim.",
    personality:
      "Người ta thường kể tuổi Thân nhanh trí, vui và khó ngồi yên với việc lặp. Khuôn mẫu dân gian cũng nhắc thói nói quá sự thật để được việc. Không phải chân dung bắt buộc của người tuổi Khỉ.",
    career:
      "Trong chuyện xem tuổi, Thân được gắn với việc cần ứng biến: kỹ thuật, buôn bán, sáng tạo, xử lý sự cố. Lời răn là làm cho xong điều đã nhận, vì mẹo không thay cho sự tin cậy.",
    love:
      "Tuổi Thân được kể là cần bạn đồng hành biết đùa và biết nói thẳng. Lục hợp với Rắn, tam hợp với Chuột và Rồng thuộc quy ước dân gian.",
    wealth:
      "Quan niệm dân gian nói tuổi Thân dễ thấy cơ hội, cũng dễ đổi ý giữa chừng. Chốt một kế hoạch tiền bạc bằng giấy, rồi mới bung, là lời khuyên trong chuyện kể.",
    tamHop: ["Chuột", "Rồng"],
    tuHanhXung: ["Hổ", "Rắn", "Lợn"],
    hop: ["Rắn"],
    khac: ["Hổ"],
  }),
  animal({
    id: "dau",
    name: "Gà",
    chi: "Dau",
    element: "Kim",
    years: marks(1933),
    overview:
      "Dậu là chi Kim. Theo quan niệm dân gian, gà gắn với sự đúng giờ, tiếng nói rõ và việc giữ nhịp cho cả nhà. Tam hợp Tỵ–Dậu–Sửu được gọi là kim cục, cùng hướng với hành Kim của chi Dậu.",
    personality:
      "Cách nói đời thường gán cho tuổi Dậu tính ngăn nắp, thẳng lời và để ý hình thức. Khuôn mẫu ấy khen sự chỉn chu, cũng nhắc thói soi từng lỗi nhỏ. Đây là quan niệm dân gian.",
    career:
      "Người ta hay kể tuổi Dậu hợp việc cần chuẩn và có mặt đúng lúc: biên tập, kiểm soát, lễ tân, nghề đòi quy trình. Tay nghề vẫn quyết định hơn năm sinh.",
    love:
      "Tuổi Dậu được kể là cần sự rõ ràng: hẹn thì giữ, nói thì đúng. Lục hợp với Rồng, tam hợp với Rắn và Trâu là quy ước xem tuổi, không phải thước đo tình cảm.",
    wealth:
      "Dân gian thường khuyên tuổi Dậu ghi chép và tránh mua để vừa mắt. Của bền được kể là phần để dành đều, không phải một khoản bất ngờ.",
    tamHop: ["Rắn", "Trâu"],
    tuHanhXung: ["Mèo", "Chuột", "Ngựa"],
    hop: ["Rồng"],
    khac: ["Mèo"],
  }),
  animal({
    id: "tuat",
    name: "Chó",
    chi: "Tuat",
    element: "Tho",
    years: marks(1934),
    overview:
      "Tuất thuộc Thổ. Theo quan niệm dân gian, chó tượng trưng cho chữ tín, sự canh giữ và lòng trung với người mình chọn. Tuổi Tuất nằm trong tam hợp Dần–Ngọ–Tuất, gọi là hỏa cục, khác với ngũ hành Thổ của chi.",
    personality:
      "Chuyện dân gian thường gán cho tuổi Tuất tính thẳng, ghét sự giả và sẵn sàng bênh người yếu. Khuôn mẫu ấy cũng nhắc sự cố chấp khi đã phán một chuyện là sai. Không dùng để kết luận một cá nhân.",
    career:
      "Cách luận tuổi hay đặt Tuất vào việc giữ chữ tín: bảo vệ, pháp lý đời thường, quản lý, nghề cần mặt thật. Uy tín được kể là làm mà có, không phải do chi ban.",
    love:
      "Tuổi Tuất được kể là bền và cần sự công bằng trong nhà. Lục hợp với Mèo, tam hợp với Hổ và Ngựa thuộc quan niệm dân gian về hợp tuổi.",
    wealth:
      "Quan niệm dân gian nói tuổi Tuất ngại mánh khóe. Giữ hợp đồng rõ, tránh góp vì nể, là lời răn trong chuyện kể chứ không phải dự báo giàu nghèo.",
    tamHop: ["Hổ", "Ngựa"],
    tuHanhXung: ["Rồng", "Trâu", "Dê"],
    hop: ["Mèo"],
    khac: ["Rồng"],
  }),
  animal({
    id: "hoi",
    name: "Lợn",
    chi: "Hoi",
    element: "Thuy",
    years: marks(1935),
    overview:
      "Hợi khép vòng địa chi, ngũ hành của chi là Thủy. Theo quan niệm dân gian, lợn gắn với sự no đủ, lòng hiếu khách và nhịp sống muốn yên. Tam hợp Hợi–Mão–Mùi được gọi là mộc cục; ngũ hành của riêng chi Hợi vẫn là Thủy.",
    personality:
      "Người ta thường kể tuổi Hợi thật thà, rộng và ngại tranh cãi. Khuôn mẫu dân gian cũng nhắc thói cả nể, dễ nhận việc quá sức. Đây là hình ảnh lưu truyền, không phải mô tả từng người.",
    career:
      "Trong chuyện xem tuổi, Hợi được gắn với việc nuôi dưỡng và đứng sau cho người khác yên: bếp, hậu cần, chăm sóc, nghề cần sự đều. Con đường nghề do năng lực và cơ hội, không do một chi.",
    love:
      "Tuổi Hợi được kể là ấm nhà và cần người nói năng tử tế. Lục hợp với Hổ, tam hợp với Mèo và Dê là quy ước dân gian.",
    wealth:
      "Dân gian hay khuyên tuổi Hợi đừng chi vì đãi khách quá mức. No đủ trong chuyện kể là biết chừa phần dự phòng, không phải dấu hiệu của cải tự đến.",
    tamHop: ["Mèo", "Dê"],
    tuHanhXung: ["Rắn", "Hổ", "Khỉ"],
    hop: ["Hổ"],
    khac: ["Rắn"],
  }),
];
