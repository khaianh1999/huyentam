/**
 * 20 quẻ xăm Quan Thánh (Quan Công) — quan niệm dân gian.
 * Lời vịnh và luận giải được biên soạn để tham khảo văn hóa.
 * Không phải bản xăm gốc của một đền miếu, không phải lời phán gán cho Quan Thánh,
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

export const QUAN_THANH_LABEL = "quan niệm dân gian" as const;

export const QUAN_THANH_NOTE =
  "Bộ 20 quẻ xăm Quan Thánh này thuộc quan niệm dân gian, biên soạn để tham khảo văn hóa. Đây không phải bản xăm gốc tại một đền miếu, không phải lời phán, và không thay thế quyết định thực tế.";

const verse = (lines: [string, string, string, string]) => lines.join("\n");

export const QUAN_THANH_STICKS: FortuneStick[] = [
  {
    number: 1,
    title: "Nghĩa khí mở đường",
    verse: verse([
      "Một lời đã hứa nặng hơn vàng,",
      "Việc nghĩa đem ra chớ tính toan.",
      "Giữ được chữ trung cùng chữ tín,",
      "Cửa nhà rồi cũng rộng thêm đàng.",
    ]),
    meaning:
      "Xăm Quan Thánh trong quan niệm dân gian quý người giữ lời và xử việc công minh. Làm ăn cùng tình anh em được xem là thuận nếu không thất hứa.",
    level: "cat",
  },
  {
    number: 2,
    title: "Gươm còn trong vỏ",
    verse: verse([
      "Gươm còn trong vỏ đã đủ oai,",
      "Chưa đến hồi ra chớ vội khai.",
      "Biết thời biết lý biết người đáng,",
      "Một bước đưa ra cũng thuận tay.",
    ]),
    meaning:
      "Dân gian thường khuyên có sức mà chưa dùng vội. Việc đàm phán, kỷ luật hoặc tranh chấp nên chuẩn bị đủ lẽ rồi hãy ra tay.",
    level: "cat",
  },
  {
    number: 3,
    title: "Chọn bạn mà giao",
    verse: verse([
      "Rượu ngon chưa chắc đã là bạn,",
      "Thử lúc hoạn nạn mới ra người.",
      "Chưa rõ lòng ai đừng giao ấn,",
      "Giữ mình trong sạch để chờ thời.",
    ]),
    meaning:
      "Quẻ khuyên xét bạn, đối tác và người sắp kết nghĩa. Chưa nên góp vốn hoặc giao quyền khi mới thấy vẻ ngoài hào hiệp.",
    level: "binh",
  },
  {
    number: 4,
    title: "Tham công bỏ nghĩa",
    verse: verse([
      "Thấy lợi mà quên kẻ đã nuôi,",
      "Một phen thất nghĩa khó tìm lui.",
      "Cửa quan cửa chợ đều không thuận,",
      "Muốn yên hãy trả lại điều ngay.",
    ]),
    meaning:
      "Theo luận dân gian, quẻ xấu cho việc phản bạn, nuốt lời hoặc tranh công của người khác. Muốn qua thì phải sửa lại cho ngay.",
    level: "hung",
  },
  {
    number: 5,
    title: "Đóng cửa đọc sách",
    verse: verse([
      "Chưa gặp minh quân chớ gõ thưa,",
      "Rèn nghề đọc sử luyện câu thư.",
      "Thời cơ chưa đến thì ngồi vững,",
      "Vội tiến giữa đời dễ hóa hư.",
    ]),
    meaning:
      "Quẻ được hiểu là thời dưỡng tài, chưa phải lúc cầu cạnh. Học và giữ phẩm sẽ hơn là chạy chọt.",
    level: "binh",
  },
  {
    number: 6,
    title: "Ra trận có quân",
    verse: verse([
      "Cờ nghĩa kéo ra đã có người,",
      "Một lòng chẳng sợ ngả nghiêng đời.",
      "Phân công minh bạch thưởng phạt rõ,",
      "Việc lớn làm xong vẫn thảnh thơi.",
    ]),
    meaning:
      "Dân gian hay luận quẻ này thuận cho làm việc tập thể có kỷ luật. Người cầm đầu phải công bằng thì đội nhóm mới bền.",
    level: "cat",
  },
  {
    number: 7,
    title: "Khinh địch mà sa",
    verse: verse([
      "Tưởng mình đã vững liền khinh người,",
      "Một phút lơ là hỏng cả mưu.",
      "Giấy tờ cửa ải lời thách thức,",
      "Đều nên nhường bước kẻo sa vời.",
    ]),
    meaning:
      "Quẻ cảnh báo sự chủ quan trong tranh chấp và hợp đồng. Nhường một bước được xem là sáng hơn là lấy uy.",
    level: "hung",
  },
  {
    number: 8,
    title: "Đền ơn đúng lúc",
    verse: verse([
      "Ơn xưa một chén chẳng được quên,",
      "Gặp hội đền ơn chớ ngại phiền.",
      "Người nghĩa giúp người khi còn khó,",
      "Phúc ấy dân gian vẫn gọi bền.",
    ]),
    meaning:
      "Quẻ cát theo hướng trả ơn, giúp người đúng lúc khó và giữ quan hệ cũ. Làm ăn thuận hơn nếu không quay lưng với người đã nâng mình.",
    level: "cat",
  },
  {
    number: 9,
    title: "Giữ thành chờ viện",
    verse: verse([
      "Thành còn lương thảo hãy đóng môn,",
      "Chưa rõ viện binh chớ mở cờ.",
      "Việc nhà việc cửa cần thủ trước,",
      "Đợi tin chắc chắn hãy đem so.",
    ]),
    meaning:
      "Dân gian khuyên giữ vị trí hiện có, kiểm kho quỹ, chưa mở mặt trận mới. Chờ tin đáng tin rồi hãy quyết.",
    level: "binh",
  },
  {
    number: 10,
    title: "Ly gián trong hàng",
    verse: verse([
      "Lời thì thầm dễ phá hàng ngũ,",
      "Một kẻ hai lòng họa đã gần.",
      "Đừng nghe xui dại mà chia của,",
      "Giữ sổ giữ người giữ mối nhân.",
    ]),
    meaning:
      "Quẻ được xem là xấu khi trong nhóm có lời chia rẽ và kích bác. Nên minh bạch, tránh quyết định theo lời xúi.",
    level: "hung",
  },
  {
    number: 11,
    title: "Hòa mà không hàng",
    verse: verse([
      "Nhường câu nhỏ nhặt để yên nhà,",
      "Việc nghĩa còn kia chớ bỏ qua.",
      "Hòa để giữ người không để mất,",
      "Ranh giới phải còn mới gọi hòa.",
    ]),
    meaning:
      "Quẻ khuyên hòa giải có nguyên tắc. Nhường chuyện nhỏ là đúng; nhường điều trái lẽ thì quan niệm dân gian không coi là nghĩa.",
    level: "binh",
  },
  {
    number: 12,
    title: "Mở sổ công minh",
    verse: verse([
      "Sổ sách đem ra đặt giữa đèn,",
      "Ai công ai lỗi hiện rõ tên.",
      "Làm ăn đường chính thì bền của,",
      "Khỏi phải đêm ngày sợ tiếng khen.",
    ]),
    meaning:
      "Quẻ thuận cho kiểm kê, quyết toán và thưởng phạt rõ. Tiền bạc cùng danh tiếng được dân gian xem là yên khi công khai.",
    level: "cat",
  },
  {
    number: 13,
    title: "Đợi sáng hãy tính",
    verse: verse([
      "Đêm còn chưa tan chớ thúc quân,",
      "Mờ mịt mà đánh dễ thương thân.",
      "Một đêm bàn lại cùng người trí,",
      "Sáng ra mới đáng mở cửa sân.",
    ]),
    meaning:
      "Quẻ khuyên hoãn quyết định xung đột, kiện tụng hoặc sa thải đến khi đã bàn với người sáng suốt. Đó là chờ cho rõ, không phải bỏ việc.",
    level: "binh",
  },
  {
    number: 14,
    title: "Ham danh hão",
    verse: verse([
      "Tiếng đồn một sớm chẳng phải công,",
      "Mua danh bằng của dễ thành không.",
      "Bạn bè vì tiếng mà xa nghĩa,",
      "Rút lại còn hơn cố giương cung.",
    ]),
    meaning:
      "Dân gian luận là xấu cho việc phô trương, mua danh hoặc nhận việc quá khả năng để được khen. Nên thu mình về việc thật.",
    level: "hung",
  },
  {
    number: 15,
    title: "Kết nghĩa đường dài",
    verse: verse([
      "Chén rượu kết giao chẳng phải chơi,",
      "Cùng nhau một nghĩa mới nên đời.",
      "Giữ lời giữa chợ như trên núi,",
      "Ấy mới là người đáng gửi hơi.",
    ]),
    meaning:
      "Quẻ cát cho tình bằng hữu và hợp tác lâu dài. Điều dân gian nhắc lại là giữ lời cả lúc không ai thấy.",
    level: "cat",
  },
  {
    number: 16,
    title: "Lui về giữ ấn",
    verse: verse([
      "Lui một bước không phải thua trận,",
      "Giữ ấn đừng đem nộp vội tay.",
      "Việc còn danh phận thì còn cửa,",
      "Hãy sửa hàng ngũ đợi ngày mai.",
    ]),
    meaning:
      "Quẻ khuyên rút có trật tự khỏi việc không hợp, mà vẫn giữ trách nhiệm chưa bàn giao. Lui không đồng nghĩa với bỏ mặc.",
    level: "binh",
  },
  {
    number: 17,
    title: "Trở mặt khó dung",
    verse: verse([
      "Một lời sáng sớm tối đã sai,",
      "Bạn cũ nhìn nhau hóa kẻ ngoài.",
      "Cửa nghĩa không dung người trở mặt,",
      "Muốn yên phải nhận lỗi cho ngay.",
    ]),
    meaning:
      "Quẻ xấu cho thất hứa, đổi phe hoặc làm hại người từng tin mình. Cách luận dân gian cho rằng chỉ nhận lỗi thật thì việc mới mong dịu.",
    level: "hung",
  },
  {
    number: 18,
    title: "Luyện nghề trong sân",
    verse: verse([
      "Sân nhà còn hẹp hãy luyện đòn,",
      "Chưa đem ra chợ thử gươm son.",
      "Tay nghề chắc rồi, lòng ngay đã,",
      "Mới đáng một phen mở cửa đón.",
    ]),
    meaning:
      "Quẻ khuyên rèn nghề và rèn tính ở phạm vi nhỏ trước. Chưa nên nhận hợp đồng lớn khi mình còn non.",
    level: "binh",
  },
  {
    number: 19,
    title: "Chính nghĩa được theo",
    verse: verse([
      "Việc ngay nói rõ khỏi cần quanh,",
      "Giữa chợ vẫn đường, tối vẫn lành.",
      "Người theo chẳng phải vì mình lớn,",
      "Thấy xử công bằng họ mới thành.",
    ]),
    meaning:
      "Quẻ được dân gian xem là cát cho người dám làm việc chính đáng và công khai. Đồng nghiệp cùng khách tin vì sự công bằng, không vì khoe mẽ.",
    level: "cat",
  },
  {
    number: 20,
    title: "Giữ mực cương nhu",
    verse: verse([
      "Cứng quá thì gãy, mềm khó xiêu,",
      "Nghĩa ở giữa đường mới bền lâu.",
      "Một việc hãy cân trước khi quyết,",
      "Gươm còn trong vỏ đã đủ màu.",
    ]),
    meaning:
      "Quẻ khuyên đứng giữa cứng và mềm. Việc đáng làm vẫn làm, nhưng cân trước khi chém đứt, theo đúng tinh thần nghĩa trong quan niệm dân gian.",
    level: "binh",
  },
];
