/**
 * Lời luận cho các con số thần số học, biên soạn riêng cho Huyền Tâm.
 * Mỗi số có phần chung và "lăng kính" theo từng vị trí trong bảng số.
 */

export type NumberRole = "lifePath" | "soul" | "personality" | "destiny" | "maturity";

export interface NumberProfile {
  title: string;
  keywords: string[];
  essence: string;
  strengths: string[];
  cautions: string[];
  work: string;
  love: string;
  advice: string;
  lens: Record<NumberRole, string>;
}

export const NUMBER_PROFILES: Record<number, NumberProfile> = {
  1: {
    title: "Người mở đường",
    keywords: ["độc lập", "quyết đoán", "khởi xướng"],
    essence:
      "Số 1 là con số của khởi đầu. Người mang số này thích tự mình đặt bước chân đầu tiên, không ngại đi một mình nếu con đường đó đúng. Họ có sức bật tốt, ra quyết định nhanh, và thường là người phá thế bế tắc trong một nhóm đang lưỡng lự.",
    strengths: [
      "Dám làm, dám chịu, không chờ người khác giục.",
      "Có óc tổ chức, biết chia việc và giữ nhịp cho cả nhóm.",
      "Bền chí khi đã đặt mục tiêu, càng bị nghi ngờ càng muốn chứng minh.",
    ],
    cautions: [
      "Dễ nóng vội, muốn kết quả ngay nên có lúc bỏ qua chi tiết.",
      "Đôi khi quên hỏi ý người bên cạnh, khiến người khác thấy bị gạt ra ngoài.",
      "Khó nhận sai trước đám đông, nên học cách lùi một bước cho êm.",
    ],
    work: "Hợp vai trò dẫn dắt, khởi nghiệp, quản lý dự án, kinh doanh riêng, hoặc bất cứ việc gì cần người dám chốt. Làm tốt nhất khi được giao quyền và tự chịu trách nhiệm kết quả.",
    love: "Trong tình cảm, số 1 chân thành và che chở, nhưng cần người bạn đời có cá tính riêng để không bị cuốn theo. Một lời hỏi han nhẹ nhàng của họ đáng giá hơn nhiều lời hứa.",
    advice: "Đi nhanh là điểm mạnh, nhưng thỉnh thoảng hãy dừng lại nhìn xem ai đang đi cùng. Người mở đường giỏi là người khiến người khác muốn theo.",
    lens: {
      lifePath: "Con đường đời của bạn xoay quanh việc học cách tự đứng vững. Những năm đầu có thể phải tự xoay xở nhiều, nhưng chính điều đó tôi luyện bạn thành người có bản lĩnh.",
      soul: "Sâu trong lòng, bạn khao khát được là chính mình và được công nhận bằng năng lực thật. Bạn không thích bị sắp đặt.",
      personality: "Người mới gặp thường thấy bạn tự tin, rõ ràng, có chút cứng cỏi. Họ tin bạn làm được việc ngay từ ấn tượng đầu.",
      destiny: "Tên gọi gửi gắm sứ mệnh khởi xướng: bạn có duyên với việc bắt đầu những điều mới mẻ và kéo người khác vào cuộc.",
      maturity: "Càng về sau bạn càng rõ mình muốn gì và tự tin đi đến cùng, bớt cần sự đồng ý của người khác.",
    },
  },
  2: {
    title: "Người kết nối",
    keywords: ["hòa hợp", "tinh tế", "hợp tác"],
    essence:
      "Số 2 là con số của đôi lứa và sự cân bằng. Người mang số này nhạy với cảm xúc của người khác, biết đọc không khí và thường là cầu nối êm dịu giữa những người khó nói chuyện với nhau. Sức mạnh của họ không ồn ào nhưng bền bỉ.",
    strengths: [
      "Lắng nghe giỏi, nói lời khiến người khác thấy được thấu hiểu.",
      "Khéo hòa giải, biết tìm điểm chung giữa hai bên.",
      "Chu đáo, để ý những chi tiết nhỏ mà người khác bỏ qua.",
    ],
    cautions: [
      "Ngại va chạm nên đôi khi im lặng chịu thiệt.",
      "Dễ để tâm trạng của người khác ảnh hưởng tới mình.",
      "Có lúc phân vân lâu vì sợ chọn sai làm buồn ai đó.",
    ],
    work: "Hợp với công việc cần sự phối hợp: nhân sự, chăm sóc khách hàng, tư vấn, ngoại giao, trợ lý điều hành, giáo dục, y tế. Làm việc nhóm tốt hơn làm một mình.",
    love: "Số 2 sống tình cảm và coi trọng sự gắn bó. Họ cho đi nhiều, nên cần một người biết đáp lại bằng sự ân cần chứ không xem đó là điều hiển nhiên.",
    advice: "Sự dịu dàng của bạn là một sức mạnh, không phải điểm yếu. Hãy cho phép mình nói “không” khi cần, người thương bạn sẽ hiểu.",
    lens: {
      lifePath: "Đường đời của bạn gắn với những mối quan hệ. Bạn trưởng thành qua việc học cách cho và nhận cân bằng, và thành công thường đến cùng người đồng hành.",
      soul: "Điều bạn mong mỏi nhất là sự bình yên và một nơi mình thuộc về. Một mái ấm êm đềm có ý nghĩa với bạn hơn danh tiếng.",
      personality: "Người khác thấy bạn dễ gần, nhã nhặn, nói năng mềm mỏng. Bạn tạo cảm giác an toàn cho người đối diện.",
      destiny: "Tên gọi mang sứ mệnh kết nối: bạn có duyên làm cầu nối, giúp người với người hiểu nhau hơn.",
      maturity: "Về sau bạn càng biết trân trọng những mối quan hệ sâu, và trở thành chỗ dựa tinh thần cho gia đình.",
    },
  },
  3: {
    title: "Người truyền cảm hứng",
    keywords: ["sáng tạo", "giao tiếp", "lạc quan"],
    essence:
      "Số 3 là con số của biểu đạt và niềm vui. Người mang số này có lời ăn tiếng nói duyên dáng, giàu trí tưởng tượng và thường mang lại tiếng cười cho nơi họ đến. Họ học nhanh nhờ tò mò, và có khả năng biến điều khô khan thành câu chuyện hấp dẫn.",
    strengths: [
      "Ăn nói có duyên, dễ thuyết phục bằng sự nhiệt tình.",
      "Óc sáng tạo phong phú, nhiều ý tưởng mới.",
      "Lạc quan, mau lấy lại tinh thần sau vấp ngã.",
    ],
    cautions: [
      "Hứng thú nhanh nhưng cũng dễ chán, việc dang dở dễ bị bỏ lửng.",
      "Có lúc nói nhiều hơn làm, cần biến ý tưởng thành kế hoạch.",
      "Dễ tiêu tiền theo cảm hứng.",
    ],
    work: "Hợp với truyền thông, sáng tạo nội dung, thiết kế, nghệ thuật, bán hàng, đào tạo, sự kiện, bất cứ nơi nào cần giao tiếp và ý tưởng.",
    love: "Trong tình yêu số 3 vui vẻ, lãng mạn và hay tạo bất ngờ. Họ cần người bạn đời cùng cười được và cho họ không gian để bay bổng.",
    advice: "Tài năng của bạn tỏa sáng nhất khi đi kèm sự kiên trì. Chọn một hai việc thật thích và làm đến nơi đến chốn.",
    lens: {
      lifePath: "Đường đời của bạn là hành trình tìm tiếng nói riêng. Khi dám thể hiện mình, cánh cửa cơ hội tự mở.",
      soul: "Bạn khao khát được bày tỏ và được người khác đón nhận. Niềm vui sáng tạo là thứ nuôi dưỡng bạn.",
      personality: "Người ngoài thấy bạn hoạt bát, cởi mở, có khiếu hài hước. Bạn dễ làm quen và dễ được nhớ đến.",
      destiny: "Tên gọi mang sứ mệnh truyền cảm hứng: lời nói và tác phẩm của bạn có thể làm người khác vui và tin hơn.",
      maturity: "Về sau sự sáng tạo của bạn chín hơn, biết chọn lọc và để lại những thành quả có giá trị lâu dài.",
    },
  },
  4: {
    title: "Người xây nền",
    keywords: ["kỷ luật", "thực tế", "đáng tin"],
    essence:
      "Số 4 là con số của bốn góc vững chãi. Người mang số này làm việc có phương pháp, coi trọng sự chắc chắn và thường được giao những việc quan trọng vì ai cũng biết họ sẽ làm đến cùng. Họ xây thành quả từng viên gạch một.",
    strengths: [
      "Chăm chỉ, kiên nhẫn, không ngại việc khó và lâu.",
      "Ngăn nắp, có kế hoạch rõ ràng, giữ lời hứa.",
      "Thực tế, quản lý tiền bạc cẩn thận.",
    ],
    cautions: [
      "Có thể cứng nhắc khi mọi thứ thay đổi ngoài kế hoạch.",
      "Dễ ôm việc, ngại nhờ người khác.",
      "Ít bộc lộ cảm xúc nên đôi khi bị hiểu là khô khan.",
    ],
    work: "Hợp với kỹ thuật, xây dựng, kế toán, tài chính, hành chính, quản lý vận hành, nghề thủ công. Nơi nào cần quy trình chặt chẽ là nơi số 4 tỏa sáng.",
    love: "Số 4 yêu bằng hành động: lo chuyện nhà cửa, giữ lời hứa, ở bên lúc khó. Họ hợp với người trân trọng sự ổn định và biết nói lời ngọt thay họ.",
    advice: "Nền móng bạn xây rất vững, giờ hãy cho phép mình nghỉ ngơi và đón nhận vài điều bất ngờ dễ chịu.",
    lens: {
      lifePath: "Đường đời của bạn đi từ từ nhưng chắc. Thành công đến muộn hơn người khác một chút nhưng bền và ít đổ vỡ.",
      soul: "Bạn mong có một cuộc sống ổn định, an toàn cho người thân. Sự chắc chắn khiến bạn yên lòng.",
      personality: "Người khác thấy bạn nghiêm túc, đáng tin, hơi kín đáo. Họ yên tâm giao việc cho bạn.",
      destiny: "Tên gọi mang sứ mệnh xây dựng: bạn có duyên tạo dựng những thứ lâu bền, từ gia đình đến sự nghiệp.",
      maturity: "Về sau bạn gặt hái thành quả của nhiều năm bền bỉ, sống thong thả hơn trên nền đã vững.",
    },
  },
  5: {
    title: "Người tự do",
    keywords: ["linh hoạt", "phiêu lưu", "đổi mới"],
    essence:
      "Số 5 nằm giữa dãy số, như ngã tư của mọi hướng đi. Người mang số này yêu tự do, thích trải nghiệm, thích dịch chuyển và học nhiều nhất từ thực tế. Họ thích nghi nhanh và mang luồng gió mới đến bất cứ nơi đâu.",
    strengths: [
      "Linh hoạt, xoay xở giỏi khi hoàn cảnh thay đổi.",
      "Ham học hỏi, hiểu biết rộng, nhiều trải nghiệm.",
      "Có sức hút tự nhiên, dễ kết bạn ở khắp nơi.",
    ],
    cautions: [
      "Dễ bồn chồn khi bị gò bó, có lúc bỏ việc giữa chừng.",
      "Thích cái mới nên đôi khi thiếu kiên nhẫn với việc lặp lại.",
      "Cần cẩn trọng với những quyết định bốc đồng về tiền bạc.",
    ],
    work: "Hợp với du lịch, kinh doanh, bán hàng, báo chí, marketing, xuất nhập khẩu, công việc tự do hoặc hay đi lại. Môi trường năng động giúp họ phát huy.",
    love: "Số 5 cần một tình yêu cho nhau khoảng trời riêng. Khi được tin tưởng, họ gắn bó và mang lại rất nhiều niềm vui cho người bên cạnh.",
    advice: "Tự do thật sự đến từ việc tự làm chủ mình. Giữ vài thói quen vững vàng, bạn sẽ bay xa mà không lạc hướng.",
    lens: {
      lifePath: "Đường đời của bạn nhiều đổi thay và trải nghiệm. Mỗi lần thay đổi là một lần bạn rộng ra.",
      soul: "Bạn khao khát được sống phóng khoáng, được thử, được đi. Sự đơn điệu làm bạn mệt hơn công việc nặng.",
      personality: "Người khác thấy bạn năng động, vui tính, thức thời. Bạn có vẻ trẻ trung so với tuổi.",
      destiny: "Tên gọi mang sứ mệnh đổi mới: bạn có duyên đem cái mới đến, giúp người khác dám thay đổi.",
      maturity: "Về sau bạn biết chọn tự do một cách khôn ngoan, kết hợp trải nghiệm với sự ổn định.",
    },
  },
  6: {
    title: "Người vun đắp",
    keywords: ["yêu thương", "trách nhiệm", "gia đình"],
    essence:
      "Số 6 là con số của mái ấm. Người mang số này giàu lòng yêu thương, có trách nhiệm với gia đình và cộng đồng, luôn muốn mọi người xung quanh được chăm sóc chu đáo. Họ có con mắt thẩm mỹ và thích làm đẹp cho nơi mình sống.",
    strengths: [
      "Tận tụy, chăm sóc người khác chu đáo.",
      "Có trách nhiệm, sẵn sàng gánh vác khi gia đình cần.",
      "Có gu thẩm mỹ, biết tạo không khí ấm cúng.",
    ],
    cautions: [
      "Dễ lo lắng thay cho người khác, ôm hết phần việc.",
      "Đôi khi muốn mọi thứ hoàn hảo nên tự tạo áp lực.",
      "Có thể vô tình can thiệp quá sâu vào chuyện của người thân.",
    ],
    work: "Hợp với giáo dục, y tế, chăm sóc, tư vấn tâm lý, thiết kế nội thất, ẩm thực, làm đẹp, công tác xã hội. Việc gì giúp người khác sống tốt hơn đều hợp.",
    love: "Số 6 là người bạn đời tận tụy, coi gia đình là trung tâm. Họ hạnh phúc nhất khi được yêu thương lại theo cách chân thành, giản dị.",
    advice: "Chăm cho người khác là đức tính đẹp, nhưng bạn cũng xứng đáng được chăm sóc. Hãy dành phần yêu thương cho chính mình.",
    lens: {
      lifePath: "Đường đời của bạn gắn với trách nhiệm và tình thương. Bạn thường là trụ cột tinh thần của gia đình.",
      soul: "Điều bạn khao khát là một gia đình êm ấm, người thân khỏe mạnh, hòa thuận.",
      personality: "Người khác thấy bạn hiền hậu, đáng tin, chu đáo. Họ tìm đến bạn khi cần lời khuyên.",
      destiny: "Tên gọi mang sứ mệnh vun đắp: bạn có duyên chăm lo, chữa lành và làm đẹp cho cuộc sống quanh mình.",
      maturity: "Về sau bạn trở thành người được kính trọng trong gia đình và họ hàng, là nơi mọi người quay về.",
    },
  },
  7: {
    title: "Người tìm hiểu",
    keywords: ["sâu sắc", "phân tích", "nội tâm"],
    essence:
      "Số 7 là con số của chiêm nghiệm. Người mang số này thích đi tìm câu trả lời tận gốc, có trực giác tốt và óc phân tích sắc bén. Họ cần khoảng lặng để nạp năng lượng, và thường hiểu đời qua trải nghiệm của chính mình hơn là qua lời người khác.",
    strengths: [
      "Suy nghĩ sâu, nhìn ra điều người khác bỏ sót.",
      "Có chuyên môn vững nhờ chịu khó nghiên cứu.",
      "Trực giác nhạy, ít khi bị lừa bởi vẻ bề ngoài.",
    ],
    cautions: [
      "Dễ khép mình, ngại chia sẻ nên bị cho là xa cách.",
      "Hay nghi ngờ, cần nhiều thời gian mới tin người.",
      "Suy nghĩ quá nhiều có thể làm lỡ thời cơ.",
    ],
    work: "Hợp với nghiên cứu, khoa học, công nghệ, phân tích dữ liệu, luật, y học, triết học, viết lách, các ngành cần chuyên sâu.",
    love: "Số 7 yêu sâu nhưng ít nói. Họ cần người kiên nhẫn, tôn trọng khoảng riêng và có thể trò chuyện cùng họ về những điều sâu sắc.",
    advice: "Trí tuệ của bạn sẽ có ích hơn khi được chia sẻ. Mở lòng với vài người tin cậy, bạn sẽ thấy đời nhẹ hơn.",
    lens: {
      lifePath: "Đường đời của bạn là hành trình học hỏi và tìm ý nghĩa. Những năm tháng tự học, tự chiêm nghiệm sẽ thành vốn quý.",
      soul: "Bạn khao khát hiểu biết và sự bình yên trong tâm. Một góc yên tĩnh với sách vở có thể là niềm vui lớn.",
      personality: "Người khác thấy bạn điềm tĩnh, kín đáo, có chiều sâu. Họ thường tò mò muốn hiểu bạn hơn.",
      destiny: "Tên gọi mang sứ mệnh tìm hiểu: bạn có duyên đi sâu vào chuyên môn và soi sáng điều người khác chưa rõ.",
      maturity: "Về sau bạn trở thành người có trí tuệ, được tìm đến để hỏi ý kiến, sống an nhiên hơn.",
    },
  },
  8: {
    title: "Người làm chủ",
    keywords: ["thành tựu", "bản lĩnh", "tài chính"],
    essence:
      "Số 8 là con số của sức mạnh và sự cân bằng giữa vật chất và tinh thần. Người mang số này có óc kinh doanh, biết nhìn xa, biết quản lý nguồn lực và không ngại những mục tiêu lớn. Họ được người khác nể vì sự quyết đoán và khả năng biến kế hoạch thành kết quả.",
    strengths: [
      "Có tầm nhìn, biết đặt mục tiêu lớn và đi từng bước.",
      "Giỏi quản lý tiền bạc và con người.",
      "Bền bỉ, chịu được áp lực cao.",
    ],
    cautions: [
      "Dễ cuốn vào công việc mà quên nghỉ ngơi, quên người thân.",
      "Có lúc quá chú trọng kết quả mà cứng rắn với người khác.",
      "Cần giữ chữ tín và sự minh bạch trong chuyện tiền.",
    ],
    work: "Hợp với kinh doanh, đầu tư, quản lý cấp cao, ngân hàng, bất động sản, luật, các vị trí điều hành.",
    love: "Số 8 là chỗ dựa vững chãi, lo chu toàn đời sống vật chất cho gia đình. Họ cần người bạn đời nhắc họ chậm lại và tận hưởng.",
    advice: "Thành công vật chất sẽ trọn vẹn khi đi cùng sự rộng lượng. Dùng sức mạnh của bạn để nâng đỡ người khác.",
    lens: {
      lifePath: "Đường đời của bạn có nhiều cơ hội gây dựng sự nghiệp và tài sản, đi kèm bài học về cách dùng quyền lực cho đúng.",
      soul: "Bạn khao khát được làm chủ cuộc đời mình và tạo dựng một nền tảng vững vàng cho người thân.",
      personality: "Người khác thấy bạn chững chạc, có uy, đáng tin trong chuyện lớn.",
      destiny: "Tên gọi mang sứ mệnh làm chủ: bạn có duyên với vai trò quản lý và tạo ra giá trị vật chất.",
      maturity: "Về sau bạn đạt được vị thế và sự sung túc, đồng thời biết cho đi nhiều hơn.",
    },
  },
  9: {
    title: "Người bao dung",
    keywords: ["nhân ái", "rộng lượng", "lý tưởng"],
    essence:
      "Số 9 là con số khép lại một vòng, chứa đựng tất cả những số trước nó. Người mang số này có tấm lòng rộng, hay nghĩ cho người khác và cho cộng đồng. Họ có lý tưởng sống đẹp, giàu lòng trắc ẩn và thường được nhiều người quý mến.",
    strengths: [
      "Rộng lượng, dễ tha thứ, sống có tình có nghĩa.",
      "Có tầm nhìn rộng, hiểu được nhiều hoàn cảnh khác nhau.",
      "Có khiếu nghệ thuật và khả năng truyền cảm hứng.",
    ],
    cautions: [
      "Dễ cho đi quá sức, có lúc bị lợi dụng lòng tốt.",
      "Lý tưởng cao nên hay thất vọng khi thực tế không như ý.",
      "Cần học cách buông những chuyện cũ để bước tiếp.",
    ],
    work: "Hợp với giáo dục, y tế, công tác xã hội, nghệ thuật, tổ chức phi lợi nhuận, ngoại giao, những việc mang lại lợi ích chung.",
    love: "Số 9 yêu bằng cả tấm lòng và bao dung với khuyết điểm của người kia. Họ hợp với người cùng chung giá trị sống.",
    advice: "Lòng tốt của bạn là món quà. Hãy cho đi trong sức mình và nhớ giữ một phần ấm áp cho bản thân.",
    lens: {
      lifePath: "Đường đời của bạn hướng về sự cho đi và hoàn thiện. Mỗi lần giúp người là một lần bạn lớn lên.",
      soul: "Bạn khao khát một thế giới tử tế hơn và muốn mình góp phần nhỏ vào đó.",
      personality: "Người khác thấy bạn ấm áp, hào phóng, có khí chất. Bạn dễ được tin cậy.",
      destiny: "Tên gọi mang sứ mệnh bao dung: bạn có duyên giúp đỡ, chữa lành và truyền cảm hứng cho nhiều người.",
      maturity: "Về sau bạn sống an yên, được nhiều người biết ơn, và tìm thấy ý nghĩa trong việc phụng sự.",
    },
  },
  11: {
    title: "Người soi đường",
    keywords: ["trực giác", "cảm hứng", "tâm linh"],
    essence:
      "Số 11 là số bậc thầy, mang năng lượng của số 2 được nhân lên. Người mang số này có trực giác rất nhạy, giàu cảm xúc và thường có những ý tưởng vượt trước. Họ có khả năng truyền cảm hứng chỉ bằng sự hiện diện, nhưng cũng cần học cách giữ cho mình cân bằng.",
    strengths: [
      "Trực giác mạnh, cảm nhận được điều chưa nói ra.",
      "Có tầm nhìn và lý tưởng, truyền cảm hứng cho người khác.",
      "Nhạy cảm với cái đẹp, nghệ thuật, tâm linh.",
    ],
    cautions: [
      "Dễ căng thẳng, lo âu vì cảm nhận quá nhiều.",
      "Có lúc tự đặt kỳ vọng quá cao cho bản thân.",
      "Cần thời gian tĩnh lặng để không bị kiệt sức.",
    ],
    work: "Hợp với giáo dục, tư vấn, nghệ thuật, tâm lý, truyền thông, những vai trò dẫn dắt tinh thần hoặc sáng tạo ý tưởng.",
    love: "Số 11 yêu sâu sắc và lãng mạn. Họ cần người thấu hiểu sự nhạy cảm của mình, cho họ cảm giác an toàn.",
    advice: "Trực giác là ngọn đèn của bạn. Giữ thân tâm điều độ, ngọn đèn ấy sẽ soi sáng cho cả bạn và người khác.",
    lens: {
      lifePath: "Đường đời của bạn mang nhiều trải nghiệm đánh thức nội tâm. Khi tin vào trực giác, bạn đi đúng hướng.",
      soul: "Bạn khao khát được sống có ý nghĩa và chạm đến lòng người.",
      personality: "Người khác thấy bạn có sức hút đặc biệt, nhẹ nhàng mà khó quên.",
      destiny: "Tên gọi mang sứ mệnh soi đường: bạn có duyên khơi gợi niềm tin và cảm hứng cho người khác.",
      maturity: "Về sau bạn sống hài hòa với trực giác của mình và trở thành người dẫn dắt tinh thần đáng quý.",
    },
  },
  22: {
    title: "Người kiến tạo",
    keywords: ["tầm vóc", "thực thi", "bền vững"],
    essence:
      "Số 22 là số bậc thầy, mang sức bền của số 4 được nâng tầm. Người mang số này vừa có giấc mơ lớn vừa có khả năng hiện thực hóa nó bằng kế hoạch cụ thể. Họ có thể xây dựng những công trình, tổ chức có ích cho nhiều người.",
    strengths: [
      "Biến tầm nhìn lớn thành kế hoạch làm được.",
      "Kiên định, tổ chức giỏi, quy tụ được người tài.",
      "Có trách nhiệm với cộng đồng.",
    ],
    cautions: [
      "Áp lực tự đặt ra rất lớn, dễ quá tải.",
      "Có lúc cầu toàn, khó hài lòng với kết quả.",
      "Cần học cách chia sẻ gánh nặng với người khác.",
    ],
    work: "Hợp với quản lý dự án lớn, kiến trúc, kỹ thuật, quy hoạch, lãnh đạo tổ chức, khởi nghiệp có quy mô.",
    love: "Số 22 trung thành và đáng tin. Họ cần người bạn đời đồng hành với mục tiêu lớn và nhắc họ sống chậm.",
    advice: "Bạn có thể xây những điều lớn lao. Hãy đi từng bước, chăm sóc sức khỏe, và để người khác cùng góp tay.",
    lens: {
      lifePath: "Đường đời của bạn có tiềm năng tạo dựng những điều vượt tầm cá nhân, nếu bạn kiên trì và giữ sức.",
      soul: "Bạn khao khát để lại một dấu ấn có ích và bền lâu.",
      personality: "Người khác thấy bạn đáng tin, có tầm, nói được làm được.",
      destiny: "Tên gọi mang sứ mệnh kiến tạo: bạn có duyên xây những nền tảng cho nhiều người.",
      maturity: "Về sau những gì bạn xây dựng trở thành di sản cho gia đình và cộng đồng.",
    },
  },
  33: {
    title: "Người chữa lành",
    keywords: ["từ bi", "phụng sự", "dẫn dắt bằng trái tim"],
    essence:
      "Số 33 là số bậc thầy hiếm gặp, mang lòng yêu thương của số 6 ở mức cao nhất. Người mang số này có trái tim rộng mở, muốn nâng đỡ và chữa lành cho người khác. Họ dạy bằng tấm gương của mình hơn là lời nói.",
    strengths: [
      "Giàu lòng trắc ẩn, khiến người khác thấy được an ủi.",
      "Có khả năng dạy dỗ, dìu dắt người trẻ.",
      "Sống có trách nhiệm và hy sinh vì điều đúng.",
    ],
    cautions: [
      "Dễ quên bản thân vì lo cho người khác.",
      "Có lúc gánh cả nỗi buồn của người khác vào mình.",
      "Cần đặt giới hạn để giữ sức lâu dài.",
    ],
    work: "Hợp với giáo dục, y tế, trị liệu, công tác xã hội, nghệ thuật chữa lành, tôn giáo, những việc chăm sóc con người.",
    love: "Số 33 yêu thương vô điều kiện. Họ cần một người biết trân trọng và chăm sóc lại họ.",
    advice: "Bạn là nguồn ấm áp cho nhiều người. Chăm sóc nguồn ấm ấy bằng nghỉ ngơi và niềm vui riêng.",
    lens: {
      lifePath: "Đường đời của bạn hướng đến phụng sự. Bạn học bài học lớn nhất qua việc yêu thương mà không đánh mất mình.",
      soul: "Bạn khao khát thấy người thân và người quanh mình được bình an, hạnh phúc.",
      personality: "Người khác thấy bạn hiền hòa, bao dung, đáng kính.",
      destiny: "Tên gọi mang sứ mệnh chữa lành: bạn có duyên xoa dịu và dìu dắt người khác.",
      maturity: "Về sau bạn trở thành điểm tựa tinh thần, được nhiều người yêu quý và biết ơn.",
    },
  },
};

