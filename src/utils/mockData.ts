import { faker } from '@faker-js/faker';
import { Product } from '../types';

const imageUrls = {
  Medicines: [
    'https://barakat-pharma.com/wp-content/uploads/2019/09/all_0056_Amoxicillin.jpg',
    'https://i0.wp.com/firstexposure.ca/wp-content/uploads/2025/08/iStock-1359178154.jpg?fit=800%2C534&ssl=1',
    'https://media-cldnry.s-nbcnews.com/image/upload/t_fit-760w,f_auto,q_auto:best/newscms/2018_05/1314664/tamiflu-today-tease-180131.jpg',
    'https://onemg.gumlet.io/a_ignore,w_380,h_380,c_fit,q_auto,f_auto/f7ea93a13d8d418c8c29e61b281ac114.jpg',
    'https://mimsshst.blob.core.windows.net/drug-resources/TH/packshot/Lomide6002PPS0.JPG',
    'https://ik.imagekit.io/wlfr/wellness/images/products/329855-3.jpg',
    'https://media.post.rvohealth.io/2U4nNZEf7jt4s7fWZRWXPcYsXyz/2024/11/12/2ol5zyZ3GEsRKB0Y9KIJLyPtf8I.jpg',
    'https://mms.businesswire.com/media/20200224005260/en/775104/5/Shionogi_Fetroja.jpg?download=1',
    'https://www.cshl.edu/wp-content/uploads/2022/01/Covid-19_trial.jpg',
  ],
  Cosmetics: [
    'https://images-static.nykaa.com/media/catalog/product/9/4/949dfcaELFCO00000600_11.jpg?tr=w-500',
    'https://cdn.tirabeauty.com/v2/billowing-snowflake-434234/tira-p/wrkr/products/pictures/item/free/resize-w:540/940511/H10khCqkQ-940511_1.jpg',
    'https://cdn.fynd.com/v2/falling-surf-7c8bb8/fyprod/wrkr/products/pictures/item/free/original/000000000494448274/Mf-AVZGnr-000000000494448274_1.jpg',
    'https://accessoriestrend.co.ke/wp-content/uploads/2023/02/Screenshot_20231002_162620_Instagram.jpg',
    'https://images-static.nykaa.com/media/catalog/product/8/7/87a23b2SWIAC00001616_001.jpg?tr=w-500',
    'https://cdn.thewirecutter.com/wp-content/media/2025/01/eyeliners-2048px-00153.jpg?auto=webp&quality=75&width=1024',
    'https://m.media-amazon.com/images/I/61YdJezaNRL._UF1000,1000_QL80_.jpg',
    'https://m.media-amazon.com/images/I/511L5m2QpxL._UF1000,1000_QL80_.jpg',
    'https://www.makeupbymario.com/cdn/shop/files/mbm-sslg-packshot-rosewater-6750c8311e288.jpg?v=1733347472&width=640',
    'https://www.fixderma.com/cdn/shop/files/lip-balm-front.webp?v=1756378401',
  ],
  Fragrances: [
    'https://whitelabel.dior.com/dw/image/v2/BJSW_PRD/on/demandware.static/-/Sites-dior_id-Library/en_ID/dw41436f4e/A24F094_SAUVAGE_EAU_FORTE_Mood_Gamme_3700x2000.jpg?sw=768&sfrm=jpg',
    'https://creedboutique.com/cdn/shop/files/aventus-100ml-bottle_3413e5f4-3eee-40b3-8451-2546a370ec5b.jpg?v=1734710265&width=750',
    'https://www.scentimesmnl.com/cdn/shop/products/B_Chanel_Coco_Mademoiselle.jpg?v=1660908415',
    'https://www.aarfragrances.com/public/uploads/all/rVg6ZvGXgOx4coGLNTvVyGBhumNbjeddIf1d90kA.jpg',
    'https://images-static.nykaa.com/media/catalog/product/b/4/b4a2395PRADA00000036_5.jpg?tr=w-500',
    'https://scentira.in/cdn/shop/files/2_2_88f0c3e3-85f0-4eb0-b97f-437891c9747c.png?v=1756889859&width=1536',
    'https://media-uk.landmarkshops.in/cdn-cgi/image/h=1125,w=1125,q=85,fit=cover/lifestyle/1000011005856-1000011005855_04-2100.jpg',
    'https://www.essenza.ng/cdn/shop/files/o.7tLQTeHaWk9.jpg?v=1741886897&width=2000',
    'https://splashfragrance.in/wp-content/uploads/2020/09/product-logo-website-editing-18.jpg',
    'https://scentoria.co.in/cdn/shop/files/IntenseCafeEDP100MLRetail.webp?v=1715066711',
  ],
  'Skin Care': [
    'https://lyskin.com/wp-content/uploads/2022/08/LySkin-Cetaphil-gentle-skin-cleanser-for-sensitive-or-dry-skin-237ml-8-fl.oz-CET00005.webp',
    'https://foreversavingforarainyday.wordpress.com/wp-content/uploads/2020/11/20201108_10352428029-e1604834116720.jpg?w=1024',
    'https://cdn.thewirecutter.com/wp-content/media/2024/12/ROUNDUP-KOREAN-SKINCARE-2048px-9592.jpg',
    'https://media.allure.com/photos/5fb754cdc6c926e09ad33e2f/3:4/w_748%2Cc_limit/SkinCeuticals%2520C%2520E%2520Ferulic.jpeg',
    'https://assets.myntassets.com/w_412,q_30,dpr_3,fl_progressive,f_webp/assets/images/22292186/2023/7/28/9fe3c02e-2ebd-4a50-a576-c5dc29882ddb1690529609515-DOT--KEY-Set-of-Watermelon-SPF50-Sunscreen-50g--Facial-Gel-C-6.jpg',
    'https://assets.ajio.com/medias/sys_master/root/20231220/JwBM/6582d50eddf7791519dc89e1/-473Wx593H-4911738980-multi-MODEL.jpg',
    'https://www.cloud10beauty.com/cdn/shop/files/cerave-oil-control-gel-cream-moisturiser-702276.jpg?v=1726788886&width=1445',
    'https://www.skiandhai.com/cdn/shop/files/61pAZmLq37L._SL1500.jpg?v=1721972157&width=1946',
    'https://thekshop.ca/cdn/shop/articles/TOP_10_The_Most_Popular_Ingredients_in_Korean_Skincare_Products_Kbeauty_THEKSHOP_Canada.jpg?v=1697215143',
    'https://images-static.nykaa.com/media/catalog/product/3/0/30d098dGLAMV00000166_1.jpg?tr=w-500',
  ],
  'Health Devices': [
    'https://mediworld.co.uk/cdn/shop/articles/46bd8c831481e7edfc442f8397692eb9.jpg?v=1688484030',
    'https://microsidd.com/cdn/shop/files/thermometerpeerless.jpg?v=1686760182',
    'https://blog.nkgabc.com/wp-content/uploads/2023/04/Glucometer.jpg',
    'https://www.beurerindia.com/cdn/shop/files/ps_160_product_image.jpg?v=1693034463',
    'https://www.news-medical.net/image-handler/picture/2020/7/shutterstock_621845186.jpg',
    'https://images-cdn.ubuy.co.in/67880f83b61e0a65d623df88-massage-gun-deep-tissue-percussion.jpg',
    'https://homehealthcareonline.com.au/cdn/shop/products/DSC_5180_2048x2048.png?v=1649131190',
    'https://nypost.com/wp-content/uploads/sites/2/2023/05/firstaid.jpg?quality=75&strip=all&w=744',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbkkJgtyvmVtKRCmXCLzOXizTzKsY3qzOzfQ&s',
    'https://cdn.prod.gabit.com/smart-scale/WhatsInBox1.png',
  ],
};

