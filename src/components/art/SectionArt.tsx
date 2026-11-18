import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Bảng màu sơn mài của Huyền Tâm. */
const C = {
  red: "#8e2320",
  redDeep: "#5a1714",
  ink: "#1a130e",
  gold: "#c49a3a",
  goldLight: "#e8c876",
  paper: "#fffaf2",
  paperDeep: "#f1e5cb",
  jade: "#2f6b57",
};

export type ArtName =
  | "lich"
  | "ngay"
  | "tu-vi"
  | "gieo-que"
  | "xam"
  | "boi-toan"
  | "phong-thuy"
  | "ten"
  | "con-giap"
  | "hoang-dao"
  | "kien-thuc"
  | "nha"
  | "tam-hop";

/** Nền chung: vòng tròn ngọc, mây và vài đốm sao. */
function Backdrop({ children }: { children: ReactNode }) {
  return (
    <>
      <circle cx="120" cy="100" r="92" fill={C.paperDeep} opacity="0.55" />
      <circle cx="120" cy="100" r="92" fill="none" stroke={C.gold} strokeOpacity="0.5" strokeWidth="1.2" />
      <circle cx="120" cy="100" r="82" fill="none" stroke={C.gold} strokeOpacity="0.35" strokeDasharray="2 5" />
      <path d="M18 158c10-10 26-10 34 0 6-8 20-8 26 0" fill="none" stroke={C.gold} strokeOpacity="0.55" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M166 40c8-8 20-8 26 0 5-6 15-6 20 0" fill="none" stroke={C.gold} strokeOpacity="0.55" strokeWidth="1.6" strokeLinecap="round" />
      <g fill={C.gold}>
        <circle cx="36" cy="44" r="1.8" />
        <circle cx="208" cy="150" r="1.6" />
        <circle cx="200" cy="74" r="1.2" />
        <circle cx="48" cy="120" r="1.2" />
      </g>
      {children}
    </>
  );
}

/** Vị trí chi thứ i trên vòng tròn bán kính r. */
function chiPoint(i: number, r: number): [number, number] {
  const a = (i * Math.PI) / 6;
  return [120 + Math.sin(a) * r, 100 - Math.cos(a) * r];
}