export const ROLE_INFO: Record<NumberRole, { label: string; hint: string; question: string }> = {
  lifePath: { label: "Số chủ đạo", hint: "Từ ngày sinh", question: "Con đường đời" },
  destiny: { label: "Sứ mệnh", hint: "Từ cả họ tên", question: "Tài năng và sứ mệnh" },
  soul: { label: "Linh hồn", hint: "Từ nguyên âm", question: "Khao khát bên trong" },
  personality: { label: "Nhân cách", hint: "Từ phụ âm", question: "Ấn tượng bên ngoài" },
  maturity: { label: "Trưởng thành", hint: "Chủ đạo + sứ mệnh", question: "Hướng đi về sau" },
};

/** Năm cá nhân, chu kỳ 9 năm. */
export const PERSONAL_YEAR: Record<number, { title: string; text: string }> = {
  1: { title: "Năm gieo hạt", text: "Mở đầu chu kỳ chín năm mới. Thời điểm tốt để bắt đầu việc mới, đổi hướng, đặt mục tiêu dài hạn. Điều bạn gieo năm nay sẽ lớn dần trong những năm sau." },
  2: { title: "Năm vun gốc", text: "Năm của kiên nhẫn và hợp tác. Mọi thứ đi chậm hơn, nhưng các mối quan hệ được vun đắp. Hợp để tìm người đồng hành, củng cố tình cảm, lắng nghe nhiều hơn." },
  3: { title: "Năm nảy mầm", text: "Năm vui vẻ, giao lưu, sáng tạo. Những nỗ lực bắt đầu có kết quả nhỏ. Hợp để học điều mới, thể hiện bản thân, mở rộng quan hệ, nhưng nhớ giữ tiền tiêu." },
  4: { title: "Năm đắp nền", text: "Năm làm việc chăm chỉ và sắp xếp lại nền tảng: nhà cửa, tài chính, sức khỏe. Không hào nhoáng nhưng những gì làm năm nay rất bền." },
  5: { title: "Năm chuyển mình", text: "Năm của thay đổi và cơ hội bất ngờ: đi lại, đổi việc, gặp người mới. Hãy linh hoạt đón nhận nhưng đừng quyết định vội vàng chuyện lớn." },
  6: { title: "Năm sum vầy", text: "Năm hướng về gia đình và trách nhiệm. Thuận cho cưới hỏi, sửa sang nhà cửa, chăm sóc người thân. Tình cảm được đền đáp bằng sự ấm áp." },
  7: { title: "Năm lắng lại", text: "Năm chiêm nghiệm, học hỏi và chăm cho tinh thần. Hợp để nghiên cứu, nâng cao chuyên môn, nghỉ ngơi. Không vội mở rộng, hãy hiểu mình trước." },
  8: { title: "Năm gặt hái", text: "Năm của thành quả và tài chính. Công sức những năm trước được ghi nhận, có cơ hội thăng tiến, tăng thu nhập. Hợp để mạnh dạn ra quyết định lớn." },
  9: { title: "Năm khép vòng", text: "Năm kết thúc chu kỳ: dọn dẹp, buông bỏ những gì không còn hợp, hoàn tất việc dang dở. Cho đi và tha thứ để năm sau bắt đầu thật nhẹ nhàng." },
};

