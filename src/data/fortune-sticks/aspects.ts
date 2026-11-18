/**
 * Lời giải từng việc cho các quẻ xăm: gia đạo, công danh, tài lộc, tình duyên, sức khỏe, xuất hành.
 * Viết riêng cho Huyền Tâm, tham khảo văn hóa dân gian.
 */

export type StickAspects = [string, string, string, string, string, string];

export const ASPECT_LABELS = ["Gia đạo", "Công danh", "Tài lộc", "Tình duyên", "Sức khỏe", "Xuất hành"] as const;

/** Quan Âm, quẻ 1–20. */
export const QUAN_AM_ASPECTS_1: Record<number, StickAspects> = {
  1: ["Nhà cửa êm ấm, người trong nhà biết nhường nhau.", "Khởi đầu thuận, việc mới có người ủng hộ.", "Tiền vào đều, nên trích một phần làm việc thiện.", "Có duyên lành, người đến với tấm lòng thật.", "Sức khỏe ổn, tinh thần nhẹ nhàng.", "Đi xa bình an, gặp người tốt giúp đỡ."],
  2: ["Trong nhà có chuyện chưa nói ra, nên lắng nghe nhau.", "Việc còn mờ, đợi thêm thông tin rồi quyết.", "Chưa nên bỏ vốn lớn, giữ tiền mặt.", "Tình cảm cần thêm thời gian để hiểu nhau.", "Nghỉ ngơi đủ, tránh lo nghĩ về đêm.", "Nên hoãn chuyến đi xa nếu chưa cần gấp."],
  3: ["Có người thân đứng ra hòa giải, nhà thêm vui.", "Gặp người chỉ đường, công việc tiến triển tốt.", "Hợp tác làm ăn có lợi nếu rõ ràng sổ sách.", "Bạn bè giới thiệu được người hợp ý.", "Có người nhắc nhở việc ăn uống, nên nghe theo.", "Đi cùng bạn thì thuận, có người hỗ trợ."],
  4: ["Nên nhịn một câu, tránh to tiếng trong nhà.", "Đừng nộp đơn, ký giấy khi đang bực bội.", "Chưa phải lúc đòi nợ gắt, mềm mỏng sẽ được.", "Bình tĩnh nói chuyện, đừng giận dỗi kéo dài.", "Để ý huyết áp, giữ đầu óc thư thái.", "Đi đường chậm rãi, nhường nhịn khi lái xe."],
  5: ["Gia đạo hòa thuận, có tin vui về nhà.", "Làm việc chăm chỉ được ghi nhận, có thể được thưởng.", "Thu nhập khá, buôn bán đắt hàng.", "Tình cảm êm đềm, hợp tính toán chuyện lâu dài.", "Sức khỏe tốt, ăn ngon ngủ yên.", "Đi xa thuận buồm xuôi gió."],
  6: ["Chưa nên dọn nhà hay sửa lớn, đợi thời điểm tốt hơn.", "Việc đang chờ duyệt, kiên nhẫn thêm ít lâu.", "Giữ tiền, chưa nên góp vốn hay cho vay.", "Chuyện cưới hỏi nên chuẩn bị kỹ, chưa cần vội.", "Bồi bổ sức khỏe, tránh làm việc quá sức.", "Hoãn chuyến đi nếu thời tiết hay giấy tờ chưa ổn."],
  7: ["Con cháu hiếu thảo, ông bà khỏe mạnh.", "Được người trên thương và nâng đỡ.", "Tiền bạc ổn định nhờ sự tiết kiệm của gia đình.", "Người thương biết quan tâm cả gia đình hai bên.", "Người lớn tuổi trong nhà khởi sắc, mau hồi phục.", "Về quê thăm nhà là điều nên làm."],
  8: ["Gia đình ủng hộ việc học hành của bạn.", "Thi cử, phỏng vấn thuận lợi nếu chuẩn bị chu đáo.", "Đầu tư cho học tập là khoản đáng giá.", "Gặp người cùng chí hướng qua con đường học tập.", "Nhớ nghỉ mắt và ngủ đủ khi học nhiều.", "Đi học, đi công tác xa đều có kết quả."],
  9: ["Giữ nếp nhà, chưa nên thay đổi lớn.", "Giữ vị trí hiện tại, chưa phải lúc nhảy việc.", "Dựa vào khách quen, chưa mở thêm hàng mới.", "Tin người đã quen lâu hơn là người mới gặp.", "Dưỡng sức, tránh thức khuya.", "Ở gần nhà là tốt, đi xa nên có người đi cùng."],
  10: ["Đừng đứng ra bảo lãnh cho người trong họ.", "Lời mời việc quá hấp dẫn cần xem kỹ.", "Của trên trời rơi xuống thường đi kèm rắc rối.", "Cẩn thận người tán tỉnh quá ngọt ngào.", "Đừng tin thuốc quảng cáo thần kỳ.", "Giữ kỹ giấy tờ, tài sản khi đi đường."],
  11: ["Nhà sum vầy, người xa có tin về.", "Đồng nghiệp hòa thuận, việc chung trôi chảy.", "Làm ăn cùng người nhà có lợi.", "Người yêu được gia đình đón nhận.", "Không khí vui vẻ giúp cả nhà khỏe mạnh.", "Có dịp đoàn tụ, đi lại thuận lợi."],
  12: ["Bàn kỹ trong nhà trước khi quyết việc lớn.", "Tìm hiểu kỹ công ty, đối tác trước khi nhận lời.", "Đầu tư từ từ, thử khoản nhỏ trước.", "Tìm hiểu nhau thêm, chậm mà chắc.", "Theo dõi sức khỏe định kỳ.", "Lên kế hoạch kỹ cho chuyến đi xa."],
  13: ["Lòng thành làm khúc mắc trong nhà dần tan.", "Việc khó sẽ có người giúp nếu bạn tận tâm.", "Tiền bạc cải thiện từng bước, đừng nóng vội.", "Chân thành sẽ cảm động được người kia.", "Bệnh lâu có dấu hiệu tốt lên.", "Đi lễ chùa, làm việc thiện thì lòng nhẹ nhõm."],
  14: ["Đừng nói lời chia tay khi đang giận.", "Tránh đối đầu với cấp trên lúc này.", "Đừng quyết định tiền bạc khi cảm xúc chưa ổn.", "Hai người nên tạm dừng tranh cãi, nói chuyện sau.", "Giận dữ ảnh hưởng tim gan, nên thư giãn.", "Hoãn đi xa nếu trong nhà đang có chuyện."],
  15: ["Bỏ qua chuyện cũ, nhà cửa yên vui.", "Việc đang nghẽn sẽ được gỡ.", "Có người trả nợ hoặc giúp đỡ tiền bạc.", "Tha thứ giúp tình cảm hàn gắn.", "Lòng nhẹ thì thân khỏe.", "Đi xa gặp may, gặp người tốt."],
  16: ["Sửa sang những gì hỏng lâu ngày trong nhà.", "Sắp xếp lại cách làm việc trước khi nhận thêm việc.", "Trả bớt nợ cũ trước khi đầu tư mới.", "Giải quyết chuyện cũ chưa rõ với người thương.", "Chữa dứt điểm bệnh cũ, khám lại định kỳ.", "Chưa nên đi xa, ưu tiên việc nhà."],
  17: ["Đề phòng người lạ ra vào nhà.", "Tránh việc mờ ám, giấy tờ không rõ ràng.", "Không vay nóng, không chơi hụi lạ.", "Cẩn thận lời hứa hẹn quá nhanh.", "Hạn chế ra ngoài khuya.", "Đi ban ngày, chọn đường quen."],
  18: ["Gia đình dần khá lên nhờ chăm chỉ.", "Kiên trì với nghề, thành quả đến muộn mà chắc.", "Tiền tích góp từng ít, sau thành nhiều.", "Tình cảm bền vì được vun đắp từng ngày.", "Tập luyện đều sẽ khỏe dần.", "Đi xa học nghề, làm việc có kết quả."],
  19: ["Nhà có khách quý đến chơi.", "Có cơ hội hợp tác tốt, mạnh dạn gặp gỡ.", "Khách hàng mới đem lại nguồn thu.", "Có người giới thiệu duyên lành.", "Tinh thần phấn chấn, sức khỏe tốt.", "Đi gặp đối tác, khách hàng đều thuận."],
  20: ["Chi tiêu vừa phải, nhà sẽ đủ đầy.", "Làm đúng phần mình, đừng ôm đồm.", "Bớt chi tiêu không cần thiết.", "Vừa phải trong tình cảm, đừng đòi hỏi quá.", "Ăn uống điều độ là thuốc tốt nhất.", "Đi gần thì tốt, đi xa nên chuẩn bị kỹ."],
};

