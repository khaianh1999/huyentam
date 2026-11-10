/**
 * 20 quẻ xăm Quan Âm — quan niệm dân gian.
 * Lời vịnh và luận giải được biên soạn để tham khảo văn hóa.
 * Không phải bản xăm gốc của một ngôi chùa, không phải lời dạy gán cho Quan Âm,
 * và không dùng để tiên đoán hay thay quyết định thực tế.
 */

export type FortuneStickLevel = "cat" | "binh" | "hung";

export type FortuneStick = {
  number: number;
  title: string;
  verse: string;
  meaning: string;
  level: FortuneStickLevel;
};

export const QUAN_AM_LABEL = "quan niệm dân gian" as const;

export const QUAN_AM_NOTE =
  "Bộ 20 quẻ xăm Quan Âm này thuộc quan niệm dân gian, biên soạn để tham khảo văn hóa. Đây không phải bản xăm gốc tại một ngôi chùa, không phải lời phán, và không thay thế quyết định thực tế.";

const verse = (lines: [string, string, string, string]) => lines.join("\n");

export const QUAN_AM_STICKS: FortuneStick[] = [
  {
    number: 1,
    title: "Khai tâm gặp phúc",
    verse: verse([
      "Cửa thiền vừa mở ánh xuân sang,",
      "Lòng thẳng không cần hỏi đoạn đàng.",
      "Một nén tâm hương lời nguyện nhỏ,",
      "Việc lành rồi cũng đến bên hàng.",
    ]),
    meaning:
      "Theo quan niệm dân gian, quẻ mở đầu thường được xem là thuận nếu người xin giữ lòng ngay và làm việc thiện nhỏ đều đặn. Công danh và gia đạo có chiều sáng khi không nóng vội.",
    level: "cat",
  },
  {
    number: 2,
    title: "Mây che trăng tỏ",
    verse: verse([
      "Trăng khuất mây tàn chớ vội lo,",
      "Việc đang còn nút hãy chờ cho.",
      "Một phen gió thổi màn mây rách,",
      "Mới thấy lòng mình sáng hay mờ.",
    ]),
    meaning:
      "Cách xem dân gian khuyên tạm dừng và quan sát thêm. Chưa nên ký kết lớn hay phán xét người khác khi sự việc còn chưa rõ.",
    level: "binh",
  },
  {
    number: 3,
    title: "Bạn lành đưa lối",
    verse: verse([
      "Đi một mình e lối chửa tường,",
      "Gặp người ngay thẳng hãy cùng đường.",
      "Xin đừng tham ngõ gần mà tắt,",
      "Phúc ấy theo chân kẻ biết nhường.",
    ]),
    meaning:
      "Dân gian thường luận là nên tìm người chỉ dẫn đáng tin và hợp tác công khai. Tình cảm lẫn công việc dễ khá hơn khi biết nhường một bước.",
    level: "cat",
  },
  {
    number: 4,
    title: "Nóng lòng sinh vạ",
    verse: verse([
      "Lửa lòng vừa bốc đã thành than,",
      "Một tiếng nặng lời khó níu hoàn.",
      "Kiện cáo tranh phần đều chẳng lợi,",
      "Thu mình giữ lễ để qua nạn.",
    ]),
    meaning:
      "Theo lối luận xăm dân gian, quẻ này khuyên nhịn, tránh cãi vã và giấy tờ lúc đang nóng. Càng thúc càng dễ hỏng việc.",
    level: "hung",
  },
  {
    number: 5,
    title: "Mưa thuận gió hòa",
    verse: verse([
      "Ruộng sâu vừa gặp trận mưa đều,",
      "Kẻ gieo đúng vụ khỏi lo nhiều.",
      "Giữ phần dành dụm, chừa phần giúp,",
      "Nhà cửa rồi ra cũng ấm êm.",
    ]),
    meaning:
      "Quẻ được dân gian xem là thuận cho việc làm ăn chăm chỉ và gia đạo. Thành quả nghiêng về người biết chia sẻ, không chỉ biết thu.",
    level: "cat",
  },
  {
    number: 6,
    title: "Đò chưa cập bến",
    verse: verse([
      "Sông rộng đò neo hãy đợi đông,",
      "Chèo gấp giữa dòng dễ lạc lòng.",
      "Giấy tờ tiền bạc cần xem lại,",
      "Xong xuôi rồi hãy tính sang sông.",
    ]),
    meaning:
      "Cách hiểu dân gian khuyên hoãn việc lớn như dọn nhà, ký quỹ hoặc cưới hỏi gấp. Dùng thời gian này soát lại phần chuẩn bị.",
    level: "binh",
  },
  {
    number: 7,
    title: "Hiếu thuận gặp lành",
    verse: verse([
      "Bát cơm đưa tới mẹ đang ngồi,",
      "Phúc ấy không cần cửa sáng ngời.",
      "Người biết ơn nhà, thương kẻ yếu,",
      "Đi đâu cũng có lối thênh thơi.",
    ]),
    meaning:
      "Xăm Quan Âm theo quan niệm dân gian thường quý sự hiếu thảo và lòng thương. Việc nhà cùng sức khỏe người lớn tuổi được xem là khởi sắc nếu con cháu biết chăm.",
    level: "cat",
  },
  {
    number: 8,
    title: "Có công ắt sáng",
    verse: verse([
      "Sách mở giữa đèn chớ ngại khuya,",
      "Công danh không đến kẻ ngồi chờ.",
      "Hỏi thầy, sửa lỗi, mài cho nhọn,",
      "Khoa cử rồi đây cũng có mùa.",
    ]),
    meaning:
      "Dân gian hay gán quẻ này cho việc học và thi cử theo hướng thuận, với điều kiện chịu khó và biết hỏi người giỏi hơn mình.",
    level: "cat",
  },
  {
    number: 9,
    title: "Gió lay hãy thủ",
    verse: verse([
      "Cành mềm gặp gió hãy nằm yên,",
      "Chẳng phải thời đem sức ra đọ.",
      "Bệnh nhỏ nên dưỡng, việc nên khoan,",
      "Bạn cũ hơn người mới vội vàng.",
    ]),
    meaning:
      "Quẻ khuyên thủ, dưỡng sức và dựa vào quan hệ cũ đã được kiểm chứng. Chưa nên đổi việc hay tin người lạ.",
    level: "binh",
  },
  {
    number: 10,
    title: "Của rơi đừng nhặt",
    verse: verse([
      "Vàng rơi giữa chợ chẳng phải duyên,",
      "Thấy của mà tham dễ hóa phiền.",
      "Giữ miệng giữ tay đừng đứng mũi,",
      "Một phen sơ suất khổ triền miên.",
    ]),
    meaning:
      "Theo luận dân gian, quẻ cảnh báo lợi bất ngờ, lời mời dễ dãi và chuyện đứng ra bảo lãnh. Nhường cái lợi trước mắt để tránh rắc rối sau.",
    level: "hung",
  },
  {
    number: 11,
    title: "Sum họp một nhà",
    verse: verse([
      "Đèn hoa vừa thắp bữa cơm chiều,",
      "Người đi kẻ ở cũng quay chiều.",
      "Lời hòa hơn của, nhà hơn tiếng,",
      "Phúc đến từ trong chốn ít kêu.",
    ]),
    meaning:
      "Dân gian thường xem đây là quẻ hợp gia đạo và làm lành. Việc ngoài cũng dễ xuôi khi trong nhà đã yên.",
    level: "cat",
  },
  {
    number: 12,
    title: "Đường xa mới rõ",
    verse: verse([
      "Ba dặm sương mù chớ đoán xa,",
      "Đi thêm một quãng mới thành nhà.",
      "Tình duyên cửa nợ đều nên chậm,",
      "Thấy rõ lòng người hãy giao hòa.",
    ]),
    meaning:
      "Quẻ khuyên tìm hiểu thêm trước khi cam kết tình cảm hoặc làm ăn. Chậm một nhịp được xem là khôn, không phải là mất duyên.",
    level: "binh",
  },
  {
    number: 13,
    title: "Tâm thành có lối",
    verse: verse([
      "Một nén hương trầm chẳng ước cao,",
      "Lòng thành vẫn thấu đến sông đào.",
      "Việc nan còn đó nhưng đường mở,",
      "Cứ giữ điều ngay sẽ gặp nào.",
    ]),
    meaning:
      "Trong cách xăm dân gian, quẻ được hiểu là còn khó nhưng có thể chuyển nhờ lòng thành và việc lành. Không hứa một kết quả tức thì.",
    level: "cat",
  },
  {
    number: 14,
    title: "Gương vội dễ vỡ",
    verse: verse([
      "Soi gương mà vội trách hình ai,",
      "Lỗi ấy phần nhiều ở cửa mình.",
      "Tay đừng đập vội, lời đừng xé,",
      "Kẻo thương còn đó hóa tan tành.",
    ]),
    meaning:
      "Dân gian luận quẻ này theo hướng xấu cho cãi vã và quyết định lúc đang giận, nhất là chuyện vợ chồng, anh em. Nên dừng, chưa nên chia cắt.",
    level: "hung",
  },
  {
    number: 15,
    title: "Khoan dung được phúc",
    verse: verse([
      "Tha người một lỗi, phúc về sau,",
      "Chẳng phải vì ai, bởi giữ câu.",
      "Cửa sổ vừa khép cơn gió dữ,",
      "Sân nhà lại có bóng trăng thâu.",
    ]),
    meaning:
      "Quẻ thường được xem là cát khi người xin chịu bỏ một mối oán và xử việc theo lẽ phải. Công việc đang nghẽn có cơ được gỡ.",
    level: "cat",
  },
  {
    number: 16,
    title: "Sửa gốc hãy khoan ngọn",
    verse: verse([
      "Nhà dột từ nóc chớ vá riềm,",
      "Sổ sách còn mờ chớ gọi thêm.",
      "Một việc gốc xong, muôn việc nhẹ,",
      "Đừng tham mở ngõ lúc tường mềm.",
    ]),
    meaning:
      "Cách hiểu dân gian khuyên sửa chỗ hỏng cũ: nợ, thói quen, quy trình hoặc sức khỏe đã kéo dài. Chưa nên mở thêm việc mới.",
    level: "binh",
  },
  {
    number: 17,
    title: "Đêm đi dễ lạc",
    verse: verse([
      "Đêm khuya đường vắng chớ ham đi,",
      "Nghe tiếng gọi đò cũng phải nghi.",
      "Tiền bạc giấy tay lời hẹn gấp,",
      "Xếp lại chờ sáng hẵng tính đi.",
    ]),
    meaning:
      "Quẻ này trong dân gian được xem là xấu nếu cứ tiến vào việc mờ ám, đi đêm hoặc tin lời hứa gấp. Thủ và chờ cho rõ được khuyên hơn.",
    level: "hung",
  },
  {
    number: 18,
    title: "Mài sắt nên kim",
    verse: verse([
      "Sắt mòn vì nước chẳng vì may,",
      "Mỗi sáng một công, tối một tay.",
      "Đến lúc kim thành người mới thấy,",
      "Trước đó đừng đem bỏ giữa ngày.",
    ]),
    meaning:
      "Dân gian luận là cát muộn, dành cho người kiên trì. Việc học, nghề và tiền dành dụm có kết quả nếu không bỏ dở.",
    level: "cat",
  },
  {
    number: 19,
    title: "Khách đến cửa ngay",
    verse: verse([
      "Cửa vừa mở sẵn đã có người,",
      "Trà rót giữa nhà chuyện thảnh thơi.",
      "Giao kết đường đường thì mới quý,",
      "Đừng nghe xó bếp những lời chơi.",
    ]),
    meaning:
      "Quẻ được xem là thuận cho gặp gỡ, hợp tác và khách đến nhà. Điều kiện dân gian thường nhắc là công khai, đường đường chính chính.",
    level: "cat",
  },
  {
    number: 20,
    title: "Giữ mực giữa dòng",
    verse: verse([
      "Nước đầy quá bờ cũng hóa tai,",
      "Vui vừa giận vừa mới lâu dài.",
      "Xin bớt một câu, chừa một phần,",
      "Ấy mới là phương để khỏi sai.",
    ]),
    meaning:
      "Quẻ theo lối dân gian khuyên tiết chế: bớt chi, bớt lời, bớt tham. Giữ mực thì việc đang có vẫn ổn; vượt mực thì dễ hỏng.",
    level: "binh",
  },
];
