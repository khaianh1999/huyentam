/**
 * Bài đọc kiến thức. Nội dung giáo dục văn hóa, không phải lời tiên đoán.
 */

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  tags: string[];
  content: string;
  publishedAt: string;
  readingMinutes: number;
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "muoi-hai-con-giap-la-gi",
    title: "Mười hai con giáp là gì, và tuổi tính từ ngày nào?",
    excerpt:
      "Con giáp là cách gọi dân gian của địa chi. Tuổi đổi vào Tết Nguyên đán, không phải vào đêm giao thừa dương lịch.",
    category: "Con giáp",
    tags: ["12 con giáp", "địa chi", "năm âm lịch"],
    publishedAt: "2026-03-04",
    readingMinutes: 6,
    content: `Mười hai con giáp là lớp tên thú mà người Việt gắn với mười hai địa chi: Tý Chuột, Sửu Trâu, Dần Hổ, Mão Mèo, Thìn Rồng, Tỵ Rắn, Ngọ Ngựa, Mùi Dê, Thân Khỉ, Dậu Gà, Tuất Chó, Hợi Lợn. Đây là quan niệm dân gian bọc quanh một bộ đếm thời gian có thật trong lịch pháp.

## Địa chi không phải tính cách

Địa chi là mười hai vị trí trong vòng đếm năm, tháng, ngày và giờ. Mỗi chi còn được gán một ngũ hành cố định: Tý và Hợi thuộc Thủy, Sửu, Thìn, Mùi, Tuất thuộc Thổ, Dần và Mão thuộc Mộc, Tỵ và Ngọ thuộc Hỏa, Thân và Dậu thuộc Kim. Ngũ hành của chi khác với nạp âm. Nạp âm đổi theo cặp can–chi, nên hai người cùng tuổi Chuột có thể mang hai nạp âm khác nhau.

Ở Việt Nam, chi Mão được gọi là Mèo. Một số nước Đông Á gọi chi này là Thỏ. Khác tên gọi, không khác vị trí của chi trong vòng mười hai.

## Tuổi tính theo năm âm

Một năm con giáp bắt đầu từ Tết Nguyên đán, tức mùng một tháng Giêng âm lịch, và kết thúc trước giao thừa năm sau. Người sinh tháng Một hoặc đầu tháng Hai dương lịch cần xem mình đã qua Tết chưa. Sinh trước Tết thì vẫn thuộc tuổi của năm âm cũ.

Ví dụ, Tết Bính Ngọ 2026 rơi vào giữa tháng Hai dương lịch. Những ngày đầu năm 2026, trước Tết, vẫn nằm trong năm Ất Tỵ. Danh sách "năm 2026 là năm Ngọ" trên các lịch phổ thông là nói về năm có Tết mở tuổi Ngọ, không phải mọi ngày từ 1 tháng Một.

## Khuôn mẫu chỉ là chuyện kể

Chuyện dân gian gán cho mỗi tuổi một dáng tính: chuột nhanh, trâu bền, hổ thẳng, mèo khéo. Đó là hình ảnh để nhớ chi, giống như người ta nhớ phương hướng bằng màu sắc. Hình ảnh không mô tả một cá nhân, và không dùng để loại ai khỏi một nghề, một hôn nhân hay một quyết định tiền bạc.

Khi đọc tuổi trên Huyền Tâm, hãy tách ba lớp: chi của năm âm (việc của lịch), ngũ hành của chi và nạp âm (quy ước gọi tên), và đoạn văn tính cách (quan niệm dân gian).
`,
  },
  {
    slug: "tam-hop-va-tu-hanh-xung",
    title: "Tam hợp và tứ hành xung: hai quy ước khác nhau",
    excerpt:
      "Tam hợp là bốn bộ ba. Tứ hành xung là ba bộ bốn. Lục hợp và lục xung lại là các cặp. Trộn các lớp này sẽ xem tuổi sai.",
    category: "Con giáp",
    tags: ["tam hợp", "tứ hành xung", "lục hợp", "lục xung"],
    publishedAt: "2026-03-18",
    readingMinutes: 7,
    content: `Xem tuổi hợp hay xung là quan niệm dân gian. Muốn đối chiếu cho đúng quy ước đang nói, cần gọi đúng tên từng lớp. Bốn lớp hay bị gộp làm một.

## Bốn bộ tam hợp

Tam hợp là nhóm ba chi cách nhau bốn vị trí. Tên cổ của bốn bộ:

- Thân, Tý, Thìn — thường gọi là thủy cục
- Dần, Ngọ, Tuất — thường gọi là hỏa cục
- Hợi, Mão, Mùi — thường gọi là mộc cục
- Tỵ, Dậu, Sửu — thường gọi là kim cục

"Cục" là tên của cả bộ ba, không thay ngũ hành của từng chi. Chi Thìn vẫn là Thổ dù đứng trong thủy cục. Chi Tỵ vẫn là Hỏa dù đứng trong kim cục. Khi một lịch viết "tuổi Rồng mệnh Thủy" mà không nói rõ, nên hỏi đó là nạp âm của năm ấy, là cục tam hợp, hay là hành của chi. Ba thứ này khác nhau.

## Ba bộ tứ hành xung

Tứ hành xung ghép hai cặp xung chiếu thành một nhóm bốn:

- Tý, Ngọ, Mão, Dậu
- Dần, Thân, Tỵ, Hợi
- Thìn, Tuất, Sửu, Mùi

Trong quan niệm dân gian, các tuổi trong cùng một bộ được kể là dễ va nhau hơn các tuổi ngoài bộ. Đó là quy ước xem, không phải định luật về tính tình.

## Lục hợp và lục xung là cặp

Lục hợp, còn gọi nhị hợp, chỉ có sáu cặp: Tý–Sửu, Dần–Hợi, Mão–Tuất, Thìn–Dậu, Tỵ–Thân, Ngọ–Mùi.

Lục xung là sáu cặp đối nhau đúng sáu chi: Tý–Ngọ, Sửu–Mùi, Dần–Thân, Mão–Dậu, Thìn–Tuất, Tỵ–Hợi. Cặp lục xung luôn nằm trong một bộ tứ hành xung, nhưng tứ hành xung rộng hơn một cặp.

Ví dụ tuổi Tý: tam hợp với Thìn và Thân, lục hợp với Sửu, lục xung với Ngọ, và cùng bộ tứ hành xung với Ngọ, Mão, Dậu. Nói "tuổi Chuột hợp tuổi Ngọ" là nhầm lớp.

## Dùng quy ước này để làm gì

Gia đình Việt đôi khi xem các lớp trên trước lễ hỏi, như một phép lịch sự với ông bà. Quy ước không chứng minh hai người hợp nhau, cũng không cấm một cuộc hôn nhân. Nếu hai bên đã hiểu nhau, một bảng xung chỉ là tư liệu văn hóa để biết tổ tiên mình từng đối chiếu thế nào.
`,
  },
  {
    slug: "can-chi-va-nap-am",
    title: "Can chi và nạp âm: đọc một năm mà không đoán vận",
    excerpt:
      "Mười can, mười hai chi và sáu mươi hoa giáp là bộ đếm. Nạp âm là tên thơ của từng cặp, không phải kết quả đo đạc.",
    category: "Lịch pháp",
    tags: ["can chi", "nạp âm", "hoa giáp", "ngũ hành"],
    publishedAt: "2026-04-08",
    readingMinutes: 6,
    content: `Can chi là cách lịch phương Đông đặt tên cho năm, tháng, ngày và giờ. Học cách đọc nó thì hiểu được tờ lịch. Không cần biến mỗi cái tên thành một lời phán.

## Mười can và mười hai chi

Thiên can có mười vị: Giáp, Ất, Bính, Đinh, Mậu, Kỷ, Canh, Tân, Nhâm, Quý. Địa chi có mười hai vị, chính là vòng con giáp. Ghép lần lượt, can lẻ với chi lẻ và can chẵn với chi chẵn, được sáu mươi tổ hợp gọi là lục thập hoa giáp. Hết sáu mươi năm thì vòng lặp lại.

Năm 1984 là Giáp Tý, 2024 là Giáp Thìn, 2026 là Bính Ngọ nếu tính từ Tết của năm ấy. Cùng một người có bốn lớp can chi: năm, tháng, ngày và giờ. Trộn bốn lớp thành một câu kiểu "bạn là người Giáp" là nói thiếu.

## Ngũ hành của can

Mỗi can mang một hành, hai can một hành: Giáp–Ất Mộc, Bính–Đinh Hỏa, Mậu–Kỷ Thổ, Canh–Tân Kim, Nhâm–Quý Thủy. Nhiều sách phong thủy dân gian lấy hành của can năm làm "bản mệnh" rút gọn. Cách này dễ nhớ và cũng dễ nghèo thông tin, vì nó bỏ qua chi và nạp âm.

## Nạp âm là tên, không phải máy đo

Nạp âm gán cho mỗi cặp hoa giáp liền nhau một cái tên có hành: Hải Trung Kim, Lư Trung Hỏa, Đại Lâm Mộc, và tiếp tục cho đủ sáu mươi. Hai năm liền, chẳng hạn Giáp Tý và Ất Sửu, dùng chung một nạp âm. Tên ấy là quy ước gọi, có hình ảnh (vàng trong biển, lửa trong lò), không phải kết quả xét nghiệm hay thang điểm vận mệnh.

Khi một trang viết "mệnh Hải Trung Kim nên dùng màu trắng", đó là quan niệm dân gian suy từ hành Kim trong cái tên. Màu sắc có thể là gợi ý bài trí. Nó không sửa sức khỏe, không đổi hợp đồng và không chọn giúp nghề nghiệp.

Đọc can chi cho đúng việc cần làm là: biết năm âm, biết ngày đang đứng ở hoa giáp nào, và biết mình đang nghe một quy ước đặt tên hay một khẳng định về tương lai. Hai việc đó không cùng một trọng lượng.
`,
  },
  {
    slug: "hoang-dao-hac-dao-va-muoi-hai-truc",
    title: "Hoàng đạo, hắc đạo và mười hai trực trên lịch vạn niên",
    excerpt:
      "Trực tính theo chi ngày so với chi tháng. Hoàng đạo trong lịch cổ dịch theo tháng. Coi một nhãn ngày là lệnh cấm thì dùng lịch sai việc.",
    category: "Lịch pháp",
    tags: ["hoàng đạo", "trực", "tam nương", "xem ngày"],
    publishedAt: "2026-05-06",
    readingMinutes: 7,
    content: `Lịch vạn niên dày vì nó chồng nhiều lớp tên lên cùng một ngày. Tách lớp thì đỡ sợ nhầm. Ba lớp hay gặp là trực, hoàng đạo với hắc đạo, và các ngày kỵ kiểu tam nương, nguyệt kỵ.

## Mười hai trực

Trực là mười hai tên xoay theo chi: Kiến, Trừ, Mãn, Bình, Định, Chấp, Phá, Nguy, Thành, Thu, Khai, Bế. Quy tắc nền rất gọn: ngày có chi trùng chi tháng là trực Kiến, rồi lần lượt các trực sau theo vòng chi.

Ví dụ tháng Dần thì ngày Dần là Kiến, ngày Mão là Trừ, ngày Thìn là Mãn. Quan niệm dân gian gán việc cho từng trực. Khai và Thành thường được nhắc khi mở việc hoặc hoàn tất. Định thường được nhắc khi chốt, khi an cư. Bế thường được nhắc với việc khép, trong đó có tang lễ theo phong tục. Phá thường bị khuyên tránh với cưới hỏi, ký kết, động thổ. Đây là thói chọn ngày, không phải cơ chế khiến việc thành hay hỏng.

## Hoàng đạo không phải sáu chi cố định cả năm

Trong lịch cổ, hoàng đạo và hắc đạo gắn với các sao ngày như Thanh Long, Minh Đường, Kim Quỹ, và các sao bị kể là xấu. Sao nào rơi vào chi nào là tùy tháng âm. Vì vậy một chi có thể là hoàng đạo ở tháng này và không còn là hoàng đạo ở tháng khác.

Một số lịch rút gọn in sẵn vài chi "hoàng đạo" cho cả năm. Bản rút gọn dễ tra và cũng dễ lệch so với bảng theo tháng. Khi đối chiếu hai tờ lịch, hãy xem chúng đang dùng bảng nào trước khi kết luận một bên sai.

## Tam nương và nguyệt kỵ

Tam nương và nguyệt kỵ là các ngày âm lịch bị một số gia đình kiêng cưới, kiêng khởi công. Danh sách phổ biến không đồng nhất tuyệt đối giữa các vùng. Ghi "nhiều nhà kiêng" thì đúng tính chất dân gian. Ghi "ngày này chắc chắn dữ" thì vượt quá điều lịch có thể biết.

## Chọn ngày là việc sắp xếp

Một ngày thuận trên giấy vẫn có thể mưa, vẫn có thể trùng lịch làm việc của họ hàng, vẫn có thể trái giấy phép xây dựng. Lịch giúp gia đình có một mốc cùng nhìn. Pháp lý, an toàn, sức khỏe và sự đồng thuận mới quyết định có nên làm vào hôm đó hay không.
`,
  },
  {
    slug: "ngu-hanh-tuong-sinh-tuong-khac",
    title: "Ngũ hành tương sinh, tương khắc: một mô hình, không phải bản án",
    excerpt:
      "Kim sinh Thủy, Thủy sinh Mộc, Mộc sinh Hỏa, Hỏa sinh Thổ, Thổ sinh Kim. Vòng khắc đi hướng khác. Mô hình để gọi quan hệ, không để kết tội một người.",
    category: "Ngũ hành",
    tags: ["ngũ hành", "tương sinh", "tương khắc", "phong thủy"],
    publishedAt: "2026-06-10",
    readingMinutes: 6,
    content: `Ngũ hành là cách người xưa nhóm sự vật thành năm tính chất: Kim, Mộc, Thủy, Hỏa, Thổ. Nó xuất hiện trong lịch, trong y học cổ truyền, trong phong thủy dân gian và trong cách đặt tên. Học vòng sinh khắc giúp đọc được các sách đó. Vòng này không chẩn đoán bệnh và không tuyên một mối quan hệ là hỏng.

## Vòng tương sinh

Tương sinh là vòng "cái này nuôi cái kia":

- Kim sinh Thủy
- Thủy sinh Mộc
- Mộc sinh Hỏa
- Hỏa sinh Thổ
- Thổ sinh Kim

Hình ảnh đi kèm chỉ để nhớ: kim loại bị nung thì chảy (một cách nhớ dân gian của Kim sinh Thủy), nước tưới cây, gỗ nhóm lửa, lửa tàn thành tro đất, đất kết thành quặng. Hình ảnh là mẹo nhớ, không phải thí nghiệm.

Nếu hành A sinh hành B, người ta nói A tương sinh với B, và B được A sinh. Hai chiều không giống nhau trong cách luận dân gian: một bên là phía cấp, một bên là phía nhận.

## Vòng tương khắc

Tương khắc đi chéo:

- Kim khắc Mộc
- Mộc khắc Thổ
- Thổ khắc Thủy
- Thủy khắc Hỏa
- Hỏa khắc Kim

"Khắc" trong mô hình nghĩa là chế ước, như nước làm lửa tắt trong cách nói ví von. Đem chữ khắc áp lên hai người — "mệnh anh khắc mệnh tôi nên không nên cưới" — là bước nhảy khỏi mô hình. Can năm chỉ là một ký hiệu lịch. Hai người khác nhau ở nhiều thứ hơn một hành.

## Cùng hành không có nghĩa là giống nhau

Hai người cùng hành Kim vẫn có thể một người nạp âm này, một người nạp âm khác, chi khác, hoàn cảnh khác. Sách dân gian đôi khi khen "đồng hành", đôi khi lại bảo cùng hành thì tranh. Sự mâu thuẫn đó cho thấy đây là lớp diễn giải, không phải một thang đo duy nhất.

Dùng ngũ hành trên Huyền Tâm theo đúng cỡ của nó: một ngôn ngữ để gọi màu, hướng và quan hệ giữa các ký hiệu lịch. Khi việc đụng đến sức khỏe, xây nhà chịu lực hay giấy tờ, hãy tìm người đúng chuyên môn. Màu sơn không thay cột nhà.
`,
  },
  {
    slug: "kinh-dich-sau-muoi-bon-que-doc-the-nao",
    title: "Kinh Dịch: 64 quẻ là hình ảnh, không phải sấm ký",
    excerpt:
      "Một quẻ có sáu hào, hào dưới đọc trước. Quẻ biến khi có hào động. Lời luận là cách nhìn một tình huống, không phải lịch tàu sẽ đến.",
    category: "Kinh Dịch",
    tags: ["Kinh Dịch", "64 quẻ", "hào", "gieo quẻ"],
    publishedAt: "2026-07-15",
    readingMinutes: 7,
    content: `Kinh Dịch là bộ sách cổ xếp đời sống thành các hình sáu vạch, gọi là quẻ. Người Việt gặp Dịch qua cách gieo đồng tiền, qua sách luận và qua thành ngữ. Đọc được cấu trúc quẻ thì đỡ nhầm một đoạn văn tham khảo với một lời tiên tri.

## Sáu hào, dưới đọc lên

Mỗi quẻ có sáu hào. Hào liền là dương, hào đứt là âm. Hào thứ nhất nằm dưới cùng, gọi là hào sơ; hào thứ sáu nằm trên cùng. Khi chép quẻ bằng dãy số, cần thống nhất chiều. Trên Huyền Tâm, dãy nhị phân viết từ dưới lên: ký tự đầu là hào sơ.

Hai quẻ đơn (ba hào) chồng lên nhau thành một quẻ kép. Thứ tự 64 quẻ phổ biến hôm nay là thứ tự Văn Vương, từ Thuần Càn đến Thuần Khôn theo cách đánh số 1 đến 64. Số này là số thứ tự, không phải điểm may rủi.

## Hào động và quẻ biến

Phép ba đồng tiền cho mỗi lần gieo một hào. Gieo sáu lần thì đủ một quẻ. Một số kết quả được gọi là hào động (lão dương hoặc lão âm). Hào động đổi tính thì ra quẻ thứ hai, gọi là quẻ biến. Quẻ gốc kể tình thế đang có, quẻ biến kể hướng tình thế ngả theo cách luận cổ. Không có hào động thì không có quẻ biến.

Phép này có thể làm lại y nguyên nếu giữ cùng hạt giống ngẫu nhiên. Tính lặp lại giúp kiểm tra thuật toán. Nó không biến một lần gieo thành bằng chứng về tương lai.

## Đọc lời luận như thế nào

Lời quẻ cổ rất ngắn và đầy hình ảnh: rồng, sương, xe, giếng. Các sách đời sau triển khai hình ảnh ấy thành chuyện công danh, của cải, gia đạo. Phần luận trên Huyền Tâm thuộc lớp triển khai này, được viết như tư liệu tham khảo, bám hình ảnh quen thuộc của từng quẻ. Nó không phải bản dịch duy nhất, không phải lời của một thầy cụ thể, và không bảo ai phải cưới, phải đầu tư hay phải chờ.

Một cách dùng còn đứng được là lấy quẻ làm câu hỏi ngược: mình đang vội ở đâu, mình đang cố giữ cái gì, việc nào cần thêm thông tin. Câu trả lời vẫn do người gieo và người trong cuộc, dựa trên việc có thật, không dựa trên số thứ tự của quẻ.
`,
  },
  {
    slug: "cung-hoang-dao-va-con-giap",
    title: "Cung hoàng đạo và con giáp không phải một hệ",
    excerpt:
      "Hoàng đạo chia năm theo đường đi của mặt trời. Con giáp đếm theo năm âm. Lửa Đất Khí Nước không dịch ra Kim Mộc Thủy Hỏa Thổ.",
    category: "Hoàng đạo",
    tags: ["cung hoàng đạo", "12 con giáp", "tứ đại", "ngũ hành"],
    publishedAt: "2026-08-19",
    readingMinutes: 6,
    content: `Nhiều lịch bỏ túi in cả con giáp lẫn cung hoàng đạo trên cùng một trang. In cạnh nhau cho tiện tra, không có nghĩa hai hệ là một. Trộn chúng lại thì vừa sai lịch, vừa sai cách người xưa đặt tên.

## Hai cách cắt thời gian

Mười hai con giáp gắn với năm âm lịch. Cả một năm, từ Tết này đến trước Tết sau, dùng chung một chi. Hai người sinh cùng một năm âm thì cùng tuổi, dù một người sinh tháng Ba và một người sinh tháng Mười.

Mười hai cung hoàng đạo nhiệt đới cắt năm theo kinh độ mặt trời, mỗi cung khoảng ba mươi độ. Mốc phổ biến trên lịch Việt là Bạch Dương từ khoảng 21 tháng Ba, Kim Ngưu từ khoảng 20 tháng Tư, và lần lượt đến Song Ngư kết thúc khoảng 20 tháng Ba. Mốc có thể lệch một ngày tùy năm, vì mặt trời không đổi cung vào đúng một giờ cố định. Ma Kết là cung duy nhất trong bảng phổ thông nằm vắt qua năm dương lịch, từ cuối tháng Mười Hai sang tháng Một.

Một người tuổi Ngọ hoàn toàn có thể là Bạch Dương, Cự Giải hoặc Ma Kết. Năm con giáp và tháng dương lịch là hai trục độc lập.

## Bốn nguyên tố không phải ngũ hành

Cung hoàng đạo dùng bốn nguyên tố phương Tây: Lửa (Bạch Dương, Sư Tử, Nhân Mã), Đất (Kim Ngưu, Xử Nữ, Ma Kết), Khí (Song Tử, Thiên Bình, Bảo Bình), Nước (Cự Giải, Bọ Cạp, Song Ngư). Ngũ hành là Kim, Mộc, Thủy, Hỏa, Thổ. Dịch "Lửa" thành "Hỏa" rồi luận tương khắc với mệnh năm sinh là ghép hai từ điển. Chữ giống nhau không làm hai hệ trở thành một.

Bảng "cung nào hợp cung nào" trên báo chí là quan niệm dân gian hiện đại. Nó mô tả khuôn mẫu, giống như chuyện kể về tính tuổi Chuột. Khuôn mẫu không đo độ hợp của hai người.

## Đọc cho đỡ lẫn

Khi một câu vừa nhắc tuổi Hợi vừa nhắc cung Song Ngư, hãy hỏi câu đó đang nói về năm âm hay về khoảng ngày dương lịch. Giữ hai tên ở hai cột. Lịch pháp Việt trả lời được câu "năm nay là năm gì" và "ngày này can chi gì". Hoàng đạo trả lời câu "ngày sinh rơi vào cung nào theo bảng nhiệt đới". Không cột nào trả lời được câu "năm sau đời tôi ra sao".
`,
  },
  {
    slug: "phong-thuy-nha-o-nhung-dieu-nen-tach",
    title: "Phong thủy nhà ở: những điều nên tách khỏi nhau",
    excerpt:
      "Hướng, màu và ngũ hành là ngôn ngữ dân gian để bài trí. Kết cấu, thoát hiểm và pháp lý là việc khác, không suy từ mệnh năm sinh.",
    category: "Phong thủy",
    tags: ["phong thủy", "ngũ hành", "hướng nhà", "màu hợp mệnh"],
    publishedAt: "2026-09-16",
    readingMinutes: 6,
    content: `Phong thủy đi vào nhà Việt qua thói xem hướng đất, hướng bếp, màu sơn và cách kê bàn thờ. Một phần là phong tục, một phần là kinh nghiệm ở cho đỡ nắng đỡ mưa, một phần là diễn giải ngũ hành. Tách ba phần đó thì còn dùng được lớp văn hóa mà không giao nhà cho một bảng màu.

## Hướng và ngũ hành là quy ước gọi

Cách luận dân gian thường gắn hành với phương: Thủy với Bắc, Hỏa với Nam, Mộc với Đông và Đông Nam, Kim với Tây và Tây Bắc, Thổ với Đông Bắc và Tây Nam. Bản mệnh rút từ can năm sinh thì được vài màu "hay được kể là hợp". Kim nghiêng về trắng và xám, Mộc về xanh lá, Thủy về đen và xanh dương, Hỏa về đỏ và cam, Thổ về vàng đất và nâu.

Đây là bảng nhớ. Sơn phòng khách một màu trong bảng không làm đổi vận, và cũng không có gì sai nếu nhà chọn màu khác vì ánh sáng, vì thói quen hoặc vì đồ gỗ sẵn có. Màu là sở thích có dẫn chuyện, không phải đơn thuốc.

## Phần việc không nằm trong ngũ hành

Nhà an toàn là chuyện kết cấu, điện, phòng cháy, thoát nước và giấy phép. Cầu thang, cửa thoát, tải trọng sàn, khoảng lùi: những mục này có tiêu chuẩn và người chịu trách nhiệm nghề. Một ngày động thổ được lịch dân gian gọi là thuận không thay hồ sơ thiết kế. Một hướng bị sách cũ gọi là xấu không phải lý do để bịt cửa sổ đang cần gió và ánh sáng.

Khi sửa nhà, thứ tự tỉnh táo là: việc gì bắt buộc về an toàn và pháp lý, việc gì nhà cần để ở dễ (hướng nắng, gió, tiếng ồn), rồi mới đến lớp phong tục như ngày động thổ, hướng bàn thờ, màu mà gia đình thấy vui. Lớp sau tôn trọng ông bà. Lớp trước giữ người đang ở.

## Đọc một lời khuyên phong thủy

Một lời khuyên đứng được thì nói rõ nó thuộc quy ước nào, và không hứa một kết quả đời sống. "Mệnh Thủy, sách dân gian hay nhắc màu đen và hướng Bắc" là câu mô tả quy ước. "Sơn đen thì năm nay phát tài" là câu vượt quá điều quy ước có thể biết.

Huyền Tâm giữ cách nói thứ nhất. Bài trí cho vừa mắt, vừa lệ nhà, và để các quyết định xây dựng ở đúng chỗ của chúng.
`,
  },
];
