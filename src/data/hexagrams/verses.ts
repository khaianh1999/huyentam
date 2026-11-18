/**
 * Thơ lục bát và lời tổng quan cho 64 quẻ, viết riêng cho Huyền Tâm
 * dựa trên hình tượng của từng quẻ. Không trích từ bản dịch nào.
 */

export type HexagramVerse = {
  verse: [string, string, string, string];
  essence: string;
};

export const HEXAGRAM_VERSES: Record<number, HexagramVerse> = {
  1: {
    verse: ["Rồng thiêng vượt biển mây ngàn", "Trời cao vận chuyển, muôn vàn đổi thay", "Người hiền bền chí hôm nay", "Giữ lòng ngay thẳng, tháng ngày hanh thông"],
    essence: "Sáu nét dương liền nhau như trời đi không nghỉ. Thời này cho phép bạn đứng lên gánh việc lớn, miễn là mạnh mà không kiêu, tiến mà biết lúc rồng phải nằm yên.",
  },
  2: {
    verse: ["Đất dày chở khắp muôn loài", "Lặng thầm nâng đỡ, nào nài công lao", "Thuận theo, mềm mại ngọt ngào", "Lòng như đất mẹ, khi nào cũng an"],
    essence: "Đất không tranh với trời mà muôn vật vẫn nhờ đất mà sinh. Sức mạnh của thời này nằm ở sự bao dung, đi sau người dẫn đường và làm cho trọn phần mình.",
  },
  3: {
    verse: ["Mầm non đội đất nhọc nhằn", "Mưa giăng sấm dậy, khó khăn buổi đầu", "Chớ nên nóng vội mong cầu", "Tìm người giúp sức, dài lâu mới thành"],
    essence: "Mọi sự khởi đầu đều chật vật như mầm cây đội đất. Khó ở đây là cái khó của sinh sôi, nên dựng nền trước, tìm người đồng hành rồi hãy đi xa.",
  },
  4: {
    verse: ["Suối non chảy giữa sương mờ", "Người chưa tỏ lối, cậy nhờ thầy hay", "Học từ những việc hôm nay", "Hỏi cho thành thật, tháng ngày sáng ra"],
    essence: "Nước vừa rời nguồn còn chưa biết về đâu. Chưa biết không phải là lỗi, chỉ đáng lo khi không chịu hỏi; một lời hỏi thành tâm mở được cả con đường.",
  },
  5: {
    verse: ["Mây giăng chưa đổ mưa rào", "Thuyền neo bến đợi, khi nào gió lên", "Lòng tin giữ lấy cho bền", "Ăn no, ngủ kỹ, đừng quên giữ mình"],
    essence: "Mây đã kéo đầy trời mà mưa chưa xuống. Đợi đúng lúc cũng là một cách hành động: giữ sức, giữ niềm tin, để khi thời đến thì đã sẵn sàng.",
  },
  6: {
    verse: ["Trời cao nước chảy đôi đường", "Đúng sai tranh cãi, vấn vương bận lòng", "Dừng chân giữa cuộc long đong", "Nhường nhau một bước, thong dong cả đời"],
    essence: "Trời đi lên, nước chảy xuống, hai bên ngày càng xa nhau. Thắng một vụ tranh chấp thường phải trả giá đắt hơn được, người khôn biết dừng giữa chừng.",
  },
  7: {
    verse: ["Nước ngầm tụ giữa lòng sâu", "Ba quân muốn thắng, đứng đầu phải minh", "Ra tay cốt giữ thái bình", "Có kỷ luật, có nghĩa tình mới nên"],
    essence: "Nước ngầm ẩn trong đất như sức mạnh ẩn trong dân. Việc lớn cần một người cầm trịch công minh, kỷ luật đi cùng lòng người thì mới giữ được quân.",
  },
  8: {
    verse: ["Nước trên mặt đất hòa chung", "Tìm người đồng dạ, đi cùng một phương", "Gần nhau bằng chữ yêu thương", "Đến sau lỡ chuyến, thêm vương muộn phiền"],
    essence: "Nước thấm vào đất không còn kẽ hở. Đây là lúc chọn người để gắn bó, thành thật từ đầu và đừng chần chừ, vì người đến muộn thường đứng ngoài vòng tay.",
  },
  9: {
    verse: ["Gió đưa mây kéo trên trời", "Mưa chưa kịp đổ, đợi thời chớ than", "Góp từng chút nhỏ khẽ khàng", "Ngày mai nhẹ gánh, đầy sàng lúa thơm"],
    essence: "Sức còn mỏng thì chưa làm mưa được, chỉ đủ gom mây. Thời này hợp việc nhỏ, tích góp và trau chuốt, chưa phải lúc phô trương hay đánh lớn.",
  },
  10: {
    verse: ["Đạp đuôi hổ dữ nhẹ chân", "Giữ lời lễ độ, ân cần với nhau", "Đường nguy chẳng ngại bước đầu", "Khiêm cung làm áo, trước sau bình yên"],
    essence: "Bước sau lưng hổ mà hổ không cắn, vì người đi biết mình đang ở đâu. Gặp kẻ mạnh hay việc khó, lễ độ và cẩn trọng là tấm áo giáp tốt nhất.",
  },
  11: {
    verse: ["Trời nương đất, đất nương trời", "Âm dương giao hội, muôn đời hanh thông", "Xuân về nở khắp ruộng đồng", "Lúc vui nhớ giữ tấm lòng khiêm cung"],
    essence: "Khí trời hạ xuống, khí đất bốc lên, trên dưới thông nhau nên vạn vật hanh thông. Thời vận đang mở, hãy làm việc lớn, nhưng nhớ rằng bờ thành nào rồi cũng có ngày lở.",
  },
  12: {
    verse: ["Trời cao đất thấp cách xa", "Âm dương bế tắc, người ta lạc đường", "Giữ mình giữa chốn tai ương", "Thu tay chờ lúc gió sương qua rồi"],
    essence: "Trời đất không còn giao nhau, trên dưới bịt lối. Khi kẻ tiểu nhân đắc thế, người quân tử thu mình giữ đức, không ham danh lợi, đợi vòng trời chuyển lại.",
  },
  13: {
    verse: ["Lửa soi cùng với trời xanh", "Người chung chí lớn, công thành có nhau", "Ra đồng rộng mở trước sau", "Bỏ phe bỏ cánh, dài lâu mới bền"],
    essence: "Lửa bốc lên hợp với trời, như người cùng chí tìm về một mối. Muốn được việc lớn phải đứng giữa đồng rộng mà kết giao, đừng khép mình trong họ hàng phe phái.",
  },
  14: {
    verse: ["Mặt trời rực rỡ trên cao", "Của nhiều, danh lớn, dồi dào lộc may", "Có rồi chớ vội vung tay", "Trừ gian, dưỡng thiện, tháng ngày mới yên"],
    essence: "Mặt trời giữa trời, ánh sáng phủ khắp, mọi sự đang về tay. Có nhiều mà không kiêu mới giữ được lâu; dùng của để làm điều phải thì của càng thêm.",
  },
  15: {
    verse: ["Núi cao ẩn dưới đất bằng", "Người càng tài giỏi, càng hằng giữ mình", "Cúi đầu nào có nhục vinh", "Đi đâu cũng được tâm tình mến thương"],
    essence: "Núi cao mà nằm dưới đất, có mà như không. Trong sáu mươi tư quẻ, chỉ quẻ này cả sáu hào đều lành, vì đức khiêm đi đến đâu cũng mở được cửa.",
  },
  16: {
    verse: ["Sấm vang đất dậy xuân về", "Lòng người hoan hỷ, bốn bề reo vui", "Chuẩn bị từ trước mới xuôi", "Vui mà quên việc, ngậm ngùi về sau"],
    essence: "Tiếng sấm đầu xuân làm đất trời bừng tỉnh. Lòng người đang hứng khởi, nên dựng việc và tập hợp mọi người, song đừng để niềm vui ru mình quên phòng bị.",
  },
  17: {
    verse: ["Sấm nằm trong đầm nghỉ ngơi", "Thuận theo thời thế, theo người hiền minh", "Theo điều phải, bỏ thói mình", "Buông điều cố chấp, an bình đến ngay"],
    essence: "Sấm cuối thu lặn vào đầm, biết lúc nghỉ thì nghỉ. Muốn người theo mình, trước hết phải biết theo lẽ phải; thuận thời không phải là mất chính kiến.",
  },
  18: {
    verse: ["Gió luồn chân núi âm u", "Việc xưa hư nát, công phu sửa dần", "Ra tay gỡ rối ân cần", "Ba ngày trước tính, ba lần sau suy"],
    essence: "Gió quẩn dưới chân núi, trong bát đã sinh sâu mọt. Cái hỏng hôm nay do nếp cũ để lại, dám nhìn thẳng mà sửa thì hóa ra đại cát, miễn là tính kỹ trước sau.",
  },
  19: {
    verse: ["Đất cao ôm lấy mặt đầm", "Người trên đến với tình thâm dân lành", "Vận lên như cỏ xuân xanh", "Phòng khi tháng tám gió hanh đổi chiều"],
    essence: "Khí dương đang lớn dần, người trên ghé xuống với người dưới. Vận đang đi lên nên làm ngay, nhưng phải nhớ thịnh có hạn, thời tốt không ở lại mãi.",
  },
  20: {
    verse: ["Gió đi khắp cõi đất dày", "Đứng cao nhìn rộng, đổi thay lẽ đời", "Lắng lòng ngắm việc ngắm người", "Soi mình trước đã, rồi lời hãy ra"],
    essence: "Gió lướt trên đất, không chỗ nào không tới. Đây là lúc quan sát hơn là hành động: nhìn người, nhìn thời, và quay lại nhìn chính mình trước khi quyết.",
  },
  21: {
    verse: ["Sấm vang, chớp giật sáng lòa", "Cắn tan vật cản, mới hòa với nhau", "Việc công xử phải cho mau", "Pháp minh, tâm chính, về sau mới bền"],
    essence: "Giữa hai hàm có vật ngáng, cắn đứt thì miệng mới khép. Chuyện vướng mắc không tự tan, cần sấm để quyết và chớp để soi, xử rõ ràng mà không tàn nhẫn.",
  },
  22: {
    verse: ["Lửa chiều tô thắm non xanh", "Vẻ ngoài đẹp đẽ, chớ đành quên trong", "Điểm tô vừa đủ là xong", "Cái duyên mộc mạc, tấm lòng mới sang"],
    essence: "Ánh lửa dưới chân núi làm cỏ cây thêm sắc. Trang sức làm việc nhỏ thêm đẹp, nhưng không thay được gốc rễ; đến cùng thì màu trắng mộc lại là màu đẹp nhất.",
  },
  23: {
    verse: ["Núi mòn lở xuống đất bằng", "Năm âm lấn một, khó khăn bủa vây", "Nằm yên chớ động lúc này", "Giữ hạt quả cuối, đợi ngày nảy xuân"],
    essence: "Chân núi đã bị bào mòn, chỉ còn một nét dương trên đỉnh. Không nên đi đâu, cũng đừng cố chống; giữ lấy phần cốt lõi như hạt quả cuối cùng còn sót trên cành.",
  },
  24: {
    verse: ["Dưới lòng đất, sấm vừa sang", "Một hào dương mới rộn ràng quay về", "Sai rồi sửa lại chớ nề", "Bảy ngày trở lại, đường quê đã gần"],
    essence: "Đông chí qua, một tia dương nhen lên từ đáy đất. Mọi sự vừa quay đầu, còn non nên hãy nhẹ tay, cứ bền lòng trở lại đường cũ thì vận sẽ tự về.",
  },
  25: {
    verse: ["Sấm rền dưới cõi trời quang", "Sống không gian dối, thênh thang đường dài", "Làm điều phải, chẳng cầu ai", "Tham lam tính toán, họa tai tìm về"],
    essence: "Dưới trời có sấm, vạn vật không dám dối. Cứ sống đúng và làm việc của mình, đừng tính toán quá nhiều; cái tai bất ngờ thường đến từ chính lòng mong cầu.",
  },
  26: {
    verse: ["Núi cao chứa cả trời xanh", "Tích tài dưỡng đức, học hành đêm thâu", "Đủ rồi vượt biển ngàn sâu", "Bước ra gánh việc, công đầu về tay"],
    essence: "Trời mà nằm gọn trong núi, sức tích lại lớn vô cùng. Đã đến lúc chứa cho đầy kiến thức và nội lực, rồi đem ra gánh việc đời, đừng chỉ ăn cơm nhà.",
  },
  27: {
    verse: ["Núi yên, sấm động dưới chân", "Nuôi mình nuôi đức, giữ phần thanh tao", "Miệng kia cẩn trọng ra vào", "Lời nên chọn lựa, miếng nào chớ tham"],
    essence: "Hình quẻ như chiếc miệng mở, trên dừng dưới động. Người ta được nuôi bằng cái gì thì thành ra cái ấy, nên phải giữ từ lời nói ra đến miếng ăn vào.",
  },
  28: {
    verse: ["Nước dâng ngập cả rừng cây", "Xà nhà oằn xuống, nặng đầy hai vai", "Việc to vượt sức một ai", "Tìm nơi nương tựa, đường dài mới qua"],
    essence: "Giữa nặng mà hai đầu yếu, cây xà đã bắt đầu cong. Gánh đang vượt sức một người, phải hành động khác thường, san bớt và tìm chỗ dựa trước khi nó gãy.",
  },
  29: {
    verse: ["Vực sâu nối tiếp vực sâu", "Giữa dòng hiểm trở, có đâu sờn lòng", "Nước đi vẫn giữ chữ trong", "Thành tâm một dạ, ắt mong thoát nàn"],
    essence: "Hiểm trùng hiểm, nước chảy mãi mà không đầy. Nước vượt mọi chỗ trũng vì không bao giờ đánh mất mình, người gặp khó cũng vậy: giữ lòng thành thì lối ra sẽ hiện.",
  },
  30: {
    verse: ["Lửa nương vào củi mà lên", "Sáng soi khắp chốn, phải bền lòng ngay", "Nương người chính trực hôm nay", "Cháy vừa thì ấm, cháy đầy thì tan"],
    essence: "Lửa không tự cháy, phải bám vào vật mới sáng. Cái sáng của bạn cần chỗ dựa đúng đắn, biết nương người ngay và giữ lửa vừa đủ thì soi được đường dài.",
  },
  31: {
    verse: ["Đầm trên núi, nước thấm dần", "Trai tài gái sắc, phân vân cảm lòng", "Khiêm nhu mở cửa tơ hồng", "Cảm nhau bằng dạ, ước mong mới thành"],
    essence: "Núi nâng đầm, đầm thấm xuống núi, hai bên cảm nhau không cần lời. Chuyện tình cảm và kết giao đang thuận, miễn là lòng trống trải để người khác có chỗ bước vào.",
  },
  32: {
    verse: ["Gió cùng sấm, đạo dài lâu", "Vợ chồng nghĩa nặng, trước sau một lòng", "Việc nào bền bỉ mới xong", "Đổi thay giữa chặng, uổng công đợi chờ"],
    essence: "Sấm gió vốn động mà vẫn có lẽ thường. Bền không phải là đứng yên, mà là đi hoài trên một hướng; giờ chưa phải lúc đổi nghề, đổi người hay đổi ý.",
  },
  33: {
    verse: ["Núi cao trời đã lánh xa", "Bóng dương lui bước, tà tà cuối thu", "Biết lui là kẻ trượng phu", "Giữ mình trong sạch, mây mù tự tan"],
    essence: "Khí âm đang lớn, người quân tử lui xa mà không oán. Rút đúng lúc không phải là thua, đó là giữ nguyên sức và phẩm giá để còn ngày trở lại.",
  },
  34: {
    verse: ["Sấm vang trên cõi trời cao", "Sức dương đang thịnh, lòng nào dám kiêu", "Dê đâm phên giậu bao nhiêu", "Càng hăng càng mắc, phải liệu mà dừng"],
    essence: "Sấm dội trên trời, thế đang cực mạnh. Mạnh mà đúng mới gọi là lớn; lúc này điều cần rèn nhất là biết dừng, kẻo sừng mắc vào giậu thì tiến lui đều khó.",
  },
  35: {
    verse: ["Mặt trời ló khỏi đồng xanh", "Bước lên từng bước, công danh rạng ngời", "Ơn trên ban xuống đầy vơi", "Tiến mà giữ đức, trọn đời an vui"],
    essence: "Mặt trời vừa nhô khỏi mặt đất, càng lên càng sáng. Đây là thời được trọng dụng và thăng tiến, cứ làm sáng cái đức của mình thì người trên tự nhìn thấy.",
  },
  36: {
    verse: ["Mặt trời lặn xuống đất sâu", "Người hiền giấu sáng, qua cầu gian nan", "Bên ngoài nhẫn nhịn dịu dàng", "Bên trong giữ đuốc, rõ ràng lối đi"],
    essence: "Ánh sáng bị đất che khuất, người sáng suốt gặp thời tối tăm. Nên giấu tài, nói ít và chịu khó, nhưng ngọn đuốc trong lòng thì tuyệt đối không được để tắt.",
  },
  37: {
    verse: ["Gió từ bếp lửa bay ra", "Cửa nhà êm ấm, thuận hòa anh em", "Lời nói, việc làm đi kèm", "Yêu thương có phép, êm đềm trăm năm"],
    essence: "Gió sinh ra từ lửa, cái lớn khởi từ trong nhà. Muốn yên chuyện ngoài đời hãy bắt đầu từ gian bếp: mỗi người đúng phận, lời nói có chỗ dựa, việc làm có trước sau.",
  },
  38: {
    verse: ["Lửa lên, đầm xuống đôi nơi", "Cùng nhà khác ý, khó lời hiểu nhau", "Việc to chớ vội bắt đầu", "Tìm điều giống, gác về sau điều bàn"],
    essence: "Lửa bốc lên, nước đầm thấm xuống, chung một nhà mà hai hướng. Khác nhau chưa hẳn là xấu; việc nhỏ vẫn làm được, miễn là tìm điểm chung thay vì ép nhau cho giống.",
  },
  39: {
    verse: ["Núi cao chắn, nước ngập đường", "Bước đi vấp váp, vấn vương nỗi sầu", "Quay về xét lại trước sau", "Tìm người dẫn lối, qua cầu mới yên"],
    essence: "Trước mặt là nước, sau lưng là núi, chân đi không nổi. Gặp đường cùng thì quay lại sửa mình, tìm người giỏi hơn mà hỏi; đó không phải lùi mà là đổi cách đi.",
  },
  40: {
    verse: ["Sấm mưa tan cả oi nồng", "Nút kia đã gỡ, nhẹ không nợ đời", "Tha người lỗi nhỏ thảnh thơi", "Làm nhanh cho gọn, đừng lơi việc còn"],
    essence: "Cơn mưa rào làm tan cái ngột ngạt, mọi sự bắt đầu cởi. Hãy gỡ dứt điểm phần còn lại, tha điều đáng tha, và trở về nếp bình thường càng sớm càng tốt.",
  },
  41: {
    verse: ["Đầm sâu bồi đắp non cao", "Bớt phần dưới, thấy dồi dào phía trên", "Bớt giận, bớt muốn, mới nên", "Một lòng thành thực, chẳng quên phúc lành"],
    essence: "Đầm tự hạ mình để núi cao thêm. Bớt đi đúng chỗ lại hóa ra được: bớt giận, bớt ham, bớt của cho người xứng đáng. Chỉ cần lòng thành, lễ mọn cũng đủ.",
  },
  42: {
    verse: ["Gió mau, sấm lớn cùng về", "Bớt trên thêm dưới, bốn bề hân hoan", "Điều lành học lấy chu toàn", "Lỗi mình sửa gấp, sẵn sàng vượt sông"],
    essence: "Gió và sấm cùng nhau làm cho nhau mạnh thêm. Vận ích đang tới, nên làm việc lớn và giúp người dưới; thấy điều hay thì theo ngay, thấy lỗi mình thì sửa ngay.",
  },
  43: {
    verse: ["Nước đầm dâng đến trời cao", "Năm dương quyết đoán, khi nào cũng minh", "Dẹp gian, bằng lẽ công bình", "Đừng vung gươm lớn, lụy mình sau này"],
    essence: "Nước dâng tận trời, sắp vỡ bờ. Đã đến lúc dứt khoát với điều xấu cuối cùng, nhưng phải nói rõ giữa thanh thiên bạch nhật, dùng lẽ phải chứ không dùng cơn giận.",
  },
  44: {
    verse: ["Gió đi dưới cõi trời xa", "Gặp nhau bất chợt, đậm đà chớ tin", "Một âm mới đến, giữ gìn", "Cơ nguy lớn mãi, đứng nhìn khó ngăn"],
    essence: "Gió tới đâu gặp vật đến đó, một nét âm vừa lẻn vào dưới năm nét dương. Cuộc gặp bất ngờ thì vui, nhưng phải xem kỹ, vì điều nhỏ bỏ qua hôm nay có thể lớn rất nhanh.",
  },
  45: {
    verse: ["Nước tràn về hội đất đai", "Muôn người tụ họp, cậy ai cầm đầu", "Lễ thành, tâm kính trước sau", "Phòng khi biến loạn, giữ câu an toàn"],
    essence: "Đầm tụ nước trên mặt đất, người tụ về một chỗ. Tụ được là lành, nhưng đông thì dễ loạn, cần một người có đức đứng ra, và phải lo trước chuyện bất trắc.",
  },
  46: {
    verse: ["Cây non đội đất vươn mình", "Từng năm từng tháng, lên thành rừng xanh", "Lên cao bằng nếp hiền lành", "Gặp người quyền quý, công danh mở đường"],
    essence: "Cây mọc từ lòng đất, không vội mà ngày một cao. Thời thăng tiến đến bằng nỗ lực tích nhỏ, thuận theo lẽ tự nhiên, đi về phương sáng thì gặp người nâng đỡ.",
  },
  47: {
    verse: ["Đầm khô nước cạn đáy rồi", "Lời ra chẳng lọt, đứng ngồi không yên", "Khó nghèo giữ trọn lòng hiền", "Vững tâm rồi sẽ đến miền thảnh thơi"],
    essence: "Nước rò hết xuống dưới, đầm cạn trơ đáy. Lúc này nói gì cũng khó có người tin, hãy để việc làm thay lời; cảnh khốn là phép thử cho biết ai thực sự vững.",
  },
  48: {
    verse: ["Làng đi, giếng vẫn còn đây", "Nước trong nuôi sống tháng ngày bao người", "Gàu dây chớ để đứt rời", "Tài hay chẳng dụng, phí đời tiếc thay"],
    essence: "Làng có thể dời, giếng thì không. Cái gốc nuôi sống con người luôn ở đó, chỉ cần sửa thành giếng và nối dây gàu; tài năng cũng vậy, không ai múc thì nước trong cũng uổng.",
  },
  49: {
    verse: ["Lửa trong đầm, nước sôi trào", "Đến ngày phải đổi, lẽ nào đứng yên", "Bỏ xưa đổi mới cho liền", "Lòng dân đã thuận, ưu phiền tan mau"],
    essence: "Nước và lửa đã không dung nhau nữa, thay đổi là tất yếu. Đổi phải đúng thời, phải có lòng người, và đã đổi thì đổi cho triệt để như cọp thay bộ lông mới.",
  },
  50: {
    verse: ["Lửa trên củi, vạc đang sôi", "Món ngon dâng hiến, phận ngôi vững vàng", "Bỏ cũ nấu mới đàng hoàng", "Chân kiềng giữ thẳng, giàu sang lâu dài"],
    essence: "Vạc lớn đặt trên lửa, nấu chín cái sống thành cái ăn được. Đây là thời ổn định sau đổi mới, nên dùng người tài, giữ cho ba chân vững và làm ra thành quả thật.",
  },
  51: {
    verse: ["Sấm vang trăm dặm rền trời", "Người run trước đã, sau cười an nhiên", "Giật mình sửa lỗi cho hiền", "Giữ nguyên chén rượu, lòng yên việc lành"],
    essence: "Sấm dồn dập làm cả làng giật mình. Biến cố đến đột ngột nhưng không hại người biết sợ đúng chỗ; hoảng một lúc, xét lại mình, rồi việc trong tay vẫn giữ không rơi.",
  },
  52: {
    verse: ["Núi chồng lên núi lặng yên", "Dừng khi cần dừng, ưu phiền tự tan", "Lưng yên, chẳng thấy muộn màng", "Biết đâu là đủ, bình an một đời"],
    essence: "Hai ngọn núi đứng cạnh nhau, không ngọn nào lấn ngọn nào. Biết dừng là cái học khó nhất: dừng ý nghĩ, dừng ham muốn, ở yên đúng chỗ của mình thì tâm tự sáng.",
  },
  53: {
    verse: ["Cây trên núi, lớn từng ngày", "Chim hồng đáp xuống, dần bay lên đài", "Gái về nhà chồng chẳng sai", "Tuần tự từng bước, đường dài mới nên"],
    essence: "Cây trên núi lớn chậm mà chắc, chim hồng bay từng chặng từ bến lên gò. Việc gì đúng lễ, đúng trình tự thì tốt, nhất là chuyện cưới hỏi; vội thì mất cả.",
  },
  54: {
    verse: ["Sấm trên đầm nước xôn xao", "Duyên chưa đúng phận, vội vào khó yên", "Chớ vì say đắm mà quên", "Biết thân biết phận, giữ bền về sau"],
    essence: "Sấm động trên đầm, nước gợn theo vì chiều lòng mà không vì lẽ phải. Mối quan hệ khởi từ cảm xúc nhất thời khó được bền; nên nhìn cho rõ vị trí của mình trước khi bước vào.",
  },
  55: {
    verse: ["Sấm cùng chớp, rực rỡ thay", "Mặt trời đứng bóng, tràn đầy vinh quang", "Thịnh rồi ắt có suy tàn", "Lúc đầy nên liệu sẵn sàng lúc vơi"],
    essence: "Sấm và chớp cùng đến, cực thịnh như mặt trời đúng ngọ. Đừng lo cho ngày mai vội, cứ làm trọn việc lúc đang sáng; nhưng người khôn biết trăng đầy rồi sẽ khuyết.",
  },
  56: {
    verse: ["Lửa trên núi, khách xa nhà", "Đường trường lữ thứ, phôi pha tháng ngày", "Đi đâu khiêm tốn lúc này", "Chỗ nương nho nhỏ, đổi thay nhẹ lòng"],
    essence: "Lửa cháy trên núi, cháy rồi lại đi, như người xa quê không có chỗ ở lâu. Thân khách nơi đất lạ thì việc nhỏ mới hanh, phải giữ mình khiêm tốn và đừng chuốc thù.",
  },
  57: {
    verse: ["Gió đi gió lại nhẹ nhàng", "Len vào từng ngõ, muôn vàn cũng thông", "Thuận người mà vẫn có lòng", "Đừng vì dạ dạ, thành không chủ gì"],
    essence: "Gió không phá cửa mà vẫn vào được mọi nhà. Sức mạnh của thời này là sự thấm dần và lặp lại đều đặn; thuận theo thì được, nhưng thuận đến mất chủ kiến thì hỏng.",
  },
  58: {
    verse: ["Hai đầm nối lại cùng vui", "Nói lời êm dịu, ngọt bùi bên nhau", "Bạn hiền trao đổi trước sau", "Vui mà chính trực, dài lâu mới tròn"],
    essence: "Hai mặt đầm gần nhau, nước thấm qua lại mà cùng đầy. Niềm vui thật đến từ sự trò chuyện và học cùng bạn hữu; lời ngọt mà không ngay thì chỉ là lời dụ.",
  },
  59: {
    verse: ["Gió lùa mặt nước tan băng", "Lòng người chia rẽ, khó khăn giải dần", "Về nơi tiên tổ ân cần", "Qua sông góp sức, muôn phần nhẹ vơi"],
    essence: "Gió xuân thổi trên mặt nước, băng tan thành sóng. Cái cứng và cái ích kỷ đang được làm tan; hãy tập hợp mọi người về một mối chung trước khi cùng nhau qua sông lớn.",
  },
  60: {
    verse: ["Đầm kia chứa nước có bờ", "Tiêu dùng đúng mức, đợi chờ chớ hoang", "Vừa đủ là đẹp chu toàn", "Khổ tiết quá mức, lại mang họa vào"],
    essence: "Đầm có bờ thì mới giữ được nước. Đặt ra giới hạn cho tiền bạc, lời nói và ham muốn là điều lành, nhưng tiết chế đến mức khổ sở thì không ai chịu nổi lâu.",
  },
  61: {
    verse: ["Gió lay mặt nước đầm xanh", "Lòng thành một tấm, ngọn ngành thấu thông", "Cá heo cảm được tấm lòng", "Qua sông lớn cũng thong dong bến bờ"],
    essence: "Giữa quẻ rỗng mà hai bên đặc, như tấm lòng không vướng bận. Sự chân thành có sức đi rất xa, cảm được cả những kẻ khó cảm nhất, và đưa người qua được chỗ hiểm.",
  },
  62: {
    verse: ["Sấm trên núi, tiếng vừa vừa", "Việc nhỏ thì được, đừng ưa bay cao", "Tiếng chim để lại thì thào", "Hạ mình thì tốt, ham vào hiểm nguy"],
    essence: "Chim bay chỉ để lại tiếng, không nên lên cao mà nên xuống thấp. Thời này vượt một chút trong việc nhỏ là được, như cung kính hơn, tiết kiệm hơn, nhưng đừng dấn vào việc lớn.",
  },
  63: {
    verse: ["Nước trên lửa, việc đã xong", "Mọi điều đã ổn, chớ mong ngủ quên", "Đầu thì tốt, cuối khó yên", "Lo khi chưa loạn, giữ bền cơ đồ"],
    essence: "Nước ở trên lửa, mọi hào đều đúng chỗ, việc đã thành. Nhưng trạng thái hoàn hảo là trạng thái dễ đổ nhất, phải lo từ lúc chưa có gì để lo.",
  },
  64: {
    verse: ["Lửa trên nước, việc chưa thành", "Cáo con sắp đến, ướt nhanh đuôi rồi", "Đường còn dài đấy, ai ơi", "Cẩn trọng từng bước, đổi dời sẽ thông"],
    essence: "Kinh Dịch kết ở quẻ chưa xong, vì đời không có điểm cuối. Bờ đã gần mà chưa tới, càng phải chậm và kỹ; biết phân biệt cho đúng từng thứ thì việc rồi sẽ thành.",
  },
};

/** body: bộ phận ứng với mỗi quái theo thiên Thuyết Quái. */
const TRIGRAMS: Record<string, { name: string; image: string; element: string; body: string }> = {
  "111": { name: "Càn", image: "Trời", element: "Kim", body: "đầu" },
  "000": { name: "Khôn", image: "Đất", element: "Thổ", body: "bụng" },
  "100": { name: "Chấn", image: "Sấm", element: "Mộc", body: "chân" },
  "010": { name: "Khảm", image: "Nước", element: "Thủy", body: "tai" },
  "001": { name: "Cấn", image: "Núi", element: "Thổ", body: "tay" },
  "011": { name: "Tốn", image: "Gió", element: "Mộc", body: "đùi" },
  "101": { name: "Ly", image: "Lửa", element: "Hỏa", body: "mắt" },
  "110": { name: "Đoài", image: "Đầm", element: "Kim", body: "miệng" },
};

/** `binary` đọc từ hào sơ lên: ba ký tự đầu là nội quái, ba ký tự sau là ngoại quái. */
export function getTrigrams(binary: string) {
  return { lower: TRIGRAMS[binary.slice(0, 3)], upper: TRIGRAMS[binary.slice(3, 6)] };
}
