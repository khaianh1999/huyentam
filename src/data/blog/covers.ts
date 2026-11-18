/**
 * Ảnh bìa bài viết, tải từ Unsplash (giấy phép Unsplash: dùng miễn phí, kể cả thương mại).
 * Ghi tên tác giả kèm liên kết như Unsplash khuyến nghị.
 */
export interface BlogCover {
  src: string;
  alt: string;
  author: string;
  authorUrl: string;
  photoUrl: string;
}

const UTM = "?utm_source=huyen_tam&utm_medium=referral";

function cover(slug: string, alt: string, author: string, username: string, photoId: string): [string, BlogCover] {
  return [
    slug,
    {
      src: `/images/blog/${slug}.jpg`,
      alt,
      author,
      authorUrl: `https://unsplash.com/@${username}${UTM}`,
      photoUrl: `https://unsplash.com/photos/${photoId}${UTM}`,
    },
  ];
}

export const BLOG_COVERS: Record<string, BlogCover> = Object.fromEntries([
  cover("muoi-hai-con-giap-la-gi", "Những bức tranh nhỏ vẽ các con vật treo kín tường", "极雅 张", "northcity", "cWk1pzbTPmw"),
  cover("tam-hop-va-tu-hanh-xung", "Đèn lồng đỏ treo sáng trong đêm", "Thyla Jane", "thyjane", "CkTL4DxE62g"),
  cover("can-chi-va-nap-am", "Người viết thư pháp bằng bút lông trên giấy trắng", "Fenghua", "fenghua1975", "4zfxE7vDues"),
  cover("hoang-dao-hac-dao-va-muoi-hai-truc", "Nhang khói trong lư hương nơi đền", "frank mckenna", "frankiefoto", "P-XX-PHSgyw"),
  cover("ngu-hanh-tuong-sinh-tuong-khac", "Những hòn đá xếp chồng bên dòng suối", "Lennart Rudolph", "lennrt", "6oTtp_drPAE"),
  cover("kinh-dich-sau-muoi-bon-que-doc-the-nao", "Đồng xu vàng có lỗ vuông và chữ Hán", "Eyestetix Studio", "eyestetix_studio", "mkLXLmWUsgw"),
  cover("cung-hoang-dao-va-con-giap", "Bầu trời đêm đầy sao", "Paul Lichtblau", "laup", "qVotvbsuM_c"),
  cover("phong-thuy-nha-o-nhung-dieu-nen-tach", "Cánh cửa gỗ mở ra khu vườn xanh", "Yen Vu", "yenvu2410", "VCNH8CjCtCo"),
]);
