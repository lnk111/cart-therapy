// Mock catalog for Cart Therapy — 30 products per category (150 total).
// Each product gets a Lorem Picsum image (?random=1..150). If an image fails to
// load, ProductCard falls back to the gradient + brand-name tile.

export const categories = [
  { id: 'luxury', name: '명품', emoji: '👜', total: 1204 },
  { id: 'appliance', name: '가전', emoji: '📺', total: 3128 },
  { id: 'furniture', name: '가구', emoji: '🛋️', total: 1875 },
  { id: 'clothing', name: '의류', emoji: '👕', total: 5421 },
  { id: 'food', name: '식품', emoji: '🍱', total: 2096 },
]

// Lorem Picsum direct URL, sequential 1..150 across all categories.
const img = (n) => `https://picsum.photos/400/400?random=${n}`

const CAT_SIZE = 30
const CAT_INDEX = { luxury: 0, appliance: 1, furniture: 2, clothing: 3, food: 4 }

// Compact rows: [brand, brandUpper, name, price, original(0=none), keywords]
const RAW = {
  luxury: [
    ['루이비통', 'LOUIS VUITTON', '네버풀 MM', 2950000, 0, 'louisvuitton,bag'],
    ['루이비통', 'LOUIS VUITTON', '스피디 반둘리에 25', 2400000, 0, 'louisvuitton,handbag'],
    ['루이비통', 'LOUIS VUITTON', '키폴 50 더플백', 3600000, 0, 'louisvuitton,luggage'],
    ['샤넬', 'CHANEL', '클래식 플랩백 미디움', 12400000, 15100000, 'chanel,bag'],
    ['샤넬', 'CHANEL', '보이백 스몰', 8900000, 0, 'chanel,handbag'],
    ['샤넬', 'CHANEL', '11.12 라지 플랩백', 13200000, 0, 'chanel,purse'],
    ['구찌', 'GUCCI', 'GG 마몽 숄더백', 3100000, 0, 'gucci,bag'],
    ['구찌', 'GUCCI', '디오니서스 미니', 2750000, 0, 'gucci,handbag'],
    ['구찌', 'GUCCI', '호스빗 1955 지갑', 1100000, 0, 'gucci,wallet'],
    ['에르메스', 'HERMÈS', '가든파티 36', 4200000, 0, 'hermes,bag'],
    ['에르메스', 'HERMÈS', '픽오탱 22', 9500000, 0, 'hermes,handbag'],
    ['에르메스', 'HERMÈS', '에블린 PM', 5400000, 0, 'hermes,leather'],
    ['롤렉스', 'ROLEX', '서브마리너 데이트', 14900000, 0, 'rolex,watch'],
    ['롤렉스', 'ROLEX', '데이트저스트 36', 11300000, 0, 'rolex,luxurywatch'],
    ['롤렉스', 'ROLEX', 'GMT-마스터 II', 19800000, 0, 'rolex,wristwatch'],
    ['까르띠에', 'CARTIER', '탱크 머스트', 5200000, 0, 'cartier,watch'],
    ['까르띠에', 'CARTIER', '러브 브레이슬릿', 9800000, 0, 'cartier,bracelet'],
    ['까르띠에', 'CARTIER', '산토스 드 까르띠에', 8600000, 0, 'cartier,jewelry'],
    ['프라다', 'PRADA', '사피아노 토트백', 3200000, 0, 'prada,bag'],
    ['프라다', 'PRADA', '리나일론 백팩', 1850000, 0, 'prada,backpack'],
    ['프라다', 'PRADA', '클레오 숄더백', 2900000, 0, 'prada,handbag'],
    ['버버리', 'BURBERRY', '켄싱턴 트렌치 코트', 3100000, 0, 'burberry,coat'],
    ['버버리', 'BURBERRY', '체크 캐시미어 머플러', 690000, 0, 'burberry,scarf'],
    ['버버리', 'BURBERRY', 'TB 백 미디움', 2450000, 0, 'burberry,bag'],
    ['디올', 'DIOR', '레이디 디올 미디움', 7800000, 8900000, 'dior,bag'],
    ['디올', 'DIOR', '새들백', 5600000, 0, 'dior,handbag'],
    ['디올', 'DIOR', '북토트 라지', 4300000, 0, 'dior,tote'],
    ['발렌시아가', 'BALENCIAGA', '시티 백', 2400000, 0, 'balenciaga,bag'],
    ['발렌시아가', 'BALENCIAGA', '트리플 S 스니커즈', 1350000, 0, 'balenciaga,sneakers'],
    ['발렌시아가', 'BALENCIAGA', '아워글래스 스몰', 3200000, 0, 'balenciaga,purse'],
  ],
  appliance: [
    ['삼성', 'SAMSUNG', '비스포크 4도어 냉장고 875L', 3290000, 0, 'samsung,refrigerator'],
    ['삼성', 'SAMSUNG', '네오 QLED 8K 75인치', 6490000, 0, 'samsung,tv'],
    ['삼성', 'SAMSUNG', '비스포크 제트 무선청소기', 990000, 0, 'samsung,vacuum'],
    ['LG', 'LG', '올레드 evo 65인치 TV', 2790000, 3190000, 'lg,tv'],
    ['LG', 'LG', '트롬 오브제컬렉션 세탁기', 1890000, 0, 'lg,washingmachine'],
    ['LG', 'LG', '그램 17 노트북', 2190000, 0, 'lg,laptop'],
    ['애플', 'APPLE', 'MacBook Pro 14 M3 Pro', 2790000, 0, 'apple,macbook'],
    ['애플', 'APPLE', 'iPhone 15 Pro Max', 1900000, 0, 'apple,iphone'],
    ['애플', 'APPLE', 'iPad Pro 13 M4', 1990000, 0, 'apple,ipad'],
    ['다이슨', 'DYSON', 'V15 디텍트 무선청소기', 1090000, 0, 'dyson,vacuum'],
    ['다이슨', 'DYSON', '에어랩 멀티 스타일러', 699000, 0, 'dyson,hairdryer'],
    ['다이슨', 'DYSON', '퓨어쿨 공기청정기', 890000, 0, 'dyson,fan'],
    ['소니', 'SONY', 'WH-1000XM5 헤드폰', 499000, 599000, 'sony,headphones'],
    ['소니', 'SONY', '브라비아 XR 65인치', 3200000, 0, 'sony,tv'],
    ['소니', 'SONY', '알파 A7 IV 카메라', 3100000, 0, 'sony,camera'],
    ['보스', 'BOSE', 'QuietComfort 울트라', 459000, 0, 'bose,headphones'],
    ['보스', 'BOSE', '사운드링크 맥스', 599000, 0, 'bose,speaker'],
    ['보스', 'BOSE', '스마트 사운드바 900', 1290000, 0, 'soundbar,audio'],
    ['뱅앤올룹슨', 'BANG & OLUFSEN', '베오플레이 H95', 1290000, 0, 'premium,headphones'],
    ['뱅앤올룹슨', 'BANG & OLUFSEN', '베오사운드 A5', 1490000, 0, 'premium,speaker'],
    ['뱅앤올룹슨', 'BANG & OLUFSEN', '베오플레이 EX', 690000, 0, 'wireless,earphones'],
    ['네스프레소', 'NESPRESSO', '버츄오 크리에이티스타', 590000, 0, 'nespresso,coffee'],
    ['네스프레소', 'NESPRESSO', '에센자 미니', 159000, 0, 'espresso,machine'],
    ['네스프레소', 'NESPRESSO', '라티시마 원', 329000, 0, 'coffee,machine'],
    ['브레빌', 'BREVILLE', '바리스타 익스프레스', 890000, 0, 'breville,espresso'],
    ['브레빌', 'BREVILLE', '스마트 오븐 에어', 690000, 0, 'oven,kitchen'],
    ['브레빌', 'BREVILLE', '듀얼 보일러', 1690000, 0, 'coffee,espresso'],
    ['밀레', 'MIELE', '컴플리트 C3 청소기', 690000, 0, 'miele,vacuum'],
    ['밀레', 'MIELE', '빌트인 식기세척기 G7000', 2490000, 0, 'dishwasher,kitchen'],
    ['밀레', 'MIELE', '커피머신 CM6', 2190000, 0, 'coffeemachine,premium'],
  ],
  furniture: [
    ['허먼밀러', 'HERMAN MILLER', '에어론 체어 리마스터드', 1890000, 0, 'hermanmiller,chair'],
    ['허먼밀러', 'HERMAN MILLER', '임바디 체어', 2290000, 0, 'office,chair'],
    ['허먼밀러', 'HERMAN MILLER', '코스믹 데스크', 1690000, 0, 'modern,desk'],
    ['허먼밀러', 'HERMAN MILLER', '셀 체어', 990000, 0, 'ergonomic,chair'],
    ['허먼밀러', 'HERMAN MILLER', '사야 체어', 1290000, 0, 'designer,chair'],
    ['카르텔', 'KARTELL', '루이 고스트 체어', 420000, 0, 'kartell,chair'],
    ['카르텔', 'KARTELL', '컴포넌트 책장', 690000, 0, 'modern,bookshelf'],
    ['카르텔', 'KARTELL', '부르지 사이드테이블', 850000, 0, 'design,table'],
    ['카르텔', 'KARTELL', '비비드 플로어램프', 390000, 0, 'designer,lamp'],
    ['카르텔', 'KARTELL', '마드모아젤 체어', 690000, 0, 'accent,chair'],
    ['B&B 이탈리아', 'B&B ITALIA', '업 5_6 라운지체어', 5900000, 0, 'lounge,chair'],
    ['B&B 이탈리아', 'B&B ITALIA', '찰스 소파', 9800000, 0, 'sofa,luxury'],
    ['B&B 이탈리아', 'B&B ITALIA', '카멜레온다 소파', 12400000, 0, 'modern,sofa'],
    ['B&B 이탈리아', 'B&B ITALIA', '마랄룽가 암체어', 6200000, 0, 'leather,armchair'],
    ['한샘', 'HANSSEM', '유로 6800 책상 1500', 279000, 0, 'wood,desk'],
    ['한샘', 'HANSSEM', '바흐 4인 식탁', 590000, 0, 'dining,table'],
    ['한샘', 'HANSSEM', '샘 침대 슈퍼싱글', 390000, 0, 'bed,frame'],
    ['한샘', 'HANSSEM', '키친바흐 아일랜드', 890000, 0, 'kitchen,island'],
    ['이케아', 'IKEA', '포엥 안락의자', 159000, 0, 'armchair,cozy'],
    ['이케아', 'IKEA', '빌리 책장', 89000, 0, 'bookshelf,white'],
    ['이케아', 'IKEA', '말름 침대프레임', 199000, 0, 'bed,minimal'],
    ['이케아', 'IKEA', 'KIVIK 3인 소파', 599000, 0, 'sofa,grey'],
    ['RH', 'RESTORATION HARDWARE', '클리블랜드 모듈 소파', 8900000, 0, 'sectional,sofa'],
    ['RH', 'RESTORATION HARDWARE', '마틴 가죽 체어', 3400000, 0, 'leather,chair'],
    ['RH', 'RESTORATION HARDWARE', '세인트제임스 다이닝테이블', 5600000, 0, 'dining,luxury'],
    ['RH', 'RESTORATION HARDWARE', '몬티첼로 침대', 4900000, 0, 'bed,luxury'],
    ['폴트로나 프라우', 'POLTRONA FRAU', '베르가모 소파', 14900000, 0, 'sofa,leather'],
    ['폴트로나 프라우', 'POLTRONA FRAU', '첸 라운지체어', 7800000, 0, 'lounge,leather'],
    ['폴트로나 프라우', 'POLTRONA FRAU', '키톤 암체어', 6400000, 0, 'armchair,luxury'],
    ['폴트로나 프라우', 'POLTRONA FRAU', '렛잇비 사이드보드', 9200000, 0, 'sideboard,wood'],
  ],
  clothing: [
    ['나이키', 'NIKE', '에어포스 1 07', 139000, 0, 'nike,shoes'],
    ['나이키', 'NIKE', '에어맥스 97', 219000, 0, 'nike,sneakers'],
    ['나이키', 'NIKE', '드라이핏 후디', 99000, 0, 'nike,hoodie'],
    ['나이키', 'NIKE', '테크 플리스 조거', 129000, 0, 'nike,joggers'],
    ['아디다스', 'ADIDAS', '삼바 OG', 129000, 159000, 'adidas,shoes'],
    ['아디다스', 'ADIDAS', '가젤 인도어', 139000, 0, 'adidas,sneakers'],
    ['아디다스', 'ADIDAS', '파이어버드 트랙탑', 119000, 0, 'adidas,jacket'],
    ['아디다스', 'ADIDAS', '울트라부스트 라이트', 229000, 0, 'adidas,running'],
    ['몽클레르', 'MONCLER', '마야 다운 재킷', 2490000, 0, 'moncler,jacket'],
    ['몽클레르', 'MONCLER', '베드포드 파카', 3100000, 0, 'down,parka'],
    ['몽클레르', 'MONCLER', '로고 패딩 베스트', 1290000, 0, 'puffer,vest'],
    ['스톤아일랜드', 'STONE ISLAND', '가먼트 다이드 후디', 590000, 0, 'hoodie,grey'],
    ['스톤아일랜드', 'STONE ISLAND', '쉐도우 프로젝트 자켓', 890000, 0, 'technical,jacket'],
    ['스톤아일랜드', 'STONE ISLAND', '카고 팬츠', 420000, 0, 'cargo,pants'],
    ['스톤아일랜드', 'STONE ISLAND', '컴파스 로고 맨투맨', 490000, 0, 'sweatshirt,men'],
    ['아크네 스튜디오', 'ACNE STUDIOS', '페이스 울 스카프', 390000, 0, 'wool,scarf'],
    ['아크네 스튜디오', 'ACNE STUDIOS', '오버사이즈 데님 자켓', 590000, 0, 'denim,jacket'],
    ['아크네 스튜디오', 'ACNE STUDIOS', '머슬린 니트', 490000, 0, 'minimal,knit'],
    ['메종 마르지엘라', 'MAISON MARGIELA', '타비 첼시 부츠', 1690000, 0, 'leather,boots'],
    ['메종 마르지엘라', 'MAISON MARGIELA', '5AC 미니백', 1890000, 0, 'designer,bag'],
    ['메종 마르지엘라', 'MAISON MARGIELA', '글램 슬램 스니커즈', 1290000, 0, 'luxury,sneakers'],
    ['오프화이트', 'OFF-WHITE', '애로우 후디', 690000, 0, 'streetwear,hoodie'],
    ['오프화이트', 'OFF-WHITE', '다이애그 티셔츠', 390000, 0, 'graphic,tshirt'],
    ['오프화이트', 'OFF-WHITE', '아웃 오브 오피스 스니커즈', 890000, 0, 'white,sneakers'],
    ['오프화이트', 'OFF-WHITE', '인더스트리얼 벨트', 290000, 0, 'designer,belt'],
    ['보테가 베네타', 'BOTTEGA VENETA', '카세트 숄더백', 4200000, 0, 'bottega,bag'],
    ['보테가 베네타', 'BOTTEGA VENETA', '파둘라 스니커즈', 1290000, 0, 'green,sneakers'],
    ['보테가 베네타', 'BOTTEGA VENETA', '인트레치아토 카드지갑', 690000, 0, 'leather,wallet'],
    ['보테가 베네타', 'BOTTEGA VENETA', '패드 카세트 토트', 4800000, 0, 'luxury,handbag'],
    ['보테가 베네타', 'BOTTEGA VENETA', '룸 미디움 호보백', 5200000, 0, 'leather,hobobag'],
  ],
  food: [
    ['한우플러스', 'HANWOO', '횡성 한우 1++ 등심 500g', 189000, 0, 'beef,steak'],
    ['한우플러스', 'HANWOO', '한우 1++ 채끝 500g', 159000, 0, 'sirloin,steak'],
    ['한우플러스', 'HANWOO', '한우 1++ 안심 500g', 210000, 0, 'tenderloin,beef'],
    ['한우플러스', 'HANWOO', '한우 1++ 모둠 구이세트 1kg', 320000, 0, 'koreanbeef,bbq'],
    ['트러플리', 'TARTUFI', '이탈리아산 화이트 트러플 50g', 890000, 0, 'whitetruffle,gourmet'],
    ['트러플리', 'TARTUFI', '블랙 트러플 100g', 320000, 0, 'blacktruffle,mushroom'],
    ['트러플리', 'TARTUFI', '트러플 오일 250ml', 49000, 0, 'truffle,oil'],
    ['임페리얼', 'IMPERIAL', '벨루가 캐비어 50g', 690000, 0, 'caviar,luxury'],
    ['임페리얼', 'IMPERIAL', '오세트라 캐비어 30g', 390000, 0, 'caviar,gourmet'],
    ['임페리얼', 'IMPERIAL', '연어알 이쿠라 100g', 59000, 0, 'salmonroe,sushi'],
    ['오션프레시', 'OCEAN FRESH', '캐나다산 랍스터 2미', 119000, 0, 'lobster,seafood'],
    ['오션프레시', 'OCEAN FRESH', '보스턴 랍스터테일 4개', 99000, 0, 'lobstertail,seafood'],
    ['오션프레시', 'OCEAN FRESH', '러시아산 킹크랩 1.5kg', 189000, 0, 'crab,seafood'],
    ['모엣헤네시', 'MOËT', '돔 페리뇽 빈티지', 390000, 0, 'champagne,luxury'],
    ['모엣헤네시', 'MOËT', '모엣 샹동 임페리얼', 89000, 0, 'champagne,bottle'],
    ['모엣헤네시', 'MOËT', '크룩 그랑 퀴베', 490000, 0, 'champagne,celebration'],
    ['와규셀렉트', 'WAGYU', '일본산 A5 와규 등심 400g', 290000, 0, 'wagyu,steak'],
    ['와규셀렉트', 'WAGYU', '고베 와규 채끝 300g', 350000, 0, 'wagyu,beef'],
    ['와규셀렉트', 'WAGYU', '와규 안심 스테이크 250g', 260000, 0, 'wagyu,meat'],
    ['라뒤레', 'LADURÉE', '마카롱 24구 세트', 89000, 0, 'macaron,dessert'],
    ['피에르에르메', 'PIERRE HERMÉ', '마카롱 18구 세트', 99000, 0, 'macaron,french'],
    ['스위트랩', 'SWEET LAB', '수제 마카롱 12구', 39000, 0, 'macaron,colorful'],
    ['고디바', 'GODIVA', '시그니처 초콜릿 24구', 79000, 0, 'chocolate,luxury'],
    ['라메종뒤쇼콜라', 'LA MAISON', '트러플 초콜릿 박스', 119000, 0, 'chocolate,truffle'],
    ['발로나', 'VALRHONA', '그랑크뤼 다크초콜릿', 49000, 0, 'darkchocolate,gourmet'],
    ['이베리코', 'IBÉRICO', '베요타 하몽 1kg', 290000, 0, 'jamon,iberico'],
    ['구르메', 'GOURMET', '푸아그라 테린 200g', 159000, 0, 'foiegras,gourmet'],
    ['오션프레시', 'OCEAN FRESH', '성게알 우니 100g', 129000, 0, 'uni,sushi'],
    ['산지직송', 'PREMIUM', '자연산 송이버섯 500g', 390000, 0, 'matsutake,mushroom'],
    ['프로마쥬', 'FROMAGE', '프랑스산 치즈 플래터', 89000, 0, 'cheese,platter'],
  ],
}