const SCENES: Record<ArtName, ReactNode> = {
  "tam-hop": (
    <Backdrop>
      {/* Vòng địa chi: tam giác tam hợp Thân Tý Thìn và đường xung Tý Ngọ */}
      <circle cx="120" cy="100" r="64" fill={C.paper} stroke={C.red} strokeWidth="2" />
      <polygon points={[0, 4, 8].map((i) => chiPoint(i, 50).join(",")).join(" ")} fill={C.gold} fillOpacity="0.25" stroke={C.gold} strokeWidth="2" />
      <line x1={chiPoint(3, 50)[0]} y1={chiPoint(3, 50)[1]} x2={chiPoint(9, 50)[0]} y2={chiPoint(9, 50)[1]} stroke={C.red} strokeWidth="2" strokeDasharray="5 4" />
      {"子丑寅卯辰巳午未申酉戌亥".split("").map((ch, i) => {
        const [x, y] = chiPoint(i, 50);
        const lit = i % 4 === 0;
        return (
          <g key={ch}>
            <circle cx={x} cy={y} r="9" fill={lit ? C.red : i === 3 || i === 9 ? C.redDeep : C.paperDeep} />
            <text x={x} y={y + 4} textAnchor="middle" fontSize="10" fill={lit || i === 3 || i === 9 ? C.paper : C.ink} fontFamily="serif">
              {ch}
            </text>
          </g>
        );
      })}
      <text x="120" y="106" textAnchor="middle" fontSize="16" fill={C.red} fontFamily="serif">合</text>
    </Backdrop>
  ),
  lich: (
    <Backdrop>
      {/* Tờ lịch bóc với trăng */}
      <rect x="72" y="46" width="96" height="116" rx="8" fill={C.paper} stroke={C.ink} strokeOpacity="0.25" />
      <rect x="72" y="46" width="96" height="30" rx="8" fill={C.red} />
      <rect x="72" y="66" width="96" height="10" fill={C.red} />
      <circle cx="94" cy="46" r="4" fill={C.gold} />
      <circle cx="146" cy="46" r="4" fill={C.gold} />
      <text x="120" y="68" textAnchor="middle" fontSize="13" fill={C.paper} fontFamily="serif" letterSpacing="2">ÂM LỊCH</text>
      <text x="120" y="122" textAnchor="middle" fontSize="40" fill={C.red} fontFamily="serif" fontWeight="700">15</text>
      <text x="120" y="142" textAnchor="middle" fontSize="10" fill={C.ink} fillOpacity="0.6" fontFamily="sans-serif">Rằm tháng Giêng</text>
      <circle cx="176" cy="58" r="20" fill={C.goldLight} />
      <circle cx="184" cy="52" r="18" fill={C.paperDeep} opacity="0.95" />
    </Backdrop>
  ),
  ngay: (
    <Backdrop>
      {/* Lịch tháng với ấn son "Cát" */}
      <rect x="58" y="50" width="124" height="104" rx="10" fill={C.paper} stroke={C.ink} strokeOpacity="0.2" />
      <rect x="58" y="50" width="124" height="22" rx="10" fill={C.redDeep} />
      <rect x="58" y="62" width="124" height="10" fill={C.redDeep} />
      {Array.from({ length: 20 }, (_, i) => (
        <rect key={i} x={68 + (i % 5) * 22} y={80 + Math.floor(i / 5) * 17} width="14" height="10" rx="2" fill={i === 12 ? C.red : C.ink} fillOpacity={i === 12 ? 0.9 : 0.12} />
      ))}
      <g transform="rotate(-12 168 140)">
        <rect x="146" y="118" width="44" height="44" rx="6" fill={C.red} />
        <rect x="150" y="122" width="36" height="36" rx="4" fill="none" stroke={C.paper} strokeWidth="1.5" />
        <text x="168" y="148" textAnchor="middle" fontSize="24" fill={C.paper} fontFamily="serif">吉</text>
      </g>
    </Backdrop>
  ),
  "tu-vi": (
    <Backdrop>
      {/* Lá số 12 cung với sao */}
      <rect x="66" y="46" width="108" height="108" fill={C.paper} stroke={C.red} strokeWidth="2" />
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <line x1={66 + i * 27} y1="46" x2={66 + i * 27} y2="154" stroke={C.red} strokeOpacity="0.45" />
          <line x1="66" y1={46 + i * 27} x2="174" y2={46 + i * 27} stroke={C.red} strokeOpacity="0.45" />
        </g>
      ))}
      <rect x="93" y="73" width="54" height="54" fill={C.redDeep} />
      <text x="120" y="98" textAnchor="middle" fontSize="12" fill={C.goldLight} fontFamily="serif">紫微</text>
      <text x="120" y="114" textAnchor="middle" fontSize="8" fill={C.paperDeep} fontFamily="sans-serif" letterSpacing="1">LÁ SỐ</text>
      {[
        [80, 60],
        [134, 60],
        [161, 87],
        [80, 141],
        [161, 141],
        [107, 141],
      ].map(([x, y], i) => (
        <path key={i} d={`M${x} ${y - 6}l1.8 4.2 4.2 1.8-4.2 1.8-1.8 4.2-1.8-4.2-4.2-1.8 4.2-1.8z`} fill={C.gold} />
      ))}
      <circle cx="186" cy="48" r="12" fill={C.goldLight} />
      <circle cx="191" cy="44" r="11" fill={C.paperDeep} />
    </Backdrop>
  ),
  "gieo-que": (
    <Backdrop>
      {/* Sáu hào và ba đồng xu */}
      {[0, 1, 2, 3, 4, 5].map((i) =>
        i % 3 === 1 ? (
          <g key={i}>
            <rect x="74" y={44 + i * 14} width="40" height="8" rx="2" fill={C.ink} />
            <rect x="126" y={44 + i * 14} width="40" height="8" rx="2" fill={C.ink} />
          </g>
        ) : (
          <rect key={i} x="74" y={44 + i * 14} width="92" height="8" rx="2" fill={i === 4 ? C.red : C.ink} />
        ),
      )}
      {[
        [78, 150],
        [120, 158],
        [162, 150],
      ].map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="17" fill={C.gold} stroke="#7a5320" strokeWidth="2" />
          <circle cx={x} cy={y} r="13" fill="none" stroke="#7a5320" strokeOpacity="0.5" />
          <rect x={x - 4.5} y={y - 4.5} width="9" height="9" fill={C.redDeep} />
        </g>
      ))}
    </Backdrop>
  ),
  xam: (
    <Backdrop>
      {/* Ống xăm và một thẻ rơi ra */}
      {[-14, -8, -2, 4, 10, 16].map((dx, i) => (
        <rect key={i} x={114 + dx} y={34 + (i % 3) * 6} width="4" height="70" rx="2" fill={C.goldLight} stroke="#7a5320" strokeWidth="0.6" transform={`rotate(${dx / 2} ${116 + dx} 104)`} />
      ))}
      <path d="M90 84h60l-6 80a8 8 0 0 1-8 7h-32a8 8 0 0 1-8-7z" fill={C.red} />
      <rect x="86" y="80" width="68" height="9" rx="4" fill={C.redDeep} />
      <text x="120" y="136" textAnchor="middle" fontSize="26" fill={C.goldLight} fontFamily="serif">籤</text>
      <g transform="rotate(38 176 150)">
        <rect x="172" y="104" width="6" height="74" rx="3" fill={C.goldLight} stroke="#7a5320" strokeWidth="0.8" />
        <rect x="172" y="104" width="6" height="16" rx="3" fill={C.red} />
      </g>
    </Backdrop>
  ),
  "boi-toan": (
    <Backdrop>
      {/* Ba lá bài xòe và ngọn nến */}
      {[-18, 0, 18].map((rot, i) => (
        <g key={i} transform={`rotate(${rot} 120 170)`}>
          <rect x="96" y="54" width="48" height="76" rx="6" fill={i === 1 ? C.paper : C.red} stroke={C.gold} strokeWidth="2" />
          {i === 1 ? (
            <>
              <circle cx="120" cy="84" r="12" fill="none" stroke={C.gold} strokeWidth="1.6" />
              <path d="M120 72v24M108 84h24" stroke={C.gold} strokeWidth="1.2" />
              <text x="120" y="120" textAnchor="middle" fontSize="9" fill={C.red} fontFamily="serif">CÁT TƯỜNG</text>
            </>
          ) : (
            <text x="120" y="98" textAnchor="middle" fontSize="18" fill={C.goldLight}>✦</text>
          )}
        </g>
      ))}
      <rect x="170" y="128" width="14" height="30" rx="2" fill={C.paper} stroke={C.gold} />
      <path d="M177 112c6 8 4 14 0 16-4-2-6-8 0-16z" fill={C.gold} />
    </Backdrop>
  ),
  "phong-thuy": (
    <Backdrop>
      {/* La bàn bát quái */}
      <circle cx="120" cy="100" r="62" fill={C.red} />
      <circle cx="120" cy="100" r="56" fill="none" stroke={C.gold} strokeWidth="1.5" />
      <circle cx="120" cy="100" r="40" fill={C.paper} />
      {Array.from({ length: 8 }, (_, i) => {
        const a = (i * Math.PI) / 4;
        const x = 120 + Math.sin(a) * 48;
        const y = 100 - Math.cos(a) * 48;
        return (
          <g key={i} transform={`rotate(${i * 45} ${x} ${y})`}>
            <rect x={x - 7} y={y - 5} width="14" height="2.2" fill={C.goldLight} />
            <rect x={x - 7} y={y - 1} width={i % 2 ? 6 : 14} height="2.2" fill={C.goldLight} />
            {i % 2 ? <rect x={x + 1} y={y - 1} width="6" height="2.2" fill={C.goldLight} /> : null}
            <rect x={x - 7} y={y + 3} width="14" height="2.2" fill={C.goldLight} />
          </g>
        );
      })}
      <path d="M120 64a36 36 0 0 1 0 72 18 18 0 0 1 0-36 18 18 0 0 0 0-36z" fill={C.ink} />
      <circle cx="120" cy="82" r="4" fill={C.paper} />
      <circle cx="120" cy="118" r="4" fill={C.ink} />
      <path d="M120 60l4 40-4 40-4-40z" fill={C.red} opacity="0.85" />
    </Backdrop>
  ),
  ten: (
    <Backdrop>
      {/* Cuộn giấy với nét chữ và bút lông */}
      <rect x="62" y="58" width="116" height="88" rx="4" fill={C.paper} stroke={C.ink} strokeOpacity="0.2" />
      <rect x="54" y="52" width="10" height="100" rx="5" fill={C.redDeep} />
      <rect x="176" y="52" width="10" height="100" rx="5" fill={C.redDeep} />
      <text x="120" y="112" textAnchor="middle" fontSize="44" fill={C.ink} fontFamily="serif">名</text>
      <rect x="148" y="122" width="22" height="22" rx="3" fill={C.red} />
      <text x="159" y="138" textAnchor="middle" fontSize="12" fill={C.paper} fontFamily="serif">印</text>
      <g transform="rotate(35 190 70)">
        <rect x="186" y="28" width="8" height="70" rx="3" fill="#7a5320" />
        <path d="M186 98h8l-4 22z" fill={C.ink} />
      </g>
    </Backdrop>
  ),
  "con-giap": (
    <Backdrop>
      {/* Vòng 12 địa chi */}
      <circle cx="120" cy="100" r="66" fill={C.red} />
      <circle cx="120" cy="100" r="44" fill={C.paper} />
      {"子丑寅卯辰巳午未申酉戌亥".split("").map((ch, i) => {
        const a = (i * Math.PI) / 6;
        return (
          <text key={ch} x={120 + Math.sin(a) * 55} y={104 - Math.cos(a) * 55} textAnchor="middle" fontSize="12" fill={C.goldLight} fontFamily="serif">
            {ch}
          </text>
        );
      })}
      <text x="120" y="110" textAnchor="middle" fontSize="30" fill={C.red} fontFamily="serif">生肖</text>
    </Backdrop>
  ),
  "hoang-dao": (
    <Backdrop>
      {/* Bánh xe hoàng đạo và chòm sao */}
      <circle cx="120" cy="100" r="64" fill={C.redDeep} />
      <circle cx="120" cy="100" r="64" fill="none" stroke={C.gold} strokeWidth="1.5" />
      <circle cx="120" cy="100" r="42" fill="none" stroke={C.gold} strokeOpacity="0.6" />
      {Array.from({ length: 12 }, (_, i) => {
        const a = (i * Math.PI) / 6;
        const x = 120 + Math.sin(a) * 53;
        const y = 100 - Math.cos(a) * 53;
        return <path key={i} d={`M${x} ${y - 5}l1.5 3.5 3.5 1.5-3.5 1.5-1.5 3.5-1.5-3.5-3.5-1.5 3.5-1.5z`} fill={C.goldLight} />;
      })}
      {Array.from({ length: 12 }, (_, i) => {
        const a = ((i + 0.5) * Math.PI) / 6;
        return <line key={i} x1={120 + Math.sin(a) * 42} y1={100 - Math.cos(a) * 42} x2={120 + Math.sin(a) * 64} y2={100 - Math.cos(a) * 64} stroke={C.gold} strokeOpacity="0.5" />;
      })}
      <polyline points="102,92 114,84 126,96 140,88" fill="none" stroke={C.paperDeep} strokeWidth="1.2" />
      {[
        [102, 92],
        [114, 84],
        [126, 96],
        [140, 88],
        [120, 116],
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="2.6" fill={C.goldLight} />
      ))}
    </Backdrop>
  ),
  "kien-thuc": (
    <Backdrop>
      {/* Sách mở và đèn lồng */}
      <path d="M120 82c-18-10-40-12-58-8v72c18-4 40-2 58 8z" fill={C.paper} stroke={C.ink} strokeOpacity="0.25" />
      <path d="M120 82c18-10 40-12 58-8v72c-18-4-40-2-58 8z" fill={C.paper} stroke={C.ink} strokeOpacity="0.25" />
      {[0, 1, 2, 3].map((i) => (
        <g key={i} stroke={C.ink} strokeOpacity="0.25" strokeWidth="1.5">
          <line x1="72" y1={96 + i * 12} x2="110" y2={100 + i * 12} />
          <line x1="130" y1={100 + i * 12} x2="168" y2={96 + i * 12} />
        </g>
      ))}
      <line x1="120" y1="82" x2="120" y2="154" stroke={C.red} strokeWidth="2" />
      <line x1="184" y1="22" x2="184" y2="38" stroke={C.ink} strokeOpacity="0.5" />
      <ellipse cx="184" cy="54" rx="14" ry="17" fill={C.red} />
      <rect x="177" y="36" width="14" height="4" fill={C.gold} />
      <rect x="177" y="69" width="14" height="4" fill={C.gold} />
      <line x1="184" y1="73" x2="184" y2="86" stroke={C.gold} strokeWidth="1.5" />
    </Backdrop>
  ),
  nha: (
    <Backdrop>
      {/* Nhà mái ngói tựa núi, trước có nước */}
      <path d="M30 140l40-52 26 30 24-40 52 62z" fill={C.jade} opacity="0.35" />
      <path d="M78 104l42-28 42 28z" fill={C.red} />
      <path d="M72 106c16-2 80-2 96 0" stroke={C.redDeep} strokeWidth="4" strokeLinecap="round" fill="none" />
      <rect x="86" y="106" width="68" height="40" fill={C.paper} stroke={C.ink} strokeOpacity="0.25" />
      <rect x="112" y="118" width="16" height="28" fill={C.redDeep} />
      <rect x="92" y="114" width="12" height="12" fill={C.gold} opacity="0.7" />
      <rect x="136" y="114" width="12" height="12" fill={C.gold} opacity="0.7" />
      <path d="M40 160c14-6 26 6 40 0s26 6 40 0 26 6 40 0 26 6 40 0" fill="none" stroke={C.jade} strokeOpacity="0.6" strokeWidth="2" />
      <circle cx="182" cy="52" r="12" fill={C.gold} opacity="0.85" />
    </Backdrop>
  ),
};

