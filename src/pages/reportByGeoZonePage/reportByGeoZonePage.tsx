import { PageWrapper } from "@/components";
import { createArray } from "@/shared/utils";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useState } from "react";

export const ReportByGeoZonePage = () => {
  const [products, setProducts] = useState([
    ...createArray(40).map((x) => {
      return {
        id: "1000",
        code: "f230fh0g3",
        name: "Bamboo Watch",
        description: "Product Description",
        image: "bamboo-watch.jpg",
        price: 65,
        category: "Accessories",
        quantity: 24,
        inventoryStatus: "INSTOCK",
        rating: 5,
      };
    }),
  ]);

  return (
    <PageWrapper>
      <div>
        <DataTable
          value={products}
          size="small"
          tableStyle={{ minWidth: "50rem" }}
        >
          <Column field="code" header="Code"></Column>
          <Column field="name" header="Name"></Column>
          <Column field="category" header="Category"></Column>
          <Column field="quantity" header="Quantity"></Column>
        </DataTable>
      </div>
    </PageWrapper>
  );
};