type ImageCategory = keyof typeof imageUrls;

const allCategories: ImageCategory[] = ['Medicines', 'Cosmetics', 'Fragrances', 'Skin Care', 'Health Devices'];

const categoryMap: { [key: string]: ImageCategory } = {
    'medicines': 'Medicines',
    'cosmetics': 'Cosmetics',
    'beauty': 'Cosmetics',
    'fragrances': 'Fragrances',
    'perfumes': 'Fragrances',
    'skin-care': 'Skin Care',
    'health-devices': 'Health Devices',
    'devices': 'Health Devices',
};


interface GenerationOptions {
    category?: string;
    tags?: string[];
    isBestSeller?: boolean;
    isDeal?: boolean;
    isNew?: boolean;
    isRecommended?: boolean;
}

export const generateProducts = (count: number, options?: GenerationOptions): Product[] => {
    return Array.from({ length: count }, () => {
        const specifiedCategory = options?.category ? categoryMap[options.category.toLowerCase().replace(/ /g, '-')] : undefined;
        const category: ImageCategory = specifiedCategory || faker.helpers.arrayElement(allCategories);

        const categoryImages = imageUrls[category];
        const image = faker.helpers.arrayElement(categoryImages);

        const originalPrice = faker.number.float({ min: 5, max: 100, fractionDigits: 2 });
        const hasDiscount = options?.isDeal || faker.datatype.boolean({ probability: 0.3 });
        const price = hasDiscount ? originalPrice * faker.number.float({ min: 0.5, max: 0.8, fractionDigits: 2 }) : originalPrice;

        return {
            id: faker.string.uuid(),
            name: faker.commerce.productName(),
            price: parseFloat(price.toFixed(2)),
            originalPrice: hasDiscount ? parseFloat(originalPrice.toFixed(2)) : undefined,
            image: image,
            category: category,
            prescriptionRequired: category === 'Medicines' ? faker.datatype.boolean({ probability: 0.4 }) : false,
            inStock: faker.datatype.boolean({ probability: 0.9 }),
            rating: parseFloat(faker.number.float({ min: 3.8, max: 5, fractionDigits: 1 }).toFixed(1)),
            description: "CeraVe Foaming Cleanser for Normal to Oily Skin is specially formulated to cleanse and hydrate, effectively removing dirt, oil, and impurities.",
            dosage: 'Take one tablet twice a day, or as directed by your physician.',
            tags: options?.tags || [],
            keyFeatures: [
                "Hydrating Ingredients",
                "Suitable for Sensitive Skin",
                "Fragrance-Free",
                "Dermatologist Recommended",
            ],
            benefits: [
                "Thoroughly cleanses without stripping moisture",
                "Hydrates and nourishes the skin",
                "Gentle for daily use",
                "Leaves skin feeling fresh and revitalized",
            ],
            activeIngredients: [
                { name: 'Hyaluronic Acid', benefit: 'Attracts moisture to the skin' },
                { name: 'Ceramides', benefit: "Restores the skin's natural barrier" },
                { name: 'Niacinamide', benefit: 'Soothes and calms the skin' },
            ],
            directionsForUse: "Wet your face with lukewarm water. Apply a small amount of cleanser to your hands and work into a lather. Gently massage onto your face, avoiding the eye area.",
        };
    });
};