export function SectionArt({ name, className, title }: { name: ArtName; className?: string; title?: string }) {
  return (
    <svg
      viewBox="0 0 240 200"
      className={cn("h-auto w-full", className)}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      {SCENES[name]}
    </svg>
  );
}

/** Đoán hình minh họa theo tiêu đề trang khi trang không chỉ định. */
export function guessArt(title = "", path = ""): ArtName | null {
  const rules: [RegExp, ArtName][] = [
    [/xăm|xin-xam/, "xam"],
    [/tam hợp|hành xung|lục hợp|lục xung/, "tam-hop"],
    [/quẻ|kinh dịch|đồng xu|gieo|kinh-dich/, "gieo-que"],
    [/tử vi|lá số|tu-vi/, "tu-vi"],
    [/ngày tốt|xem ngày|ngay-tot/, "ngay"],
    [/lịch|âm dương|lich/, "lich"],
    [/hoàng đạo|hoang-dao/, "hoang-dao"],
    [/con giáp|tuổi|con-giap/, "con-giap"],
    [/tên|ten/, "ten"],
    [/nhà|phòng|bàn thờ|bàn làm việc|làm nhà/, "nha"],
    [/phong thủy|ngũ hành|màu|phong-thuy/, "phong-thuy"],
    [/kiến thức|bài viết|kien-thuc/, "kien-thuc"],
    [/bói|bài|tình|tài lộc|công danh|vận may|số điện thoại|biển số|boi/, "boi-toan"],
  ];
  // Tiêu đề trang quyết định trước, đường dẫn cha chỉ dùng khi tiêu đề không gợi ý gì.
  for (const text of [title.toLowerCase(), path.toLowerCase()]) {
    const hit = rules.find(([re]) => re.test(text));
    if (hit) return hit[1];
  }
  return null;
}

const CATEGORY_ART: Record<string, ArtName> = {
  "Con giáp": "con-giap",
  "Hoàng đạo": "hoang-dao",
  "Kinh Dịch": "gieo-que",
  "Lịch pháp": "lich",
  "Ngũ hành": "phong-thuy",
  "Phong thủy": "nha",
  "Tử vi": "tu-vi",
};

/** Hình cho bài viết: theo tiêu đề nếu gợi ý rõ, không thì theo danh mục. */
export function artForPost(title: string, category: string): ArtName {
  return guessArt(title) ?? CATEGORY_ART[category] ?? "kien-thuc";
}
