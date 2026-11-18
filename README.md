# Huyền Tâm

Nền tảng phong thủy, tử vi, lịch âm dương, Kinh Dịch và bói toán dân gian Việt Nam.

## Công nghệ

- Next.js App Router (TypeScript)
- Tailwind CSS + Framer Motion + Lucide
- Prisma + PostgreSQL (tùy chọn)
- Auth.js (Credentials, chế độ demo khi chưa có DB)
- React Hook Form + Zod (sẵn sàng mở rộng form)

## Chạy local

```bash
npm install
cp .env.example .env
npm run dev
```

Mở [http://localhost:3000](http://localhost:3000).

### Database (tùy chọn)

Khi có PostgreSQL:

```bash
# trong .env
DATABASE_URL="postgresql://..."
npx prisma db push
```

Không có `DATABASE_URL` thì site vẫn chạy: thuật toán/dữ liệu JSON hoạt động bình thường; hồ sơ lưu localStorage. Site không có đăng nhập.

## Kiến trúc chính

```
src/
  app/                 # routes website, auth, admin, api
  components/          # ui, layout, calendar, divination, admin
  data/                # 64 quẻ, con giáp, blog, xin xăm, tools
  lib/algorithms/      # lịch âm, can chi, ngày tốt, tử vi, Kinh Dịch, ngũ hành, thần số
  lib/seo/             # metadata helpers
```

## Nguyên tắc dữ liệu

- Lịch âm/dương, can chi, nạp âm: **thuật toán** xác định.
- Hoàng đạo, trực, tam nương, xin xăm, bói dân gian: ghi rõ **quan niệm dân gian**.
- Gieo quẻ ngẫu nhiên dùng **RNG có seed** (kiểm thử / tái hiện được).
- Không trình bày dữ liệu giả như đã hoàn thiện tuyệt đối; phần thiếu được đánh dấu cần bổ sung.

## Scripts

| Lệnh | Mục đích |
|------|----------|
| `npm run dev` | Dev server |
| `npm run build` | Production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript |
| `npm run db:push` | Prisma db push |

## Admin

Truy cập `/admin` để xem CMS (bài viết, 64 quẻ, xin xăm, SEO, cấu hình). Hiện chưa khóa role — nên bảo vệ bằng auth/role trước khi production.

## Deploy GitHub Pages (bản tĩnh)

`npm run build:static` xuất site tĩnh ra `./out`. Script ([scripts/build-static.mjs](scripts/build-static.mjs)) copy dự án sang `.static-build/`, bỏ các route cần server (`/api`, `/admin`) rồi chạy `next build` với `output: "export"`. Thư mục `src/` không bị sửa, nên chạy được cả khi `next dev` đang mở.

- Bản tĩnh không có admin, database.
- Ngày hôm nay và các trang đọc query (`/ket-qua/*`, `/tim-kiem`, `/xem-ngay-tot`…) được tính trên trình duyệt.
- `/lich-am-duong/[ngay]` được sinh sẵn từ 2 năm trước tới 3 năm sau (khoảng 450 MB). Đổi bằng `STATIC_CALENDAR_YEARS_BEFORE` / `STATIC_CALENDAR_YEARS_AFTER`.

```bash
NEXT_PUBLIC_BASE_PATH=/huyentam NEXT_PUBLIC_SITE_URL=https://<user>.github.io/huyentam npm run build:static
NEXT_PUBLIC_BASE_PATH=/huyentam npm run preview:static   # xem thử ở http://localhost:4173/huyentam/
```

Trong Git Bash trên Windows, thêm `MSYS_NO_PATHCONV=1` trước lệnh để `/huyentam` không bị đổi thành đường dẫn Windows.

Tự deploy: workflow [.github/workflows/deploy-pages.yml](.github/workflows/deploy-pages.yml) chạy khi push lên `master`. Cần bật một lần: **Settings → Pages → Source: GitHub Actions**. Base path và URL lấy tự động từ cấu hình Pages.
