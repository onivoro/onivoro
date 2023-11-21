export class App {
  constructor(public length = 16) {}
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

  display = {
    totalCost4x6: this.totalCost4x6,
    totalCostFloor2x4: this.totalCostFloor2x4,
    totalCostFloorPlywood: this.totalCostFloorPlywood,
    totalCostSideZipPanels: this.totalCostSideZipPanels,
    totalCostNonSideZipPanels: this.totalCostNonSideZipPanels,
  }

  total = Object.values(this.display).reduce((acc, curr) => acc + curr, 0);


  showTotals () {
    [...Object.entries(this.display), ['total', this.total]].forEach(([key, value]) => console.warn(`${key}: ${value}`));
  }
}

new App(8).showTotals();