const SPECS = {
  luxury: (brand) => [
    ['브랜드', brand],
    ['소재', '프리미엄 가죽 / 소재'],
    ['보증', '정품 보증서 포함'],
    ['원산지', '수입'],
  ],
  appliance: (brand) => [
    ['브랜드', brand],
    ['보증', '제조사 2년'],
    ['에너지', '고효율 등급'],
    ['구성', '정품 풀패키지'],
  ],
  furniture: (brand) => [
    ['브랜드', brand],
    ['소재', '원목 / 패브릭'],
    ['배송', '전문 설치 포함'],
    ['보증', '5년'],
  ],
  clothing: (brand) => [
    ['브랜드', brand],
    ['소재', '시즌 신상 소재'],
    ['핏', '정사이즈'],
    ['관리', '드라이클리닝 권장'],
  ],
  food: () => [
    ['구성', '프리미엄 구성'],
    ['보관', '냉장 / 냉동'],
    ['원산지', '산지직송'],
    ['배송', '신선 새벽배송'],
  ],
}

const TONES = ['light', 'mid', 'dark']

function build(categoryId, rows) {
  const base = CAT_INDEX[categoryId] * CAT_SIZE
  return rows.map((r, i) => {
    const [brand, brandUpper, name, price, original0] = r
    const id = `${categoryId}-${i + 1}`
    const seq = base + i + 1 // global 1..150
    let original = original0 || 0
    let discount = 0
    if (original) {
      discount = Math.round((1 - price / original) * 100)
    } else if (i % 4 === 0) {
      // Give roughly a quarter of items a realistic markdown.
      discount = 10 + (i % 3) * 4 // 10 / 14 / 18 %
      original = Math.round(price / (1 - discount / 100) / 1000) * 1000
    }
    const rating = Number((4.2 + ((i * 3) % 8) / 10).toFixed(1)) // 4.2 ~ 4.9
    const reviews = 80 + ((i * 173) % 2400)
    return {
      id,
      categoryId,
      brand,
      brandUpper,
      name,
      price,
      original: original || undefined,
      discount: discount || undefined,
      rating,
      reviews,
      tone: TONES[i % 3],
      image: img(seq),
      specs: SPECS[categoryId](brand),
    }
  })
}

export const products = Object.entries(RAW).flatMap(([cat, rows]) =>
  build(cat, rows)
)

export const getProductsByCategory = (categoryId) =>
  products.filter((p) => p.categoryId === categoryId)

export const getProductById = (id) => products.find((p) => p.id === id)
