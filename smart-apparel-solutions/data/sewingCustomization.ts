export interface SewingOperation {
  id: string;
  title: string;
  description?: string;
  recommendedProductIds: string[];
}

export interface SewingProductType {
  id: string;
  title: string;
  operations: SewingOperation[];
}

export interface SewingApplication {
  id: string;
  title: string;
  productTypes: SewingProductType[];
}

export const sewingApplications: SewingApplication[] = [
  {
    id: "apparel",
    title: "Apparel / Garment",
    productTypes: [
      {
        id: "round-neck-tshirt",
        title: "Round Neck T-shirt",
        operations: [
          {
            id: "shoulder-seams",
            title: "Shoulder Seams",
            recommendedProductIds: [],
          },
          {
            id: "attach-sleeves",
            title: "Attach Sleeves",
            recommendedProductIds: [],
          },
          {
            id: "side-seams",
            title: "Side Seams",
            recommendedProductIds: [],
          },
          {
            id: "attach-neckband",
            title: "Attach Neckband",
            recommendedProductIds: [],
          },
          {
            id: "neckband-topstitch",
            title: "Neckband Topstitch",
            recommendedProductIds: [],
          },
          {
            id: "sleeve-hem",
            title: "Sleeve Hem",
            recommendedProductIds: [],
          },
          {
            id: "bottom-hem",
            title: "Bottom Hem",
            recommendedProductIds: ["p-002"],
          },
        ],
      },
      {
        id: "polo-tshirt",
        title: "Polo T-shirt",
        operations: [
          {
            id: "collar-attachment",
            title: "Collar Attachment",
            recommendedProductIds: [],
          },
          {
            id: "placket-sewing",
            title: "Placket Sewing",
            recommendedProductIds: [],
          },
          {
            id: "shoulder-seams",
            title: "Shoulder Seams",
            recommendedProductIds: [],
          },
          {
            id: "side-seams",
            title: "Side Seams",
            recommendedProductIds: [],
          },
          {
            id: "bottom-hem",
            title: "Bottom Hem",
            recommendedProductIds: ["p-002"],
          },
        ],
      },
      {
        id: "dress-shirt",
        title: "Dress Shirt",
        operations: [
          {
            id: "collar-attachment",
            title: "Collar Attachment",
            recommendedProductIds: [],
          },
          {
            id: "sleeve-attachment",
            title: "Sleeve Attachment",
            recommendedProductIds: [],
          },
          {
            id: "buttonhole",
            title: "Buttonhole Sewing",
            recommendedProductIds: [],
          },
          {
            id: "button-attachment",
            title: "Button Attachment",
            recommendedProductIds: [],
          },
          {
            id: "pocket-welting",
            title: "Pocket Welting",
            recommendedProductIds: ["p-001"],
          },
        ],
      },
      {
        id: "hoodie",
        title: "Sweatshirt / Hoodie",
        operations: [
          {
            id: "shoulder-seams",
            title: "Shoulder Seams",
            recommendedProductIds: [],
          },
          {
            id: "attach-sleeves",
            title: "Attach Sleeves",
            recommendedProductIds: [],
          },
          {
            id: "cuff-attachment",
            title: "Cuff Attachment",
            recommendedProductIds: [],
          },
          {
            id: "bottom-hem",
            title: "Bottom Hem",
            recommendedProductIds: ["p-002"],
          },
        ],
      },
      {
        id: "trousers",
        title: "Trousers",
        operations: [
          {
            id: "inseam",
            title: "Inseam Sewing",
            recommendedProductIds: [],
          },
          {
            id: "side-seams",
            title: "Side Seams",
            recommendedProductIds: [],
          },
          {
            id: "pocket-welting",
            title: "Pocket Welting",
            recommendedProductIds: ["p-001"],
          },
          {
            id: "bottom-hem",
            title: "Bottom Hem",
            recommendedProductIds: ["p-009"],
          },
        ],
      },
    ],
  },
  {
    id: "denim",
    title: "Denim / Jeans",
    productTypes: [
      {
        id: "jeans",
        title: "Jeans",
        operations: [
          {
            id: "heavy-fabric-sewing",
            title: "Heavy Fabric Sewing",
            recommendedProductIds: ["p-003"],
          },
          {
            id: "pocket-welting",
            title: "Pocket Welting",
            recommendedProductIds: ["p-001"],
          },
          {
            id: "reinforcement",
            title: "Bartacking / Reinforcement",
            recommendedProductIds: [],
          },
          {
            id: "bottom-hem",
            title: "Trouser Hem",
            recommendedProductIds: ["p-009"],
          },
        ],
      },
      {
        id: "denim-jacket",
        title: "Denim Jacket",
        operations: [
          {
            id: "heavy-fabric-sewing",
            title: "Heavy Fabric Sewing",
            recommendedProductIds: ["p-003"],
          },
          {
            id: "pocket-welting",
            title: "Pocket Welting",
            recommendedProductIds: ["p-001"],
          },
          {
            id: "sleeve-attachment",
            title: "Sleeve Attachment",
            recommendedProductIds: [],
          },
        ],
      },
      {
        id: "workwear",
        title: "Workwear",
        operations: [
          {
            id: "heavy-fabric-sewing",
            title: "Heavy Fabric Sewing",
            recommendedProductIds: ["p-003", "p-004"],
          },
          {
            id: "reinforcement",
            title: "Reinforcement Sewing",
            recommendedProductIds: [],
          },
        ],
      },
    ],
  },
  {
    id: "leather",
    title: "Upholstery, Leather & Marine",
    productTypes: [
      {
        id: "leather-goods",
        title: "Leather Goods",
        operations: [
          {
            id: "heavy-material-sewing",
            title: "Heavy Material Sewing",
            recommendedProductIds: [],
          },
          {
            id: "edge-stitching",
            title: "Edge Stitching",
            recommendedProductIds: [],
          },
        ],
      },
      {
        id: "upholstery",
        title: "Furniture Upholstery",
        operations: [
          {
            id: "heavy-material-sewing",
            title: "Heavy Material Sewing",
            recommendedProductIds: [],
          },
          {
            id: "joining-panels",
            title: "Joining Panels",
            recommendedProductIds: [],
          },
        ],
      },
    ],
  },
  {
    id: "footwear",
    title: "Footwear",
    productTypes: [
      {
        id: "shoes",
        title: "Shoes & Footwear",
        operations: [
          {
            id: "upper-stitching",
            title: "Upper Stitching",
            recommendedProductIds: [],
          },
          {
            id: "reinforcement",
            title: "Reinforcement Sewing",
            recommendedProductIds: [],
          },
        ],
      },
    ],
  },
  {
    id: "activewear",
    title: "Activewear & Sportswear",
    productTypes: [
      {
        id: "sportswear",
        title: "Sportswear",
        operations: [
          {
            id: "stretch-seams",
            title: "Stretch Seams",
            recommendedProductIds: [],
          },
          {
            id: "attach-sleeves",
            title: "Attach Sleeves",
            recommendedProductIds: [],
          },
          {
            id: "bottom-hem",
            title: "Bottom Hem",
            recommendedProductIds: ["p-002"],
          },
        ],
      },
      {
        id: "leggings",
        title: "Leggings",
        operations: [
          {
            id: "stretch-seams",
            title: "Stretch Seams",
            recommendedProductIds: [],
          },
          {
            id: "waistband-attachment",
            title: "Waistband Attachment",
            recommendedProductIds: [],
          },
        ],
      },
    ],
  },
  {
    id: "bags",
    title: "Bags & Backpacks",
    productTypes: [
      {
        id: "backpacks",
        title: "Backpacks",
        operations: [
          {
            id: "panel-joining",
            title: "Panel Joining",
            recommendedProductIds: [],
          },
          {
            id: "strap-attachment",
            title: "Strap Attachment",
            recommendedProductIds: [],
          },
          {
            id: "reinforcement",
            title: "Reinforcement Sewing",
            recommendedProductIds: [],
          },
        ],
      },
      {
        id: "handbags",
        title: "Handbags",
        operations: [
          {
            id: "panel-joining",
            title: "Panel Joining",
            recommendedProductIds: [],
          },
          {
            id: "edge-stitching",
            title: "Edge Stitching",
            recommendedProductIds: [],
          },
        ],
      },
    ],
  },
  {
    id: "alterations",
    title: "Alterations & Repairs",
    productTypes: [
      {
        id: "garment-repairs",
        title: "Garment Repairs",
        operations: [
          {
            id: "general-repairs",
            title: "General Sewing Repairs",
            recommendedProductIds: ["p-003"],
          },
          {
            id: "hemming",
            title: "Hemming",
            recommendedProductIds: ["p-009"],
          },
        ],
      },
    ],
  },
  {
    id: "pattern-tacking",
    title: "Pattern Tacking & Sewing",
    productTypes: [
      {
        id: "pattern-work",
        title: "Pattern Work",
        operations: [
          {
            id: "pocket-welting",
            title: "Pocket Welting",
            recommendedProductIds: ["p-001"],
          },
        ],
      },
    ],
  },
  {
    id: "curtains",
    title: "Curtains & Home Décor",
    productTypes: [
      {
        id: "curtains",
        title: "Curtains",
        operations: [
          {
            id: "panel-joining",
            title: "Panel Joining",
            recommendedProductIds: [],
          },
          {
            id: "bottom-hem",
            title: "Bottom Hem",
            recommendedProductIds: [],
          },
        ],
      },
    ],
  },
  {
    id: "embroidery",
    title: "Embroidery",
    productTypes: [
      {
        id: "embroidery-work",
        title: "Embroidery & Branding",
        operations: [
          {
            id: "embroidery",
            title: "Embroidery",
            recommendedProductIds: [],
          },
          {
            id: "logo-stitching",
            title: "Logo Stitching",
            recommendedProductIds: [],
          },
        ],
      },
    ],
  },
];
