/**
 * Bảng sao theo tháng âm và can chi ngày, theo Ngọc Hạp Thông Thư như lịch vạn sự Việt Nam thường ghi.
 * Mỗi quy tắc đã được đối chiếu ngày qua ngày với lịch vạn niên trên mẫu nhiều năm.
 *
 * key: nhóm tháng ("lm" tháng âm, "season" quý trong năm âm, "none" cả năm).
 * val: giá trị của ngày ("chi", "can", "c60" vị trí can chi, "m9" c60 chia 9 dư,
 * "token" c<chỉ số can> hoặc z<chỉ số chi>).
 */

import type { ActivityTag } from "@/types";

export type StarRule = {
  name: string;
  kind: "good" | "bad";
  key: "lm" | "season" | "none";
  val: "chi" | "can" | "c60" | "m9" | "token";
  all: boolean;
  tags: ActivityTag[];
  resolves: boolean;
  other?: string;
  t: Record<number, (number | string)[]>;
};

export const STAR_RULES: StarRule[] = [
  { name: "Âm đức", kind: "good", key: "lm", val: "chi", all: true, tags: [], resolves: false, t: {1:[9],2:[7],3:[5],4:[3],5:[1],6:[11],7:[9],8:[7],9:[5],10:[3],11:[1],12:[11]} },
  { name: "Cát khánh", kind: "good", key: "lm", val: "chi", all: true, tags: [], resolves: false, t: {1:[9],2:[2],3:[11],4:[4],5:[1],6:[6],7:[3],8:[8],9:[5],10:[10],11:[7],12:[0]} },
  { name: "Dân nhật, Thời đức", kind: "good", key: "season", val: "chi", all: true, tags: [], resolves: false, t: {0:[6],1:[9],2:[0],3:[3]} },
  { name: "Dịch mã", kind: "good", key: "lm", val: "chi", all: true, tags: ["xuat-hanh"], resolves: false, t: {1:[8],2:[5],3:[2],4:[11],5:[8],6:[5],7:[2],8:[11],9:[8],10:[5],11:[2],12:[11]} },
  { name: "Đại hồng sa", kind: "good", key: "season", val: "chi", all: true, tags: [], resolves: false, t: {0:[0,1],1:[4,5],2:[6,7],3:[8,10]} },
  { name: "Địa tài", kind: "good", key: "lm", val: "chi", all: false, tags: ["giao-dich"], resolves: false, t: {2:[7],3:[9],4:[11],5:[1],6:[3],7:[5],8:[7],9:[9],10:[11],11:[1],12:[3]} },
  { name: "Giải thần", kind: "good", key: "lm", val: "chi", all: false, tags: [], resolves: true, other: "lễ bái, cúng tế", t: {1:[8],2:[8],3:[10],4:[10],5:[0],6:[0],7:[2],8:[2],9:[4],10:[4],11:[6],12:[6]} },
  { name: "Hoàng ân", kind: "good", key: "lm", val: "chi", all: true, tags: [], resolves: false, t: {2:[1],3:[2],4:[5],5:[9],6:[3],7:[0],8:[6],9:[11],10:[4],11:[8],12:[7]} },
  { name: "Hoạt diệu", kind: "good", key: "lm", val: "chi", all: false, tags: [], resolves: false, t: {2:[10],3:[7],4:[0],5:[9],6:[2],7:[11],8:[4],9:[1],10:[6],11:[3],12:[8]} },
  { name: "Ích hậu", kind: "good", key: "lm", val: "chi", all: true, tags: ["cuoi"], resolves: false, t: {1:[0],2:[6],3:[1],4:[7],5:[2],6:[8],7:[3],9:[4],10:[10],11:[5],12:[11]} },
  { name: "Kinh tâm", kind: "good", key: "lm", val: "chi", all: false, tags: [], resolves: false, other: "lễ bái, cúng tế", t: {1:[7],2:[1],3:[8],4:[2],5:[9],6:[3],7:[10],8:[4],9:[11],10:[5],11:[0],12:[6]} },
  { name: "Lộc khố", kind: "good", key: "lm", val: "chi", all: false, tags: ["giao-dich"], resolves: false, t: {1:[4],2:[5],3:[6],4:[7],5:[8],6:[9],7:[10],8:[11],9:[0],10:[1],11:[2],12:[3]} },
  { name: "Lục hợp", kind: "good", key: "lm", val: "chi", all: true, tags: [], resolves: false, t: {2:[10],3:[9],4:[8],5:[7],6:[6],7:[5],8:[4],9:[3],10:[2],11:[1],12:[0]} },
  { name: "Mãn đức tinh", kind: "good", key: "lm", val: "chi", all: true, tags: [], resolves: false, t: {1:[2],2:[7],3:[4],4:[9],5:[6],6:[11],7:[8],8:[1],9:[10],10:[3],11:[0],12:[5]} },
  { name: "Mẫu thương", kind: "good", key: "lm", val: "chi", all: false, tags: ["giao-dich"], resolves: false, t: {1:[0,11],2:[0,11],3:[0,11],4:[2,3],5:[2,3],6:[3],7:[1,4],8:[1,4],9:[1,4],10:[8,9],11:[8,9],12:[8,9]} },
  { name: "Minh tinh", kind: "good", key: "lm", val: "chi", all: true, tags: [], resolves: false, t: {1:[8],2:[10],3:[0],4:[2],5:[4],6:[6],7:[8],8:[10],9:[0],10:[2],11:[4],12:[6]} },
  { name: "Ngũ hợp", kind: "good", key: "none", val: "c60", all: true, tags: [], resolves: false, t: {0:[54,55,57,59]} },
  { name: "Ngũ phú", kind: "good", key: "lm", val: "chi", all: true, tags: [], resolves: false, t: {1:[11],2:[2],3:[5],4:[8],5:[11],6:[2],7:[5],8:[8],9:[11],10:[2],11:[5],12:[8]} },
  { name: "Nguyệt ân", kind: "good", key: "lm", val: "can", all: true, tags: [], resolves: false, t: {1:[2],2:[3],3:[6],4:[5],5:[4],6:[7],7:[8],8:[8,9],10:[1],11:[0],12:[7]} },
  { name: "Nguyệt đức", kind: "good", key: "lm", val: "can", all: true, tags: [], resolves: false, t: {1:[2],2:[0],3:[8],4:[6],6:[0],7:[8],8:[6,8],9:[2],10:[0],11:[8],12:[6]} },
  { name: "Nguyệt đức hợp", kind: "good", key: "lm", val: "can", all: true, tags: [], resolves: false, other: "kiện tụng", t: {1:[7],2:[5],3:[3],4:[1],5:[7],6:[5],7:[3],8:[1],9:[7],10:[5],11:[3],12:[1]} },
  { name: "Nguyệt giải", kind: "good", key: "lm", val: "chi", all: true, tags: [], resolves: false, t: {1:[8],2:[8],3:[9],4:[9],5:[10],6:[10],7:[11],8:[11],9:[6],10:[6],11:[7],12:[7]} },
  { name: "Nguyệt không", kind: "good", key: "lm", val: "can", all: false, tags: ["xay"], resolves: false, t: {2:[6],3:[2],4:[0],5:[8],6:[6],7:[2],8:[0],9:[8],10:[6],11:[2],12:[0]} },
  { name: "Nguyệt tài", kind: "good", key: "lm", val: "chi", all: false, tags: ["xuat-hanh","giao-dich"], resolves: false, t: {1:[6],2:[5],3:[5],4:[7],5:[9],6:[11],7:[6],8:[5],9:[5],10:[7],11:[9],12:[11]} },
  { name: "Phổ hô", kind: "good", key: "lm", val: "chi", all: false, tags: ["cuoi","xuat-hanh"], resolves: false, t: {1:[8],2:[2],3:[9],4:[3],5:[10],6:[4],7:[11],8:[5],9:[0],10:[6],11:[1],12:[7]} },
  { name: "Phúc hậu", kind: "good", key: "season", val: "chi", all: false, tags: ["giao-dich"], resolves: false, t: {0:[2],1:[5],2:[8],3:[11]} },
  { name: "Phúc sinh", kind: "good", key: "lm", val: "chi", all: true, tags: [], resolves: false, t: {1:[9],2:[3],4:[4],5:[11],6:[5],7:[0],8:[6],9:[1],10:[7],11:[2],12:[8]} },
  { name: "Quan nhật", kind: "good", key: "lm", val: "chi", all: true, tags: [], resolves: false, t: {2:[3],5:[6],8:[9],11:[0]} },
  { name: "Sát cống", kind: "good", key: "lm", val: "m9", all: true, tags: [], resolves: true, t: {1:[3],2:[2],3:[1],4:[3],5:[2],6:[1],7:[3],8:[2],9:[1],10:[3],11:[2],12:[1]} },
  { name: "Sinh khí", kind: "good", key: "lm", val: "chi", all: true, tags: ["xay"], resolves: false, t: {1:[0],2:[1],3:[2],4:[3],5:[4],6:[5],7:[6],8:[7],9:[8],10:[9],11:[10],12:[11]} },
  { name: "Tam hợp", kind: "good", key: "lm", val: "chi", all: true, tags: [], resolves: false, t: {1:[6],2:[7,11],3:[0,8],4:[1,9],5:[2,10],6:[3,11],7:[0,4],8:[1,5],9:[2,6],10:[3,7],11:[4,8],12:[5,9]} },
  { name: "Thành tâm", kind: "good", key: "lm", val: "chi", all: true, tags: [], resolves: false, other: "lễ bái, cúng tế", t: {1:[11],2:[5],3:[0],4:[6],5:[1],6:[7],7:[2],8:[8],9:[3],10:[9],11:[4],12:[10]} },
  { name: "Thiên ân", kind: "good", key: "none", val: "c60", all: true, tags: [], resolves: false, t: {0:[1,2,3,4,8,16,18,19,46,47,49]} },
  { name: "Thiên đức", kind: "good", key: "lm", val: "token", all: true, tags: [], resolves: false, t: {1:['c3'],2:['z8'],3:['c8'],4:['c7'],5:['z11'],6:['c0'],7:['c9'],8:['z2'],9:['c2'],10:['c1'],11:['z5'],12:['c6']} },
  { name: "Thiên đức hợp", kind: "good", key: "lm", val: "token", all: true, tags: [], resolves: false, t: {1:['c8'],2:['z5'],3:['c3'],4:['c2'],5:['c2','z2'],6:['c5'],7:['c4'],8:['z11'],9:['c7'],10:['c6'],11:['z8'],12:['c1']} },
  { name: "Thiên hỷ", kind: "good", key: "lm", val: "chi", all: true, tags: ["cuoi"], resolves: false, t: {1:[10],2:[11],3:[0],4:[1],5:[2],6:[3],7:[4],8:[5],9:[6],10:[7],11:[8],12:[9]} },
  { name: "Thiên mã", kind: "good", key: "lm", val: "chi", all: false, tags: ["xuat-hanh","giao-dich"], resolves: false, t: {1:[6],2:[8],3:[10],4:[0],5:[2],6:[4],7:[6],8:[8],9:[10],10:[0],11:[2],12:[4]} },
  { name: "Thiên phú", kind: "good", key: "lm", val: "chi", all: true, tags: ["xay","an-tang","giao-dich"], resolves: false, t: {1:[4],2:[5],3:[6],4:[7],5:[8],6:[9],8:[11],9:[0],10:[1],11:[2],12:[3]} },
  { name: "Thiên phúc", kind: "good", key: "lm", val: "can", all: true, tags: [], resolves: false, t: {2:[4],4:[9],5:[6,8],7:[1],8:[0],10:[3],11:[2]} },
  { name: "Thiên quan", kind: "good", key: "lm", val: "token", all: true, tags: [], resolves: false, t: {1:['z10'],2:['z0'],3:['z2'],4:['z4'],5:['z6'],6:['z8'],7:['z10'],8:['z0'],9:['c6','z2'],10:[],11:['z6'],12:['z8']} },
  { name: "Thiên quý", kind: "good", key: "season", val: "can", all: true, tags: [], resolves: false, t: {0:[0,1],1:[2,3],2:[6,7],3:[8,9]} },
  { name: "Thiên tài", kind: "good", key: "lm", val: "chi", all: false, tags: ["giao-dich"], resolves: false, t: {1:[4],2:[6],3:[8],4:[10],5:[0],6:[2],7:[4],8:[6],9:[8],10:[10],11:[0],12:[2]} },
  { name: "Thiên thành", kind: "good", key: "lm", val: "chi", all: true, tags: [], resolves: false, t: {1:[7],2:[9],3:[11],4:[1],5:[3],6:[5],7:[7],8:[9],9:[11],10:[1],11:[3],12:[5]} },
  { name: "Thiên thụy", kind: "good", key: "none", val: "c60", all: true, tags: [], resolves: false, t: {0:[14,15,26,48]} },
  { name: "Thiên xá", kind: "good", key: "lm", val: "token", all: false, tags: [], resolves: true, other: "lễ bái, cúng tế", t: {1:['c4','z2'],2:['c4','z2'],3:['c4','z2'],4:['c0','z6'],5:[],6:['c0','z6'],7:['c4','z8'],8:['c4','z8'],9:['c4','z8'],10:['c0','z0'],11:[],12:['c0','z0']} },
  { name: "Tục thế", kind: "good", key: "lm", val: "chi", all: true, tags: ["cuoi"], resolves: false, t: {1:[1],2:[7],3:[2],4:[8],5:[3],6:[9],8:[10],9:[5],10:[11],11:[6],12:[0]} },
  { name: "Tuế hợp", kind: "good", key: "lm", val: "chi", all: true, tags: [], resolves: false, t: {1:[1],2:[0],3:[11],4:[10],5:[9],6:[8],7:[7],8:[6],9:[5],10:[4],11:[3],12:[2]} },
  { name: "U vi tinh", kind: "good", key: "lm", val: "chi", all: true, tags: [], resolves: false, t: {1:[11],2:[4],3:[1],4:[6],5:[3],6:[8],7:[5],8:[10],9:[7],10:[0],11:[9],12:[2]} },
  { name: "Yếu yên (Thiên quý)", kind: "good", key: "lm", val: "chi", all: true, tags: ["cuoi"], resolves: false, t: {1:[2],2:[8],3:[3],4:[9],6:[10],7:[5],8:[11],9:[6],10:[0],11:[7],12:[1]} },
  { name: "Âm thác", kind: "bad", key: "lm", val: "token", all: false, tags: ["cuoi","an-tang","xuat-hanh"], resolves: false, t: {1:[],2:['z8','z9'],3:['c6','z8'],4:['c3','z7'],5:['c2','z6'],6:['c3'],7:['c0','z4'],8:['c1','z3'],9:['c0','z2'],10:['c9'],11:['c8','z0'],12:['c9','z11']} },
  { name: "Băng tiêu ngọa hãm", kind: "bad", key: "lm", val: "chi", all: true, tags: [], resolves: false, t: {2:[0],3:[1],4:[2],5:[3],6:[10],7:[11],8:[6],9:[7],10:[8],11:[9],12:[4]} },
  { name: "Cô thần", kind: "bad", key: "lm", val: "chi", all: false, tags: ["cuoi"], resolves: false, t: {1:[10],2:[11],3:[0],4:[1],5:[2],6:[3],7:[4],8:[5],9:[6],10:[7],11:[8],12:[9]} },
  { name: "Cửu không", kind: "bad", key: "lm", val: "chi", all: false, tags: ["xuat-hanh","giao-dich"], resolves: false, t: {1:[4],3:[1,10],4:[7],5:[3],6:[0,5],7:[9],8:[6],9:[2],10:[11],11:[8],12:[5]} },
  { name: "Cửu thổ quỷ", kind: "bad", key: "none", val: "c60", all: false, tags: ["xay","xuat-hanh","giao-dich"], resolves: false, t: {0:[13,21,29,30,37,38,45,46,54]} },
  { name: "Dương thác", kind: "bad", key: "lm", val: "token", all: false, tags: ["cuoi","an-tang","xuat-hanh"], resolves: false, t: {1:['c0','z2'],2:['c1','z3'],3:['c0','z4'],4:['c3','z5'],5:['c2','z6'],6:['c3','z7'],7:['c6','z8'],8:['c7','z9'],9:['c6','z10'],10:['c9','z11'],11:['c8','z0'],12:['c9','z1']} },
  { name: "Đại hao", kind: "bad", key: "lm", val: "chi", all: true, tags: [], resolves: false, t: {1:[6],2:[7],3:[8],4:[9],5:[10],6:[11],7:[0],8:[1],9:[2],10:[3],11:[4],12:[5]} },
  { name: "Địa phá", kind: "bad", key: "lm", val: "chi", all: false, tags: ["xay"], resolves: false, t: {1:[11],2:[0],3:[1],4:[2],5:[3],6:[4],7:[5],8:[6],9:[7],10:[8],11:[9],12:[10]} },
  { name: "Địa tặc", kind: "bad", key: "lm", val: "chi", all: false, tags: ["xay","an-tang","xuat-hanh"], resolves: false, t: {1:[1],2:[0,1],3:[11],4:[10],5:[9],6:[8],7:[7],8:[6],9:[5],10:[4],11:[3],12:[2]} },
  { name: "Hà khôi", kind: "bad", key: "lm", val: "chi", all: false, tags: ["xay"], resolves: false, t: {1:[11],2:[6],3:[1],4:[8],5:[3],6:[10],7:[5],8:[0],9:[7],10:[2],11:[9],12:[4]} },
  { name: "Hỏa tai", kind: "bad", key: "lm", val: "chi", all: false, tags: ["xay"], resolves: false, t: {1:[1],2:[1,7],3:[2],4:[8],5:[3],6:[9],7:[4],8:[10],9:[5],10:[11],11:[6],12:[0]} },
  { name: "Hoàng sa", kind: "bad", key: "lm", val: "chi", all: false, tags: ["xuat-hanh"], resolves: false, t: {1:[6],2:[2],3:[0],4:[6],5:[2],6:[0],7:[6],8:[2],9:[0],10:[6],11:[2],12:[0]} },
  { name: "Hoang vu", kind: "bad", key: "lm", val: "chi", all: true, tags: [], resolves: false, t: {1:[1,9],2:[1,5,9],3:[1,5,9],4:[0,4,8],5:[0,4,8],6:[0,4,8],7:[3,7,11],8:[3,7,11],9:[3,7,11],10:[2,6,10],11:[2,6,10],12:[2,6,10]} },
  { name: "Kiếp sát", kind: "bad", key: "lm", val: "chi", all: false, tags: ["cuoi","xay","an-tang","xuat-hanh"], resolves: false, t: {1:[11],2:[8],3:[5],4:[2],5:[11],6:[8],7:[5],8:[2],9:[11],10:[8],11:[5],12:[2]} },
  { name: "Lỗ ban sát", kind: "bad", key: "season", val: "chi", all: false, tags: ["xay"], resolves: false, t: {0:[0],1:[3],2:[6],3:[9]} },
  { name: "Lôi công", kind: "bad", key: "lm", val: "chi", all: false, tags: ["xay"], resolves: false, t: {1:[2],2:[11],3:[5],4:[8],5:[2],6:[11],7:[5],8:[8],9:[2],10:[11],11:[5],12:[8]} },
  { name: "Lục bất hành", kind: "bad", key: "lm", val: "chi", all: false, tags: ["xay"], resolves: false, t: {1:[2],2:[6],4:[5],5:[9],6:[1],7:[8],8:[0],9:[4],10:[11],11:[3],12:[7]} },
  { name: "Ly sang", kind: "bad", key: "lm", val: "chi", all: false, tags: ["cuoi"], resolves: false, t: {1:[9],4:[2,6],7:[10],10:[5]} },
  { name: "Lỵ sào", kind: "bad", key: "none", val: "c60", all: false, tags: ["cuoi","nhap-trach","xuat-hanh"], resolves: false, t: {0:[4,14,24,25,27,34,44,58]} },
  { name: "Ngũ hư", kind: "bad", key: "lm", val: "chi", all: false, tags: ["cuoi","xay","an-tang"], resolves: false, t: {2:[9],3:[1],5:[0],6:[4],7:[11],8:[3],9:[7],10:[2],11:[6],12:[10]} },
  { name: "Ngũ quỷ", kind: "bad", key: "lm", val: "chi", all: false, tags: ["xuat-hanh"], resolves: false, t: {1:[6],2:[2],3:[4],4:[9],5:[3],6:[8],7:[1],8:[5],9:[0],10:[11],11:[7],12:[10]} },
  { name: "Nguyệt hình", kind: "bad", key: "lm", val: "chi", all: true, tags: [], resolves: false, t: {2:[0],3:[4],4:[8],5:[6],6:[1],7:[2],8:[9],9:[7],10:[11],11:[2,3],12:[10]} },
  { name: "Nguyệt hỏa, Độc hỏa", kind: "bad", key: "lm", val: "chi", all: false, tags: ["xay"], resolves: false, t: {2:[4],3:[3],4:[2],5:[1],6:[0],7:[11],8:[10],9:[9],10:[8],11:[7],12:[6]} },
  { name: "Nguyệt kiếm chuyển sát", kind: "bad", key: "lm", val: "chi", all: false, tags: ["xay"], resolves: false, t: {2:[3],3:[3],4:[6],5:[6],6:[6],7:[9],8:[9],9:[9],10:[0],11:[0],12:[0]} },
  { name: "Nguyệt phá", kind: "bad", key: "lm", val: "chi", all: false, tags: ["xay"], resolves: false, t: {1:[8],2:[9,10],3:[10],4:[11],5:[0,1],6:[1],7:[2],8:[3,4],9:[4],10:[5],11:[6,7],12:[7]} },
  { name: "Nguyệt sát", kind: "bad", key: "lm", val: "chi", all: false, tags: ["cuoi","giao-dich"], resolves: false, t: {1:[1],2:[1,10],3:[7],4:[4],5:[1],6:[10],7:[7],8:[4],9:[1],10:[10],11:[7],12:[4]} },
  { name: "Nguyệt yếm", kind: "bad", key: "lm", val: "chi", all: false, tags: ["cuoi","xuat-hanh"], resolves: false, t: {1:[10],2:[9],3:[8],4:[7],5:[6],6:[5],7:[4],8:[3],9:[2],10:[1],11:[0],12:[11]} },
  { name: "Nhân cách", kind: "bad", key: "lm", val: "chi", all: false, tags: ["cuoi","xay"], resolves: false, t: {1:[9],2:[7],3:[5],4:[3],5:[1],6:[11],7:[9],8:[7],9:[5],10:[3],11:[1],12:[11]} },
  { name: "Phi ma sát", kind: "bad", key: "lm", val: "chi", all: false, tags: ["cuoi","nhap-trach"], resolves: false, t: {1:[0],2:[9],3:[6],4:[3],5:[0],6:[9],7:[6],8:[3],9:[0],10:[9],11:[6],12:[3]} },
  { name: "Phủ đầu sát", kind: "bad", key: "lm", val: "chi", all: false, tags: ["xay"], resolves: false, t: {1:[4],2:[4],3:[4],4:[7],5:[7],6:[7],7:[9],9:[9],10:[0],11:[0],12:[0]} },
  { name: "Quả tú", kind: "bad", key: "lm", val: "chi", all: false, tags: ["cuoi"], resolves: false, t: {1:[4],2:[5],3:[6],4:[7],5:[8],6:[9],7:[10],8:[11],9:[0],11:[2],12:[3]} },
  { name: "Quỷ khốc", kind: "bad", key: "lm", val: "chi", all: false, tags: ["an-tang"], resolves: false, other: "lễ bái, cúng tế", t: {2:[10],3:[10],4:[10],5:[10],6:[10],7:[10],8:[10],9:[10],10:[10],11:[10],12:[10]} },
  { name: "Sát chủ", kind: "bad", key: "lm", val: "chi", all: true, tags: [], resolves: false, t: {2:[0],3:[7],4:[3],5:[8],6:[10],7:[1],8:[11],9:[6],10:[9],12:[4]} },
  { name: "Tam tang", kind: "bad", key: "lm", val: "chi", all: false, tags: ["cuoi","xay","an-tang"], resolves: false, t: {2:[4],3:[4],4:[7],5:[7],6:[7],7:[10],8:[9,10],9:[10],10:[1],11:[1],12:[1]} },
  { name: "Thần cách", kind: "bad", key: "lm", val: "chi", all: false, tags: [], resolves: false, other: "lễ bái, cúng tế", t: {2:[3],4:[11],5:[9],6:[7],7:[5],8:[3],9:[1],10:[1,11],11:[9],12:[7]} },
  { name: "Thiên cương", kind: "bad", key: "lm", val: "chi", all: true, tags: [], resolves: false, t: {2:[0],3:[7],4:[2],5:[9],6:[4],7:[11],8:[6],9:[1],10:[8],11:[3],12:[10]} },
  { name: "Thiên địa chính chuyên", kind: "bad", key: "lm", val: "token", all: false, tags: ["xay"], resolves: false, t: {1:['c9'],2:['c9','z3'],3:['c9','z3'],4:['c2','z6'],5:['c2','z6'],6:['c2','z6'],7:['c3','z9'],8:['c3','z9'],9:['c3','z9'],10:['c6','z0'],11:['c6','z0'],12:['c6','z0']} },
  { name: "Thiên địa chuyển sát", kind: "bad", key: "lm", val: "token", all: false, tags: ["xay"], resolves: false, t: {1:['c1'],2:['c1','c7','z3'],3:['c1','c7','z3'],4:['c2','c4','z6'],5:['c2','c4','z6'],6:['c2','c4','z6'],7:['c7','c9','z9'],8:['c7','c9','z9'],9:['c7','c9','z9'],10:['c2','c8','z0'],11:['c2','c8','z0'],12:['c2','c8','z0']} },
  { name: "Thiên ngục, Thiên hỏa", kind: "bad", key: "lm", val: "chi", all: true, tags: ["xay"], resolves: false, t: {1:[0],3:[6],4:[9],5:[0],6:[3],7:[6],8:[9],9:[0],10:[3],11:[6],12:[9]} },
  { name: "Thiên ôn", kind: "bad", key: "lm", val: "chi", all: false, tags: ["xay"], resolves: false, t: {1:[7],2:[10],3:[4],4:[2],5:[6],6:[0],7:[9],8:[8],9:[5],10:[11],11:[1],12:[3]} },
  { name: "Thiên tai", kind: "bad", key: "lm", val: "chi", all: true, tags: [], resolves: false, t: {1:[9],2:[6],3:[3],4:[0],5:[9],6:[6],7:[3],8:[0],9:[9],10:[6],11:[3],12:[0]} },
  { name: "Thiên tặc", kind: "bad", key: "lm", val: "chi", all: false, tags: ["xay","nhap-trach","giao-dich"], resolves: false, t: {1:[4],2:[9],3:[2],4:[7],5:[0],6:[5],8:[3],9:[8],10:[1],11:[6],12:[11]} },
  { name: "Thổ cẩm", kind: "bad", key: "season", val: "chi", all: false, tags: ["xay","an-tang"], resolves: false, t: {0:[11],1:[2],2:[5],3:[8]} },
  { name: "Thổ ôn", kind: "bad", key: "lm", val: "chi", all: false, tags: ["xay"], resolves: false, other: "lễ bái, cúng tế", t: {1:[4],2:[5],3:[6],4:[7],5:[8],6:[9],7:[10],8:[11],9:[0],10:[1],11:[2],12:[3]} },
  { name: "Thổ phù", kind: "bad", key: "lm", val: "chi", all: false, tags: ["xay"], resolves: false, t: {1:[2],2:[3],3:[4],4:[5],5:[6],6:[7],7:[8],8:[9],9:[10],10:[11],11:[0],12:[1]} },
  { name: "Thụ tử", kind: "bad", key: "lm", val: "chi", all: true, tags: [], resolves: false, t: {1:[10],2:[4],3:[11],4:[5],5:[0],6:[6],7:[1],8:[7],9:[2],10:[8],11:[3],12:[9]} },
  { name: "Tiểu hao", kind: "bad", key: "lm", val: "chi", all: false, tags: ["giao-dich"], resolves: false, t: {2:[6],3:[7],4:[8],5:[9],6:[10],7:[11],8:[0],9:[1],10:[2],11:[3],12:[4]} },
  { name: "Tiểu hồng sa", kind: "bad", key: "lm", val: "chi", all: true, tags: [], resolves: false, t: {2:[9],3:[1],4:[5],5:[9],6:[1],7:[5],8:[9],9:[1],10:[5],11:[9],12:[1]} },
  { name: "Tội chỉ", kind: "bad", key: "lm", val: "chi", all: true, tags: [], resolves: false, t: {1:[6],2:[0],3:[7],4:[1],5:[8],6:[2],7:[9],8:[3],9:[10],10:[4],11:[11],12:[5]} },
  { name: "Trùng phục", kind: "bad", key: "lm", val: "can", all: false, tags: ["cuoi","an-tang"], resolves: false, t: {2:[7],3:[5],6:[4],7:[0],8:[1],9:[5],10:[8],11:[9],12:[4]} },
  { name: "Trùng tang", kind: "bad", key: "lm", val: "can", all: false, tags: ["cuoi","xay","an-tang"], resolves: false, t: {1:[0],2:[1],3:[5],4:[2],5:[3],7:[6],8:[7],9:[5],10:[8],11:[9],12:[5]} },
  { name: "Tứ thời cô quả", kind: "bad", key: "lm", val: "chi", all: false, tags: ["cuoi"], resolves: false, t: {1:[1],2:[1],4:[4],7:[7],10:[10]} },
  { name: "Tứ thời đại mộ", kind: "bad", key: "lm", val: "token", all: false, tags: ["an-tang"], resolves: false, t: {1:['c1'],2:[],3:[],4:['c2','z10'],5:[],6:[],7:['c7','z1'],8:[],9:[],10:['c8','z4'],11:[],12:[]} },
  { name: "Vãng vong", kind: "bad", key: "lm", val: "chi", all: false, tags: ["cuoi","xay","xuat-hanh","giao-dich"], resolves: false, t: {1:[2],2:[5],3:[8],4:[11],5:[3],6:[6],7:[9],8:[0],9:[4],10:[7],11:[10],12:[1]} },
];