/** Lời luận quan hệ ngũ hành giữa tên và bản mệnh. */
export const ELEMENT_RELATION_TEXT: Record<"cung" | "sinh" | "duoc-sinh" | "khac" | "bi-khac", { title: string; text: string }> = {
  sinh: {
    title: "Tên sinh cho mệnh",
    text: "Hành của tên nuôi dưỡng bản mệnh, như nước tưới cây. Đây là thế đẹp nhất: cái tên như một người bạn đỡ nâng, giúp bạn thuận lợi hơn khi giao tiếp và làm việc.",
  },
  cung: {
    title: "Tên cùng hành với mệnh",
    text: "Tên và bản mệnh cùng một hành, như hai người cùng chí hướng. Năng lượng được củng cố, tính cách rõ nét. Chỉ cần giữ cân bằng để điểm mạnh không thành thái quá.",
  },
  "duoc-sinh": {
    title: "Mệnh sinh cho tên",
    text: "Bản mệnh nuôi dưỡng cái tên. Bạn là người cho đi nhiều, sẵn lòng vun đắp cho danh tiếng và các mối quan hệ. Thế này vẫn hài hòa, chỉ nên nhớ giữ sức cho mình.",
  },
  khac: {
    title: "Tên chế ngự mệnh",
    text: "Hành của tên khắc bản mệnh. Theo quan niệm dân gian, đây là thế cần bổ trợ: có thể dùng màu sắc, vật phẩm hoặc tên gọi thân mật mang hành trung gian để hóa giải. Đây chỉ là một yếu tố nhỏ, nỗ lực của bạn mới quyết định.",
  },
  "bi-khac": {
    title: "Mệnh chế ngự tên",
    text: "Bản mệnh khắc hành của tên. Bạn thường phải tự mình nỗ lực nhiều hơn để cái tên phát huy, nhưng cũng nhờ thế mà bản lĩnh vững vàng. Bổ sung hành trung gian qua màu sắc, đồ dùng sẽ giúp cân bằng.",
  },
};

/** Hành trung gian để hóa giải: hành được sinh bởi hành khắc và sinh cho hành bị khắc. */
export const ELEMENT_COLORS: Record<string, string> = {
  Kim: "trắng, xám, ánh bạc",
  Moc: "xanh lá, xanh lục",
  Thuy: "đen, xanh dương, xanh nước biển",
  Hoa: "đỏ, hồng, cam, tím",
  Tho: "vàng đất, nâu, be",
};