export const generateOrderHistory = (count: number) => {
    return Array.from({ length: count }, () => {
        const products = generateProducts(faker.number.int({ min: 1, max: 5 }));
        const total = products.reduce((sum, p) => sum + p.price, 0);
        return {
            id: `TP${faker.number.int({ min: 100000, max: 999999 })}`,
            date: faker.date.past({ years: 1 }).toLocaleDateString(),
            status: faker.helpers.arrayElement(['Delivered', 'Processing', 'Cancelled']),
            total: total.toFixed(2),
            items: products,
        };
    });
};

export const generateAddresses = (count: number) => {
    return Array.from({ length: count }, (_, i) => ({
        id: faker.string.uuid(),
        isDefault: i === 0,
        type: faker.helpers.arrayElement(['Home', 'Work']),
        name: faker.person.fullName(),
        address: `${faker.location.streetAddress()}, ${faker.location.city()}`,
        phone: faker.phone.number(),
    }));
};

export const storeLocations = [
    { id: 'store1', name: 'Muscat Grand Mall', address: 'Al Khuwair, Muscat' },
    { id: 'store2', name: 'Salalah Gardens Mall', address: 'Salalah' },
    { id: 'store3', name: 'Sohar City Centre', address: 'Sohar' },
    { id: 'store4', name: 'Nizwa Grand Mall', address: 'Nizwa' },
];

export const generateReviews = (count: number) => {
    return Array.from({ length: count }, () => ({
        id: faker.string.uuid(),
        author: faker.person.fullName(),
        avatar: faker.image.avatar(),
        rating: faker.number.int({ min: 3, max: 5 }),
        date: faker.date.recent({ days: 30 }).toLocaleDateString(),
        comment: faker.lorem.paragraph(),
    }));
};

export const generateGiftCards = (count: number) => {
    return Array.from({ length: count }, () => ({
        id: faker.string.uuid(),
        code: `TAIBA-${faker.string.alphanumeric(8).toUpperCase()}`,
        initialValue: faker.helpers.arrayElement([10, 25, 50, 100]),
        currentBalance: faker.number.float({ min: 0, max: 50, fractionDigits: 2 }),
        purchaseDate: faker.date.past({ years: 1 }).toLocaleDateString(),
    }));
};

export const giftCardThemes: Record<string, { image: string; quote: string }> = {
  dad: {
    image: 'https://images.pexels.com/photos/3768894/pexels-photo-3768894.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    quote: 'For the best Dad in the world.',
  },
  mom: {
    image: 'https://images.pexels.com/photos/4061542/pexels-photo-4061542.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    quote: 'Thank you for everything, Mom.',
  },
  colleague: {
    image: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    quote: 'Great working with you!',
  },
  grandfather: {
    image: 'https://images.pexels.com/photos/8711333/pexels-photo-8711333.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    quote: 'To a legendary Grandfather.',
  },
  grandmother: {
    image: 'https://images.pexels.com/photos/3768131/pexels-photo-3768131.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    quote: 'With love, for Grandma.',
  },
  children: {
    image: 'https://images.pexels.com/photos/8471796/pexels-photo-8471796.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    quote: 'A special treat for you!',
  },
  default: {
    image: 'https://images.pexels.com/photos/4348401/pexels-photo-4348401.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    quote: 'The perfect gift of health.',
  },
};