/** Các tuổi xung khắc, theo vị trí can chi của ngày (0 = Giáp Tý). */
export const CLASH_AGES: string[][] = [["Mậu Ngọ","Nhâm Ngọ","Canh Dần","Canh Thân"],["Kỷ Mùi","Quý Mùi","Tân Mão","Tân Dậu"],["Giáp Thân","Nhâm Thân","Nhâm Tuất","Nhâm Thìn"],[],["Canh Tuất","Bính Tuất"],["Tân Hợi","Đinh Hợi"],["Nhâm Tý","Bính Tý","Giáp Thân","Giáp Dần"],["Quý sửu","Đinh Sửu","Ất Dậu","Ất Mão"],["Bính Dần","Canh Dần","Bính Thân"],["Đinh Mão","Tân Mão","Đinh Dậu"],["Nhâm Thìn","Canh Thìn","Canh Tuất"],["Quý Tỵ","Tân Tỵ","Tân Hợi"],["Canh Ngọ","Mậu Ngọ"],["Tân Mùi","Kỷ Mùi"],["Canh Thân","Giáp Thân"],["Tân Dậu","Ất Dậu"],["Giáp Tuất","Mậu Tuất","Giáp Thìn"],["Ất Hợi","Kỷ Hợi","Ất Tỵ"],["Giáp Tý","Canh Tý","Bính Tuất","Bính Thìn"],["Ất Sửu","Tân Sửu","Đinh Hợi","Đinh Tỵ"],["Mậu Dần","Bính Dần","Canh Ngọ","Canh Tý"],["Kỷ Mão","Đinh Mão","Tân Mùi","Tân Sửu"],["Mậu Thìn","Nhâm Thìn","Nhâm Ngọ","Nhâm Tý"],["Kỷ Tỵ","Quý Tỵ","Quý Mùi","Quý Sửu"],["Bính Ngọ","Giáp Ngọ"],["Đinh Mùi","Ất Mùi"],["Nhâm Thân","Mậu Thân","Giáp Tý","Giáp Ngọ"],["Quý Dậu","Kỷ Dậu","Ất Sửu","Ất Mùi"],["Bính Tuất","Giáp Tuất","Bính Dần"],["Đinh Hợi","Ất Hợi","Đinh Mão"],["Mậu Tý","Nhâm Tý","Canh Dần","Nhâm Dần"],["Kỷ Sửu","Quý Sửu","Tân Mão","Tân Dậu"],["Giáp Dần","Nhâm Thân","Nhâm Tuất","Nhâm Thìn"],["Ất Mão","Quý Mão","Quý Tỵ","Quý Hợi"],["Canh Thìn","Bính Thìn"],["Tân Tỵ","Đinh Tỵ."],["Nhâm Ngọ","Bính Ngọ","Giáp Thân","Giáp Dần"],["Quý Mùi","Đinh Mùi","Ất Dậu","Ất Mão"],["Canh Thân","Bính Thân","Bính Dần"],["Tân Dậu","Đinh Dậu","Đinh Mão"],["Nhâm Tuất","Canh Tuất","Canh Thìn"],["Quý Hợi","Tân Hợi","Tân Tỵ"],["Mậu Tý","Canh Tý"],["Kỷ Sửu","Tân Sửu"],["Canh Dần","Giáp Dần"],["Tân Mão","Ất Mão"],["Giáp Thìn","Mậu Thìn","Giáp Tuất"],["Ất Tỵ","Kỷ Tỵ","Ất Hợi"],["Giáp Ngọ","Canh Ngọ","Bính Tuất","Bính Thìn"],["Ất Mùi","Tân Mùi","Đinh Hợi","Đinh Tỵ"],["Mậu Thân","Bính Thân","Canh Ngọ","Canh Tý"],["Kỷ Dậu","Đinh Dậu","Tân Mùi","Tân Sửu"],["Mậu Tuất","Nhâm Tuất","Nhâm Ngọ","Nhâm Tý"],["Kỷ Hợi","Quý Hợi","Quý Sửu","Quý Mùi"],["Bính Tý","Giáp Tý"],["Đinh Sửu","Ất Sửu"],["Nhâm Dần","Mậu Dần","Giáp Tý","Giáp Ngọ"],["Quý Mão","Kỷ Mão","Ất Sửu","Ất Mùi"],["Bính Thìn","Giáp Thìn","Bính Thân","Bính Dần"],["Đinh Tỵ","Ất Tỵ","Đinh Mão","Đinh Dậu"]];
