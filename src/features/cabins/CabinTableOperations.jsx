import TableOperations from "../../ui/TableOperations";
import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";

function CabinTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField="discount"
        options={[
          { value: "all", label: "All" },
          { value: "no-discount", label: "No discount" },
          { value: "with-discount", label: "With discount" },
        ]}
      />

      <SortBy
        options={[
          { value: "name-asc", label: "Sort by..." },
          { value: "name-asc", label: "Name (Ascending)" },
          { value: "name-desc", label: "Name (Descending)" },
          { value: "regularPrice-asc", label: "Price (lowest first)" },
          { value: "regularPrice-desc", label: "Price (highest first)" },
          { value: "maxCapacity-asc", label: "Capacity (lowest first)" },
          { value: "maxCapacity-desc", label: "Capacity (highest first)" },
        ]}
      />
    </TableOperations>
  );
}

export default CabinTableOperations;