/** Quan Thánh, quẻ 1–20. */
export const QUAN_THANH_ASPECTS: Record<number, StickAspects> = {
  1: ["Giữ chữ tín trong nhà, ai cũng nể.", "Được giao việc lớn vì uy tín.", "Làm ăn thuận khi giữ lời với đối tác.", "Người thương tin tưởng bạn tuyệt đối.", "Sức khỏe tốt, khí lực dồi dào.", "Đi xa được người tiếp đón trọng thị."],
  2: ["Có chuyện cần nói rõ nhưng hãy chọn lúc.", "Chuẩn bị đủ lý lẽ rồi mới trình bày.", "Đàm phán nên có giấy tờ đầy đủ.", "Đừng vội hơn thua trong tình cảm.", "Giữ sức, tránh vận động quá mạnh.", "Chuẩn bị kỹ trước chuyến đi."],
  3: ["Xem kỹ người mới vào nhà, như dâu rể hay người giúp việc.", "Chọn cộng sự kỹ trước khi giao việc.", "Chưa nên góp vốn với người mới quen.", "Tìm hiểu kỹ trước khi đặt trọn niềm tin.", "Chọn thầy chọn thuốc cẩn thận.", "Đi cùng người quen, tránh nhóm lạ."],
  4: ["Đừng tranh phần với anh em.", "Tránh tranh công, sửa lỗi nếu đã sai.", "Của phi nghĩa không giữ được lâu.", "Giữ lời hứa với người thương.", "Lo nghĩ nhiều ảnh hưởng giấc ngủ.", "Hoãn đi xa nếu việc chưa xong."],
  5: ["Nhà yên tĩnh, hợp học hành.", "Thời gian tốt để học thêm, chưa vội cầu cạnh.", "Tiền bạc đủ dùng, chưa cần mạo hiểm.", "Tình cảm âm thầm, cần thời gian.", "Dưỡng sức bằng giấc ngủ và sách vở.", "Ở nhà tốt hơn đi xa."],
  6: ["Cả nhà đồng lòng làm việc lớn.", "Làm việc nhóm hiệu quả, được khen thưởng.", "Làm ăn tập thể có lời.", "Gặp người thương qua công việc chung.", "Rèn luyện cùng bạn bè giúp khỏe mạnh.", "Đi đông người thì thuận lợi."],
  7: ["Đừng coi nhẹ chuyện nhỏ trong nhà.", "Không chủ quan với đối thủ.", "Đọc kỹ hợp đồng trước khi ký.", "Đừng coi thường cảm xúc người kia.", "Không chủ quan với triệu chứng nhỏ.", "Kiểm tra kỹ xe cộ, giấy tờ trước khi đi."],
  8: ["Đền đáp công ơn cha mẹ, nhà thêm phúc.", "Người từng giúp bạn lại mở thêm cơ hội.", "Trả ơn đúng lúc, làm ăn thêm thuận.", "Ghi nhận sự hy sinh của người thương.", "Sức khỏe tốt khi lòng thanh thản.", "Đi thăm người cũ, gặp nhiều niềm vui."],
  9: ["Giữ nếp nhà, chưa cần thay đổi.", "Giữ vị trí, chờ thời điểm thích hợp.", "Kiểm tra lại quỹ, chưa mở rộng.", "Chờ thêm tín hiệu từ người kia.", "Giữ sức, nghỉ ngơi đúng giờ.", "Chưa nên đi xa, chờ tin chắc chắn."],
  10: ["Đừng nghe lời ngoài làm mất hòa khí.", "Minh bạch để tránh lời đồn trong công ty.", "Kiểm tra sổ sách, tránh thất thoát.", "Tin nhau, đừng để người ngoài xen vào.", "Tránh căng thẳng do thị phi.", "Đi lại cẩn thận, tránh nơi đông người lộn xộn."],
  11: ["Hòa giải trong nhà có nguyên tắc.", "Thương lượng được nếu giữ lập trường đúng.", "Có thể thỏa thuận chia lợi công bằng.", "Nhường chuyện nhỏ, giữ điều quan trọng.", "Cân bằng làm việc và nghỉ ngơi.", "Đi xa thuận nếu có kế hoạch rõ."],
  12: ["Chi tiêu trong nhà rõ ràng, ai cũng yên tâm.", "Thưởng phạt công minh, được tín nhiệm.", "Quyết toán, đòi nợ đều thuận.", "Thẳng thắn với nhau về tiền bạc.", "Khám sức khỏe tổng quát là việc nên làm.", "Đi công tác thu được kết quả."],
  13: ["Đợi bình tĩnh rồi mới bàn chuyện lớn.", "Hoãn quyết định quan trọng thêm vài ngày.", "Chưa nên kiện tụng, tìm cách hòa giải trước.", "Ngủ một đêm rồi hãy trả lời người kia.", "Nghỉ ngơi giúp đầu óc minh mẫn.", "Đi sáng sớm thì tốt hơn đi tối."],
  14: ["Sống giản dị, nhà mới bền.", "Nhận việc vừa sức, đừng vì danh.", "Không chi tiền cho thể diện.", "Thật lòng hơn là phô trương.", "Bớt áp lực phải chứng tỏ.", "Đi vì việc thật, không đi vì khoe."],
  15: ["Bạn bè thân thiết như người nhà.", "Hợp tác lâu dài có lợi.", "Làm ăn với bạn cũ thuận lợi.", "Tình cảm bền vững, giữ lời hứa.", "Có bạn đồng hành tập luyện.", "Đi cùng bạn thân rất vui."],
  16: ["Lui về lo việc nhà là đúng.", "Rút khỏi việc không hợp, bàn giao chu đáo.", "Thu hẹp chi tiêu có kế hoạch.", "Cho nhau khoảng lặng, không bỏ mặc.", "Nghỉ ngơi lấy lại sức.", "Về nhà nghỉ ngơi tốt hơn đi xa."],
  17: ["Nhận lỗi với người nhà nếu đã sai.", "Giữ lời với đồng nghiệp, tránh đổi phe.", "Trả đủ những gì đã hứa.", "Thành thật xin lỗi để hàn gắn.", "Tránh lo âu kéo dài.", "Hoãn đi xa, giải quyết việc gần trước."],
  18: ["Học thêm việc nhà, kỹ năng sống.", "Rèn nghề trước khi nhận việc lớn.", "Làm ăn nhỏ trước, lớn sau.", "Vun đắp từ những việc nhỏ.", "Tập luyện đều đặn.", "Đi học nghề ở gần trước."],
  19: ["Làm việc chính đáng, cả nhà tự hào.", "Được đồng nghiệp tin tưởng, dễ thăng tiến.", "Khách hàng tin vì sự công bằng.", "Người thương nể vì bạn sống ngay thẳng.", "Tinh thần vững, sức khỏe tốt.", "Đi đâu cũng được tiếp đón."],
  20: ["Cứng mềm đúng lúc, nhà yên vui.", "Kiên định nhưng biết lắng nghe.", "Làm ăn vừa phải, không mạo hiểm.", "Biết nhường mà không nhún mất mình.", "Cân bằng làm việc và nghỉ ngơi.", "Đi xa có kế hoạch thì thuận."],
};
