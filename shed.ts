export class App {
  constructor(public length = 16) { }
  width = 8;

  qty4x6 = (this.length / 2) + 1;
  cost4x6 = 25;
  totalCost4x6 = this.qty4x6 * this.cost4x6;

  qtyFloor2x4 = ((this.length * 12) / 16) + 1;
  costFloor2x4 = this.length <= 8 ? 3.18 : 10;
  totalCostFloor2x4 = this.qtyFloor2x4 * this.costFloor2x4 + 10;


  qtyFloorPlywood = ((this.length * 12) / 48);
  costFloorPlywood = 36.02;
  totalCostFloorPlywood = this.qtyFloorPlywood * this.costFloorPlywood;


  qtySideZipPanels = ((this.length * 12) / 48) * 2;
  costSideZipPanels = 42.28;
  totalCostSideZipPanels = this.qtySideZipPanels * this.costSideZipPanels;

  qtyNonSideZipPanels = ((this.width * 12) / 48) * 2;
  costNonSideZipPanels = 42.28;
  totalCostNonSideZipPanels = this.qtyNonSideZipPanels * this.costNonSideZipPanels;

  qtyNonSideSiding = ((this.width * 12) / 150) * 12 * 2;
  costNonSideSiding = 15;
  totalCostNonSideSiding = this.qtyNonSideSiding * this.costNonSideSiding;

  qtySideSiding = ((this.length * 12) / 150) * 12 * 2;
  costSideSiding = 15;
  totalCostSideSiding = this.qtySideSiding * this.costSideSiding;

  qty2x4Ceiling = ((this.length * 12) / 16) + 1;
  cost2x4Ceiling = 30; // 3 10' boards;
  totalCost2x4Ceiling = this.qty2x4Ceiling * this.cost2x4Ceiling;

  qtySteelRoof = (this.length / 2);
  costSteelRoof = 31.98; // (1) 12 ft panel cut in half will cover both sides
  totalCostSteelRoof = this.qtySteelRoof * this.costSteelRoof;

  qtyRoofZip = (this.length / 4) * 1.5; // ripping one lengthwise
  costRoofZip = 42.28;
  totalCostRoofZip = this.qtyRoofZip * this.costRoofZip;

  display = {
    totalCost4x6: this.totalCost4x6,
    totalCostFloor2x4: this.totalCostFloor2x4,
    totalCostFloorPlywood: this.totalCostFloorPlywood,
    totalCostSideZipPanels: this.totalCostSideZipPanels,
    totalCostNonSideZipPanels: this.totalCostNonSideZipPanels,
    totalCostNonSideSiding: this.totalCostNonSideSiding,
    totalCostSideSiding: this.totalCostSideSiding,
    totalCost2x4Ceiling: this.totalCost2x4Ceiling,
    totalCostSteelRoof: this.totalCostSteelRoof,
    totalCostRoofZip: this.totalCostRoofZip,
  }

  total = Object.values(this.display).reduce((acc, curr) => acc + curr, 0);


  showTotals() {
    console.warn(`\n\nTOTALS FOR ${this.length} FT LENGTH`);
    [
      ...Object.entries(this.display),
      ['total', this.total],
      ['sq ft', this.length * this.width],
    ]
      .forEach(([key, value]) => console.warn(`${key}: ${value}`));
  }
}

new App(8).showTotals();
new App(16).showTotals();
