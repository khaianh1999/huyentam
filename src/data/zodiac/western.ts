/**
 * 12 cung hoàng đạo nhiệt đới theo cách gọi phổ biến ở Việt Nam.
 *
 * Mốc ngày là quy ước lịch dân gian / báo chí, có thể lệch một ngày
 * tùy năm vì điểm mặt trời đổi cung không rơi đúng một giờ cố định.
 * Bốn nguyên tố Lửa, Đất, Khí, Nước là hệ phương Tây, không trùng ngũ hành.
 * Toàn bộ mô tả là quan niệm dân gian, không phải kết luận về một cá nhân.
 */

import type { WesternSign } from "@/types";

export const WESTERN_LABEL = "quan niệm dân gian" as const;

export const WESTERN_NOTE =
  "Cung hoàng đạo là tập quán văn hóa phương Tây đã đi vào đời sống Việt qua lịch và báo chí. Mốc ngày có thể lệch một ngày tùy năm. Lửa, Đất, Khí, Nước không phải Kim, Mộc, Thủy, Hỏa, Thổ. Phần tính cách là khuôn mẫu dân gian, không mô tả từng người và không phải lời tiên đoán.";

export const WESTERN_SIGNS: WesternSign[] = [
  {
    id: "bach-duong",
    name: "Bạch Dương",
    symbol: "♈",
    element: "Lửa",
    dateRange: "21/3 – 19/4",
    startMonth: 3,
    startDay: 21,
    endMonth: 4,
    endDay: 19,
    personality:
      "Trong cách nói phổ biến, Bạch Dương được gán cho sự xông xáo, thẳng và muốn làm trước. Khuôn mẫu ấy cũng nhắc tính nóng và nỗi sốt ruột khi việc chậm. Đây là hình ảnh văn hóa, không phải mô tả của mọi người sinh trong khoảng ngày này.",
    love:
      "Chuyện cung hoàng đạo kể Bạch Dương cần sự rõ ràng và dễ chán khi bị níu quá chặt. Hợp với Sư Tử, Nhân Mã, Song Tử hay Bảo Bình chỉ là quy ước đối chiếu dân gian.",
    career:
      "Người ta hay gắn cung này với việc được chủ động: mở đầu, thể thao, bán hàng, điều phối nhóm nhỏ. Nghề vẫn tùy năng lực, không tùy khoảng ngày sinh.",
    finance:
      "Quan niệm dân gian khuyên Bạch Dương chừa một khoản trước khi chi cho việc mới. Không có cung nào quyết định giàu nghèo.",
    strengths: ["Chủ động", "Thẳng thắn", "Dám bắt đầu", "Hết mình khi đã nhận"],
    weaknesses: ["Nóng vội", "Nghe góp ý kém lúc đang hăng", "Chán việc lặp", "Dễ quyết khi chưa đủ thông tin"],
    compatible: ["Sư Tử", "Nhân Mã", "Song Tử", "Bảo Bình"],
  },
  {
    id: "kim-nguu",
    name: "Kim Ngưu",
    symbol: "♉",
    element: "Đất",
    dateRange: "20/4 – 20/5",
    startMonth: 4,
    startDay: 20,
    endMonth: 5,
    endDay: 20,
    personality:
      "Kim Ngưu thường được kể là chậm, chắc và coi trọng sự dễ chịu của đời sống hằng ngày. Khuôn mẫu dân gian khen sự kiên nhẫn, cũng nhắc thói khó đổi khi đã quen một nếp.",
    love:
      "Cách luận cung hay nói Kim Ngưu gắn bằng sự đều đặn hơn bằng lời hoa mỹ. Xử Nữ, Ma Kết, Cự Giải và Song Ngư là những cung thường được xếp cạnh trong bảng hợp dân gian.",
    career:
      "Người ta gắn cung này với việc cần tay nghề và sự bền: thủ công, ẩm thực, tài chính cá nhân, quản lý kho. Đó là sự liên tưởng, không phải định hướng bắt buộc.",
    finance:
      "Chuyện kể khuyên Kim Ngưu ghi chép và tránh mua để vừa mắt. Tiết kiệm được nhắc như thói quen, không phải bảo chứng tài lộc.",
    strengths: ["Bền bỉ", "Thực tế", "Có gu chăm chút", "Giữ lời khi đã hứa"],
    weaknesses: ["Cứng với thay đổi", "Cố chấp với của cải", "Chậm xin giúp", "Dễ trì hoãn quyết định lớn"],
    compatible: ["Xử Nữ", "Ma Kết", "Cự Giải", "Song Ngư"],
  },
  {
    id: "song-tu",
    name: "Song Tử",
    symbol: "♊",
    element: "Khí",
    dateRange: "21/5 – 20/6",
    startMonth: 5,
    startDay: 21,
    endMonth: 6,
    endDay: 20,
    personality:
      "Song Tử được gán cho sự tò mò, mau miệng và biết nói một chuyện theo nhiều phía. Khuôn mẫu dân gian nhắc cả mặt linh hoạt lẫn thói đổi ý, khó đi đến cùng một việc.",
    love:
      "Cách nói phổ biến kể Song Tử cần bạn đồng hành để trò chuyện, và ngột ngạt khi bị kiểm soát. Thiên Bình, Bảo Bình, Bạch Dương và Sư Tử thường đứng trong danh sách hợp theo quan niệm dân gian.",
    career:
      "Người ta liên tưởng cung này với chữ, tin tức, dạy học và việc phải gặp nhiều người. Hợp nghề hay không vẫn do luyện tập và hoàn cảnh.",
    finance:
      "Quan niệm dân gian khuyên Song Tử chốt một kế hoạch tiền bạc bằng số liệu, vì dễ bị một ý mới kéo đi. Đây là lời răn văn hóa, không phải dự báo.",
    strengths: ["Nhanh trí", "Dễ kết nối", "Học việc mới mau", "Nhìn một chuyện từ nhiều phía"],
    weaknesses: ["Phân tán", "Nói trước khi làm", "Khó giữ nhịp dài", "Dễ nhàm một mối"],
    compatible: ["Thiên Bình", "Bảo Bình", "Bạch Dương", "Sư Tử"],
  },
  {
    id: "cu-giai",
    name: "Cự Giải",
    symbol: "♋",
    element: "Nước",
    dateRange: "21/6 – 22/7",
    startMonth: 6,
    startDay: 21,
    endMonth: 7,
    endDay: 22,
    personality:
      "Cự Giải thường được kể là gắn với nhà, ký ức và sự để ý cảm xúc người khác. Khuôn mẫu ấy có mặt dịu, cũng có mặt khép và khó quên một lời nặng.",
    love:
      "Chuyện cung hoàng đạo nói Cự Giải cần cảm giác được che chở và cũng muốn che chở. Bọ Cạp, Song Ngư, Kim Ngưu và Xử Nữ là các cung hay được xếp hợp trong bảng dân gian.",
    career:
      "Người ta gắn cung này với việc nuôi dưỡng: chăm sóc, giáo dục, ẩm thực, nghề cần sự thấu cảm. Đó là liên tưởng văn hóa, không phải chỉ định nghề.",
    finance:
      "Dân gian hay khuyên Cự Giải tách tiền nhà và tiền chi vì thương người. Giữ một quỹ riêng được kể như cách đứng vững, không phải mẹo làm giàu.",
    strengths: ["Gắn bó", "Tinh tế", "Nhớ điều người khác cần", "Bảo vệ người thân"],
    weaknesses: ["Khép khi bị tổn thương", "Khó buông chuyện cũ", "Cả nể", "Lo xa thành mất ngủ"],
    compatible: ["Bọ Cạp", "Song Ngư", "Kim Ngưu", "Xử Nữ"],
  },
  {
    id: "su-tu",
    name: "Sư Tử",
    symbol: "♌",
    element: "Lửa",
    dateRange: "23/7 – 22/8",
    startMonth: 7,
    startDay: 23,
    endMonth: 8,
    endDay: 22,
    personality:
      "Sư Tử được gán cho khí chất muốn được thấy, lòng rộng và sự ghét bị làm ngơ. Khuôn mẫu dân gian khen sự hào phóng, cũng nhắc thói cần lời khen và dễ tổn thương lòng tự trọng.",
    love:
      "Cách luận cung kể Sư Tử ấm và cần được trân trọng giữa đám đông lẫn trong nhà. Bạch Dương, Nhân Mã, Song Tử và Thiên Bình thường được xếp cạnh theo quan niệm dân gian.",
    career:
      "Người ta liên tưởng cung này với sân khấu, điều hành, giảng dạy và việc đứng ra đại diện. Uy tín vẫn đến từ việc làm được, không từ cung mặt trời.",
    finance:
      "Quan niệm dân gian khuyên Sư Tử để một phần không dùng vào việc khoe. Chi cho thể diện quá tay là điều chuyện kể thường răn.",
    strengths: ["Hào phóng", "Tự tin", "Biết cổ vũ người khác", "Dám nhận việc nổi"],
    weaknesses: ["Cần được công nhận", "Khó nhận sai trước mặt người khác", "Chi vì sĩ diện", "Áp đặt cách của mình"],
    compatible: ["Bạch Dương", "Nhân Mã", "Song Tử", "Thiên Bình"],
  },
  {
    id: "xu-nu",
    name: "Xử Nữ",
    symbol: "♍",
    element: "Đất",
    dateRange: "23/8 – 22/9",
    startMonth: 8,
    startDay: 23,
    endMonth: 9,
    endDay: 22,
    personality:
      "Xử Nữ thường được kể là chỉn chu, để ý chi tiết và muốn việc đúng quy trình. Khuôn mẫu dân gian nhắc cả sự đáng tin lẫn thói soi lỗi, khó hài lòng với bản nháp.",
    love:
      "Chuyện cung hoàng đạo nói Xử Nữ thể hiện tình cảm bằng việc làm cụ thể. Kim Ngưu, Ma Kết, Cự Giải và Bọ Cạp là những cung hay xuất hiện trong bảng hợp dân gian.",
    career:
      "Người ta gắn cung này với biên tập, kiểm soát chất lượng, y tế hỗ trợ, sổ sách và mọi việc cần sự chính xác. Phù hợp hay không vẫn phải xét tay nghề.",
    finance:
      "Dân gian thường khen Xử Nữ biết lập ngân sách, và khuyên đừng để sự hoàn hảo trì hoãn một quyết định tiền bạc đã đủ thông tin.",
    strengths: ["Cẩn thận", "Có phương pháp", "Đáng tin trong việc nhỏ", "Biết sửa lỗi"],
    weaknesses: ["Cầu toàn", "Tự trách quá mức", "Khó ủy quyền", "Lo chi tiết đến quên bức tranh lớn"],
    compatible: ["Kim Ngưu", "Ma Kết", "Cự Giải", "Bọ Cạp"],
  },
  {
    id: "thien-binh",
    name: "Thiên Bình",
    symbol: "♎",
    element: "Khí",
    dateRange: "23/9 – 22/10",
    startMonth: 9,
    startDay: 23,
    endMonth: 10,
    endDay: 22,
    personality:
      "Thiên Bình được gán cho sự cân nhắc, gu thẩm mỹ và nỗi ngại làm mất hòa khí. Khuôn mẫu dân gian khen biết nghe hai phía, cũng nhắc thói phân vân và né quyết định.",
    love:
      "Cách nói phổ biến kể Thiên Bình cần quan hệ công bằng và lời nói tử tế. Song Tử, Bảo Bình, Sư Tử và Nhân Mã thường được xếp hợp theo quan niệm dân gian.",
    career:
      "Người ta liên tưởng cung này với luật đời thường, thiết kế, ngoại giao và việc phải đứng giữa các bên. Đây là hình ảnh văn hóa, không phải hướng nghiệp cá nhân.",
    finance:
      "Quan niệm dân gian khuyên Thiên Bình đặt một hạn mức trước khi mua vì đẹp. Cân bằng thu chi được kể như việc làm, không như vận may của cung.",
    strengths: ["Biết lắng nghe", "Có gu", "Tìm được tiếng nói chung", "Giữ lễ"],
    weaknesses: ["Phân vân", "Tránh xung đột đến mức nuốt lời cần nói", "Dễ chiều", "Khó từ chối"],
    compatible: ["Song Tử", "Bảo Bình", "Sư Tử", "Nhân Mã"],
  },
  {
    id: "bo-cap",
    name: "Bọ Cạp",
    symbol: "♏",
    element: "Nước",
    dateRange: "23/10 – 21/11",
    startMonth: 10,
    startDay: 23,
    endMonth: 11,
    endDay: 21,
    personality:
      "Bọ Cạp thường được kể là sâu, kín và đi đến cùng điều đã chọn. Khuôn mẫu dân gian nhắc cả lòng trung lẫn sự cố chấp, khó quên một lần bị phản.",
    love:
      "Chuyện cung hoàng đạo nói Bọ Cạp cần sự tin cậy và ngại quan hệ hời hợt. Cự Giải, Song Ngư, Xử Nữ và Ma Kết là các cung hay được đối chiếu trong bảng dân gian.",
    career:
      "Người ta gắn cung này với việc cần tập trung và giữ kín: nghiên cứu, điều tra, tài chính, trị liệu. Liên tưởng ấy không quyết định nghề của một người.",
    finance:
      "Dân gian hay khuyên Bọ Cạp nói rõ điều khoản trước khi góp vốn. Giữ thông tin và giữ biên lai được nhắc như thói quen, không phải chiến lược chắc thắng.",
    strengths: ["Tập trung", "Giữ chữ tín với người mình chọn", "Nhìn được lớp dưới bề mặt", "Bền khi gặp việc khó"],
    weaknesses: ["Đố kỵ", "Khó tha một lỗi", "Giữ bí mật cả khi cần nói", "Cực đoan"],
    compatible: ["Cự Giải", "Song Ngư", "Xử Nữ", "Ma Kết"],
  },
  {
    id: "nhan-ma",
    name: "Nhân Mã",
    symbol: "♐",
    element: "Lửa",
    dateRange: "22/11 – 21/12",
    startMonth: 11,
    startDay: 22,
    endMonth: 12,
    endDay: 21,
    personality:
      "Nhân Mã được gán cho sự hướng ngoại, lòng muốn học và nỗi sợ bị nhốt trong một khuôn. Khuôn mẫu dân gian khen sự thẳng và lạc quan, cũng nhắc thói nói quá và bỏ dở.",
    love:
      "Cách luận cung kể Nhân Mã cần người đồng hành cho tự do, không phải người canh. Bạch Dương, Sư Tử, Thiên Bình và Bảo Bình thường đứng trong danh sách hợp dân gian.",
    career:
      "Người ta liên tưởng cung này với dạy học, viết, du lịch, thể thao và việc được mở rộng tầm mắt. Hợp hay không vẫn do kỷ luật làm việc.",
    finance:
      "Quan niệm dân gian khuyên Nhân Mã đừng xem một chuyến đi hay một ý lớn là khoản chi tất yếu. Lập hạn mức được kể như cách giữ nhịp.",
    strengths: ["Cởi mở", "Thẳng", "Ham học", "Kéo được không khí vui"],
    weaknesses: ["Nói thẳng quá mức", "Chán việc giấy tờ", "Hứa nhiều", "Khó ở yên một chỗ"],
    compatible: ["Bạch Dương", "Sư Tử", "Thiên Bình", "Bảo Bình"],
  },
  {
    id: "ma-ket",
    name: "Ma Kết",
    symbol: "♑",
    element: "Đất",
    dateRange: "22/12 – 19/1",
    startMonth: 12,
    startDay: 22,
    endMonth: 1,
    endDay: 19,
    personality:
      "Ma Kết thường được kể là nghiêm, có mục tiêu xa và chịu làm việc không cần vỗ tay ngay. Khuôn mẫu dân gian nhắc cả sự đáng tin lẫn thói khắt khe với mình và với người khác.",
    love:
      "Chuyện cung hoàng đạo nói Ma Kết thể hiện tình cảm bằng trách nhiệm hơn bằng lời ngọt. Kim Ngưu, Xử Nữ, Bọ Cạp và Song Ngư là các cung hay được xếp hợp theo quan niệm dân gian.",
    career:
      "Người ta gắn cung này với việc xây nền: quản trị, kỹ thuật, nghề cần thâm niên. Thành quả được kể là đến muộn và do tích lũy, không do cung ban.",
    finance:
      "Dân gian thường khen Ma Kết biết để dành, và khuyên đừng biến sự tiết kiệm thành từ chối mọi nghỉ ngơi cần thiết. Không có công thức giàu từ ngày sinh.",
    strengths: ["Kỷ luật", "Có trách nhiệm", "Nhìn hạn dài", "Làm được việc khó"],
    weaknesses: ["Khắt khe", "Khó nghỉ", "Giấu mệt", "Nghi ngờ điều chưa chứng minh"],
    compatible: ["Kim Ngưu", "Xử Nữ", "Bọ Cạp", "Song Ngư"],
  },
  {
    id: "bao-binh",
    name: "Bảo Bình",
    symbol: "♒",
    element: "Khí",
    dateRange: "20/1 – 18/2",
    startMonth: 1,
    startDay: 20,
    endMonth: 2,
    endDay: 18,
    personality:
      "Bảo Bình được gán cho đầu óc độc lập, tình bạn rộng và sự khó chịu với khuôn cũ. Khuôn mẫu dân gian khen óc nghĩ khác, cũng nhắc thói xa cách cảm xúc và cố chấp với lý của mình.",
    love:
      "Cách nói phổ biến kể Bảo Bình cần tình bạn trong tình cảm, và ngột khi bị sở hữu. Song Tử, Thiên Bình, Bạch Dương và Nhân Mã thường có trong bảng hợp dân gian.",
    career:
      "Người ta liên tưởng cung này với công nghệ, công việc cộng đồng, nghiên cứu và việc được thử cách mới. Liên tưởng không thay cho bằng cấp hay kinh nghiệm.",
    finance:
      "Quan niệm dân gian khuyên Bảo Bình đọc điều khoản trước khi góp vào một ý tưởng hấp dẫn. Thích cái mới không có nghĩa khoản đó an toàn.",
    strengths: ["Độc lập", "Công bằng", "Nghĩ được hướng khác", "Quý bạn bè"],
    weaknesses: ["Xa cách", "Cứng với lý của mình", "Khó theo nhịp cảm xúc của người khác", "Bỏ qua thói quen cần thiết"],
    compatible: ["Song Tử", "Thiên Bình", "Bạch Dương", "Nhân Mã"],
  },
  {
    id: "song-ngu",
    name: "Song Ngư",
    symbol: "♓",
    element: "Nước",
    dateRange: "19/2 – 20/3",
    startMonth: 2,
    startDay: 19,
    endMonth: 3,
    endDay: 20,
    personality:
      "Song Ngư thường được kể là giàu tưởng tượng, dễ cảm và hay nhập vào tâm trạng người bên cạnh. Khuôn mẫu dân gian nhắc cả sự đồng cảm lẫn thói trốn vào mơ khi việc đời cần một câu trả lời.",
    love:
      "Chuyện cung hoàng đạo nói Song Ngư cần sự dịu và dễ tổn thương bởi lời bông đùa nặng. Cự Giải, Bọ Cạp, Kim Ngưu và Ma Kết là những cung hay được đối chiếu trong quan niệm dân gian.",
    career:
      "Người ta gắn cung này với nghệ thuật, chăm sóc, âm nhạc và việc cần trí tưởng tượng. Nghề vẫn phải có kỹ năng và giới hạn giờ giấc, không chỉ có cảm hứng.",
    finance:
      "Dân gian hay khuyên Song Ngư viết lại các khoản chi, vì dễ cho mượn hoặc chi theo cảm xúc. Một danh sách cụ thể hữu ích hơn một lời hứa về vận may.",
    strengths: ["Đồng cảm", "Giàu hình ảnh", "Dịu", "Biết nối những điều tưởng như không liên quan"],
    weaknesses: ["Mơ hồ ranh giới", "Trì hoãn", "Dễ bị cuốn theo tâm trạng", "Khó nói lời từ chối"],
    compatible: ["Cự Giải", "Bọ Cạp", "Kim Ngưu", "Ma Kết"],
  },
];
