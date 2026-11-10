/**
 * 64 quẻ Kinh Dịch theo thứ tự Văn Vương (King Wen).
 *
 * `binary`: đúng 6 ký tự, hào sơ đứng trước (dưới → trên). '1' = hào dương, '0' = hào âm.
 * `symbol`: ký tự Unicode Yijing theo cùng thứ tự (U+4DC0 là quẻ 1).
 *
 * Phần luận là diễn đạt tham khảo văn hóa, dựa trên hình ảnh quen thuộc của từng quẻ
 * trong cách hiểu dân gian. Không phải lời trích một sớ cổ, không phải tiên đoán.
 */

export type HexagramData = {
  /** 1–64, thứ tự Văn Vương */
  number: number;
  nameVi: string;
  nameCn: string;
  /** 6 ký tự, dưới → trên; '1' dương, '0' âm */
  binary: string;
  symbol: string;
  overview: string;
  career: string;
  wealth: string;
  love: string;
  family: string;
  health: string;
  advice: string;
  fortuneLevel: "dai-cat" | "cat" | "binh" | "hung" | "dai-hung";
};

export const HEXAGRAMS: HexagramData[] = [
  {
    number: 1,
    nameVi: "Thuần Càn",
    nameCn: "乾",
    binary: "111111",
    symbol: "䷀",
    overview:
      "Sáu hào dương, hình ảnh trời vận hành không nghỉ. Trong cách luận tham khảo, quẻ gợi thế chủ động, tự lập và có chí lớn.",
    career:
      "Sự nghiệp hợp với người dám đứng ra gánh việc và giữ kỷ luật. Nên lấy năng lực thật làm gốc, tránh ỷ vào danh tiếng.",
    wealth:
      "Tài lộc thường được xem là đến từ sự bền bỉ và quyết đoán đúng lúc. Giữ chữ tín khi hợp tác vững hơn là mở rộng quá nhanh.",
    love:
      "Tình cảm cần sự thẳng thắn và tôn trọng lẫn nhau. Người tính mạnh nên biết nhường thì quan hệ mới không thành ganh đua.",
    family:
      "Gia đạo thuận khi có người trụ cột mà vẫn lắng nghe mọi người. Khí thế quá cứng dễ tạo khoảng cách giữa các thế hệ.",
    health:
      "Nên giữ nhịp sinh hoạt điều độ, tránh làm việc đến kiệt sức. Đau đầu và căng thẳng kéo dài thì nên gặp thầy thuốc, quẻ không thay cho việc khám.",
    advice:
      "Giữ chí lớn nhưng đi từng bước chắc. Mạnh mà biết chừng mực thì cách luận dân gian mới gọi quẻ này là hanh thông.",
    fortuneLevel: "dai-cat",
  },
  {
    number: 2,
    nameVi: "Thuần Khôn",
    nameCn: "坤",
    binary: "000000",
    symbol: "䷁",
    overview:
      "Sáu hào âm, hình ảnh đất nâng đỡ và nuôi dưỡng. Cách luận cổ thường xem đây là thế nhu thuận, kiên nhẫn và hợp tác.",
    career:
      "Hợp vai trò hỗ trợ, tích lũy chuyên môn và làm việc đều. Thời này nên theo việc đã có hướng, chưa nên một mình phá cách.",
    wealth:
      "Tài lộc nghiêng về tích tiểu thành đại, giữ của và làm ăn chắc. Tránh đầu tư theo phong trào hoặc đứng tên giúp người không rõ.",
    love:
      "Tình cảm bền khi biết chăm sóc và thấu hiểu. Nhường nhịn là đẹp, nhưng không nên đánh mất tiếng nói của mình.",
    family:
      "Nhà ấm khi mọi người cùng gánh việc. Người lớn tuổi hoặc người lo việc nhà thường là chỗ dựa thầm lặng.",
    health:
      "Nên nghỉ đủ và ăn uống điều độ. Cơ thể lúc này cần hồi phục hơn là gắng sức; mệt kéo dài thì đi khám.",
    advice:
      "Nhu mà có giới hạn thì mới bền. Kiên nhẫn chờ thời, đồng thời giữ nguyên tắc riêng của mình.",
    fortuneLevel: "cat",
  },
  {
    number: 3,
    nameVi: "Thủy Lôi Truân",
    nameCn: "屯",
    binary: "100010",
    symbol: "䷂",
    overview:
      "Sấm dưới nước, hình ảnh muôn vật mới nhóm mà còn gian nan. Quẻ thường được hiểu là khởi đầu khó, chưa phải lúc thúc ép kết quả.",
    career:
      "Việc mới dễ vướng thủ tục hoặc điều kiện chưa đủ. Nên chuẩn bị kỹ, tìm người chỉ dẫn, tránh nhảy việc lúc đang rối.",
    wealth:
      "Tiền bạc đến chậm, vốn dễ bị giam ở việc chưa xong. Chưa nên dồn hết tiền vào một mối khi nền chưa vững.",
    love:
      "Tình cảm mới chớm, dễ hiểu lầm vì hai bên còn dò xét. Nói rõ ý sẽ hơn là trách nhau.",
    family:
      "Chuyện nhà đang ở giai đoạn sắp xếp lại. Việc lớn nên bàn bạc trước khi quyết.",
    health:
      "Cơ thể dễ mệt khi đổi nhịp sống. Nghỉ đúng giờ và xử lý sớm những khó chịu nhỏ trước khi chúng kéo dài.",
    advice:
      "Khó ở lúc đầu là điều sách vở thường nhắc với quẻ Truân. Giữ vững, đừng bỏ giữa chừng cũng đừng nóng vội.",
    fortuneLevel: "binh",
  },
  {
    number: 4,
    nameVi: "Sơn Thủy Mông",
    nameCn: "蒙",
    binary: "010001",
    symbol: "䷃",
    overview:
      "Núi trên nước, hình ảnh còn mờ, cần được khai mở. Quẻ hay được luận là thời học hỏi, chưa nên tự cho mình đã rõ mọi chuyện.",
    career:
      "Công việc cần người có kinh nghiệm và cần đúng quy trình. Tự quyết khi chưa nắm việc thì dễ sai.",
    wealth:
      "Tiền bạc chưa sáng, hợp đồng nên đọc kỹ. Tránh góp vốn chỉ vì nghe lời thuyết phục.",
    love:
      "Tình cảm dễ mơ hồ khi một bên chưa nói thật ý mình. Hỏi thẳng còn hơn đoán.",
    family:
      "Trong nhà có chuyện cần giảng hòa hoặc dạy bảo, nhất là với trẻ nhỏ hay người mới vào nhà. Nhẹ lời thì dễ thông.",
    health:
      "Những dấu hiệu chưa rõ nên được người có chuyên môn xem, thay vì tự ý thuốc. Giữ tinh thần bớt lo nghĩ mông lung.",
    advice:
      "Biết mình chưa rõ là bước đầu của sáng suốt. Tìm người đáng tin để hỏi, rồi mới làm.",
    fortuneLevel: "binh",
  },
  {
    number: 5,
    nameVi: "Thủy Thiên Nhu",
    nameCn: "需",
    binary: "111010",
    symbol: "䷄",
    overview:
      "Nước trên trời, hình ảnh mây chờ mưa, việc cần đủ thời. Quẻ thường được xem là hãy chờ có chừng và nuôi sức, không phải ngồi không.",
    career:
      "Cơ hội còn đang nuôi, chưa đến lúc giành. Chuẩn bị tay nghề và hồ sơ thì khi việc mở sẽ kịp.",
    wealth:
      "Nên giữ quỹ dự phòng, chưa tất tay. Khoản đang chờ có thể về, nhưng cần đúng hẹn và đúng giấy tờ.",
    love:
      "Tình cảm đang chờ một phía sẵn sàng. Ép câu trả lời lúc này dễ phản tác dụng.",
    family:
      "Việc nhà thuận nếu mọi người chịu chờ nhau, không đổ lỗi vì chậm. Một bữa cơm đủ đầy cũng là cách nuôi khí nhà.",
    health:
      "Nên dưỡng hơn là chữa vội. Ăn uống ấm áp và tránh lao lực khi cơ thể đang cần tích sức.",
    advice:
      "Chờ mà vẫn chuẩn bị thì mới đúng tinh thần quẻ Nhu. Thúc việc chưa chín dễ hỏng.",
    fortuneLevel: "cat",
  },
  {
    number: 6,
    nameVi: "Thiên Thủy Tụng",
    nameCn: "訟",
    binary: "010111",
    symbol: "䷅",
    overview:
      "Trời và nước đi ngược chiều, hình ảnh tranh biện, kiện cáo. Cách luận dân gian xem quẻ này là bất đồng và giấy tờ dễ kéo dài.",
    career:
      "Chỗ làm dễ có tranh công hoặc hiểu lầm với cấp trên. Nên giữ bằng chứng, nói có chừng, tránh đẩy việc thành đối đầu.",
    wealth:
      "Tiền bạc dễ vướng nợ, đặt cọc hoặc chia phần không rõ. Chưa nên ký khi điều khoản còn tranh cãi.",
    love:
      "Lời qua tiếng lại làm tình cảm mau mệt. Bất đồng về nguyên tắc thì nên tạm dừng, đừng tìm người phân xử lúc đang nóng.",
    family:
      "Chuyện nhà dễ thành tranh chấp họ hàng hoặc đất đai trong cách hiểu dân gian. Nhờ người trung gian ôn hòa sớm thì đỡ căng.",
    health:
      "Hay nóng ruột và mất ngủ vì chấp nhất. Bớt tranh luận lúc mệt, nghỉ cho đều.",
    advice:
      "Được kiện chưa chắc đã lợi. Nhường một bước để giữ việc lớn là lời khuyên thường gặp với quẻ Tụng.",
    fortuneLevel: "hung",
  },
  {
    number: 7,
    nameVi: "Địa Thủy Sư",
    nameCn: "師",
    binary: "010000",
    symbol: "䷆",
    overview:
      "Đất trên nước, hình ảnh đông người cần kỷ luật như một đạo quân. Quẻ được luận là có việc phải tổ chức, không phải lúc làm riêng lẻ.",
    career:
      "Hợp vai trò quản lý hoặc dự án đông người. Cần người chủ sự công minh, thưởng phạt rõ ràng.",
    wealth:
      "Tiền đến từ tập thể, quỹ chung hoặc làm theo tổ đội. Giữ sổ sách minh bạch để tránh tiếng.",
    love:
      "Quan hệ cần ranh giới rõ. Người hay áp đặt nên nới tay thì tình cảm mới đỡ mệt.",
    family:
      "Nhà đông người thì cần nề nếp và phân việc. Tránh để một người ôm hết rồi sinh oán.",
    health:
      "Sức khỏe cần nhịp ngủ, ăn và vận động đều. Không nên tự ý dùng thuốc liều mạnh.",
    advice:
      "Đông người mà không có phép tắc thì dễ loạn. Chọn người đáng tin đứng ra cầm nhịp.",
    fortuneLevel: "binh",
  },
  {
    number: 8,
    nameVi: "Thủy Địa Tỷ",
    nameCn: "比",
    binary: "000010",
    symbol: "䷇",
    overview:
      "Nước trên đất, hình ảnh gần gũi và liên kết. Quẻ thường được hiểu là tìm bạn đồng hành và hợp tác đúng người.",
    career:
      "Hợp làm nhóm hoặc gắn với tập thể có tiếng. Khi đã thấy chỗ hợp thì nên gắn sớm, đừng chần chừ mãi.",
    wealth:
      "Tài lộc thuận khi góp sức với người ngay thẳng. Xét kỹ đối tác trước khi chung quỹ.",
    love:
      "Tình cảm có duyên gần, dễ tiến nếu cả hai thành thật. Tránh so đo với mối quan hệ cũ.",
    family:
      "Họ hàng và hàng xóm được dân gian xem là nguồn hỗ trợ của quẻ này. Giữ lễ thì tình thêm bền.",
    health:
      "Tinh thần dễ khá khi có người bầu bạn. Vận động nhẹ cùng người thân hơn là thu mình.",
    advice:
      "Gần người lành thì mình cũng dễ sáng. Đã chọn thì giữ chữ tín, đừng bắt cá nhiều tay.",
    fortuneLevel: "cat",
  },
  {
    number: 9,
    nameVi: "Phong Thiên Tiểu Súc",
    nameCn: "小畜",
    binary: "111011",
    symbol: "䷈",
    overview:
      "Gió trên trời, mây mỏng chưa thành mưa lớn. Quẻ hay được xem là tích lũy nhỏ, thành quả còn khiêm.",
    career:
      "Việc đang tiến nhưng chưa đủ lực để bứt phá. Giữ những kết quả nhỏ và hoàn thiện tay nghề, tránh đòi vị trí quá sớm.",
    wealth:
      "Khoản dành dụm và thu nhập lặt vặt lúc này có ích. Khoản lớn nên hoãn, chưa phải lúc tất tay.",
    love:
      "Những cử chỉ nhỏ có giá trị hơn lời hứa lớn. Đừng vì một chuyện chưa như ý mà phủ nhận cả mối quan hệ.",
    family:
      "Nhà ổn nếu biết tiết chế chi tiêu và nhường chuyện vặt. Việc lớn của dòng họ chưa đến lúc thúc.",
    health:
      "Bệnh vặt dễ có, trị sớm thì nhẹ. Trời gió thì giữ ấm cổ họng, đó là kiêng khem dân gian, không phải chẩn đoán.",
    advice:
      "Đừng chê việc nhỏ. Chúng đang nuôi việc lớn về sau.",
    fortuneLevel: "cat",
  },
  {
    number: 10,
    nameVi: "Thiên Trạch Lý",
    nameCn: "履",
    binary: "110111",
    symbol: "䷉",
    overview:
      "Trời trên đầm, hình ảnh bước trên đường dễ trượt, như đi sau hổ. Quẻ được luận là phải giữ lễ và đi từng bước cẩn trọng.",
    career:
      "Môi trường khắt khe hoặc hay tiếp xúc với người có quyền. Lễ độ và đúng việc thì yên, sơ suất nhỏ cũng dễ bị soi.",
    wealth:
      "Tiền bạc đi sát rủi ro, hợp đồng cần đọc kỹ điều khoản phạt. Không nên vì nể mà đứng bảo lãnh.",
    love:
      "Tình cảm cần tôn trọng ranh giới của nhau. Đùa quá đà hoặc cường điệu cảm xúc dễ thành va chạm.",
    family:
      "Trong nhà nên giữ phép tắc, nhất là lúc có khách hoặc bậc trên. Lời nói mềm mà việc làm rõ.",
    health:
      "Dân gian hay nhắc quẻ này với sự sơ ý khi đi đứng. Bước khoan thai, tránh chỗ trơn; đau sau va chạm thì đi khám.",
    advice:
      "Đi đúng lễ thì chỗ nguy cũng dễ hóa yên. Can đảm có thể có, liều lĩnh thì nên tránh.",
    fortuneLevel: "binh",
  },
  {
    number: 11,
    nameVi: "Địa Thiên Thái",
    nameCn: "泰",
    binary: "111000",
    symbol: "䷊",
    overview:
      "Đất trên trời, khí âm dương giao hòa, hình ảnh thông suốt. Trong cách luận tham khảo, Thái là thời trong ngoài tương ứng, việc dễ hanh.",
    career:
      "Công việc dễ thông, cấp trên và đồng nghiệp dễ bắt nhịp. Nên tranh thủ hoàn thành việc lớn, đồng thời nhớ thời thịnh rồi cũng đổi.",
    wealth:
      "Tài lộc được xem là thuận, nguồn thu và cửa chi gặp nhau. Vẫn nên dành một phần phòng khi thời suy.",
    love:
      "Tình cảm hòa hợp, dễ tiến tới chuyện lâu dài. Giữ sự trân trọng lúc đang vui, đừng chủ quan.",
    family:
      "Gia đạo ấm, việc nhà và việc ngoài hỗ trợ nhau. Sum họp và làm việc tốt trong họ được coi là đẹp.",
    health:
      "Khí sắc dễ đều nếu sinh hoạt điều độ. Đừng vì thấy khỏe mà thức khuya hoặc ăn uống quá độ.",
    advice:
      "Thông rồi vẫn nhớ lúc bế tắc. Giữ khiêm và biết chia sẻ thì cái hanh của quẻ Thái mới lâu.",
    fortuneLevel: "dai-cat",
  },
  {
    number: 12,
    nameVi: "Thiên Địa Bĩ",
    nameCn: "否",
    binary: "000111",
    symbol: "䷋",
    overview:
      "Trời trên đất, khí không giao, hình ảnh bế tắc. Quẻ thường được hiểu là trong ngoài cách trở, muốn làm mà chưa thông.",
    career:
      "Ý kiến dễ không được nghe, đề án dễ bị gác. Nên thu mình giữ việc, chưa nên nhảy việc liều hoặc cầu cạnh.",
    wealth:
      "Tiền vào chậm, tiền ra dễ vì việc không như kế hoạch. Hạn chế cho vay và ký kết mới.",
    love:
      "Hai người khó hiểu nhau. Ép sum họp lúc này dễ thêm tổn thương; cho nhau khoảng lặng còn hơn cãi cho ra nhẽ.",
    family:
      "Việc nhà và việc ngoài ít hỗ trợ nhau. Giữ lễ tối thiểu với họ hàng, tránh tranh hơn thua.",
    health:
      "Dễ mệt và u uất trong cách luận dân gian của quẻ bế. Vận động nhẹ, ra ngoài trời; buồn kéo dài thì nên tìm người hỗ trợ và gặp thầy thuốc nếu cần.",
    advice:
      "Bĩ là lúc chưa nên xông, không phải là hết đường. Giữ mình cho tử tế, chờ khí giao trở lại.",
    fortuneLevel: "hung",
  },
  {
    number: 13,
    nameVi: "Thiên Hỏa Đồng Nhân",
    nameCn: "同人",
    binary: "101111",
    symbol: "䷌",
    overview:
      "Trời trên lửa, ánh sáng lên cao, hình ảnh cùng người hướng về việc chung. Quẻ hay được luận là hợp quần, công khai và đồng tâm.",
    career:
      "Hợp việc mở, hội nhóm hoặc dự án cần sự đồng thuận. Giữ công bằng thì bạn hữu mới bền.",
    wealth:
      "Tài lộc đến từ hợp tác minh bạch, chia phần rõ. Làm ăn cửa sau dễ sinh tiếng.",
    love:
      "Tình cảm đẹp khi có chung chí hướng, không chỉ dựa vào cảm xúc nhất thời. Đường đường chính chính thì hai nhà dễ chấp nhận.",
    family:
      "Nhà hòa khi mọi người được bàn việc. Việc chung nên nói trước mặt nhau.",
    health:
      "Tinh thần dễ sáng khi ở cạnh bạn bè lành mạnh. Tránh tụ tập khuya và rượu chè quá độ.",
    advice:
      "Cùng người thì phải cùng lẽ phải. Kết giao rộng mà lòng vẫn ngay.",
    fortuneLevel: "cat",
  },
  {
    number: 14,
    nameVi: "Hỏa Thiên Đại Hữu",
    nameCn: "大有",
    binary: "111101",
    symbol: "䷍",
    overview:
      "Lửa trên trời, sáng và có nhiều. Quẻ thường được xem là thời thịnh, của cải và danh tiếng đều có chỗ dựa.",
    career:
      "Thành quả dễ được công nhận, hợp nhận trách nhiệm lớn. Giữ đức khi đang có quyền thì người mới phục.",
    wealth:
      "Tài lộc được luận là dồi dào, nhưng cần quản chứ không phô. Chia sẻ một phần được dân gian coi là cách giữ của.",
    love:
      "Tình cảm rực rỡ, dễ có người theo. Chọn người thật lòng, đừng chỉ nhìn vẻ hào nhoáng.",
    family:
      "Gia cảnh khá thì nên dùng cái có để sum họp và đỡ người thân. Tránh khoe của gây ghen ghét trong họ.",
    health:
      "Lửa mạnh dễ hóa nóng trong và mất ngủ nếu tham việc. Ăn thanh, bớt rượu; đó là lối dưỡng dân gian, không thay lời thầy thuốc.",
    advice:
      "Có nhiều mà khiêm thì mới giữ được. Đại Hữu đẹp ở chỗ sáng mà không áp người.",
    fortuneLevel: "dai-cat",
  },
  {
    number: 15,
    nameVi: "Địa Sơn Khiêm",
    nameCn: "謙",
    binary: "001000",
    symbol: "䷎",
    overview:
      "Đất trên núi, chỗ cao mà biết hạ mình. Quẻ Khiêm trong cách luận cổ thường được quý vì nhường nhịn mà vẫn có sức.",
    career:
      "Dễ được lòng người nhờ chăm việc và không tranh tiếng. Cơ hội thường đến với người chịu khó hơn là kẻ khoe.",
    wealth:
      "Của cải tăng chậm mà bền, hợp tích lũy âm thầm. Tránh phô trương lúc vừa khá.",
    love:
      "Tình cảm chân khi biết trân trọng đối phương. Nhường không có nghĩa là chịu đựng điều vô lý.",
    family:
      "Nhà yên khi người có tiếng nói biết xuống giọng. Kính trên nhường dưới là nếp được xem là đẹp với quẻ này.",
    health:
      "Bệnh dễ lui nếu chịu nghỉ và không cố chứng tỏ mình vẫn khỏe. Đau kéo dài thì đi khám, đừng lấy quẻ làm chẩn đoán.",
    advice:
      "Khiêm là hạ mình có chừng, không phải tự coi mình vô dụng. Càng có tài càng nên nhẹ lời.",
    fortuneLevel: "cat",
  },
  {
    number: 16,
    nameVi: "Lôi Địa Dự",
    nameCn: "豫",
    binary: "000100",
    symbol: "䷏",
    overview:
      "Sấm trên đất, khí dương động khiến muôn vật vui theo. Quẻ thường được hiểu là hứng khởi, nhưng vui phải có việc đã chuẩn bị.",
    career:
      "Không khí làm việc dễ phấn chấn, hợp việc ra mắt hoặc sự kiện. Vui mà vẫn cần người cầm nhịp, kẻo thành chơi.",
    wealth:
      "Tiền bạc dễ chi cho tiệc tùng và quà cáp. Nên chừa khoản thiết yếu trước khi tiêu khoản vui.",
    love:
      "Tình cảm tươi, dễ làm lành và hẹn hò. Đừng để vui nhất thời thành lời hứa chưa nghĩ kỹ.",
    family:
      "Nhà có tiếng cười, hợp sum họp và chuyện vui. Người lớn nhắc khéo để trẻ không quá đà.",
    health:
      "Tinh thần tốt thì sức cũng dễ chịu. Ăn uống lúc mừng vẫn nên có mức, tránh thức khuya nhiều ngày liền.",
    advice:
      "Dự là vui vì việc đã sắp sẵn. Chuẩn bị xong rồi hãy hưởng, đừng hưởng trước khi xong.",
    fortuneLevel: "cat",
  },
  {
    number: 17,
    nameVi: "Trạch Lôi Tùy",
    nameCn: "隨",
    binary: "100110",
    symbol: "䷐",
    overview:
      "Đầm trên sấm, hình ảnh thuận theo thời và theo việc đáng theo. Quẻ hay được luận là uyển chuyển, đi cùng dòng đúng chứ không phải a dua.",
    career:
      "Hợp việc cần thích ứng hoặc theo người đi trước đáng tin. Theo người phải chọn người có đức, không theo đám đông ồn ào.",
    wealth:
      "Tài lộc đến khi biết xoay theo thời vụ. Phương án linh hoạt thường hợp hơn là khóa cứng một lối.",
    love:
      "Tình cảm thuận khi biết chiều nhau những chuyện nhỏ. Chiều quá hóa mất mình thì nên dừng.",
    family:
      "Nhà hòa nếu mỗi người chịu điều chỉnh giờ giấc và thói quen. Việc họ hàng đi theo lệ chung thì dễ yên.",
    health:
      "Cơ thể cần nương theo nhịp nghỉ, đừng chống lại cơn mệt. Giữ giấc ngủ đều.",
    advice:
      "Tùy không phải là nghe theo tất cả. Theo điều đúng thời, mà vẫn giữ chủ kiến.",
    fortuneLevel: "cat",
  },
  {
    number: 18,
    nameVi: "Sơn Phong Cổ",
    nameCn: "蠱",
    binary: "011001",
    symbol: "䷑",
    overview:
      "Núi trên gió, khí úng, hình ảnh việc đã mục cần được sửa. Quẻ Cổ thường được hiểu là dọn gốc rễ và chữa thói quen cũ.",
    career:
      "Công việc tồn đọng hoặc quy trình hỏng cần được xử lý. Đây là lúc sửa, chưa phải lúc khoe thành tích mới.",
    wealth:
      "Tiền dễ thất thoát vì lỗ hổng cũ: nợ, sổ sách, thói chi tiêu. Soát lại từng khoản trước khi mở việc mới.",
    love:
      "Quan hệ cũ có vết nứt thì cần nói thật và sửa. Chỉ phủ bên ngoài thì chuyện cũ sẽ trở lại.",
    family:
      "Việc nhà gắn với nếp cũ cần được chỉnh từng việc cụ thể. Sửa thói, không phải đổ lỗi cho nhau.",
    health:
      "Triệu chứng đã lâu nên được xem lại tận gốc với người có chuyên môn. Tránh chữa đối phó cho qua.",
    advice:
      "Việc hư vẫn có thể sửa. Bắt tay vào chỗ mục, đừng xấu hổ vì phải làm lại từ đầu.",
    fortuneLevel: "binh",
  },
  {
    number: 19,
    nameVi: "Địa Trạch Lâm",
    nameCn: "臨",
    binary: "110000",
    symbol: "䷒",
    overview:
      "Đất trên đầm, hình ảnh đến gần và trông nom. Quẻ thường được xem là thời tiến tới, có người trên dõi theo việc dưới.",
    career:
      "Có cơ hội được giao việc hoặc được hướng dẫn. Nên tỏ ra chăm và trung thực, vì thời thuận này không dài mãi.",
    wealth:
      "Tài chính khả quan trong một giai đoạn, hợp nhận nguồn thu mới có kiểm soát. Dành dụm khi đang khá.",
    love:
      "Tình cảm tiến gần, dễ ngỏ lời hoặc gặp mặt thường hơn. Trân trọng từng lần gặp, đừng coi là hiển nhiên.",
    family:
      "Bậc trên quan tâm con cháu, hợp thăm hỏi và dạy bảo. Lời khuyên của người đi trước đáng nghe.",
    health:
      "Nên khám định kỳ lúc còn khỏe. Đầm trong hình ảnh quẻ chỉ là liên tưởng dân gian về sự ẩm, không phải kết luận bệnh.",
    advice:
      "Đến gần để nâng đỡ, không để soi mói. Biết thời này có hạn thì càng nên làm cho tử tế.",
    fortuneLevel: "cat",
  },
  {
    number: 20,
    nameVi: "Phong Địa Quan",
    nameCn: "觀",
    binary: "000011",
    symbol: "䷓",
    overview:
      "Gió trên đất, đi khắp mà quan sát. Quẻ hay được luận là nhìn rộng, làm gương và chưa vội phán.",
    career:
      "Hợp khảo sát và học hỏi trước khi quyết. Người đang ở vị trí cao nên giữ tác phong để người khác còn noi.",
    wealth:
      "Chưa nên xuống tiền lớn khi mới thấy bề ngoài. So sánh vài nguồn rồi hãy chọn.",
    love:
      "Cần thời gian tìm hiểu, xem cách đối phương cư xử với người khác. Đẹp lúc ban đầu chưa đủ.",
    family:
      "Cách ăn nói trong nhà là tấm gương. Trẻ nhìn người lớn mà học.",
    health:
      "Nên theo dõi triệu chứng vài ngày, ghi lại rồi mới kết luận cùng thầy thuốc. Tránh tự chẩn quá sớm.",
    advice:
      "Xem cho kỹ và cho công bằng. Nhìn người cũng là lúc soi lại mình.",
    fortuneLevel: "cat",
  },
  {
    number: 21,
    nameVi: "Hỏa Lôi Phệ Hạp",
    nameCn: "噬嗑",
    binary: "100101",
    symbol: "䷔",
    overview:
      "Lửa trên sấm, hình ảnh cắn đứt vật đang ngáng. Quẻ thường được hiểu là phải xử lý trở ngại và phân minh đúng sai.",
    career:
      "Có nút thắt cần gỡ: kỷ luật, tranh chấp nhỏ hoặc việc tồn. Nói rõ quy định và áp dụng đều thì việc mới thông.",
    wealth:
      "Khoản chưa minh bạch thì nên làm rõ, dù mất công. Nuốt chuyện không ổn để đó dễ thành lỗ lớn.",
    love:
      "Cần nói cho đứt một hiểu lầm đang mắc. Nặng lời thì hỏng, im mãi cũng không xong.",
    family:
      "Chuyện nhà có điểm nghẽn thì nên họp một lần cho rõ. Tránh để người ngoài xen vào lúc đang phân xử.",
    health:
      "Răng, miệng và tiêu hóa là liên tưởng dân gian của hình ảnh cái miệng. Ăn chậm; đau thì đi khám, đừng tự suy từ quẻ.",
    advice:
      "Gỡ cái nghẽn thì việc mới xuôi. Quyết đoán có lý, không phải trừng phạt cho hả giận.",
    fortuneLevel: "binh",
  },
  {
    number: 22,
    nameVi: "Sơn Hỏa Bí",
    nameCn: "賁",
    binary: "101001",
    symbol: "䷕",
    overview:
      "Núi trên lửa, ánh sáng tô điểm chân núi. Quẻ Bí thường được xem là văn vẻ và trang sức, nhưng gốc vẫn cần chất thật.",
    career:
      "Hợp việc trình bày, thiết kế, ngoại giao hoặc làm đẹp hình ảnh. Đừng chỉ lo vỏ mà bên trong chưa vững.",
    wealth:
      "Chi cho diện mạo và thương hiệu có ích nếu vừa sức. Tránh vay để khoe.",
    love:
      "Một món quà nhỏ đúng ý hơn là phô trương. Lòng thành vẫn quyết định.",
    family:
      "Nhà cửa chỉnh trang thì khí gia đạo được dân gian xem là sáng hơn. Sửa cái nhìn thấy, đồng thời giữ nếp nhà.",
    health:
      "Da và giấc ngủ dễ chịu nếu bớt thức khuya trước màn hình. Chăm sóc bên ngoài nên đi cùng nghỉ ngơi.",
    advice:
      "Đẹp để làm rõ cái tốt, không để che cái kém. Có chất rồi hãy thêm văn.",
    fortuneLevel: "cat",
  },
  {
    number: 23,
    nameVi: "Sơn Địa Bác",
    nameCn: "剝",
    binary: "000001",
    symbol: "䷖",
    overview:
      "Núi trên đất, dương bị bào mòn gần hết. Quẻ thường được hiểu là hao mòn, nên thủ chứ chưa nên tiến.",
    career:
      "Vị trí hoặc uy tín dễ bị xói. Giữ việc cốt lõi, tránh tranh giành lúc thế yếu.",
    wealth:
      "Của cải hao, đồ đạc dễ hỏng, khoản chi không tên dễ tăng. Khoan mua sắm lớn, rà lại những chỗ rò rỉ.",
    love:
      "Tình cảm dễ phai nếu chỉ dựa vào thói quen. Nên nói chuyện chân thành; nếu đã cạn thì đừng níu bằng trách móc.",
    family:
      "Nhà cần tu sửa cái cũ kỹ trước khi nhỏ thành đổ. Hòa với hàng xóm lúc này quan trọng hơn thắng thua.",
    health:
      "Sức dễ suy trong cách luận dân gian của quẻ hao. Nghỉ nhiều hơn; mệt kéo dài thì khám, quẻ không chỉ tên bệnh.",
    advice:
      "Đây là lúc bớt chứ không phải lúc liều. Giữ phần sức còn lại cho qua cơn hao.",
    fortuneLevel: "hung",
  },
  {
    number: 24,
    nameVi: "Địa Lôi Phục",
    nameCn: "復",
    binary: "100000",
    symbol: "䷗",
    overview:
      "Đất trên sấm, một hào dương trở lại từ dưới. Quẻ Phục hay được luận là hồi phục, quay về nếp tốt sau một đoạn suy.",
    career:
      "Việc tưởng chùng bắt đầu nhích lại. Nên tái khởi bằng nhịp nhỏ, đừng đòi ngay mức cũ.",
    wealth:
      "Tài chính có dấu hiệu vào trở lại từng khoản nhỏ. Trả nợ cũ và lập lại thói quen ghi chép.",
    love:
      "Có thể làm lành nếu cả hai thật lòng sửa. Quay lại phải khác trước, không lặp lỗi cũ.",
    family:
      "Chuyện lạnh trong nhà có thể ấm dần. Một bữa cơm sum họp được xem là khởi đầu đẹp.",
    health:
      "Bệnh có xu hướng lui nếu chịu dưỡng. Đừng vừa khá đã lao ngay vào lịch cũ.",
    advice:
      "Một tia sáng trở lại cũng đáng quý. Nuôi nó bằng thói quen tốt, đừng dập tắt bằng nóng vội.",
    fortuneLevel: "cat",
  },
  {
    number: 25,
    nameVi: "Thiên Lôi Vô Vọng",
    nameCn: "無妄",
    binary: "100111",
    symbol: "䷘",
    overview:
      "Trời trên sấm, hành động ngay thẳng, không dối. Quẻ thường được hiểu là cứ lẽ phải mà làm, đừng nuôi mưu mẹo.",
    career:
      "Làm đúng chức trách thì yên, dù chưa được khen ngay. Tránh thủ đoạn và tránh nhận việc không thuộc phần mình.",
    wealth:
      "Tiền chính đáng thì giữ được. Khoản bất ngờ, dễ dãi quá, cần xét lại nguồn.",
    love:
      "Tình cảm bền khi không giả vờ. Nói thật sớm còn hơn giữ một hình ảnh hoàn hảo.",
    family:
      "Nhà yên nếu mỗi người không đổ lỗi vô cớ. Việc bất ngờ xảy ra thì xử theo lẽ, đừng đoán già đoán non.",
    health:
      "Giữ nếp sinh hoạt tự nhiên, đừng lạm dụng thuốc bổ. Triệu chứng lạ thì hỏi thầy thuốc, không tự suy từ quẻ.",
    advice:
      "Vô vọng là không làm bừa và không nuôi ảo tưởng. Gặp chuyện ngoài ý muốn thì vẫn giữ lòng ngay, không đổ thừa.",
    fortuneLevel: "cat",
  },
  {
    number: 26,
    nameVi: "Sơn Thiên Đại Súc",
    nameCn: "大畜",
    binary: "111001",
    symbol: "䷙",
    overview:
      "Núi trên trời, sức lớn bị giữ lại để nuôi. Quẻ hay được luận là tích lũy lớn, học nhiều và chưa vội phóng ra.",
    career:
      "Hợp học nâng cao và nhận việc khó để luyện. Chưa nên bỏ việc chỉ vì thấy mình tạm bị kìm.",
    wealth:
      "Vốn nên gom vào việc có nền: học hành hoặc tài sản bền. Tránh tung tiền để chứng tỏ bản lĩnh.",
    love:
      "Tình cảm cần thời gian tôi luyện. Hiểu tính nhau rồi hãy tính chuyện xa.",
    family:
      "Người giỏi trong nhà nên được tạo điều kiện học. Sự nghiêm của bậc trên là để nuôi, không phải để bóp.",
    health:
      "Sức đang được nuôi thì hợp tập đều và dưỡng sinh. Tránh thi đấu hoặc làm quá sức lúc chưa hồi đủ.",
    advice:
      "Giữ sức lớn để dùng đúng lúc. Biết dừng mà vẫn không bỏ học thì quẻ này mới đẹp.",
    fortuneLevel: "cat",
  },
  {
    number: 27,
    nameVi: "Sơn Lôi Di",
    nameCn: "頤",
    binary: "100001",
    symbol: "䷚",
    overview:
      "Núi trên sấm, hình ảnh cái miệng: nuôi thân và nuôi lời nói. Quẻ thường được hiểu là xem lại ăn uống và cách ăn nói.",
    career:
      "Việc phụ thuộc vào cách phát ngôn và cách nuôi đội ngũ. Nói có chứng cứ, hứa vừa sức.",
    wealth:
      "Tiền vào ra dễ gắn với miếng ăn, dịch vụ chăm sóc hoặc khoản nuôi người. Giữ mức chi tiêu, tránh nuôi thói đắt đỏ.",
    love:
      "Lời dịu nuôi tình, lời sắc làm thương. Nên nghe đối phương nói hết trước khi đáp.",
    family:
      "Bữa ăn gia đình được dân gian xem là chỗ nuôi khí nhà. Ai lo bữa, lo người bệnh, đều đáng quý.",
    health:
      "Tiêu hóa và dinh dưỡng là trọng tâm tham khảo của quẻ này. Ăn đúng bữa, nhai kỹ; đau bụng kéo dài thì đi khám.",
    advice:
      "Nuôi thân và nuôi tiếng phải đi cùng nhau. Xem mình đang nuốt gì và đang thốt gì.",
    fortuneLevel: "binh",
  },
  {
    number: 28,
    nameVi: "Trạch Phong Đại Quá",
    nameCn: "大過",
    binary: "011110",
    symbol: "䷛",
    overview:
      "Đầm trên gió, cái đà giữa nặng, hai đầu yếu. Quẻ thường được hiểu là gánh việc quá sức, dễ gãy nếu không chia.",
    career:
      "Áp lực dồn một người, trách nhiệm vượt khả năng. Nên chia việc hoặc xin hỗ trợ, đừng một mình chống.",
    wealth:
      "Nợ hoặc chi phí có thể lớn hơn sức thu. Cắt khoản không thiết yếu; vay mới để đắp khoản cũ chỉ nên làm khi đã có kế hoạch trả.",
    love:
      "Quan hệ mất cân bằng khi một bên gánh hết. Nói rõ giới hạn trước khi thiện chí thành oán.",
    family:
      "Nhà có việc nặng thì cả nhà chia phiên. Đừng để một người kiệt sức.",
    health:
      "Đau lưng và kiệt sức là lời nhắc dân gian của hình ảnh cái đà nặng, không phải chẩn đoán. Nghỉ; đau kéo dài thì khám, đừng gắng.",
    advice:
      "Việc quá mức thì phải xử khác thường, nhưng không phải liều. Biết việc nào không gánh nổi cũng là sáng suốt.",
    fortuneLevel: "hung",
  },
  {
    number: 29,
    nameVi: "Thuần Khảm",
    nameCn: "坎",
    binary: "010010",
    symbol: "䷜",
    overview:
      "Hai lần nước hiểm chồng nhau, hình ảnh hố sâu và nguy lặp lại. Cách luận dân gian xem Khảm là thời phải rất thận trọng, đi chậm giữa chỗ khó.",
    career:
      "Việc dễ trắc trở liên tiếp, không nên nhận thêm rủi ro. Giữ đúng quy trình, tránh đường tắt.",
    wealth:
      "Tiền dễ kẹt hoặc dễ mất vì tin người quá nhanh. Không cho vay và không đầu tư theo lời mời hấp dẫn.",
    love:
      "Tình cảm dễ hiểu lầm. Cần thành thật; nếu quan hệ không còn an toàn thì hãy tìm chỗ dựa đáng tin, đừng một mình chịu đựng.",
    family:
      "Nhà nên thủ, hạn chế đi đêm đi xa nếu không cần. Giấy tờ và chỗ rò rỉ trong nhà nên kiểm lại.",
    health:
      "Thận, tai và mất ngủ hay được sách dân gian gắn với hành Thủy. Đó chỉ là gợi ý kiêng khem, cần thầy thuốc nếu có bệnh.",
    advice:
      "Giữa chỗ hiểm vẫn có lối nếu lòng không loạn. Đi chậm, bám việc chắc, đừng nhảy thêm một hố để thoát hố đang đứng.",
    fortuneLevel: "dai-hung",
  },
  {
    number: 30,
    nameVi: "Thuần Ly",
    nameCn: "離",
    binary: "101101",
    symbol: "䷝",
    overview:
      "Hai lần lửa, sáng và dựa vào nhau như lửa dựa củi. Quẻ thường được hiểu là minh mẫn, có lễ, và cần một chỗ dựa đúng.",
    career:
      "Hợp việc cần sự sáng suốt: văn hóa, giáo dục, kỹ thuật tinh. Tài năng cần tổ chức, thầy hoặc cộng sự để dựa.",
    wealth:
      "Tài lộc sáng nếu gắn với nghề chuyên môn. Tránh đốt tiền vào vẻ ngoài không nuôi được nghề.",
    love:
      "Tình cảm ấm và cần cách ứng xử có chừng. Nóng tính thì lửa dễ cháy thành cãi vã.",
    family:
      "Nhà sáng, hợp việc học của con cái. Bữa cơm và lời dạy được xem là củi giữ lửa nhà.",
    health:
      "Mắt và sự nóng trong là chỗ dân gian hay lưu ý với quẻ Ly, chỉ mang tính tham khảo. Ngủ đủ, bớt chất kích thích.",
    advice:
      "Sáng thì phải có chỗ dựa tử tế. Giữ lửa vừa đủ, đừng đốt sạch cái đang nuôi mình.",
    fortuneLevel: "cat",
  },
  {
    number: 31,
    nameVi: "Trạch Sơn Hàm",
    nameCn: "咸",
    binary: "001110",
    symbol: "䷞",
    overview:
      "Đầm trên núi, khí cảm ứng, hình ảnh cổ của sự đồng điệu. Quẻ thường được luận là xúc cảm và duyên cảm, cần thời gian để thành trách nhiệm.",
    career:
      "Hợp việc cần cảm tình người khác: chăm sóc, nghệ thuật, ngoại giao. Lắng nghe trước khi đề xuất.",
    wealth:
      "Tiền bạc thuận khi hiểu người mình phục vụ và giữ lời. Tránh quyết định tài chính chỉ vì cảm xúc nhất thời.",
    love:
      "Dân gian hay gắn quẻ này với duyên mới và sự rung động. Cảm xúc cần được nuôi thành sự tôn trọng thì mới lâu.",
    family:
      "Nhà dễ cảm thông nếu chịu nhìn hoàn cảnh của nhau. Một lời hỏi han đúng lúc có sức mạnh.",
    health:
      "Cơ thể dễ hồi hộp khi tinh thần nhạy. Thư giãn, hạn chế cà phê và lo nghĩ khuya.",
    advice:
      "Cảm mà không thành kiến thì mới nhận ra nhau. Xúc động xong vẫn cần lý trí giữ nhịp.",
    fortuneLevel: "cat",
  },
  {
    number: 32,
    nameVi: "Lôi Phong Hằng",
    nameCn: "恆",
    binary: "011100",
    symbol: "䷟",
    overview:
      "Sấm trên gió, chuyển động có nền, hình ảnh bền lâu. Quẻ hay được hiểu là giữ nếp thường ngày, không đổi hướng vì một cơn sóng.",
    career:
      "Nghề bền và uy tín tích lũy có giá. Đừng bỏ việc chỉ vì một tuần chán; cũng đừng gọi sự cố chấp là kiên định.",
    wealth:
      "Tài chính hợp với kế hoạch dài và tiết kiệm đều. Khoản làm giàu nhanh ít hợp với tinh thần quẻ này.",
    love:
      "Tình cảm lâu bền hơn là nồng trong chốc lát. Giữ những thói quen nhỏ: hỏi han, cùng ăn, cùng bàn việc nhà.",
    family:
      "Nếp nhà đều đặn là gốc. Việc giỗ, việc học và việc chi tiêu nên có lệ rõ.",
    health:
      "Bệnh mạn cần kiên trì chế độ, không bỏ giữa chừng. Ngủ và ăn đúng giờ quý hơn thuốc bổ nhất thời.",
    advice:
      "Hằng là bền trong việc đúng, không phải cố chấp. Giữ cái thường ngày cho tử tế thì đường xa mới tới.",
    fortuneLevel: "cat",
  },
  {
    number: 33,
    nameVi: "Thiên Sơn Độn",
    nameCn: "遯",
    binary: "001111",
    symbol: "䷠",
    overview:
      "Trời trên núi, dương lui dần. Quẻ thường được hiểu là rút lui có chủ đích khi thế chưa lợi.",
    career:
      "Nên lùi một bước: từ chối việc không hợp, rời môi trường độc hại bằng cách êm. Rút đúng lúc không phải là thua.",
    wealth:
      "Thu hẹp danh mục, giữ tiền mặt, tránh phô của. Chưa mở thêm khoản chi cho oai.",
    love:
      "Nếu quan hệ đang nghẹt, hãy cho nhau khoảng cách tôn trọng. Đuổi bắt lúc người kia đã muốn lùi sẽ càng xa.",
    family:
      "Hạn chế tranh luận với người cố chấp trong họ. Giữ lễ và lui về việc của mình.",
    health:
      "Cần nghỉ dưỡng, tránh nơi ồn và xung đột. Giấc ngủ là ưu tiên.",
    advice:
      "Lui mà vẫn giữ phẩm. Chọn đường rút sáng, đừng biến việc lui thành trốn tránh trách nhiệm còn đang của mình.",
    fortuneLevel: "binh",
  },
  {
    number: 34,
    nameVi: "Lôi Thiên Đại Tráng",
    nameCn: "大壯",
    binary: "111100",
    symbol: "䷡",
    overview:
      "Sấm trên trời, dương thịnh và có sức. Quẻ thường được xem là khí thế lớn, nhưng sức mạnh phải đi với lễ thì mới không gãy.",
    career:
      "Đủ lực để nhận việc khó hoặc đẩy dự án đang đình. Dùng sức đúng chỗ, đừng lấy uy áp người yếu hơn.",
    wealth:
      "Tài lộc có đà, hợp đòi khoản đúng lẽ. Tránh tất tay chỉ vì thấy mình đang thắng.",
    love:
      "Tình cảm nồng, dễ muốn quyết thật nhanh. Hãy hỏi ý đối phương, đừng áp đặt nhịp của mình.",
    family:
      "Người trụ cột đang có tiếng nói. Dùng tiếng nói đó để che chở, không để át hết người khác.",
    health:
      "Khí huyết dễ hóa nóng nảy và mất ngủ nếu không xả. Tập luyện có kiểm soát, đau ngực hoặc choáng thì đi cấp cứu chứ không luận quẻ.",
    advice:
      "Khỏe mà biết dừng. Sức không thay được lẽ phải.",
    fortuneLevel: "cat",
  },
  {
    number: 35,
    nameVi: "Hỏa Địa Tấn",
    nameCn: "晉",
    binary: "000101",
    symbol: "䷢",
    overview:
      "Lửa trên đất, hình ảnh mặt trời mọc. Quẻ hay được luận là tiến lên rõ ràng và được nhìn nhận.",
    career:
      "Hợp xin việc, thăng tiến hoặc ra mắt thành quả. Chuẩn bị chỉn chu vì lúc này người ta nhìn thấy mình.",
    wealth:
      "Thu nhập có cơ tăng khi công sức được thấy. Giữ hóa đơn và thành tích để thưởng phạt minh bạch.",
    love:
      "Tình cảm tiến triển sáng sủa, dễ được hai nhà biết đến. Cứ đường hoàng, khỏi cần giấu giếm.",
    family:
      "Nhà có tin vui về học hành hoặc công danh trong cách luận dân gian. Mừng vừa phải, rồi tiếp tục nuôi việc học.",
    health:
      "Tinh thần phấn chấn hỗ trợ sức khỏe. Tránh làm việc dưới nắng gắt quá lâu và bảo vệ mắt.",
    advice:
      "Tiến thì tiến đường chính. Ánh sáng càng rõ, việc khuất tất càng không hợp.",
    fortuneLevel: "cat",
  },
  {
    number: 36,
    nameVi: "Địa Hỏa Minh Di",
    nameCn: "明夷",
    binary: "101000",
    symbol: "䷣",
    overview:
      "Đất che lửa, ánh sáng bị thương và phải giấu. Quẻ thường được hiểu là thời nên kín đáo, giữ chí bên trong, chưa phô tài.",
    career:
      "Môi trường khó nói thẳng, công sức dễ bị nhận nhầm. Làm tròn việc, giữ bằng chứng, chờ lúc có thể nói.",
    wealth:
      "Không phô của và không khoe thu nhập. Khoản đầu tư lộ liễu lúc này dễ bị lợi dụng.",
    love:
      "Tình cảm cần kín và chân thành, tránh để người ngoài đem ra bàn. Nếu đang bị kiểm soát hoặc tổn thương, hãy tìm người tin cậy hỗ trợ.",
    family:
      "Trong nhà có chuyện chưa tiện nói hết. Giữ hòa khí bề ngoài, chọn đúng người để thổ lộ.",
    health:
      "Mệt âm ỉ và tinh thần u uất hay được nhắc trong luận dân gian, chỉ là gợi ý. Nghỉ ngơi; triệu chứng kéo dài thì gặp thầy thuốc.",
    advice:
      "Sáng mà bị che thì hãy giữ sáng ở bên trong. Nhịn một thời không có nghĩa là chấp nhận điều sai mãi.",
    fortuneLevel: "hung",
  },
  {
    number: 37,
    nameVi: "Phong Hỏa Gia Nhân",
    nameCn: "家人",
    binary: "101011",
    symbol: "䷤",
    overview:
      "Gió trên lửa, hơi ấm từ trong nhà lan ra. Quẻ thường được luận là việc nhà, vai trò rõ và lời nói có ngăn nắp.",
    career:
      "Nhóm gắn bó và việc gia đình làm ăn thuận hơn đám đông hỗn tạp. Mỗi người một việc, nói năng có trước có sau.",
    wealth:
      "Tài chính gia đình cần quỹ chung và quỹ riêng rõ. Chi tiêu bàn với nhau thì êm.",
    love:
      "Hợp chuyện xây tổ ấm và sống chung có nếp. Tình cảm được nuôi bằng việc nhà hằng ngày.",
    family:
      "Đây là quẻ dân gian rất gắn với gia đạo. Bữa ăn đúng giờ và phân việc công bằng quý hơn lời dạy suông.",
    health:
      "Không khí trong nhà ảnh hưởng sức khỏe theo cách hiểu dân gian. Giữ bếp sạch, ngủ đủ, ít cãi vã lúc ăn.",
    advice:
      "Nhà yên thì việc ngoài mới có chỗ về. Sửa lời ăn tiếng nói trong nhà trước khi trách chuyện bên ngoài.",
    fortuneLevel: "cat",
  },
  {
    number: 38,
    nameVi: "Hỏa Trạch Khuê",
    nameCn: "睽",
    binary: "110101",
    symbol: "䷥",
    overview:
      "Lửa trên đầm, hai khí trái chiều, hình ảnh dị biệt. Quẻ hay được hiểu là mỗi người một hướng, vẫn có thể hợp ở điểm chung nếu bớt chấp.",
    career:
      "Đồng nghiệp khác tính, đối tác khác mục tiêu. Tìm phần giao nhau thay vì đòi giống hệt nhau.",
    wealth:
      "Tiền bạc dễ lệch vì cách nhìn khác nhau về rủi ro. Viết rõ điều khoản, đừng ngầm hiểu.",
    love:
      "Khác biệt không tự nó là hết duyên, nhưng cần tôn trọng chỗ không hòa. Ép đối phương thành bản sao của mình thì càng xa.",
    family:
      "Thế hệ hoặc tính tình trong nhà khác nhau. Nghe hết một phía trước khi phán.",
    health:
      "Khó chịu khó gọi tên hay được dân gian nhắc với quẻ này để khuyên đi khám nếu kéo dài. Đừng tự ý thuốc theo quẻ.",
    advice:
      "Khác mà vẫn thấy chỗ giống thì việc còn làm được. Việc nhỏ bất đồng, đừng nâng thành chuyện bỏ nhau.",
    fortuneLevel: "binh",
  },
  {
    number: 39,
    nameVi: "Thủy Sơn Kiển",
    nameCn: "蹇",
    binary: "001010",
    symbol: "䷦",
    overview:
      "Nước trên núi, đường trước mặt hiểm và khó bước. Quẻ thường được hiểu là trở ngại, nên dừng xem lại thay vì cố xông.",
    career:
      "Việc tiến triển chậm. Tìm người trợ lực và đường an toàn, chưa nên đạp cửa khác ngay khi cửa này vừa đóng.",
    wealth:
      "Dòng tiền dễ tắc, thủ tục thu hồi hoặc giải ngân chậm. Giữ tiền mặt cho khoản bắt buộc, hoãn khoản mở rộng.",
    love:
      "Quan hệ gặp vật cản về khoảng cách, gia đình hoặc hoàn cảnh. Chưa phải lúc trách nhau; xem trở ngại có giải được không.",
    family:
      "Việc nhà như đi đường đèo, cần người dẫn và cần nghỉ chặng. Đừng hẹn việc lớn vào lúc đang bận nguy cấp.",
    health:
      "Chân, khớp và sự lưu thông kém là liên tưởng dân gian, không phải kết luận bệnh. Đi chậm, khởi động kỹ; đau tăng thì khám.",
    advice:
      "Biết khó mà quay lại hỏi người có kinh nghiệm. Dừng đúng lúc còn hơn sẩy chân giữa dốc.",
    fortuneLevel: "hung",
  },
  {
    number: 40,
    nameVi: "Lôi Thủy Giải",
    nameCn: "解",
    binary: "010100",
    symbol: "䷧",
    overview:
      "Sấm trên nước, mưa dông đến thì bức bối được cởi. Quẻ thường được xem là giải tỏa, tha thứ và xử dứt việc tồn.",
    career:
      "Nút thắt có cơ được gỡ, hiểu lầm có cơ được làm rõ. Hành động sớm cho xong, đừng để việc đã thông lại bị cột lại.",
    wealth:
      "Nợ hoặc khoản kẹt có thể được nới. Trả dứt những món nhỏ cho lòng nhẹ, tránh tiêu xài mừng quá đà.",
    love:
      "Cãi vã có thể hóa giải nếu một bên chịu mở lời trước. Tha là tha việc đã nói rõ, không phải quên bài học.",
    family:
      "Khí nhà dễ dịu sau một lần nói thật. Làm xong việc tồn đọng thì ai cũng nhẹ.",
    health:
      "Cơ thể sau căng thẳng cần ngủ, đi bộ và thở. Bệnh đang lui thì vẫn tái khám đúng hẹn.",
    advice:
      "Gỡ rồi thì đừng quay lại trói. Xử gọn, rộng lượng với người, nghiêm với việc.",
    fortuneLevel: "cat",
  },
  {
    number: 41,
    nameVi: "Sơn Trạch Tổn",
    nameCn: "損",
    binary: "110001",
    symbol: "䷨",
    overview:
      "Núi trên đầm, bớt ở dưới để đắp ở trên. Quẻ thường được hiểu là giảm bớt có chủ ý, nhường phần nhỏ cho việc đáng.",
    career:
      "Có thể phải nhận việc kém hấp dẫn hoặc cắt quyền lợi nhỏ để giữ việc lớn. Giảm cho rõ mục đích, đừng giảm chỉ vì sợ.",
    wealth:
      "Đây là lúc thắt lưng buộc bụng có kế hoạch. Cắt chi tiêu xa xỉ trước, giữ khoản học và sức khỏe.",
    love:
      "Tình cảm cần bớt cái tôi. Nhường việc nhỏ là đẹp; nhường cả phẩm giá thì không phải sự giảm đúng nghĩa.",
    family:
      "Nhà cùng chịu một khoản tiết chế thì qua được. Bàn công khai cái đang cắt.",
    health:
      "Ăn thanh đạm một thời có thể hợp, nhưng không nhịn ăn cực đoan. Đang trị bệnh thì nghe người có chuyên môn.",
    advice:
      "Bớt cái thừa để nuôi cái cần. Giảm mà lòng không oán thì việc mới bền.",
    fortuneLevel: "binh",
  },
  {
    number: 42,
    nameVi: "Phong Lôi Ích",
    nameCn: "益",
    binary: "100011",
    symbol: "䷩",
    overview:
      "Gió trên sấm, thêm ở dưới, hình ảnh lợi ích lan ra. Quẻ thường được xem là thời được tăng thêm, thuận để làm việc có ích.",
    career:
      "Có thêm việc, thêm người hỗ trợ hoặc thêm cơ hội học. Nhận rồi hãy dùng vào việc đáng, đừng để lợi thành gánh.",
    wealth:
      "Tài lộc được luận là có chiều tăng, hợp đầu tư vừa sức vào việc mình nắm. Chia một phần cho người cùng làm thì của càng bền theo cách hiểu dân gian.",
    love:
      "Tình cảm được nuôi và dễ có tin vui. Giữ sự tử tế lúc đang được chiều.",
    family:
      "Nhà có thêm người, thêm tin vui hoặc thêm của. Dùng cái thêm được để sum họp, đừng vì có thêm mà sinh kiêu.",
    health:
      "Sức dễ hồi nếu chịu vận động và ăn đủ chất. Đừng vì thấy khỏe mà thức khuya làm thêm không nghỉ.",
    advice:
      "Được lợi thì hãy làm việc có ích. Biết chia thì lợi ấy lâu hơn là giữ một mình.",
    fortuneLevel: "dai-cat",
  },
  {
    number: 43,
    nameVi: "Trạch Thiên Quải",
    nameCn: "夬",
    binary: "111110",
    symbol: "䷪",
    overview:
      "Đầm trên trời, dương đã đông, chỉ còn một âm cần dứt. Quẻ thường được hiểu là quyết đoán, nói công khai và cắt điều không còn hợp.",
    career:
      "Đến lúc chốt: kết thúc hợp tác đã hỏng hoặc nói rõ quyết định. Quyết trên nguyên tắc, không quyết trên oán giận cá nhân.",
    wealth:
      "Cắt khoản lỗ và chấm dứt góp vốn không minh bạch. Làm giấy tờ đàng hoàng khi đòi nợ hoặc tất toán.",
    love:
      "Cần một câu trả lời dứt khoát. Nếu chia tay thì nói rõ, đừng kéo lê cho cả hai mòn.",
    family:
      "Chuyện nhà tồn đọng nên được gọi đích danh. Nói việc và cách sửa, tránh mắng nhiếc.",
    health:
      "Đừng để bệnh nhỏ kéo thành nền. Đi khám và làm theo liệu trình đến nơi.",
    advice:
      "Dứt khoát mà vẫn giữ lễ. Nói giữa thanh thiên, đừng thì thầm hại người.",
    fortuneLevel: "binh",
  },
  {
    number: 44,
    nameVi: "Thiên Phong Cấu",
    nameCn: "姤",
    binary: "011111",
    symbol: "䷫",
    overview:
      "Trời trên gió, một âm vừa gặp đám dương. Quẻ thường được hiểu là cuộc gặp bất ngờ, dễ hấp dẫn mà cũng dễ lệch.",
    career:
      "Có đề nghị mới đến đường đột. Xét kỹ động cơ và giấy tờ, đừng nhận chỉ vì kịp thời.",
    wealth:
      "Khoản lời bất ngờ hoặc cơ hội được gọi là một lần cần cảnh giác. Không ứng tiền cho người mới quen.",
    love:
      "Duyên đến nhanh, cảm xúc mạnh. Dân gian thường khuyên chậm cam kết, xem người ấy cư xử khi hết hứng.",
    family:
      "Khách hoặc chuyện ngoài đột ngột bước vào nhà. Giữ lễ, đừng để việc ngoài lấn nếp nhà.",
    health:
      "Dị ứng hoặc bệnh đến nhanh là liên tưởng dân gian, chỉ để nhắc theo dõi. Khó thở hoặc phát ban thì đi khám ngay.",
    advice:
      "Gặp gỡ có duyên vẫn cần có phép. Đừng vì một phút hợp mà bỏ qua nguyên tắc lâu nay mình giữ.",
    fortuneLevel: "hung",
  },
  {
    number: 45,
    nameVi: "Trạch Địa Tụy",
    nameCn: "萃",
    binary: "000110",
    symbol: "䷬",
    overview:
      "Đầm trên đất, nước tụ lại. Quẻ hay được luận là sum họp, quy tụ người và của quanh một việc chung.",
    career:
      "Hợp họp mặt, gây quỹ hoặc tập hợp đội. Cần người đứng ra chính danh thì đám đông mới không tán.",
    wealth:
      "Tiền có thể tụ qua quỹ chung hoặc cổ phần. Minh bạch sổ sách là điều kiện để tụ lâu.",
    love:
      "Tình cảm hướng về gắn kết, gặp gia đình hai bên và bạn bè chung. Chọn người đứng cùng mình trước đám đông, không chỉ lúc riêng.",
    family:
      "Họ hàng sum vầy, giỗ chạp hoặc cưới hỏi được xem là hợp thời. Chuẩn bị chu đáo và mời đúng người.",
    health:
      "Ăn uống hội hè dễ quá đà. Giữ mức rượu và giờ ngủ sau những buổi tụ.",
    advice:
      "Tụ người phải có lễ và có mục đích. Đông mà không có người chính thì dễ thành ồn.",
    fortuneLevel: "cat",
  },
  {
    number: 46,
    nameVi: "Địa Phong Thăng",
    nameCn: "升",
    binary: "011000",
    symbol: "䷭",
    overview:
      "Đất trên gỗ, cây từ đất mọc lên. Quẻ thường được hiểu là tiến dần lên, như cây lớn từng đốt.",
    career:
      "Thăng tiến theo nấc, hợp người chăm chỉ và được cấp trên đỡ. Đừng nhảy cóc khi thành tích chưa đủ.",
    wealth:
      "Thu nhập tăng dần, hợp tích sản chậm. Góp đều hợp hơn là đánh quả.",
    love:
      "Tình cảm tiến từng bước: tìm hiểu, ra mắt, rồi mới tính chuyện lâu. Vững từng nấc thì ít hối.",
    family:
      "Con cái học hành đi lên, nhà cửa có thể cải thiện dần. Mừng cả những tiến bộ nhỏ.",
    health:
      "Sức hồi theo chiều hướng tốt nếu kiên trì luyện tập. Đừng tăng cường độ đột ngột.",
    advice:
      "Lên bằng gốc rễ chắc. Mỗi ngày một ít, lâu thành cao.",
    fortuneLevel: "cat",
  },
  {
    number: 47,
    nameVi: "Trạch Thủy Khốn",
    nameCn: "困",
    binary: "010110",
    symbol: "䷮",
    overview:
      "Đầm trên nước, nước rò hết, hình ảnh cùng quẫn. Quẻ thường được hiểu là lời nói và việc làm đều khó thông, cần giữ chí giữa lúc kẹt.",
    career:
      "Đề án dễ bị gác, có thể cảm thấy bị cô lập. Làm tròn phần tối thiểu, tìm một người đáng tin để bàn, chưa nên quyết định lớn.",
    wealth:
      "Tiền kẹt, thu không ra, chi vẫn đến. Cắt khoản chưa cấp bách; nếu có nợ thì nói thật để xin lộ trình, tránh vay nóng.",
    love:
      "Lời không tới được nhau, dễ tủi thân. Nói rõ điều mình cần; nếu mối quan hệ làm mình kiệt quệ, hãy tìm người hỗ trợ.",
    family:
      "Nhà đang chật vật. Chia sẻ khó khăn với người thân đáng tin, đừng một mình ôm thể diện.",
    health:
      "Mệt, khát và tinh thần bí là hình ảnh dân gian của quẻ Khốn, không phải chẩn đoán. Uống đủ nước, ngủ; suy nhược kéo dài thì gặp thầy thuốc.",
    advice:
      "Kẹt mà không bỏ điều đúng thì còn đường ra. Giữ lời nói chân, hạn chế than phiền với người không giúp được gì.",
    fortuneLevel: "dai-hung",
  },
  {
    number: 48,
    nameVi: "Thủy Phong Tỉnh",
    nameCn: "井",
    binary: "011010",
    symbol: "䷯",
    overview:
      "Nước trên gỗ, hình ảnh cái giếng nuôi người. Quẻ thường được luận là nguồn lực bền, cần được khơi thông và giữ cho trong.",
    career:
      "Nghề có tính nuôi người: chuyên môn, dịch vụ, việc làng xã. Duy trì chất lượng đều, đừng bỏ bê cái đang là nguồn sống.",
    wealth:
      "Thu nhập đều như mạch nước, không phải cơn lũ. Sửa kỹ năng, công cụ và mối khách cũ trước khi tìm mạch mới.",
    love:
      "Tình cảm bền khi được chăm, không để lâu ngày thành bùn lấp. Quay lại những thói quen tốt đã từng nuôi nhau.",
    family:
      "Nguồn nước, bếp và chỗ sinh hoạt chung nên được giữ sạch. Người cũ trong họ vẫn là chỗ dựa.",
    health:
      "Uống đủ nước và giữ vệ sinh ăn uống. Mệt vì bỏ bữa thì sửa nếp trước khi tìm thuốc lạ.",
    advice:
      "Giếng không ai tới thì phí, giếng không nạo thì đục. Nuôi cái nguồn của mình và san sẻ có chừng.",
    fortuneLevel: "cat",
  },
  {
    number: 49,
    nameVi: "Trạch Hỏa Cách",
    nameCn: "革",
    binary: "101110",
    symbol: "䷰",
    overview:
      "Đầm trên lửa, nước lửa tương khắc đến mức phải đổi. Quẻ thường được hiểu là thay cái cũ khi đã đến lúc và đã được người liên quan tin.",
    career:
      "Đổi việc hoặc đổi cách làm có thể hợp, với điều kiện nói rõ lý do và chuẩn bị xong. Đổi mà người không theo thì dễ loạn.",
    wealth:
      "Cơ cấu lại tài chính: đổi khoản chi, tất toán cái không còn hợp. Tránh đổi chỉ vì chán.",
    love:
      "Quan hệ cần một chương mới trong cách sống và cách nói. Đổi để tốt hơn, không phải đổi để trốn.",
    family:
      "Nhà có thể thay nếp sinh hoạt hoặc thay người đảm nhiệm việc. Bàn trước, làm sau.",
    health:
      "Chế độ cũ không còn hợp thì nên đổi có hướng dẫn. Đừng tự ý bỏ thuốc đang dùng.",
    advice:
      "Đổi khi đã có lòng tin của người liên quan. Cách tân mà không có lễ thì chỉ là xáo trộn.",
    fortuneLevel: "cat",
  },
  {
    number: 50,
    nameVi: "Hỏa Phong Đỉnh",
    nameCn: "鼎",
    binary: "011101",
    symbol: "䷱",
    overview:
      "Lửa trên gió, cái đỉnh nấu nguyên liệu thành của nuôi người. Quẻ thường được xem là ổn định trở lại, dùng người tài và giữ cái mới đã luyện.",
    career:
      "Hợp nhận vai trò then chốt và trọng dụng người giỏi. Danh phải đi với thực.",
    wealth:
      "Tài lộc gắn với giá trị đã chín: nghề vững, hàng có chất. Tránh bán thứ còn non.",
    love:
      "Tình cảm đi vào độ chín, có thể tính chuyện ăn ở lâu dài. Nuôi nhau bằng sự tử tế hằng ngày.",
    family:
      "Bếp và mâm cơm là hình ảnh đẹp của quẻ Đỉnh. Sum họp có chừng, giữ chỗ thờ và chỗ ăn trong nhà chỉnh chu theo cách hiểu dân gian.",
    health:
      "Tiêu hóa và thân nhiệt cần sự điều hòa. Ăn chín uống sạch; bụng yếu thì bớt đồ sống tái.",
    advice:
      "Cái đỉnh vững khi có chân và có quai. Việc đã đổi mới thì hãy giữ cho dùng được lâu.",
    fortuneLevel: "cat",
  },
  {
    number: 51,
    nameVi: "Thuần Chấn",
    nameCn: "震",
    binary: "100100",
    symbol: "䷲",
    overview:
      "Hai lần sấm, việc đến đột ngột khiến giật mình. Quẻ thường được hiểu là biến động; sau cơn sợ, nếu giữ được bình tĩnh thì việc còn cứu.",
    career:
      "Tin bất ngờ, thay đổi nhân sự hoặc sự cố có thể đến. Bình tĩnh kiểm tra thực tế, đừng phản ứng trong lúc hoảng.",
    wealth:
      "Khoản chi đột xuất có thể xuất hiện. Quỹ dự phòng lúc này quý hơn khoản lời mạo hiểm.",
    love:
      "Một lời nói hoặc một sự kiện làm cả hai giật mình. Khi đã yên, hãy nói lại cho rõ, đừng quyết định lúc đang run.",
    family:
      "Nhà có tin đột ngột thì lo việc cần trước, an ủi sau. Tránh đổ lỗi trong cơn hoảng.",
    health:
      "Hồi hộp và mất ngủ sau sự cố là phản ứng thường gặp. Nghỉ, thở chậm; đau ngực hoặc choáng là việc cấp cứu, không phải việc luận quẻ.",
    advice:
      "Sấm đến thì kinh, kinh rồi hãy xét. Giữ lời ăn tiếng nói sau biến cố thì uy tín còn.",
    fortuneLevel: "binh",
  },
  {
    number: 52,
    nameVi: "Thuần Cấn",
    nameCn: "艮",
    binary: "001001",
    symbol: "䷳",
    overview:
      "Hai lần núi, hình ảnh dừng lại đúng chỗ. Quẻ thường được hiểu là biết dừng, tĩnh và không đi quá giới hạn của mình.",
    career:
      "Chưa nên nhận thêm việc hoặc đổi hướng. Hoàn tất việc đang cầm và từ chối lịch thừa.",
    wealth:
      "Giữ tiền, chưa xuống vốn mới. Xem lại các khoản đang chạy trước khi mở thêm.",
    love:
      "Cần khoảng lặng để biết mình thật sự muốn gì. Im lặng để suy nghĩ khác với im lặng để phạt nhau.",
    family:
      "Nhà bớt khách khứa và bớt bàn chuyện ngoài. Ai lo việc nấy thì yên.",
    health:
      "Nghỉ ngơi là bài nhắc của quẻ Cấn. Ngủ đủ, giãn cơ, hạn chế di chuyển không cần.",
    advice:
      "Dừng đúng lúc là một dạng tiến. Đừng dựa lưng vào việc không phải của mình.",
    fortuneLevel: "binh",
  },
  {
    number: 53,
    nameVi: "Phong Sơn Tiệm",
    nameCn: "漸",
    binary: "001011",
    symbol: "䷴",
    overview:
      "Gió trên núi, cây lớn dần trên sườn, hình ảnh tiến chậm mà có thứ tự. Quẻ hay được luận là tuần tự, việc lớn nên đi từng bậc.",
    career:
      "Thăng tiến hoặc chuyển việc theo lộ trình, không nhảy cóc. Thành tích đều quan trọng hơn một cú bứt phá.",
    wealth:
      "Tài sản tăng chậm, hợp góp đều và chờ đáo hạn. Tránh rút trước hạn vì sốt ruột.",
    love:
      "Tình cảm tiến theo lễ: tìm hiểu, ra mắt, tính chuyện cưới khi đã vững. Dân gian thường coi Tiệm là thuận cho chuyện lâu dài nếu không nôn nóng.",
    family:
      "Việc nhà làm theo thứ tự ưu tiên. Người lớn làm gương sự kiên nhẫn.",
    health:
      "Hồi phục từng tuần, không so với người khỏi bệnh nhanh. Tập nhẹ và đều.",
    advice:
      "Chậm có thứ tự vẫn tới. Nhanh mà rối thì phải quay lại.",
    fortuneLevel: "cat",
  },
  {
    number: 54,
    nameVi: "Lôi Trạch Quy Muội",
    nameCn: "歸妹",
    binary: "110100",
    symbol: "䷵",
    overview:
      "Sấm trên đầm, hình ảnh cổ về việc tiến tới khi danh phận chưa đủ chỉnh. Quẻ thường được hiểu là quan hệ hoặc việc làm dễ lệch vị trí, cần cân nhắc kỹ.",
    career:
      "Vai trò chưa rõ, dễ nhận việc vì nể hoặc vì danh nghĩa mập mờ. Hỏi rõ chức danh và quyền lợi trước khi nhận.",
    wealth:
      "Góp vốn hoặc chi tiền vì tình cảm, vì nể, dễ thiệt. Giấy tờ phải đứng tên đúng người, đúng việc.",
    love:
      "Dân gian thường khuyên chậm cưới hỏi nếu sự tôn trọng hoặc sự đồng thuận hai nhà còn thiếu. Cảm xúc mạnh không thay được sự bằng vai.",
    family:
      "Chuyện hôn nhân hoặc vị trí trong nhà dễ sinh tiếng. Bàn công khai, tránh xếp đặt ép.",
    health:
      "Đừng vì bận chuyện tình cảm mà bỏ ăn bỏ ngủ. Giữ nhịp sinh hoạt tối thiểu.",
    advice:
      "Việc gì cũng cần danh chính thì mới lâu. Thà chậm mà đủ lễ, còn hơn nhanh mà lệch.",
    fortuneLevel: "hung",
  },
  {
    number: 55,
    nameVi: "Lôi Hỏa Phong",
    nameCn: "豐",
    binary: "101100",
    symbol: "䷶",
    overview:
      "Sấm trên lửa, sáng và động cùng lúc, hình ảnh thịnh vượng. Quẻ thường được xem là đỉnh của một việc, cần biết ánh sáng rồi cũng sẽ xế.",
    career:
      "Thành quả, sự kiện hoặc danh tiếng đang ở mức cao. Dùng thời này để hoàn tất việc quan trọng và chuẩn bị người kế.",
    wealth:
      "Thu tốt, nhưng chi cũng dễ lớn theo lối sống lúc đang thịnh. Chốt phần đã có, đừng mở thêm quá nhiều mặt trận.",
    love:
      "Tình cảm rực rỡ, nhiều hoạt động chung. Dành thời gian riêng tư, kẻo bận mà xa nhau giữa lúc tưởng như đang đẹp.",
    family:
      "Nhà có việc vui và khách khứa. Vui có chừng, giữ sức cho người phải lo liệu.",
    health:
      "Dễ kiệt sau chuỗi ngày bận. Ngủ bù và ăn đúng bữa quan trọng hơn tiệc.",
    advice:
      "Hãy làm việc đáng làm lúc còn sáng. Thịnh rồi sẽ đổi; người biết đủ thì không hoảng khi ánh sáng dịu lại.",
    fortuneLevel: "cat",
  },
  {
    number: 56,
    nameVi: "Hỏa Sơn Lữ",
    nameCn: "旅",
    binary: "001101",
    symbol: "䷷",
    overview:
      "Lửa trên núi, lửa không trú lâu một chỗ, hình ảnh người ở trọ. Quẻ thường được hiểu là đi xa, tạm bợ, cần khiêm và gọn.",
    career:
      "Công tác hoặc môi trường chưa phải chỗ ở lâu. Giữ uy tín từng chặng, đừng xây kế hoạch như thể đã an cư.",
    wealth:
      "Tiền đi đường và chi phí tạm khó tích lớn ngay. Mang khoản dự phòng, giữ giấy tờ và giao dịch cho rõ ràng.",
    love:
      "Quan hệ từ xa hoặc chưa định được nơi chốn. Trân trọng hiện tại, đừng hứa cư trú nếu mình còn phải đi.",
    family:
      "Có người xa nhà thì giữ liên lạc đều và gửi gắm việc nhà cho người cụ thể.",
    health:
      "Đi đường dễ mệt và lệch giấc. Ăn chín, nghỉ khi đổi thời tiết; sốt hoặc chóng mặt kéo dài thì khám.",
    advice:
      "Khách thì nhẹ hành lý và nặng chữ tín. Ở đâu cũng giữ lễ nhỏ, vì mình không đứng trên đất của mình.",
    fortuneLevel: "binh",
  },
  {
    number: 57,
    nameVi: "Thuần Tốn",
    nameCn: "巽",
    binary: "011011",
    symbol: "䷸",
    overview:
      "Hai lần gió, thấm dần và đi vào kẽ. Quẻ thường được hiểu là nhu thuận có hướng: việc cần được thấm, không phải quát một lần là xong.",
    career:
      "Hợp đàm phán và thuyết phục lâu dài. Nhắc lại cho rõ, kiên nhẫn với người chậm hiểu.",
    wealth:
      "Lợi nhỏ thấm dần, hợp chăm khách cũ. Đừng vì một lời từ chối mà bỏ cả mối.",
    love:
      "Tình cảm cần sự dịu và những điều tốt được lặp lại. Chiều chuộng có nguyên tắc thì mới không thành gió thoảng.",
    family:
      "Lời nhắc trong nhà nên nhẹ và nhất quán. Mệnh lệnh đổi xoành xoạch thì ai cũng mệt.",
    health:
      "Hô hấp và gió lùa là liên tưởng dân gian của quẻ Tốn, chỉ mang tính gợi ý. Giữ ấm cổ, tránh gió lùa lúc ngủ.",
    advice:
      "Gió thấm lâu hơn sấm. Nhu mà có mục tiêu thì việc lớn cũng vào.",
    fortuneLevel: "cat",
  },
  {
    number: 58,
    nameVi: "Thuần Đoài",
    nameCn: "兌",
    binary: "110110",
    symbol: "䷹",
    overview:
      "Hai lần đầm, hình ảnh nói năng vui và sự trao đổi. Quẻ thường được luận là hòa vui, bạn bè, và lời nói có sức mở cửa.",
    career:
      "Hợp việc giao tiếp, bán hàng, giảng dạy hoặc hòa giải. Vui phải có thật, đừng lấy lời đường mật thay cho năng lực.",
    wealth:
      "Tiền đến từ giao tiếp và hợp tác. Lời hẹn miệng nên được chốt lại bằng giấy hoặc tin nhắn rõ.",
    love:
      "Tình cảm tươi, dễ làm quen và dễ làm lành. Giữ lời hứa sau những câu nói dễ thương.",
    family:
      "Nhà có tiếng cười, hợp khách. Chọn bạn mà chơi, vì bạn cũng ảnh hưởng nếp nhà.",
    health:
      "Tinh thần vui hỗ trợ sức khỏe theo cách hiểu dân gian. Vẫn nên tiết chế rượu và đồ ngọt trong buổi vui.",
    advice:
      "Vui mà thành thật. Lời nói mở được lòng người, cũng mở được lỗ hổng nếu thiếu thật.",
    fortuneLevel: "cat",
  },
  {
    number: 59,
    nameVi: "Phong Thủy Hoán",
    nameCn: "渙",
    binary: "010011",
    symbol: "䷺",
    overview:
      "Gió trên nước, băng tan, hình ảnh tan rồi mới tụ lại được. Quẻ thường được hiểu là giải cái úng, chia để thông, rồi quy tụ quanh việc chung.",
    career:
      "Tổ chức đang phân tán thì cần một mục tiêu chung để kéo lại. Có khi phải giải tán nhóm cũ không còn hợp.",
    wealth:
      "Tiền dễ tán nếu không có quỹ và người giữ sổ. Gom các khoản nhỏ về một chỗ rõ ràng.",
    love:
      "Khoảng cách hoặc hiểu lầm làm tình cảm như tan. Một lời xin lỗi thật có thể tụ lại; nếu đã tan thật thì hãy cho ra đi êm.",
    family:
      "Lòng người trong họ đang phân tán. Một dịp sum họp có chủ đích quý hơn nhiều lời nhắc suông.",
    health:
      "Bồn chồn và khó tập trung là gợi ý dân gian, không phải bệnh danh. Ngủ đúng giờ, bớt tin tức làm lo.",
    advice:
      "Tan cái đáng tan thì khí mới lưu thông. Sau khi giải, phải có chỗ để mọi người tụ về.",
    fortuneLevel: "binh",
  },
  {
    number: 60,
    nameVi: "Thủy Trạch Tiết",
    nameCn: "節",
    binary: "110010",
    symbol: "䷻",
    overview:
      "Nước trên đầm, có bờ có mức. Quẻ thường được hiểu là tiết độ: đặt giới hạn vừa thì mới bền.",
    career:
      "Hợp việc cần quy chuẩn, ngân sách và giờ giấc. Quy định quá khắc nghiệt cũng phản tác dụng, nên đặt mức người ta giữ được.",
    wealth:
      "Dân gian hay nhắc quẻ này với chuyện chi tiêu có hạn mức. Lập ngân sách, cắt cái vượt, giữ cái đáng.",
    love:
      "Tình cảm cần ranh giới lành mạnh về thời gian và cách cư xử. Yêu không có nghĩa là hết mức nào cũng nhận.",
    family:
      "Nhà có lệ thì êm: giờ ăn, giờ học, khoản chi. Lệ để nuôi nhau, không phải để kiểm soát.",
    health:
      "Ăn, ngủ và thời gian nhìn màn hình đều cần mức. Tiết là vừa, không phải hành xác.",
    advice:
      "Có chừng mực thì khó cũng qua. Đặt hạn mức xong thì giữ, đừng mỗi tuần một lệ.",
    fortuneLevel: "cat",
  },
  {
    number: 61,
    nameVi: "Phong Trạch Trung Phu",
    nameCn: "中孚",
    binary: "110011",
    symbol: "䷼",
    overview:
      "Gió trên đầm, lòng trống mà thành tín. Quẻ thường được hiểu là chữ tín từ trong lòng, cảm được người mà không cần khoa trương.",
    career:
      "Uy tín cá nhân là vốn. Giữ đúng lời hứa nhỏ thì người khác mới tin việc lớn.",
    wealth:
      "Giao dịch dựa trên niềm tin vẫn nên có giấy tờ vừa đủ. Tiền hợp với việc nói và làm khớp nhau.",
    love:
      "Thành thật làm dịu được nghi kỵ. Một lời nhận lỗi đúng lúc quý hơn nhiều món quà.",
    family:
      "Trẻ tin người lớn khi người lớn giữ lời. Nhà không cần thề thốt, cần việc làm đều.",
    health:
      "Lo âu dễ dịu nếu có chỗ dựa tin cậy. Hít thở chậm và nói chuyện với người mình thật sự tin.",
    advice:
      "Tín ở trong lòng rồi mới ra ngoài miệng. Đừng hứa để xoa dịu nếu mình không định làm.",
    fortuneLevel: "cat",
  },
  {
    number: 62,
    nameVi: "Lôi Sơn Tiểu Quá",
    nameCn: "小過",
    binary: "001100",
    symbol: "䷽",
    overview:
      "Sấm trên núi, chim bay thấp, hình ảnh hơi quá ở việc nhỏ. Quẻ thường được hiểu là việc nhỏ thì có thể nới một chút, việc lớn thì chưa nên vượt.",
    career:
      "Sửa lỗi nhỏ và làm thêm một chút thì được. Đừng nhân đà ấy mà quyết định nhân sự hoặc đầu tư lớn.",
    wealth:
      "Khoản chi nhỏ có thể linh hoạt, khoản lớn hãy giữ nguyên tắc. Kiểm lại hóa đơn lẻ, chúng hay đội sổ.",
    love:
      "Một lời xin lỗi hơi quá hoặc một cử chỉ chăm sóc hơi kỹ đôi khi lại đúng. Đừng vì chuyện nhỏ mà kết luận cả mối quan hệ.",
    family:
      "Nhà nên xử những việc vặt đang tồn. Việc lớn của dòng họ hãy để đúng người, đúng buổi.",
    health:
      "Bệnh nhỏ trị sớm, đừng chủ quan cũng đừng tự chữa liều. Nghỉ thêm một nhịp nếu cơ thể đang báo mệt.",
    advice:
      "Quá một chút ở việc nhỏ là độ mềm cần thiết. Việc then chốt vẫn phải đúng mức.",
    fortuneLevel: "binh",
  },
  {
    number: 63,
    nameVi: "Thủy Hỏa Ký Tế",
    nameCn: "既濟",
    binary: "101010",
    symbol: "䷾",
    overview:
      "Nước trên lửa, mỗi hào đã đúng vị, việc đã qua sông. Quẻ thường được hiểu là đã thành, và chính vì đã thành nên phải đề phòng chỗ bắt đầu sơ suất.",
    career:
      "Dự án về đích, hợp đồng đã xong phần chính. Kiểm lại từng chi tiết bàn giao, đừng ăn mừng rồi bỏ sót.",
    wealth:
      "Thành quả tài chính đã có hình hài. Giữ thành quả, tránh mở ngay một cuộc phiêu lưu mới bằng toàn bộ số vừa có.",
    love:
      "Quan hệ đã tới một cột mốc. Giữ lửa bằng chăm sóc đều, vì lúc tưởng đã xong người ta hay lơ là.",
    family:
      "Việc nhà đã ổn định một chặng. Duy trì nếp và để ý những chỗ nhỏ như bếp, điện, giấy tờ.",
    health:
      "Sức đang ổn thì vẫn tái khám đúng hẹn. Đừng bỏ liệu trình giữa chừng vì thấy đỡ.",
    advice:
      "Đã qua sông chưa phải là được nghỉ mãi. Giữ cái đã thành còn khó hơn lúc đang gắng để thành.",
    fortuneLevel: "cat",
  },
  {
    number: 64,
    nameVi: "Hỏa Thủy Vị Tế",
    nameCn: "未濟",
    binary: "010101",
    symbol: "䷿",
    overview:
      "Lửa trên nước, các hào chưa vào vị trí cuối, việc chưa qua sông. Quẻ thường được hiểu là còn dở, vẫn có thể hoàn tất nếu phân biệt rõ cái đã xong và cái chưa xong.",
    career:
      "Đừng nhận mình đã hoàn thành khi còn khúc cuối. Liệt kê việc tồn và làm nốt, xin thêm thời gian nếu cần, thay vì giả bộ xong.",
    wealth:
      "Dòng tiền chưa khớp: có khoản chờ, có khoản chưa về. Chưa tiêu khoản chưa vào túi.",
    love:
      "Tình cảm còn bỏ ngỏ, cần một cuộc nói cho rõ hướng. Thiếu kết luận lâu ngày thì cả hai mệt.",
    family:
      "Việc nhà còn dang dở về giấy tờ hoặc sửa chữa. Chọn một việc làm cho xong trước đã.",
    health:
      "Triệu chứng chưa rõ thì nên khám cho ra, đừng đoán. Giữ sức cho chặng cuối, đừng kiệt trước đích.",
    advice:
      "Chưa xong không phải là thất bại. Biết mình đang ở đâu trên sông thì còn chọn được bến.",
    fortuneLevel: "binh",
  },
];
