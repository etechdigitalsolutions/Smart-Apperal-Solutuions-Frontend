export type MegaMenuItem = {
  label: string;
  slug: string;
};

export type MegaMenuGroup = {
  label: string;
  slug: string;
  items: MegaMenuItem[];
};

export const megaMenuGroups: MegaMenuGroup[] = [
  {
    label: "Sewing Machines",
    slug: "sewing-machines",
    items: [
      { label: "Budget Machine Series", slug: "budget-machine-series" },
      { label: "Automated Machines", slug: "automated-machines" },
      { label: "Single Needle Machines", slug: "single-needle-machines" },
      { label: "Single Needle Special Purpose Machines", slug: "single-needle-special-purpose-machines" },
      { label: "Needle Feed Lockstitch Machines", slug: "needle-feed-lockstitch-machines" },
      { label: "Side Cutting Lockstitch Machines", slug: "side-cutting-lockstitch-machines" },
      { label: "Overlock Machines", slug: "overlock-machines" },
      { label: "5 Thread Overlock Machines", slug: "5-thread-overlock-machines" },
      { label: "4 Thread Overlock Machines", slug: "4-thread-overlock-machines" },
      { label: "3 Thread Overlock Machines", slug: "3-thread-overlock-machines" },
      { label: "Special Purpose Overlock Machines", slug: "special-purpose-overlock-machines" },
      { label: "Double Needle Machines", slug: "double-needle-machines" },
      { label: "Interlock Machines", slug: "interlock-machines" },
      { label: "Heavy-Duty Sewing Machines", slug: "heavy-duty-sewing-machines" },
      { label: "Heavy-duty Cylinder-bed Machines", slug: "heavy-duty-cylinder-bed-machines" },
      { label: "Heavy-duty Flat-bed Machines", slug: "heavy-duty-flat-bed-machines" },
      { label: "Heavy-duty Overlock Machines", slug: "heavy-duty-overlock-machines" },
      { label: "Heavy-duty Post-bed Machines", slug: "heavy-duty-post-bed-machines" },
      { label: "Heavy-duty Special Machines", slug: "heavy-duty-special-machines" },
      { label: "Button Attach Machines", slug: "button-attach-machines" },
      { label: "Button Hole Machines", slug: "button-hole-machines" },
      { label: "Bar Tack Machines", slug: "bar-tack-machines" },
      { label: "Feed of the Arm Machines", slug: "feed-of-the-arm-machines" },
      { label: "Multi-Needle & Chainstitch Machines", slug: "multi-needle-chainstitch-machines" },
      { label: "Zig Zag Machines", slug: "zig-zag-machines" },
      { label: "Pattern Sewing Machines", slug: "pattern-sewing-machines" },
      { label: "Smocking Machines", slug: "smocking-machines" },
    ],
  },
  {
    label: "Cutting Machines",
    slug: "cutting",
    items: [
      { label: "Cloth Cutting Machines", slug: "cloth-cutting-machines" },
      { label: "End Cutting & Tape Cutting Machines", slug: "end-tape-cutting-machines" },
      { label: "Round Knife Cutters", slug: "round-knife-cutters" },
      { label: "Straight Cutting Machines", slug: "straight-cutting-machines" },
    ],
  },
  {
    label: "Ironing, Steam & Industrial Processing",
    slug: "ironing-finishing",
    items: [
      { label: "Ironing & Steam Boilers", slug: "ironing-steam-boilers" },
      { label: "Iron Series", slug: "iron-series" },
      { label: "Iron Tables", slug: "iron-tables" },
      { label: "Steam Boilers", slug: "steam-boilers" },
      { label: "Heat Transfer Machines", slug: "heat-transfer-machines" },
      { label: "Ultrasonic Machines", slug: "ultrasonic-machines" },
      { label: "Fusing Machines", slug: "fusing-machines" },
      { label: "Finishing Machines", slug: "finishing-machines" },
    ],
  },
  {
    label: "Embroidery & Other Machines",
    slug: "embroidery",
    items: [
      { label: "Embroidery Machines", slug: "embroidery-machines" },
      { label: "Other Machines", slug: "other-machines" },
    ],
  },
  {
    label: "Home Sewing Machines",
    slug: "home-appliances",
    items: [
      { label: "Home Sewing Machines", slug: "home-sewing-machines" },
      { label: "Home Lock-stitch & Zig-Zag Machines", slug: "home-lockstitch-zig-zag-machines" },
      { label: "Home Overlock Machines", slug: "home-overlock-machines" },
    ],
  },
  {
    label: "Needles",
    slug: "needles",
    items: [
      { label: "Lockstitch Machine Needles", slug: "lockstitch-machine-needles" },
      { label: "Overlock Needles", slug: "overlock-needles" },
      { label: "Flatlock / Coverstitch Needles", slug: "flatlock-coverstitch-needles" },
      { label: "Special Machine Needles", slug: "special-machine-needles" },
      { label: "Heavy Sewing Needles", slug: "heavy-sewing-needles" },
      { label: "Embroidery Needles", slug: "embroidery-needles" },
      { label: "Home Machine Needles", slug: "home-machine-needles" },
    ],
  },
  {
    label: "Accessories & Tools",
    slug: "accessories",
    items: [
      { label: "Accessories", slug: "accessories" },
      { label: "Tools", slug: "tools" },
      { label: "Folders & Attachments", slug: "folders-attachments" },
      { label: "Lamps", slug: "lamps" },
      { label: "Marking Pens", slug: "marking-pens" },
      { label: "Measuring Tapes & Tools", slug: "measuring-tapes-tools" },
      { label: "Scissors And Cutting Tools", slug: "scissors-cutting-tools" },
      { label: "Oil & Chemicals", slug: "oil-chemicals" },
    ],
  },
  {
    label: "Spare Parts",
    slug: "spare-parts",
    items: [
      { label: "Presser Foots", slug: "presser-foots" },
      { label: "Blades And Knifes", slug: "blades-knifes" },
      { label: "Hooks, Shuttles & bobbins", slug: "hooks-shuttles-bobbins" },
      { label: "V Belts & Timing Belts", slug: "v-belts-timing-belts" },
      { label: "Loopers", slug: "loopers" },
      { label: "Needle Bars", slug: "needle-bars" },
      { label: "Needle Plates & Feedogs", slug: "needle-plates-feedogs" },
      { label: "Pulleys", slug: "pulleys" },
      { label: "Takeup Levers", slug: "takeup-levers" },
      { label: "Screws", slug: "screws" },
      { label: "Tension Posts", slug: "tension-posts" },
      { label: "Puller Sets", slug: "puller-sets" },
      { label: "Iron Parts", slug: "iron-parts" },
      { label: "Thread Guides", slug: "thread-guides" },
      { label: "Thread Stands", slug: "thread-stands" },
      { label: "Gauge Sets", slug: "gauge-sets" },
      { label: "Table Stands & Parts", slug: "table-stands-parts" },
    ],
  },
  {
    label: "Motors",
    slug: "motors",
    items: [
      { label: "Mini Motors", slug: "mini-motors" },
      { label: "Servo Motors", slug: "servo-motors" },
    ],
  },
  {
    label: "Home Appliances",
    slug: "home-appliances",
    items: [
      { label: "Fans", slug: "fans" },
      { label: "Irons", slug: "irons" },
      { label: "Pressure Washer", slug: "pressure-washer" },
      { label: "Vacuum Cleaners", slug: "vacuum-cleaners" },
      { label: "Washing Machines", slug: "washing-machines" },
    ],
  },
];
