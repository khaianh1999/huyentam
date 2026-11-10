export function relationLabel(
  value: "sinh" | "duoc-sinh" | "khac" | "bi-khac" | "cung",
): string {
  switch (value) {
    case "cung":
      return "Cùng hành";
    case "sinh":
      return "Tương sinh";
    case "duoc-sinh":
      return "Được sinh";
    case "khac":
      return "Tương khắc";
    case "bi-khac":
      return "Bị khắc";
  }
}

export function fortuneLabel(
  level: "dai-cat" | "cat" | "binh" | "hung" | "dai-hung",
): string {
  switch (level) {
    case "dai-cat":
      return "Đại cát";
    case "cat":
      return "Cát";
    case "binh":
      return "Bình";
    case "hung":
      return "Hung";
    case "dai-hung":
      return "Đại hung";
  }
}

export function stickLabel(level: "cat" | "binh" | "hung"): string {
  switch (level) {
    case "cat":
      return "Cát";
    case "binh":
      return "Bình";
    case "hung":
      return "Hung";
  }
}

export function monthRatingLabel(rating: "tot" | "trung-binh" | "can-than"): string {
  switch (rating) {
    case "tot":
      return "Thuận";
    case "trung-binh":
      return "Vừa";
    case "can-than":
      return "Cần thận";
  }
}

export function harmonyLabel(value: "hao-hoa" | "trung-tinh" | "xung-khac"): string {
  switch (value) {
    case "hao-hoa":
      return "Hài hòa";
    case "trung-tinh":
      return "Trung tính";
    case "xung-khac":
      return "Cần cân nhắc";
  }
}

export function ageRelationLabel(
  value: "cung-tuoi" | "tam-hop" | "luc-hop" | "luc-xung" | "tu-hanh-xung" | "binh-hoa",
): string {
  switch (value) {
    case "cung-tuoi":
      return "Cùng tuổi";
    case "tam-hop":
      return "Tam hợp";
    case "luc-hop":
      return "Lục hợp";
    case "luc-xung":
      return "Lục xung";
    case "tu-hanh-xung":
      return "Tứ hành xung";
    case "binh-hoa":
      return "Bình hòa";
  }
}
