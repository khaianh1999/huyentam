import type { NguHanh } from "@/types";

export type FengGuideId =
  | "nha-o"
  | "phong-ngu"
  | "phong-khach"
  | "ban-lam-viec"
  | "ban-tho"
  | "xay-nha";

export type FengShuiGuide = {
  id: FengGuideId;
  title: string;
  eyebrow: string;
  lede: string;
  principles: { title: string; body: string }[];
  dos: string[];
  donts: string[];
  byElement: Record<NguHanh, string>;
};

const element = (
  kim: string,
  moc: string,
  thuy: string,
  hoa: string,
  tho: string,
): Record<NguHanh, string> => ({
  Kim: kim,
  Moc: moc,
  Thuy: thuy,
  Hoa: hoa,
  Tho: tho,
});

export const FENG_SHUI_GUIDES: FengShuiGuide[] = [
  {
    id: "nha-o",
    title: "Phong thủy nhà ở",
    eyebrow: "Cửa và nền",
    lede: "Nhà ở trong cách nói dân gian bắt đầu từ cửa sáng, lối đi thông và chỗ để giày không chặn giường. Màu và hướng theo bản mệnh chỉ là lớp sau.",
    principles: [
      {
        title: "Cửa ra vào",
        body: "Cửa nên mở hết cánh, có đèn, có chỗ đứng. Gương đối thẳng cửa là điều nhiều nhà kiêng vì khách vừa bước đã thấy mình bị đẩy hình ra ngoài.",
      },
      {
        title: "Khí đi trong nhà",
        body: "Lối từ cửa tới bếp không nên là một đường thẳng xuyên phòng ngủ. Một tủ thấp hoặc một khúc ngoặt nhỏ đủ để người đi chậm lại.",
      },
      {
        title: "Nền và mái",
        body: "Nền khô, mái không dột được kể là phúc phần thực. Sơn lại một mảng ẩm có ích hơn là đổi màu cả nhà cho hợp mệnh.",
      },
    ],
    dos: [
      "Giữ cửa sổ có thể mở và có chỗ phơi đồ không che khuất lối.",
      "Để một chậu cây vừa sức tưới ở chỗ có sáng.",
      "Sửa ổ điện hở trước khi bàn chuyện hướng nhà.",
    ],
    donts: [
      "Không kê giường dưới dầm nứt chỉ vì hướng đó hợp mệnh.",
      "Không bịt cửa sổ để khỏi nhìn thấy cột điện, hãy kéo rèm.",
      "Không đổ tiền vào vật phẩm trước khi sửa chỗ thấm.",
    ],
    byElement: element(
      "Mệnh Kim hợp nền sáng, tay nắm và khung cửa màu nhạt. Tránh phủ kín nhà bằng kim loại sáng choáng.",
      "Mệnh Mộc hợp gỗ thật, cây có lá, và một mảng xanh vừa mắt. Gỗ mục, cây héo thì dọn đi.",
      "Mệnh Thủy hợp mặt nước nhỏ và màu xanh đậm ở cửa. Bể cá quá lớn giữa nhà dễ thành việc phải lo hơn là điểm nhấn.",
      "Mệnh Hỏa hợp một điểm ấm: đèn, gỗ đỏ, tấm thảm nhỏ. Cả phòng đỏ dễ làm mắt mệt.",
      "Mệnh Thổ hợp gạch, đất nung, màu be. Nên giữ sàn phẳng và khô.",
    ),
  },
  {
    id: "phong-ngu",
    title: "Phòng ngủ",
    eyebrow: "Giường và đầu giường",
    lede: "Phòng ngủ được dân gian xét ở đầu giường có điểm tựa, cửa không chiếu thẳng vào gối, và ban đêm tắt được ánh sáng mạnh.",
    principles: [
      {
        title: "Đầu giường",
        body: "Đầu giường nên áp tường đặc, không áp cửa sổ mỏng và không nằm dưới cửa sổ sát trần. Người nằm cần một mặt tường phía sau gối.",
      },
      {
        title: "Cửa và gương",
        body: "Nhiều nhà kiêng gương lớn đối diện giường. Nếu phòng nhỏ, hãy đặt gương ở cánh tủ, khép lại khi ngủ.",
      },
      {
        title: "Đồ dưới gầm",
        body: "Gầm giường đầy thùng làm giấc nặng trong cách nói dân gian, và cũng làm bụi. Chỉ để chăn mùa và một hòm có nắp.",
      },
    ],
    dos: [
      "Kéo rèm đủ tối khi ngủ.",
      "Để điện thoại xa gối nếu hay thức vì tin nhắn.",
      "Giữ một lối đi hai bên giường nếu phòng còn chỗ.",
    ],
    donts: [
      "Không treo tranh nước xiết ngay trên gối.",
      "Không để bàn là, máy chạy bộ nhìn thẳng vào giường.",
      "Không sơn phòng tối thui chỉ vì mệnh Thủy.",
    ],
    byElement: element(
      "Mệnh Kim: ga giường sáng, khung giường gỗ hoặc sắt mảnh. Một đèn muối nhỏ là đủ, không cần cả bộ kim loại.",
      "Mệnh Mộc: đầu giường gỗ, một cây để ngoài phòng hoặc ở góc xa giường. Cây trong phòng kín cần được đưa ra thoáng.",
      "Mệnh Thủy: chăn màu xanh đậm hoặc ghi, giường không quá thấp sát nền ẩm.",
      "Mệnh Hỏa: một tấm drap ấm, đèn ngủ ánh vàng. Tránh đèn trần thật trắng lúc đã nằm.",
      "Mệnh Thổ: giường chắc, thảm nhỏ dưới chân khi bước xuống, màu be hoặc nâu nhạt.",
    ),
  },
  {
    id: "phong-khach",
    title: "Phòng khách",
    eyebrow: "Chỗ ngồi",
    lede: "Phòng khách là nơi người ngoài ngồi xuống. Dân gian nhìn ghế có tựa, cửa không đập vào lưng khách, và bàn không chặn lối bếp.",
    principles: [
      {
        title: "Ghế tựa",
        body: "Ghế chủ nhà nên có tường hoặc tủ thấp phía sau. Ghế giữa phòng, lưng hướng cửa, là thế nhiều nhà tránh cho người ngồi lâu.",
      },
      {
        title: "Bàn nước",
        body: "Bàn thấp hơn ghế, có chỗ đặt khay. Bàn kính vỡ góc nên thay, không phải vì sát khí cho có chuyện mà vì dễ đứt tay.",
      },
      {
        title: "Ánh sáng",
        body: "Một đèn tổng và một đèn góc đủ để nói chuyện buổi tối. Phòng tối quá khiến khách muốn đứng dậy sớm.",
      },
    ],
    dos: [
      "Để một chỗ bỏ ô và dép mưa gần cửa, không giữa lối.",
      "Treo một tranh có khoảng trời hoặc cây, cỡ vừa tường.",
      "Mở cửa sổ phía sáng ít nhất một lúc trong ngày.",
    ],
    donts: [
      "Không xếp sofa thành vòng kín không còn lối ra.",
      "Không để tivi che cả cửa sổ duy nhất.",
      "Không chất quà lưu niệm kín mặt tủ.",
    ],
    byElement: element(
      "Mệnh Kim: sofa màu sáng, chân ghế mảnh, một bình gốm trắng. Giữ mặt bàn trống một nửa.",
      "Mệnh Mộc: kệ gỗ, cây ở góc sáng, gối xanh lá vừa một chiếc.",
      "Mệnh Thủy: rèm xanh đậm, một bình nước trong có nắp. Tránh trải thảm lúc nào cũng ẩm.",
      "Mệnh Hỏa: một gối đỏ hoặc cam, đèn chụp vải. Cả bộ ghế đỏ dễ ngột với khách.",
      "Mệnh Thổ: ghế nệm màu be, bàn gỗ thấp, bình đất. Nền gạch sạch quan trọng hơn thảm dày.",
    ),
  },
  {
    id: "ban-lam-viec",
    title: "Bàn làm việc",
    eyebrow: "Lưng và cửa sổ",
    lede: "Bàn làm việc được xét ở lưng có điểm tựa, mắt không bị cửa sổ chói thẳng, và mặt bàn còn chỗ để viết.",
    principles: [
      {
        title: "Tựa lưng",
        body: "Ngồi quay lưng ra cửa là thế nhiều người làm việc thấy mệt, vì cứ có tiếng bước là giật mình. Nếu phòng bắt buộc, hãy thêm một tấm bình phong thấp.",
      },
      {
        title: "Cửa sổ",
        body: "Ánh sáng nên đến từ bên trái nếu viết tay phải, hoặc từ phía trước có rèm. Cửa sổ ngay sau màn hình dễ thành bóng.",
      },
      {
        title: "Mặt bàn",
        body: "Dân gian gọi bàn đầy giấy là bàn tán khí. Thực ra là bàn khó tìm việc. Cuối ngày để lại một chồng duy nhất.",
      },
    ],
    dos: [
      "Đặt màn hình cách mắt một cánh tay.",
      "Giữ một ghế có tựa, chân chạm sàn.",
      "Cắm dây gọn một phía, không ngang lối kéo ghế.",
    ],
    donts: [
      "Không ngồi dưới gác xép thấp đến cúi đầu suốt ngày.",
      "Không để gương sau màn hình.",
      "Không quay mặt vào tường trống nếu còn cách kê khác.",
    ],
    byElement: element(
      "Mệnh Kim: mặt bàn sáng, một ống bút kim loại, giấy trắng. Tránh phủ bàn bằng tấm lót đen sì.",
      "Mệnh Mộc: kệ gỗ phía bên, một chậu nhỏ ngoài tầm đổ vào phím.",
      "Mệnh Thủy: bình nước có nắp, màu xanh đậm ở bìa sổ. Uống nước là việc thật, không phải mẹo.",
      "Mệnh Hỏa: đèn bàn ánh ấm khi trời tối, một bút đỏ để đánh dấu việc gấp.",
      "Mệnh Thổ: bàn chân vuông, khay gỗ đựng giấy. Giữ góc bàn không bị sứt.",
    ),
  },
  {
    id: "ban-tho",
    title: "Bàn thờ",
    eyebrow: "Lễ và chỗ đứng",
    lede: "Bàn thờ trong nhà Việt là chỗ thắp hương và nhớ. Cách bày thuộc tập quán gia đình. Trang này chỉ nói phần an toàn và sự ngăn nắp, không chỉ đạo nghi lễ.",
    principles: [
      {
        title: "Vị trí",
        body: "Nhiều gia đình đặt bàn thờ ở chỗ cao, yên, không sát nhà vệ sinh và không ngay trên bếp nóng. Nếu nhà đã xây khác, hãy hỏi người lớn trong nhà trước khi dời.",
      },
      {
        title: "Lửa và khói",
        body: "Bát hương phải có chỗ chịu nhiệt, trần không bám khói đến ám. Tắt hương khi ra khỏi nhà. Đây là việc phòng cháy, đứng trước mọi kiêng khem.",
      },
      {
        title: "Bày biện",
        body: "Bày ít, lau được, hơn là xếp kín tượng và lọ. Ảnh gia tiên cần được cả nhà nhận ra, không bị che bởi đồ mới mua.",
      },
    ],
    dos: [
      "Lau bàn bằng khăn riêng, để khô.",
      "Thay hoa héo, đổ nước thừa.",
      "Để bật lửa và diêm trong hộp, xa rèm.",
    ],
    donts: [
      "Không thắp hương rồi đi ngủ.",
      "Không đặt bàn thờ trong phòng tắm hoặc sát bồn cầu.",
      "Không mua thêm đồ thờ chỉ vì một lời đồn trên mạng.",
    ],
    byElement: element(
      "Mệnh Kim: bình hoa sáng màu, chân đèn gọn. Giữ mặt bàn còn khoảng trống để lau.",
      "Mệnh Mộc: bát hương gỗ hoặc chân gỗ, một cành hoa có lá. Gỗ mối thì thay.",
      "Mệnh Thủy: chén nước có đế chắc, màu xanh đậm ở tấm trải nếu gia đình vẫn dùng tấm trải.",
      "Mệnh Hỏa: để ý đèn và hương, vì hành Hỏa ở đây là lửa thật. Một ngọn là đủ nếu nhà nhỏ.",
      "Mệnh Thổ: bát hương gốm, mặt bàn phẳng, màu be. Tránh xếp đồ thành chồng cao dễ đổ.",
    ),
  },
  {
    id: "xay-nha",
    title: "Xây nhà",
    eyebrow: "Móng, nóc, cửa",
    lede: "Xây nhà là việc giấy phép, kết cấu và tiền. Phong thủy dân gian chỉ kèm sau khi móng đúng bản vẽ và thợ có người giám sát.",
    principles: [
      {
        title: "Trước khi động thổ",
        body: "Xem lại ranh đất, lối thoát nước và hướng cửa đã chốt với người thiết kế. Đổi cửa phút chót vì một tuổi dễ làm hỏng cả bản vẽ.",
      },
      {
        title: "Trong lúc xây",
        body: "Giữ lối cho xe vật liệu, che mưa phần bê tông non, và không ở trong nhà khi sàn chưa đủ ngày. Việc này quan trọng hơn màu sơn hợp mệnh.",
      },
      {
        title: "Lúc vào ở",
        body: "Vào khi điện, nước, cửa khóa dùng được. Một bữa cơm đơn với người thân đủ làm lễ trong nhiều nhà. Không cần chọn giờ đến mức dọn nhà giữa đêm.",
      },
    ],
    dos: [
      "Khóa phần mái trước mùa mưa nếu có thể.",
      "Ghi các khoản phát sinh vào một sổ.",
      "Chừa lối bảo trì bể nước và điều hòa.",
    ],
    donts: [
      "Không đục cột chịu lực vì muốn phòng vuông hơn cho hợp hướng.",
      "Không vay thêm chỉ để làm cổng cho lớn.",
      "Không bỏ qua tuổi và giấy phép rồi chỉ xem mỗi kim lâu.",
    ],
    byElement: element(
      "Mệnh Kim: cửa và tay nắm sáng màu, tường trắng ngà. Kết cấu vẫn phải theo kỹ sư.",
      "Mệnh Mộc: cửa gỗ, giàn cây ngoài hàng rào, không trồng rễ lớn sát móng.",
      "Mệnh Thủy: mái thoát nước tốt, sân không đọng. Một hồ nhỏ chỉ làm khi có người trông.",
      "Mệnh Hỏa: bếp cách gỗ trần, ổ điện đủ tải. Màu ấm ở cửa là đủ.",
      "Mệnh Thổ: nền đầm chắc, gạch hoàn thiện sau khi hết lún. Màu be dễ bẩn tay thì chọn loại lau được.",
    ),
  },
];

export function getFengShuiGuide(id: string): FengShuiGuide | null {
  return FENG_SHUI_GUIDES.find((guide) => guide.id === id) ?? null;
}
